'use strict'

import path from 'path'
import Koa from 'koa'
import serve from 'koa-static'
import koaHandlebars from 'koa-handlebars'
import cors from 'kcors'
import userAgent from 'koa-useragent'
import koaBodyparser from 'koa-bodyparser'
import error from 'koa-json-error'
import ratelimit from 'koa-ratelimit'
import koaStylus from 'koa-stylus'
import stylus from 'stylus'
import redis from 'ioredis'
import logger from './services/logger'

//Routes
import router from './routes/public'
const { site, mainmenu } = require( './services/site' );

const env = process.env.NODE_ENV
//Initialize app
const app = new Koa()

//Here's the rate limiter
app.use(
    ratelimit({
        db: new redis(),
        duration: 60000,
        errorMessage: 'Sometimes You Just Have to Slow Down.',
        id: ctx => ctx.ip,
        headers: {
            remaining: 'Rate-Limit-Remaining',
            reset: 'Rate-Limit-Reset',
            total: 'Rate-Limit-Total',
        },
        max: 100,
    })
)

//Let's log each successful interaction. We'll also log each error - but not here,
//that's be done in the json error-handling middleware
app.use(async (ctx, next) => {
    try {
        await next()
        logger.info(
            ctx.method + ' ' + ctx.url + ' RESPONSE: ' + ctx.response.status
        )
    } catch (error) {}
})



//Apply error json handling
let errorOptions = {
    postFormat: (e, obj) => {
        //Here's where we'll stick our error logger.
        logger.info(obj)
        if (env !== 'production') {
            return obj
        } else {
            delete obj.stack
            delete obj.name
            return obj
        }
    },
}
app.use(error(errorOptions))

// return response time in X-Response-Time header
app.use(async function responseTime(ctx, next) {
    const t1 = Date.now()
    await next()
    const t2 = Date.now()
    ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms')
})

//For cors with options
app.use(cors({ origin: '*' }))

//For useragent detection
app.use(userAgent)

//For managing body. We're only allowing json.
app.use(koaBodyparser())

// Support stylus & serve static assets
function compileStylus( str, path ) {
  return stylus( str )
    .set( 'filename', path )
    // .set( 'sourcemap', true )
    .set( 'compress', true );
}
app.use(koaStylus({
  src: path.join( __dirname, '../public/stylus' ),
  dest: path.join( __dirname, '../public/css' ),
  compile: compileStylus
 }))
// serve static files (html, css, js); allow browser to cache for 1 day (note css/js req'd before login)
const maxage = env =='production' ? 1000*60*60*24 : 1000;
app.use(serve('public', { maxage: maxage }));

const handlebars = require('handlebars');
const handlebarsHelper = require('./helpers/handlebars')
// handlebars templating
app.use(koaHandlebars({
    cache: env !== "development",
    root: __dirname,
    defaultLayout: "main",
    handlebars:  handlebars,
    extension:   [ 'html', 'hbs' ],
    viewsDir:    'views',
    partialsDir:  path.join( 'views','partials'),
    layoutsDir:  path.join( 'views','layouts'),
    helpers: handlebarsHelper,
    data:{ mainmenu, site }
}));

//let siteInfoMiddleware = require( './middleware/site-info' );
// Set global site info on all routes
//app.use( siteInfoMiddleware() );

// Require the public router
app.use(router.routes())
  .use(router.allowedMethods());;

export default app
