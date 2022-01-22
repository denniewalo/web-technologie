const graphql = require('graphql');
const Order = require('./orderModel');
const fs = require('fs');

const { GraphQLObjectType, GraphQLString,
  GraphQLID, GraphQLInt, GraphQLList ,GraphQLSchema } = graphql;

//Schema defines data on the Graph like object types(book type), relation between
//these object types and descibes how it can reach into the graph to interact with
//the data to retrieve or mutate the data

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    _id: { type: GraphQLID  },
    ordersId: {type: GraphQLString},
    customerId: {type: GraphQLString},
    price: {type: GraphQLString},
    status: { type: GraphQLString },
    products: {
      type: new GraphQLList(GraphQLString),
    }
  })
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book
//or get a particular author.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    Order: {
      type: OrderType,
      //argument passed by the user while making the query
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        //Here we define how to get data from database source
        //this will return the book with id passed in argument by the user
        return Order.findById(args._id);
      }
    },
    Orders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return Order.find();
      }
    },
    OrdersCustomerId: {
      type: new GraphQLList(OrderType),
      args: {
        customerId: { type: GraphQLString}
      },
      resolve(parent, args) {
        return Order.find({ customerId: args.customerId });
      }
    },
    OrdersCreatedAfter: {
      type: new GraphQLList(OrderType),
      args: {
        time: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Order.find ({ ordersId: { $gt: args.time } });
      }
    },
    OrdersByStatus: {
      type: new GraphQLList(OrderType),
      args: {
        status: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Order.find ({ status: args.status } );
      }
    }
  }
});

//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
  query: RootQuery
});
