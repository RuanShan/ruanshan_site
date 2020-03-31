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
    // 过滤条件
    let terms = await SharedTerm.findAll({
      where: {
        parent_id: termPostRootId
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
        filters,
      })
      await ctx.render('posts/index', context)

    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA' + error)
    }
  }
  async show(ctx) {
    const id = ctx.params.id

    let relatedPosts= []

    let options = { include:[{association:'Covers'},{ association: 'Terms'}], where: {}  }
    let post = await SharedPost.findByPk(id,options)
    let term = post.Terms.find((term)=> term.rootId== termPostRootId)

    if( term ){
      relatedPosts = await SharedPost.findAll({
         include:[{association:'Covers'},{ association: 'Terms', where:{ id:  term.id }}],
         where: {

           publish_at: {
             [Op.ne]: null
           },
           id: {
             [Op.ne]: post.id
           }
         },
         order: [
           ['publish_at', 'DESC']
         ],
         limit: 3
       })

       if( relatedPosts.length == 0 ){
         relatedPosts = await SharedPost.findAll({
            include:[{association:'Covers'},{ association: 'Terms' }],
            where: {

              publish_at: {
                [Op.ne]: null
              },
              id: {
                [Op.ne]: post.id
              }
            },
            order: [
              ['publish_at', 'DESC']
            ],
            limit: 3
          })
       }
    }


   // get previous/next post

    let context = {
      currentPage,
      post,
      relatedPosts
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
