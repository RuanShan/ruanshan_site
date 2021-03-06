

module.exports = (sequelize, DataTypes) => {
    const Op = sequelize.Op

    const model = sequelize.define('game_players', {
        openid: {type:DataTypes.STRING, allowNull: false, defaultValue: ''  },//
        game_round_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
        nickname: DataTypes.STRING(128),
        rank: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
        score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
        avatar: { type: DataTypes.STRING(300), allowNull: false, defaultValue: '' },
        cellphone: { type: DataTypes.STRING(64), allowNull: false, defaultValue: '' },
        realname: { type: DataTypes.STRING(64), allowNull: false, defaultValue: '' },
        token: { type: DataTypes.STRING(64), allowNull: false, defaultValue: '' },
    }, {createdAt: 'created_at', updatedAt:'updated_at',

    })

    return model

}
