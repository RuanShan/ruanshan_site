'use strict';

require('promise-hash');
var wp = require( '../services/wp' );
var contentService = require( '../services/content-service' );
var pageNumbers = require( '../services/page-numbers' );
var pageTitle = require( '../services/page-title' );

async function getHomepage( ctx, next ) {
  var pages = pageNumbers( ctx.params.page );

  let context = await Promise.hash({
    archiveBase: '',
    pages: pages,
    title: pageTitle(),
    // Primary page content
    posts: wp.posts().page( pages.current ),
    sidebar: contentService.getSidebarContent()
  })
  if ( ctx.params.page && ! context.posts.length ) {
      // Invalid pagination: 404
      return await next();
  }

  await ctx.render( 'index', context );

}

module.exports = getHomepage;
