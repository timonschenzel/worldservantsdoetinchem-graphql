require('dotenv').config();

const Sequelize = require('sequelize');
const Faker =  require('faker');
const _ = require('lodash');

const Conn = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST
  }
);

const Page = Conn.define('page', {
  page_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sub_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  level: {
    type: Sequelize.INTEGER,
    validate: {
      allowNull: false
    }
  },
  hide: {
    type: Sequelize.BOOLEAN,
    validate: {
      allowNull: false
    }
  },
  position: {
    type: Sequelize.INTEGER,
    validate: {
      allowNull: false
    }
  },
}, {
  timestamps: false,
});

const PageLanguage = Conn.define('pageLanguage', {
  page_language_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  page_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  language_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  menu_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  metatags: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  uri: {
    type: Sequelize.TEXT,
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'pages_language'
});

// Relations
Page.hasMany(PageLanguage, { foreignKey: 'page_id', as: 'languages' });
PageLanguage.belongsTo(Page, { foreignKey: 'page_id', as: 'page' });

module.exports = Conn;
