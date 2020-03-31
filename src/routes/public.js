const Router = require("koa-router");
const router = new Router();


// Public Routes
// =============
import PagesController from '../controllers/pages_controller'
import PostsController from '../controllers/posts_controller'
import CasesController from '../controllers/cases_controller'
import ServicesController from '../controllers/services_controller'

const pageController = new PagesController()
const postsController = new PostsController()
const casesController = new CasesController()
const servicesController = new ServicesController()

router.get( '/', pageController.index );
router.get( '/service-website', servicesController.serviceWebsite );
router.get( '/service-soft', servicesController.serviceSoft );
router.get( '/service-wx', servicesController.serviceWx );
router.get( '/service-h5', servicesController.serviceH5 );
router.get( '/about-us', pageController.aboutUs );
router.get( '/posts', postsController.index );
router.get( '/posts/category', postsController.index );
router.get( '/posts/category/:termId', postsController.index );
router.get( '/posts/detail/:id', postsController.show );
router.get( '/case', casesController.index );
router.get( '/case/category', casesController.index );
router.get( '/case/category/:termId', casesController.index );
router.get( '/case/tag/:tagId', casesController.show );
router.get( '/case/detail/:id', casesController.show );
router.get( '/faq', pageController.faq );
router.get( '/index.html', pageController.index );
router.get( '/posts.html', postsController.index );
router.get( '/cases.html', pageController.cases );
router.get( '/about-us.html', pageController.aboutUs );

// // router.use( '/search', require( './search' ) );
// // router.use( '/:year/:month', require( './archive-year-month' ) );
// router.get( '/:year/:month/:slug', require( './single' ) );
// router.use( '/tags/:tag', require( './tag' ) );
// router.use( '/categories/:category', require( './category' ) );

module.exports = router;
