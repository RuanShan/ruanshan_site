
// 取得当前页面的css 类，设置body.class
function getPageCssClass( page ){

  let cssClss = ''
  if( page.menu_order == 1){
    cssClss = 'tg-site-layout--stretched page-template-pagebuilder'
  }
  return cssClss

}

module.exports = {
  getPageCssClass
}
