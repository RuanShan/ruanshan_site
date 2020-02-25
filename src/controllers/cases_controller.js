require('promise-hash')
const { termCaseRootId, userId } = require( '../config/game')
const {
  SharedPost,
  SharedTerm,
  ZTouPiaoGameRound,
  ZTouPiaoGameResult,
  ZTouPiaoAlbum,
  ZTouPiaoGameDay,
  Sequelize
} = require('../models')

const { GameRoundStates } = require('../models/constant')
const getPagination = require('../helpers/pagination');

const currentPage = {
  hasSidebar: false
}

const Op = Sequelize.Op;


function CasesController() {}
/**
 * 显示案例列表,  by_category, by_tag
 * @param {*} ctx
 * @param {int} tagId
 * @param {int} categoryId
 *
 */
CasesController.prototype.index = async function(ctx) {

  let termId = ctx.params.termId
  let paging = getPagination(ctx.query.page);
  let options = {
    include: [{association:'Covers'}],
    where: { userId },
    limit: paging.paginate,
    offset: paging.offset,
    distinct: true,
    order: [
      ['publish_at', 'DESC']
    ]
  }
  let currentTerm = null
  if (termId) {
    options.include.push({
      association: 'Terms',
      where: {
        id: termId
      }
    })
    currentTerm = SharedTerm.findByPk(termId)
  } else {
    // 文章可能分配给多个term，这里需指定根分类， 如`首页案例分类`
    options.include.push({
      association: 'Terms' ,
      where: {
        parent_id: termCaseRootId
      }
    })
    currentTerm = SharedTerm.findByPk(termCaseRootId)
  }

  // 案例分类 根分类id = 4

  // 过滤条件
  let terms = await SharedTerm.findAll({
    where: {
      parent_id: termCaseRootId
    }
  })
  let filters = terms.map((term) => {
    return {
      id: term.id,
      name: term.name,
      active: (term.id == termId)
    }
  })

  filters.unshift({
    id: null,
    name: '全部',
    active: (null == termId)
  })

  const {
    rows,
    count
  } = await SharedPost.findAndCountAll(options)
  let pages = Math.ceil(count / paging.paginate)

  console.debug(" pages, total", paging, pages, count, filters)
  const posts = rows
  const pagination = {
    page: paging.page,
    pageCount: pages
  }
  const pageHeader = { title: '专注网络技术，提高企业效率' }

  //Get paginated list of notes
  try {
    let context = await Promise.hash({
      pageHeader,
      currentTerm,
      filters,
      // Primary page content
      posts,
      pagination,
    })

    await ctx.render('cases/index', context)

  } catch (error) {
    console.log(error)
    ctx.throw(400, 'INVALID_DATA' + error)
  }
}

/**
 * 显示案例详细信息
 * @param {*} ctx
 *
 */
CasesController.prototype.show = async function(ctx) {
  let userId = userId

  const id = ctx.params.id
  let sidebar = await getSidebarContext()

  let options = { include:[{association:'Covers'},{ association: 'Terms'}], where: {}  }
  let post = await SharedPost.findByPk(id,options)

  let prePost = await SharedPost.findOne({
     where: {
       userId,
       publish_at: {
         [Op.gte]: post.publish_at,
         [Op.ne]: null
       },
       id: {
         [Op.ne]: post.id
       }
     },
     order: [
       ['publish_at', 'DESC']
     ]
   })

  let nextPost = await SharedPost.findOne({ where:{
     userId,
     publish_at: {
       [Op.lte]: post.publish_at,
       [Op.ne]: null
     },
     id: {
       [Op.ne]: post.id
     }
  }, order:[['publish_at', 'DESC']]})
 // get previous/next post

  let context = {
    currentPage,
    sidebar,
    post,
    prePost,
    nextPost
  }
  await ctx.render('cases/show', context)
}

async function getSidebarContext() {

  // 案例分类 根分类id = 4
  let terms = await SharedTerm.findAll({
    where: {
      parent_id: termCaseRootId
    }
  })
  return {
    categories: terms
  }
}



export default CasesController
