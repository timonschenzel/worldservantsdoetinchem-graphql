const axios = require('axios');
const cheerio = require('cheerio');

let {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
  GraphQLDate,
  GraphQLNonNull
} = require('graphql');

// import {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLInt,
//   GraphQLSchema,
//   GraphQLList,
//   GraphQLNonNull
// } from 'graphql';

const Db = require('./db');

const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'Retrieve a person',
  fields() {
    return {
      name: {
        type: GraphQLString,
        resolve (person) {
          return person.name;
        }
      },
      photo: {
        type: GraphQLString,
        resolve (person) {
          return person.photo;
        }
      },
      sponsorUrl: {
        type: GraphQLString,
        resolve (person) {
          return person.sponsorUrl;
        }
      },
      sponsorText: {
        type: GraphQLString,
        resolve (person) {
          return person.sponsorText;
        }
      },
    }
  }
});

const Page = new GraphQLObjectType({
  name: 'Page',
  description: 'Retrieve a page',
  fields () {
    return {
      page_id: {
        type: GraphQLString,
        resolve (page) {
          return page.page_id;
        }
      },
      sub_id: {
        type: GraphQLString,
        resolve (page) {
          return page.sub_id;
        }
      },
      level: {
        type: GraphQLString,
        resolve (page) {
          return page.level;
        }
      },
      hide: {
        type: GraphQLString,
        resolve (page) {
          return page.hide;
        }
      },
      position: {
        type: GraphQLString,
        resolve (page) {
          return page.position;
        }
      },
      languages: {
        type: new GraphQLList(PageLanguage),
        resolve (page) {
          return page.getLanguages();
        }
      }
    };
  }
});

const PageLanguage = new GraphQLObjectType({
  name: 'PageLanguage',
  description: 'Retrieve a page within a specific language',
  fields: () => {
    return {
      page_language_id: {
        type: GraphQLString,
        resolve (pageLanguage) {
          return pageLanguage.page_language_id;
        }
      },
      page_id: {
        type: GraphQLString,
        resolve (pageLanguage) {
          return pageLanguage.page_id;
        }
      },
      language_id: {
        type: GraphQLString,
        resolve (pageLanguage) {
          return pageLanguage.language_id;
        }
      },
      menu_name: {
        type: GraphQLString,
        resolve (pageLanguage) {
          return pageLanguage.menu_name;
        }
      },
      title: {
        type: GraphQLString,
        resolve (pageLanguage) {
          return pageLanguage.title;
        }
      },
      metatags: {
        type: GraphQLString,
        resolve (pageLanguage) {
          return pageLanguage.metatags;
        }
      },
      content: {
        type: GraphQLString,
        resolve (pageLanguage) {
          return pageLanguage.content;
        }
      },
      uri: {
        type: GraphQLString,
        resolve (pageLanguage) {
          return pageLanguage.uri;
        }
      },
      page: {
        type: Page,
        resolve (pageLanguage) {
          return pageLanguage.getPage();
        }
      }
    };
  }
});

const Case = new GraphQLObjectType({
  name: 'Case',
  description: 'Retrieve a case',
  fields () {
    return {
      case_id: {
        type: GraphQLString,
        resolve (caseItem) {
          return caseItem.case_id;
        }
      },
      yield: {
        type: GraphQLString,
        resolve (caseItem) {
          return caseItem.yield;
        }
      },
      date: {
        type: GraphQLString,
        resolve (caseItem) {
          return caseItem.date;
        }
      },
      end_date: {
        type: GraphQLString,
        resolve (caseItem) {
          return caseItem.end_date;
        }
      },
      location: {
        type: GraphQLString,
        resolve (caseItem) {
          return caseItem.location;
        }
      },
      show_on_website: {
        type: GraphQLString,
        resolve (caseItem) {
          return caseItem.show_on_website;
        }
      },
      pass: {
        type: GraphQLString,
        resolve (caseItem) {
          return caseItem.pass;
        }
      },
      languages: {
        type: new GraphQLList(CaseLanguage),
        resolve (caseItem) {
          return caseItem.getLanguages();
        }
      },
      images: {
        type: new GraphQLList(CaseImage),
        resolve (caseItem) {
          return caseItem.getImages();
        }
      }
    };
  }
});

