require('promise-hash')
//const joi  = require( 'joi')
const {
  Sequelize,
  SharedPost,
  SharedTerm
} = require('../models')


const {
  homeTermCaseId,
  termPostRootId
} = require('../config/game')

const Op = Sequelize.Op;
const currentPage = {}

// 分类-帮助的id
const termHelpRootId = 4


class PagesController {
  async index(ctx) {
    const query = ctx.query
    // Home 案例 动态 帮助 关于 Contact 创建

    // const mainmenu = [{url: '/', title:'首页'},{url: '/case', title:'案例'},
    //   {url: '/news', title:'动态'},{url: '/help', title:'帮助'},{url: '/about-us', title:'关于'}]
    const cases = getCases()
    const posts = getPosts()

    //Get paginated list of notes
    try {

      let context = await Promise.hash({
        currentPage,
        title: 'pageTitle',
        // Primary page content
        cases,
        //sidebar: contentService.getSidebarContent()
      })

      await ctx.render('index', context)

    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA' + error)
    }
  }

  async aboutUs(ctx) {
    const pageHeader = {
      title: '把“技术”的事情交给我们，让您轻松做“商务”',
      desc: ''
    }

    let currentTerm = {
      name: '关于我们'
    }

    let context = {
      pageHeader,
      currentTerm
    }
    await ctx.render('about-us', context)

  }

  async faq(ctx) {
    let currentTerm = {
      name: '帮助'
    }
    let context = {
      currentPage,
      currentTerm
    }
    await ctx.render('faq', context)

  }

  async cases(ctx) {
    let currentTerm = {
      name: '案例'
    }
    let context = {
      currentPage,
      currentTerm
    }
    await ctx.render('case', context)

  }
}

async function getCases() {

  let options = {
    include: [{
      association: 'Covers'
    }],
    where: {
      publish_at: {
        [Op.ne]: null
      }
    },
    limit: 6
  }
  options.include.push({
    association: 'TermRelationships',
    where: {
      term_id: homeTermCaseId
    }
  })

  let posts = await SharedPost.findAll(options)

  return posts
}

async function getPosts() {
  let terms = await SharedTerm.findAll({
    where: {
      parent_id: termPostRootId
    }
  })

  let tids = terms.map((term) => term.id)
  let options = {
    include: [{
      association: 'TermRelationships',
      where: {
        term_id: {
          [Op.in]: tids
        }
      }
    }],
    where: {
      publish_at: {
        [Op.ne]: null
      }
    },
    limit: 4,
    order: [
      ['publish_at', 'DESC']
    ]
  }



  let posts = await SharedPost.findAll(options)

  return posts
}

export default PagesController
