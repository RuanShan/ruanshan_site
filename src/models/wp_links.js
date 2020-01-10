/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wp_links', {
    link_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    link_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    link_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    link_image: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    link_target: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: ''
    },
    link_description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    link_visible: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'Y'
    },
    link_owner: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '1'
    },
    link_rating: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    link_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    link_rel: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    link_notes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    link_rss: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'wp_links'
  });
};
