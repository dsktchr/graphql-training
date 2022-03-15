var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var graphql = require('graphql');

var fakeDatabase = {
    'a': {
        id: 'a',
        name: 'alice'
    },
    'b': {
        id: 'b',
        name: 'bob'
    }
};

var UserType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: graphql.GraphQLString},
        name: {type: graphql.GraphQLString}
    }
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {type: graphql.GraphQLString}
            },
            resolve: (_, {id}) => {
                return fakeDatabase[id];
            }
        }
    }
});

var schema = new graphql.GraphQLSchema({query: queryType});

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(4000);
console.log('Running a GraogQL API server at http://localhost:4000/graphql');