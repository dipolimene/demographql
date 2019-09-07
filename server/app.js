//require express dependencies
const express = require('express');

//require express-graphql dependencies
const graphqlHTTP = require('express-graphql');

//exporting schema
const schema = require('./schema/schema');

//require mongoose for connection to database purpose
const mongoose = require('mongoose');

//setup express app
const app = express();

//connect to mlab database
mongoose.connect('mongodb+srv://demographql:passme123@cluster0-gitnq.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open'.()=>{
  console.log('connected to database');
})

//middleware
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

//allow app to listen on a specific port and use a call back back function to report a message
app.listen(4000, () =>{
  console.log('now listen for requests on port 4000')
});
