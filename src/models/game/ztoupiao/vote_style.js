module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ZTouPiaoVoteStyle', {
    game_round_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
           args: [['sum', 'times']],
           msg: "Must be sum, times."
         }
      }
    }, //prize name
    sum: {
      type: DataTypes.INTEGER
    },
    day: {
      type: DataTypes.INTEGER
    }, // 统计日期
    times: {
      type: DataTypes.INTEGER
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'vote_style'
  })
}
