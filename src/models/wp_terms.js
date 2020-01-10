/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('WpTerm', {
    term_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    },
    slug: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    },
    term_group: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'wp_terms',
    timestamps: false
  });
};
