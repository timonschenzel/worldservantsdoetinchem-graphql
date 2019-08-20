const axios = require('axios');
const cheerio = require('cheerio');

let {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
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

Person = new GraphQLObjectType({
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
      }
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
          let data = await axios.get('https://www.worldservants.nl/actieplatform_ajax/group_members/2020-55');
          let rawHtml = data.data;
          let $ = cheerio.load(rawHtml);
          let persons = [];
          
          $('div.actieplatform-top-ten-container').each(function (index, element) {
            persons.push({
              name: $(this).find('div.high-title > h3.white').first().text(),
              photo: $(this).find('img').first().data('src'),
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
      }
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
});

module.exports = Schema;
