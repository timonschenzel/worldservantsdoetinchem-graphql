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

const Case = Conn.define('case', {
  case_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  yield: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  date: {
    type: Sequelize.DATE,
    validate: {
      allowNull: false
    }
  },
  end_date: {
    type: Sequelize.DATE,
    validate: {
      allowNull: false
    }
  },
  location: {
    type: Sequelize.STRING,
    validate: {
      allowNull: false
    }
  },
  show_on_website: {
    type: Sequelize.BOOLEAN,
    validate: {
      allowNull: false
    }
  },
  pass: {
    type: Sequelize.BOOLEAN,
    validate: {
      allowNull: false
    }
  },
}, {
  timestamps: false,
});

const CaseLanguage = Conn.define('caseLanguage', {
  cases_language_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  case_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  language_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
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
  tableName: 'cases_language'
});

const CaseImage = Conn.define('caseImage', {
  cases_images_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  case_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  filename: {
    type: Sequelize.STRING,
    allowNull: false
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'cases_images'
});

// Relations
Case.hasMany(CaseLanguage, { foreignKey: 'case_id', as: 'languages' });
Case.hasMany(CaseImage, { foreignKey: 'case_id', as: 'images' });
CaseLanguage.belongsTo(Case, { foreignKey: 'case_id', as: 'case' });
CaseImage.belongsTo(Case, { foreignKey: 'case_id', as: 'case' });

const NewsItem = Conn.define('newsItem', {
  news_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    validate: {
      allowNull: false
    }
  },
  create: {
    type: Sequelize.DATE,
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
  tableName: 'news'
});

const NewsItemLanguage = Conn.define('newsItemLanguage', {
  news_language_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  news_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  language_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  uri: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'news_language'
});

const NewsItemImage = Conn.define('newsItemImage', {
  news_images_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  news_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  filename: {
    type: Sequelize.STRING,
    allowNull: false
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'news_images'
});

// Relations
NewsItem.hasMany(NewsItemLanguage, { foreignKey: 'news_id', as: 'languages' });
NewsItem.hasMany(NewsItemImage, { foreignKey: 'news_id', as: 'images' });
NewsItemLanguage.belongsTo(NewsItem, { foreignKey: 'news_id', as: 'newsItem' });
NewsItemImage.belongsTo(NewsItem, { foreignKey: 'news_id', as: 'newsItem' });

const Sponsor = Conn.define('sponsor', {
  sponsor_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false
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

const SponsorLanguage = Conn.define('sponsorLanguage', {
  sponsors_language_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sponsor_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  language_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  website: {
    type: Sequelize.STRING,
    allowNull: false
  },
  uri: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'sponsors_language'
});

const SponsorImage = Conn.define('sponsorImage', {
  sponsors_images_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sponsor_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  filename: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'sponsors_images'
});

// Relations
Sponsor.hasMany(SponsorLanguage, { foreignKey: 'sponsor_id', as: 'languages' });
Sponsor.hasMany(SponsorImage, { foreignKey: 'sponsor_id', as: 'images' });
SponsorLanguage.belongsTo(Sponsor, { foreignKey: 'sponsor_id', as: 'sponsor' });
SponsorImage.belongsTo(Sponsor, { foreignKey: 'sponsor_id', as: 'sponsor' });

module.exports = Conn;
