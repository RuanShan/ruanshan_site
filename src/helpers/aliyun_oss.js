const config = require('../config/aliyun')
const path  = require('path')
const OSS = require('ali-oss')
//const moment = require('moment')
const client = new OSS({
  endpoint: config.ossEndpoint,
  accessKeyId: config.ossId,
  accessKeySecret: config.ossSecret,
  bucket:  config.ossBucket
})
// Headers for Direct Upload
// https://help.aliyun.com/document_detail/31951.html
// headers["Date"] is required use x-oss-date instead
function headersForDirectUpload(key, content_type, checksum){
  let date = (new Date()).toUTCString()
  return {
    "Content-Type": content_type,
    "Content-MD5": checksum,
    "Authorization": authorization(key, content_type, checksum, date),
    "x-oss-date": date
  }

}

// # You must setup CORS on OSS control panel to allow JavaScript request from your site domain.
// # https://www.alibabacloud.com/help/zh/doc-detail/31988.htm
// # https://help.aliyun.com/document_detail/31925.html
// # Source: *.your.host.com
// # Allowed Methods: POST, PUT, HEAD
// # Allowed Headers: *
function urlForDirectUpload(key, expires_in, content_type, content_length, checksum){
  let generated_url = client.generateObjectUrl(pathFor(key))
  return generated_url
}

// key: photo.okey
function getObjectUrl(key, params = {}){
  let filekey = pathFor(key)
  // 配置自定义域名，微信分享缩略图要求相同域名
  let url = client.generateObjectUrl( filekey, config.ossUrlBase )
  // let query = {}.merge( params )
  // return [url, query.to_query].join('?')
  return url
}

function getImageUrlForStyle(key, style) {
  let url = getObjectUrl( key )
  style = style || 'w600'
  return `${url}?x-oss-process=style/${style}`
}


function authorization(key, content_type, checksum, date){
  let bucketName =  config.ossBucket
  let filename = `/${bucketName}/${pathFor(key)}`
  let addition_headers = `x-oss-date:${date}`
  let sign = ["PUT", checksum, content_type, date, addition_headers, filename].join("\n")
  let signature = client.signature(sign)
  return "OSS " + config.ossId + ":" + signature

}

function endpoint(){
  return config.ossEndpoint
}


function pathFor(key){
  let rootPath = config.ossPath
  let fullPath = key
  if( rootPath==null || rootPath == "/"){
    fullPath = key
  } else{
    fullPath = rootPath + '/' + key
  }
  fullPath.replace(/^\//, "").replace(/[\/]+/, "/")
  return fullPath
}

module.exports={
  client,
  urlForDirectUpload,
  headersForDirectUpload,
  getObjectUrl,
  pathFor,
  getImageUrlForStyle
}
