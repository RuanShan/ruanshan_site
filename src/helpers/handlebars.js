// helpers.js

// Same instance, because node modules are cached
var Handlebars = require('handlebars');
var paginate1 = require('ghost-paginator')
var paginate = require('handlebars-paginate');
const { urlBase, backendUrl, demoUrl } = require('../config/game')

function isCurrentUrl( url, options ){
  let currentUrl =  options.data.koa.request.path

  if ( url == currentUrl ) {
      return options.fn(this);
  }
  return options.inverse(this);
}
function ifDevice( device, options ){
  console.debug( "isMobile= we are here")
  let userAgent =  options.data.koa.userAgent
  if (device== 'mobile'){
    if (  userAgent.isMobile == true ) {
        return options.fn(this);
    }
  }
  if (device== 'desktop'){
    if (  userAgent.isDesktop == true ) {
        return options.fn(this);
    }
  }
  if (device== 'nomobile'){
    if (  userAgent.isMobile == false ) {
        return options.fn(this);
    }
  }
  return options.inverse(this);

}
 
function postUrl(post, options) {
  // /{{post.date|get-year}}/{{post.date|get-month}}/{{post.slug}}
  return new Handlebars.SafeString(`/posts/detail/${post.id}`);
}
function caseUrl(doc, options) {
  return (`/case/detail/${doc.id}`);
}
function caseByTermUrl(doc, options) {
  return doc.id ? `/case/category/${doc.id}` : '/case'
}
function pageUrl( page, options) {
  let url =  options.data.koa.request.path
  return (`${url}?page=${page}`);
}
function postCoverUrl( post ){
  let images = post.Covers
  return images.length > 0  ? images[0].previewUrl : ''
}

function gameRoundSlideUrl( round ){
  let images = round.Slides
  return images.length > 0  ? images[0].previewUrl : ''
}
// 用在background:url() 中
function albumPhotoUrl( album ){
  let images = album.Photos
  return images.length > 0  ? images[0].previewUrl : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCBAMAAAB4LQ3OAAAAElBMV…EKQrzPiFRWYGjjD35lMWowdH+iMIDhKbsrgqUKhcKt8w6XuLks4SGmbAAAAABJRU5ErkJggg=='
}

function gamePreviewUrl( round ){
  return `${urlBase}/${round.code}.html?number=${round.number}&preview=yes`
}
function gameBackendUrl(  ){
  return `${backendUrl}`
}
function gameDemoUrl(  ){
  return `${demoUrl}`
}

function toJSON(obj) {    return JSON.stringify(obj, null, 3); }

function pageTitle( options ){
  let title=''
  let post = this.post
  let gameRound = this.gameRound
  let currentTerm = this.currentTerm
  if( post ){
    title +=  post.title + ' - '
  }
  if( gameRound ){
    title +=  gameRound.name + ' - '
  }
  if( currentTerm && currentTerm.name ){
    title +=  currentTerm.name + ' - '
  }
  return `${title}${options.data.site.name}-大连软山网络有限公司`
}
function serverTime() {    return new Date().getTime(); }

function formatDatetime( date ){
  return date.toLocaleString()
}

// 如果数字较大，大于1万，如： 100001 格式化为  10万+
// 如果数字小于1万，如： 9001 保持原  9001
function formatNumber( number ){
  if( number >10000){
    `${ Math.floor(number/100)/100} 万`
  }else{
    `${ number} `
  }
}

function bodyCssClass( options ){
  console.debug( "options=", options.data.view)
  let userAgent =  options.data.koa.userAgent
  let css = ''
  if( userAgent.isMobile ){
    css+= 'mobile '
  }
  if( userAgent.isDesktop ){
    css+= 'desktop '
  }
  if( options.data.view=='index' ){
    css+='page-template-pagebuilder tg-site-layout--stretched'
  }else if ( this.currentPage.type=='news' ){
    //
  }else{
    css+= 'tg-site-layout--no-sidebar'
  }
  return css
}



module.exports = {
  toJSON, serverTime,formatDatetime, formatNumber,
  pageTitle,
  isCurrentUrl, ifDevice,
  gameDemoUrl, gameBackendUrl,
  postUrl,  caseUrl, pageUrl, caseByTermUrl,
  postCoverUrl,
  bodyCssClass,
  gameRoundSlideUrl,
  gamePreviewUrl,
  albumPhotoUrl,
  paginate }
