const { buildSchema } = require('graphql');


module.exports = buildSchema(`
    type TestData {
        text : String!
        views : Int!
    }

    type RootQuery {
        hello : String!
    }

    schema {
        query : RootQuery
    }
`)