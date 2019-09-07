//making the schema file, define book type, relationship between types and defining root queries
const graphql = require('graphql');

//require lodash
const _= require('lodash');

//describing object types, the graphqlid object type allows the id to be used as an id not string when accessing from the front end
const{GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

//dummy data
var books = [
  {name: 'Name of Wind', genre: 'Fantasy', id: '1', authorId: '1'},
  {name: 'Name of Air', genre: 'Fantasy', id: '2', authorId: '2'},
  {name: 'Name of Land', genre: 'Sci-Fi', id: '3', authorId: '3'},
  {name: 'Name of Ages', genre: 'Fantasy', id: '1', authorId: '2'},
  {name: 'Name of Magic', genre: 'Fantasy', id: '2', authorId: '3'},
  {name: 'Name of Light', genre: 'Sci-Fi', id: '3', authorId: '3'}
];

var authors = [
  {name: 'Oladipupo Olimene', age: '26', id: '1'},
  {name: 'Saheed Folami', age: '27', id: '2'},
  {name: 'Boluwatife Adegbola', age: '28', id: '3'}
];


//define a new object type
//defining booktype object
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    genre:{type:GraphQLString},
    author:{
        type:AuthorType,
        resolve(parent, args){
        return _.find(authors, {id: parent.authorId});
        }
      }
  })
});

//defining authortype object
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    age:{type:GraphQLInt},
    books: {
      type:new GraphQLList(BookType),
      resolve(parent, args){
        return _.filter(books, {authorId:parent.id});
      }
    }
  })
});

//allows to query the object
//allows to query the book object
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
      //query a book
      book: {
      type: BookType,
      args: {id: {type:GraphQLID}},
      resolve(parent, args){
        //code to get data from db / other source
        return _.find(books, {id:args.id});
      }
    },
      //query an author
      author: {
      type: AuthorType,
      args: {id: {type:GraphQLID}},
      resolve(parent, args){
        //code to get data from db / other source
        return _.find(authors, {id:args.id});
      }
    },
      //query all books
      books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
          return books;
      }
    },
      //query all authors
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return authors;
      }
    }

  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
