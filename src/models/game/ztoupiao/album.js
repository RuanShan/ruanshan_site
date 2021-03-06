module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op

  const model = sequelize.define('ZTouPiaoAlbum', {
    game_player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    game_round_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0',
      unique:"uk_game_albums_round_position"
    },
    position: {
      type: DataTypes.INTEGER,
      unique:"uk_game_albums_round_position"
    },
    type: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: ''
    },
    name: DataTypes.STRING(128),
    desc: DataTypes.STRING(128),
    image_file_name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: ''
    },
    image_content_type: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: ''
    },
    image_file_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    score: {// 作品投票数量总和
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    image_updated_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'game_albums',
    hooks:{
      beforeCreate: async function(instance){
        // handle position
        let Model = this
        let c = await Model.count( {where:{ game_round_id: instance.game_round_id }})
        instance.position = c + 1
        //console.debug( "beforeCreate c = ", c,"instance=",instance,  "Model=", Model )
      }
    }
  })
  bindMethods(model, Op)


  return model

}

function bindMethods(model, Op) {
  // 取得当前排名
  model.prototype.getRank = async function () {

    let gtcount = await model.count({
      where: {
        game_round_id: this.game_round_id,
        score: {
          [Op.gt]: this.score
        }
      }
    })
    //成绩相同，但是先玩的
    let eqcount = await model.count({
      where: {
        game_round_id: this.game_round_id,
        score: this.score,
        created_at: {
          [Op.lt]: this.created_at
        },
        id: {
          [Op.ne]: this.id
        }
      }
    })
    return (gtcount + eqcount + 1)
  }

}
