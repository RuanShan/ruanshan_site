const { fields } = require('../../base/game_day_fields')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ZTouPiaoGameDay', fields, {
      createdAt: 'created_at', updatedAt:'updated_at',
      tableName: 'game_days'
    })
}
