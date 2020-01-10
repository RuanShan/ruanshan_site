const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

const fields = {
  game_round_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  },
  game_player_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 玩家（被助力的人）id
  day: {
    // 与所有日期保持一致，utc时间，查找某一天为  一天开始< day < 一天结束 
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }, // 统计日期
  visit_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 每日访问次数
  share_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 每日分享次数
  play_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  }, // 每日玩的次数
  ip: {
    type: DataTypes.STRING,
    limit: 64
  }
}

module.exports = {
  fields
}
