// page 页面 menu_order >0 为首页按钮
// menu_order =1 为首页

module.exports = {
     endpoint: process.env.WP_ENDPOINT,
     cacheLimit: 1000*60,
     site:{
       name: process.env.WP_SITE_NAME,
       description: process.env.WP_SITE_DESC,
       homePage: 'home',
       postsPage: 'news'
     }

}


//endpoint: 'http://www.your-api-enabled-wp-site.com/wp-json'
//cacheLimit: 3600000 # 1000ms * 60s * 60m = 1hr
