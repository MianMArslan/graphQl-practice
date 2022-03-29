import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
import Event from "./models/events.mjs";
import User from "./models/user.mjs";
const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type Event{
            _id:ID!
            title:String
            description:String
            price:Float
            date:String
        }
         
        type User {
          _id:ID!
          email:String!
          password:String
        }

        type RootQuery{
            events:[Event]
        }    
        input EventInput{
            title:String
            description:String
            price:Float
            date:String
        }
        input UserInput{
          email:String!
          password:String!
        }
        type RootMutation{
            createEvent(eventInput:EventInput):Event
            createUser(userInput:UserInput):User
        }
        schema{
            query:RootQuery
            mutation:RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find()
          .then((result) => {
            console.log(result);
            return result;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      createEvent: (args) => {
        // const eventName = {
        //   _id: Math.random().toString(),
        //   title: args.eventInput.title,
        //   description: args.eventInput.description,
        //   price: args.eventInput.price,
        //   date: args.eventInput.date,
        // };
        let events = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: args.eventInput.price,
          date: new Date(),
        });
        return events
          .save()
          .then((result) => {
            console.log(result);
            return result;
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
      createUser: (args) => {
        let user = new User({
          email: args.userInput.email,
          password: args.userInput.password,
        });
        return user
          .save()
          .then((result) => {
            console.log(result);
            return result;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    graphiql: true,
  })
);
mongoose
  .connect(
    `mongodb+srv://arslan:${process.env.MONGO_PASSWD}@graphql.mgp0w.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8082, console.log("running"));
  })
  .catch((err) => {
    console.error(err);
  });