const CaseLanguage = new GraphQLObjectType({
  name: 'CaseLanguage',
  description: 'Retrieve a case within a specific language',
  fields: () => {
    return {
      case_language_id: {
        type: GraphQLString,
        resolve (caseLanguage) {
          return caseLanguage.cases_language_id;
        }
      },
      case_id: {
        type: GraphQLString,
        resolve (caseLanguage) {
          return caseLanguage.case_id;
        }
      },
      language_id: {
        type: GraphQLString,
        resolve (caseLanguage) {
          return caseLanguage.language_id;
        }
      },
      title: {
        type: GraphQLString,
        resolve (caseLanguage) {
          return caseLanguage.title;
        }
      },
      content: {
        type: GraphQLString,
        resolve (caseLanguage) {
          return caseLanguage.content;
        }
      },
      uri: {
        type: GraphQLString,
        resolve (caseLanguage) {
          return caseLanguage.uri;
        }
      },
      case: {
        type: Case,
        resolve (caseLanguage) {
          return caseLanguage.getCase();
        }
      }
    };
  }
});

const CaseImage = new GraphQLObjectType({
  name: 'CaseImage',
  description: 'Retrieve the images from a specific case',
  fields: () => {
    return {
      case_image_id: {
        type: GraphQLString,
        resolve (caseImage) {
          return caseImage.cases_images_id;
        }
      },
      case_id: {
        type: GraphQLString,
        resolve (caseImage) {
          return caseImage.case_id;
        }
      },
      language_id: {
        type: GraphQLString,
        resolve (caseImage) {
          return caseImage.language_id;
        }
      },
      filename: {
        type: GraphQLString,
        resolve (caseImage) {
          return caseImage.filename;
        }
      },
      position: {
        type: GraphQLString,
        resolve (caseImage) {
          return caseImage.position;
        }
      },
      case: {
        type: Case,
        resolve (caseLanguage) {
          return caseLanguage.getCase();
        }
      }
    };
  }
});

const NewsItem = new GraphQLObjectType({
  name: 'NewsItem',
  description: 'Retrieve a news item',
  fields () {
    return {
      news_id: {
        type: GraphQLString,
        resolve (item) {
          return item.news_id;
        }
      },
      date: {
        type: GraphQLString,
        resolve (item) {
          return item.date;
        }
      },
      create: {
        type: GraphQLString,
        resolve (item) {
          return item.create;
        }
      },
      position: {
        type: GraphQLString,
        resolve (item) {
          return item.position;
        }
      },
      languages: {
        type: new GraphQLList(NewsItemLanguage),
        resolve (item) {
          return item.getLanguages();
        }
      },
      images: {
        type: new GraphQLList(NewsItemImage),
        resolve (item) {
          return item.getImages();
        }
      }
    };
  }
});

const NewsItemLanguage = new GraphQLObjectType({
  name: 'NewsItemLanguage',
  description: 'Retrieve a news item within a specific language',
  fields: () => {
    return {
      news_language_id: {
        type: GraphQLString,
        resolve (item) {
          return item.news_language_id;
        }
      },
      news_id: {
        type: GraphQLString,
        resolve (item) {
          return item.news_id;
        }
      },
      language_id: {
        type: GraphQLString,
        resolve (item) {
          return item.language_id;
        }
      },
      title: {
        type: GraphQLString,
        resolve (item) {
          return item.title;
        }
      },
      message: {
        type: GraphQLString,
        resolve (item) {
          return item.message;
        }
      },
      uri: {
        type: GraphQLString,
        resolve (item) {
          return item.uri;
        }
      },
      newsItem: {
        type: NewsItem,
        resolve (item) {
          return item.getNewsItem();
        }
      }
    };
  }
});

