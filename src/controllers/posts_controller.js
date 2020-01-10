require('promise-hash')
//const joi  = require( 'joi')
const { termPostRootId } = require( '../config/game')

const {
  Sequelize,
  SharedPost,
  SharedTerm
} = require('../models')
const getPagination = require('../helpers/pagination');

const { mainmenu } = require( '../services/site' );

const Op = Sequelize.Op;
const currentPage = { type: 'news', hasSidebar: true }


class PostsController {
  async index(ctx) {
    let termId = ctx.params.termId

    let paging = getPagination( ctx.query.page );

    let options = { include:[{association:'Covers'}], where: {
      publish_at: {
        [Op.ne]: null
      }
    }, limit: paging.paginate, offset: paging.offset }
    let currentTerm = null

    if( termId){
      options.include.push({ association: 'Terms', where:{ id:termId}})
      currentTerm = SharedTerm.findByPk(termId)
    }else{
      options.include.push({ association: 'Terms'})
      currentTerm = SharedTerm.findByPk(termPostRootId)
    }


    // news id = 9
    let sidebar = getSidebarContext()

    // 找到最近的12篇文章
    // const termids = categories.map((term) => {
    //   return term.id
    // })

    const { rows, count } = await SharedPost.findAndCount(options)
    let pages = Math.ceil( count/paging.paginate )
    console.debug( " pages, total termId", pages, count, termId)
    const posts = rows
    const pagination = { page: paging.page, pageCount: pages }

    //Get paginated list of notes
    try {
      let context = await Promise.hash({
        currentPage: currentPage, // 当前页面信息, 决定当前页面类型，
        currentTerm,
        pages: mainmenu,
        // Primary page content
        posts,
        pagination,
        sidebar
      })
      await ctx.render('posts/index', context)

    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA' + error)
    }
  }
  async show(ctx) {
    const id = ctx.params.id
    let sidebar = await getSidebarContext()

    let options = { include:[{association:'Covers'},{ association: 'Terms'}], where: {}  }
    let post = await SharedPost.findByPk(id,options)

    let prePost = await SharedPost.findOne({
       where: {
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
    await ctx.render('posts/show', context)
  }

}

async function  getSidebarContext(){

      // 案例分类 根分类id = 4
      let terms = await SharedTerm.findAll({where:{ parent_id: termPostRootId}})
      return { categories:terms }
}

export default PostsController
