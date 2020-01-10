export function buildAssociations(db) {
  let SharedTermRelationship = db.SharedTermRelationship
  let SharedPhotoRelationship = db.SharedPhotoRelationship
  let SharedTerm = db.SharedTerm
  let SharedPhoto = db.SharedPhoto

  buildSharedAssociations(db)

  let models = Object.values(db)
  models.forEach((model) => {
      let rex = /([\w]+)GameRound$/
      let matches = rex.exec(model.name)
      if (Array.isArray(matches)) {
        // 为每个游戏添加关系
        let code = matches[1]

        let playerModel = models.find((m) => m.name == (code + "GamePlayer"))
        let resultModel = models.find((m) => m.name == (code + "GameResult"))
        let albumModel = models.find((m) => m.name == (code + "Album"))
        let dayModel = models.find((m) => m.name == (code + "GameDay"))


        // 投票类游戏 有Album
        if (albumModel && playerModel && resultModel && dayModel) {
          console.log("buildGameAssociations " + code + "Album," + code + "GamePlayers")
          // album and player
          albumModel.belongsTo(playerModel, {
            foreignKey: 'game_player_id',
            as: 'GamePlayer'
          })
          // 作品有多个投票
          albumModel.hasMany(resultModel, {
            foreignKey: 'to_game_player_id',
            as: 'GameResults'
          })
          // 玩家有多个作品
          playerModel.hasMany(albumModel, {
            foreignKey: 'game_player_id',
            as: 'Albums'
          })
          // 玩家有多个GameDay
          playerModel.hasMany(dayModel, {
            foreignKey: 'game_player_id',
            as: 'GameDays'
          })
          // album and photo
          SharedPhoto.belongsTo(albumModel, {
            foreignKey: 'album_id',
            // Should on update and on delete constraints be enabled on the foreign key.
            // we should move album to viewable_id, viewable_type album
            constraints: false,
            as: 'Album'
          })
          albumModel.hasMany(SharedPhoto, {
            foreignKey: 'album_id',
            constraints: false,
            as: 'Photos'
          })

          // round and slide
          model.belongsToMany(SharedPhoto, {
            through: {
              model: SharedPhotoRelationship,
              scope: {
                viewable_type: 'slide'
              }
            },
            constraints: false,
            foreignKey: 'viewable_id',
            otherKey: 'photo_id',
            as: 'Slides'
          })

          //  支持查找分配了x分类的游戏
          //  findAll( { include:[{association:'TermRelationships', where:{ taxon_id: xxx } }]})
          model.hasMany(SharedTermRelationship, {
            foreignKey: 'viewable_id',
            scope: {
              viewable_type: 'round'
            },
            as: 'TermRelationships'
          });
          // round and term 游戏属于多个分类
          model.belongsToMany(SharedTerm, {
            through: {
              model: SharedTermRelationship,
              scope: {
                viewable_type: 'round'
              }
            },
            foreignKey: 'viewable_id',
            otherKey: 'term_id',
            as: 'Terms'
          })

        }
      }
    })

  }

  // copy to zgame_site
  export function buildSharedAssociations(db) {
    // 为公共模型添加关系
    let SharedPost = db.SharedPost
    let SharedPhoto = db.SharedPhoto
    let SharedTerm = db.SharedTerm
    let SharedPhotoRelationship = db.SharedPhotoRelationship
    let SharedTermRelationship = db.SharedTermRelationship

    SharedPost.belongsToMany(SharedPhoto, {
      through: {
        model: SharedPhotoRelationship,
        scope: {
          viewable_type: 'cover'
        }
      },
      constraints: false,
      foreignKey: 'viewable_id',
      otherKey: 'photo_id',
      as: 'Covers'
    })

    SharedPost.belongsToMany(SharedTerm, {
      through: {
        model: SharedTermRelationship,
        scope: {
          viewable_type: 'post'
        }
      },
      foreignKey: 'viewable_id',
      otherKey: 'term_id',
      as: 'Terms'
    })

    //  支持查找分配了几个分类的文章
    //  findAll( { include:[{association:'TermRelationships', where:{ taxon_id: xxx } }]})
    SharedPost.hasMany(SharedTermRelationship, {
      foreignKey: 'viewable_id',
      scope: {
        viewable_type: 'post'
      },
      as: 'TermRelationships'
    });
  }
