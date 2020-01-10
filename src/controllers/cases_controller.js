require('promise-hash')
//const joi  = require( 'joi')
const { termCaseRootId } = require( '../config/game')
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
    include: [{association:'Slides'}],
    where: {code: 'ztoupiao'},
    limit: paging.paginate,
    offset: paging.offset,
    order: [
      ['publish_at', 'DESC']
    ]
  }
  let currentTerm = null
  if (termId) {
    options.include.push({
      association: 'TermRelationships',
      where: {

        term_id: termId
      }
    })
    currentTerm = SharedTerm.findByPk(termId)
  } else {
    currentTerm = SharedTerm.findByPk(termCaseRootId)
  }

  // 案例分类 根分类id = 4
  let sidebar = await getSidebarContext()
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
  } = await ZTouPiaoGameRound.findAndCount(options)
  let pages = Math.ceil(count / paging.paginate)

  console.debug(" pages, total", pages, count, filters)
  const posts = rows
  const pagination = {
    page: paging.page,
    pageCount: pages
  }
  //Get paginated list of notes
  try {
    let context = await Promise.hash({
      currentPage, // 当前页面设置hasSidebar
      currentTerm,
      filters,
      // Primary page content
      posts,
      pagination,
      sidebar
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

  const id = ctx.params.id
  let gameRound = await ZTouPiaoGameRound.findByPk(id)
  let currentTerm = await SharedTerm.findByPk(termCaseRootId)

  let gameAlbums = await ZTouPiaoAlbum.findAll({
    where: {
      game_round_id: gameRound.id,
    },
    include: [{
      attributes: ['okey'],
      association: 'Photos'
    }]
  })

  // get previous/next game  发布日期晚的在前面，发布日期早的在后面，
  let preGameRound = await ZTouPiaoGameRound.findOne({
     where: {
       publish_at: {
         [Op.gte]: gameRound.publish_at,
         [Op.ne]: null
       },
       id: {
         [Op.ne]: gameRound.id
       }
     },
     order: [
       ['publish_at', 'DESC']
     ]
   })

  let nextGameRound = await ZTouPiaoGameRound.findOne({ where:{
     publish_at: {
       [Op.lte]: gameRound.publish_at,
       [Op.ne]: null
     },
     id: {
       [Op.ne]: gameRound.id
     }
   }, order:[['publish_at', 'DESC']]})

  // 推荐最新的20个
  let newGameRounds = await ZTouPiaoGameRound.findAll({
    where: {
      publish_at: {
        [Op.ne]: null
      }
    },
    limit: 20,
    order: [
      ['publish_at', 'DESC']
    ]
  })

  //如果游戏在运行状态，设置 visit_count result_count album_count
  if (gameRound.state == GameRoundStates.started) {
    gameRound.visit_count = await ZTouPiaoGameDay.sum('visit_count', {
      where: {
        game_round_id: gameRound.id
      }
    })
    gameRound.result_count = await ZTouPiaoGameResult.count({
      where: {
        game_round_id: gameRound.id
      }
    })

    gameRound.album_count = gameAlbums.length

  }
  console.debug( " gameRound = ", gameRound.toJSON())
  let context = {
    currentPage,
    currentTerm,
    gameRound,
    preGameRound,
    nextGameRound,
    newGameRounds,
    gameAlbums
  }
  let view = 'cases/show-desktop'

  if( ctx.userAgent.isMobile){
    view = 'cases/show-mobile'
  }
  await ctx.render(view, context)
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
