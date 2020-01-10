module.exports = {

  urlBase: process.env.GAME_URL_BASE || 'https://testwx.natapp4.cc',
  backendUrl: process.env.GAME_BACKEND_URL||'http://127.0.0.1:8081',
  demoUrl:process.env.GAME_DEMO_URL||'http://127.0.0.1:8081',
  termCaseRootId: process.env.TERM_CASE_ROOT_ID|| 0,
  termPostRootId: process.env.TERM_POST_ROOT_ID|| 0

}
