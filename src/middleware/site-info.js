'use strict';

// Add the absolute url to the locals object so it is available in templates.
// This is mainly used for the social media sharing links, to provide the
// absolute URL to the page being shared.
module.exports = function siteInfo() {
  return async (ctx, next) => {
      //let res = await contentService.siteInfo()

      ctx.state.site={ name: '星投票', description: '简单专业的投票活动制作平台' }

      await next()
  }
  // contentService.siteInfo().then(function( info ) {
  //   // Add site info as a local
  //   res.locals.site = {
  //     name: info.name,
  //     description: info.description
  //   };
  //   // Continue with the request chain
  // }).then( next.bind( null, null ), next );
};
