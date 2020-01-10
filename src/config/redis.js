module.exports = {
  
      port: process.env.MEMDB_PORT || 6379,
      host: process.env.MEMDB_HOST || '127.0.0.1',
      ops:{
          //auth_pass: '123456'
      }

}
