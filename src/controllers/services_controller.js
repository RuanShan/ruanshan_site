
require('promise-hash')
const { termCaseRootId } = require( '../config/game')
const {
  SharedPost,
  SharedTerm,
  Sequelize
} = require('../models')

const getPagination = require('../helpers/pagination');

const Op = Sequelize.Op;
const currentPage = {   }

// 分类-帮助的id
const userId = 2
const termServiceOptions = { slug: 'services', userId: userId }

class ServicesController {
    async index(ctx) {
        const query = ctx.query
        // Home 案例 动态 帮助 关于 Contact 创建

        // const mainmenu = [{url: '/', title:'首页'},{url: '/case', title:'案例'},
        //   {url: '/news', title:'动态'},{url: '/help', title:'帮助'},{url: '/about-us', title:'关于'}]
        const posts = [] //WpPost.findAll()
        const page = { menu_order: 1 }

        //Get paginated list of notes
        try {

          let context = await Promise.hash({
            currentPage,
            title: 'pageTitle',
            // Primary page content
            posts: posts, //wp.posts().page( pages.current ),
            //sidebar: contentService.getSidebarContent()
          })

          await ctx.render( 'index', context )

        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }

    async serviceWebsite(ctx) {
        const query = ctx.query
        // Home 案例 动态 帮助 关于 Contact 创建
        console.log('serviceWebsite->', this)

        const pageHeader = { title: '企业建站的优质选择', desc: ''}

        //Get paginated list of notes
        try {
          const posts = getPostsByServiceSlug('website')

          let context = await Promise.hash({
            pageHeader,
            title: 'pageTitle',
            // Primary page content
            posts
          })
console.debug("posts", posts);
          await ctx.render( 'services/website', context )

        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }

    async serviceH5(ctx) {
        const query = ctx.query
        // Home 案例 动态 帮助 关于 Contact 创建

        const posts = [] //WpPost.findAll()
        const pageHeader = { title: '单日流量过万 高转化 那是相当轻松的', desc: ''}

        //Get paginated list of notes
        try {
          const posts = getPostsByServiceSlug('h5')

          let context = await Promise.hash({
            pageHeader,
            title: 'pageTitle',
            // Primary page content
            posts
          })

          await ctx.render( 'services/h5', context )

        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }

    async serviceSoft(ctx) {
        const query = ctx.query
        // Home 案例 动态 帮助 关于 Contact 创建

        const posts = [] //WpPost.findAll()
        const pageHeader = { title: '定制系统以人为本，适合的就是最好的', desc: ''}

        //Get paginated list of notes
        try {
          const posts = getPostsByServiceSlug('soft')

          let context = await Promise.hash({
            pageHeader,
            title: 'pageTitle',
            // Primary page content
            posts
          })

          await ctx.render( 'services/soft', context )

        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }

    async serviceWx(ctx) {
        const query = ctx.query
        // Home 案例 动态 帮助 关于 Contact 创建

        const posts = [] //WpPost.findAll()
        const pageHeader = { title: '连接微信-移动互联网的流量第一入口', desc: '无论你想做什么，都不能忽略它！'}

        //Get paginated list of notes
        try {
          const posts = getPostsByServiceSlug('wx')

          let context = await Promise.hash({
            pageHeader,
            title: 'pageTitle',
            // Primary page content
            posts
          })

          await ctx.render( 'services/wx', context )

        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }



}

async function getTermByServiceSlug( serviceSlug ){
  // website,h5,soft,wx
  let terms = await SharedTerm.findAll({
    where: {
      parent_id: termCaseRootId
    }
  })

  let term = terms.find((term)=>{
    return term.slug == serviceSlug
  })

  return term || terms[0]
}

async function getPostsByServiceSlug( serviceSlug ){
  let options = { include:[{association:'Covers'}], where: {
    publish_at: {
      [Op.ne]: null
    }
  }, limit: 4 }
  let term = await getTermByServiceSlug( serviceSlug )

  options.include.push({
    association: 'TermRelationships',
    where: {
      term_id: term.id
    }
  })
  let posts = await SharedPost.findAll(options)

  return posts
}

export default ServicesController