const NewsItemImage = new GraphQLObjectType({
  name: 'NewsItemImage',
  description: 'Retrieve the images from a specific news item',
  fields: () => {
    return {
      news_images_id: {
        type: GraphQLString,
        resolve (item) {
          return item.news_images_id;
        }
      },
      news_id: {
        type: GraphQLString,
        resolve (item) {
          return item.news_id;
        }
      },
      language_id: {
        type: GraphQLString,
        resolve (item) {
          return item.language_id;
        }
      },
      filename: {
        type: GraphQLString,
        resolve (item) {
          return item.filename;
        }
      },
      position: {
        type: GraphQLString,
        resolve (item) {
          return item.position;
        }
      },
      newsItem: {
        type: NewsItem,
        resolve (item) {
          return item.getNewsItem();
        }
      }
    };
  }
});

const Sponsor = new GraphQLObjectType({
  name: 'Sponsor',
  description: 'Retrieve a sponsor',
  fields () {
    return {
      sponsor_id: {
        type: GraphQLString,
        resolve (item) {
          return item.sponsor_id;
        }
      },
      position: {
        type: GraphQLString,
        resolve (item) {
          return item.position;
        }
      },
      languages: {
        type: new GraphQLList(SponsorLanguage),
        resolve (item) {
          return item.getLanguages();
        }
      },
      images: {
        type: new GraphQLList(SponsorImage),
        resolve (item) {
          return item.getImages();
        }
      }
    };
  }
});

const SponsorLanguage = new GraphQLObjectType({
  name: 'SponsorLanguage',
  description: 'Retrieve a sponsor within a specific language',
  fields: () => {
    return {
      sponsors_language_id: {
        type: GraphQLString,
        resolve (item) {
          return item.sponsors_language_id;
        }
      },
      sponsor_id: {
        type: GraphQLString,
        resolve (item) {
          return item.sponsor_id;
        }
      },
      language_id: {
        type: GraphQLString,
        resolve (item) {
          return item.language_id;
        }
      },
      title: {
        type: GraphQLString,
        resolve (item) {
          return item.title;
        }
      },
      website: {
        type: GraphQLString,
        resolve (item) {
          return item.website;
        }
      },
      uri: {
        type: GraphQLString,
        resolve (item) {
          return item.uri;
        }
      },
      sponsor: {
        type: Sponsor,
        resolve (item) {
          return item.getSponsor();
        }
      }
    };
  }
});

