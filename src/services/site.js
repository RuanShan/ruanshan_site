const mainmenu = [{
    url: '/',
    title: '首页'
  }, {
    url: '/services',
    title: '服务',
    submenus:[
      {title: '网站建设', url: '/service-website'},
      {title: 'h5游戏', url: '/service-h5'},
      {title: '定制开发', url: '/service-soft'},
      {title: '微信相关开发', url: '/service-wx'},
    ]

  }, {
    url: '/products',
    title: '产品',
    submenus:[
      {title: '店加', url: '/product-getstore'},
      {title: '星投票', url: '/product-ztoupiao'}
    ]
  }, {
    url: '/case',
    title: '案例'
  },
  {
    url: '/about-us',
    title: '关于'
  }
]
const site = {
  name: '大连软山网络有限公司',
  productName: '软山网络',
  description: '基于网络技术,服务于我们的生活和事业',
  metaKeywords: '大连软山网络科技有限公司,网站开发,电商系统开发,全平台电商系统开发,大屏互动游戏开发,H5引流游戏开发,订单系统开发,微信投票系统平台',
  metaDescription: '大连软山网络科技有限公司是一家以软件开发以及平台运营为主的互联网公司，我们致力于利用先进的互联网技术， 加强人与人之间信息的交流和共享，使之更好的服务于我们的生活和事业。'
}


/**
 * 取得sidebar 上下文数据
 * @constructor
 * @param {string} path - 书本的标题.
 * @return {Object} categories - 边栏菜单.
 */
async function getSidebarContext(path) {
  let categories = []
  return {
    categories
  }
}

module.exports = {
  site,
  mainmenu
}
