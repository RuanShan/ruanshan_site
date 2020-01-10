let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')
const { buildAssociations } = require( './common/associations' )

let basename = path.basename(__filename);
let config = require('../config/db.js');


let db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

//遍历 schema/game 目录
var walk = function(dir) {
  var results = []
  var list = fs.readdirSync(dir)
  list.forEach(function(file) {
    file = dir + '/' + file
    var stat = fs.statSync(file)
    if (stat && stat.isDirectory()) results = results.concat(walk(file))
    else results.push(file)
  })
  return results
}


// fs
//   .readdirSync(__dirname)
//   .filter((file) => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach((file) => {
//     let model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

let modelfiles = [ ...walk(__dirname + '/shared'), ...walk(__dirname + '/game') ]

modelfiles.forEach((file) => {
  let model = sequelize.import(file)
  db[model.name] = model;
});


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//==============================================================================
// build association
//==============================================================================
buildAssociations( db )

//==============================================================================
// add pagination
//==============================================================================
//https://www.npmjs.com/package/sequelize-paginate

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
