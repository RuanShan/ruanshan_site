/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('WpPost', {
    ID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_author: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    post_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    post_date_gmt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    post_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    post_title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    post_excerpt: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    post_status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'publish'
    },
    comment_status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'open'
    },
    ping_status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'open'
    },
    post_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    post_name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    },
    to_ping: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pinged: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    post_modified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    post_modified_gmt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    post_content_filtered: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    post_parent: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    guid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    menu_order: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    post_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'post'
    },
    post_mime_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    comment_count: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'wp_posts',
    timestamps: false,
    scopes: {
      defaultScope: {
        where: {
          post_status: 'publish'
        }
      },
      isPage: {
        where: {
          post_type: 'page',
          post_status: 'publish'
        }
      }
    }
  });
};