const SponsorImage = new GraphQLObjectType({
  name: 'SponsorImage',
  description: 'Retrieve the images from a specific sponsor',
  fields: () => {
    return {
      sponsors_images_id: {
        type: GraphQLString,
        resolve (item) {
          return item.sponsors_images_id;
        }
      },
      sponsor_id: {
        type: GraphQLString,
        resolve (item) {
          return item.sponsor_id;
        }
      },
      language_id: {
        type: GraphQLString,
        resolve (item) {
          return item.language_id;
        }
      },
      filename: {
        type: GraphQLString,
        resolve (item) {
          return item.filename;
        }
      },
      date: {
        type: GraphQLString,
        resolve (item) {
          return item.date;
        }
      },
      position: {
        type: GraphQLString,
        resolve (item) {
          return item.position;
        }
      },
      sponsor: {
        type: Sponsor,
        resolve (item) {
          return item.getSponsor();
        }
      }
    };
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      person: {
        type: new GraphQLList(Person),
        args: {
          name: {
            type: GraphQLString
          },
        },
        async resolve (root, args) {
          let data = await axios.get('https://www.worldservants.nl/actieplatform_ajax/group_members/2021-55');
          let rawHtml = data.data;
          let $ = cheerio.load(rawHtml);
          let persons = [];
          
          $('div.actieplatform-top-ten-container').each(function (index, element) {
            persons.push({
              name: $(this).find('div.high-title > h3.white').first().text(),
              photo: $(this).find('img').first().data('src'),
              sponsorUrl: `https://www.worldservants.nl${$(this).find('div.actieplatform-top-ten-overlay a').attr('href')}`,
              sponsorText: $(this).find('div.actieplatform-top-ten-overlay a').text()
            });
          });

          if (args.name) {
            return persons.filter(person => {
              return person.name == args.name;
            });
          }

          return persons;
        }
      },
      page: {
        type: new GraphQLList(Page),
        args: {
          page_id: {
            type: GraphQLInt
          },
          sub_id: {
            type: GraphQLInt
          },
          level: {
            type: GraphQLInt
          },
          hide: {
            type: GraphQLInt
          },
        },
        resolve (root, args) {
          return Db.models.page.findAll({ where: args, order: [['position', 'asc']]});
        }
      },
      pageLanguage: {
        type: new GraphQLList(PageLanguage),
        args: {
          page_language_id: {
            type: GraphQLInt
          },
          page_id: {
            type: GraphQLInt
          },
          uri: {
            type: GraphQLString
          },
        },
        resolve (root, args) {
          return Db.models.pageLanguage.findAll({ where: args });
        }
      },
      case: {
        type: new GraphQLList(Case),
        args: {
          case_id: {
            type: GraphQLInt
          },
          show_on_website: {
            type: GraphQLBoolean
          },
          pass: {
            type: GraphQLBoolean
          },
        },
        resolve (root, args) {
          return Db.models.case.findAll({ where: args, order: [['case_id', 'desc']]});
        }
      },
      caseLanguage: {
        type: new GraphQLList(CaseLanguage),
        args: {
          case_language_id: {
            type: GraphQLInt
          },
          case_id: {
            type: GraphQLInt
          },
          uri: {
            type: GraphQLString
          },
        },
        resolve (root, args) {
          return Db.models.caseLanguage.findAll({ where: args });
        }
      },
      caseImage: {
        type: new GraphQLList(CaseImage),
        args: {
          case_image_id: {
            type: GraphQLInt
          },
          case_id: {
            type: GraphQLInt
          },
        },
        resolve (root, args) {
          return Db.models.caseImage.findAll({ where: args });
        }
      },
  
      newsItem: {
        type: new GraphQLList(NewsItem),
        args: {
          news_id: {
            type: GraphQLInt
          },
        },
        resolve (root, args) {
          return Db.models.newsItem.findAll({ where: args, order: [['news_id', 'desc']]});
        }
      },
      newsItemLanguage: {
        type: new GraphQLList(NewsItemLanguage),
        args: {
          news_language_id: {
            type: GraphQLInt
          },
          news_id: {
            type: GraphQLInt
          },
          uri: {
            type: GraphQLString
          },
        },
        resolve (root, args) {
          return Db.models.newsItemLanguage.findAll({ where: args });
        }
      },
      newsItemImage: {
        type: new GraphQLList(NewsItemImage),
        args: {
          news_images_id: {
            type: GraphQLInt
          },
          news_id: {
            type: GraphQLInt
          },
        },
        resolve (root, args) {
          return Db.models.newsItemImage.findAll({ where: args });
        }
      },

      sponsor: {
        type: new GraphQLList(Sponsor),
        args: {
          sponsor_id: {
            type: GraphQLInt
          },
        },
        resolve (root, args) {
          return Db.models.sponsor.findAll({ where: args, order: [['sponsor_id', 'asc']]});
        }
      },
      sponsorLanguage: {
        type: new GraphQLList(SponsorLanguage),
        args: {
          sponsors_language_id: {
            type: GraphQLInt
          },
          sponsor_id: {
            type: GraphQLInt
          },
          uri: {
            type: GraphQLString
          },
        },
        resolve (root, args) {
          return Db.models.sponsorLanguage.findAll({ where: args });
        }
      },
      sponsorImage: {
        type: new GraphQLList(SponsorImage),
        args: {
          sponsors_images_id: {
            type: GraphQLInt
          },
          sponsor_id: {
            type: GraphQLInt
          },
        },
        resolve (root, args) {
          return Db.models.sponsorImage.findAll({ where: args });
        }
      },
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
});

module.exports = Schema;
