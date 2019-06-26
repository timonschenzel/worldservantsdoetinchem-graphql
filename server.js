require('dotenv').config();

const Express = require('express');
const GraphHTTP = require('express-graphql');
const Schema = require('./schema');

// Start
const app = Express();

// GraphQL
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.listen(process.env.APP_PORT, ()=> {
  console.log(`App listening on port ${process.env.APP_PORT}`);
});
