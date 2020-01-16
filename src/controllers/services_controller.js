
require('promise-hash')
//const joi  = require( 'joi')
const  { Sequelize } = require('../models')

const Op = Sequelize.Op;
const currentPage = {   }

// 分类-帮助的id
const termHelpRootId = 4


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

        // const mainmenu = [{url: '/', title:'首页'},{url: '/case', title:'案例'},
        //   {url: '/news', title:'动态'},{url: '/help', title:'帮助'},{url: '/about-us', title:'关于'}]
        const posts = [] //WpPost.findAll()
        const pageHeader = { title: '企业建站的优质选择', desc: ''}

        //Get paginated list of notes
        try {

          let context = await Promise.hash({
            pageHeader,
            title: 'pageTitle',
            // Primary page content
            //sidebar: contentService.getSidebarContent()
          })

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

          let context = await Promise.hash({
            pageHeader,
            title: 'pageTitle',
            // Primary page content
            //sidebar: contentService.getSidebarContent()
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
        const pageHeader = { title: '系统以人为本，适合的就是最好的', desc: ''}

        //Get paginated list of notes
        try {

          let context = await Promise.hash({
            pageHeader,
            title: 'pageTitle',
            // Primary page content
            //sidebar: contentService.getSidebarContent()
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
        const pageHeader = { title: '微信-移动互联网的流量第一入口', desc: '无论你想做什么，都不能忽略它！'}

        //Get paginated list of notes
        try {

          let context = await Promise.hash({
            pageHeader,
            title: 'pageTitle',
            // Primary page content
            //sidebar: contentService.getSidebarContent()
          })

          await ctx.render( 'services/wx', context )

        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }


}



export default ServicesController
