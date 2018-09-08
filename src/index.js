import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";
import { withClientState } from "apollo-link-state";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import "./styles.css";
import App from "./components/App";
import { resolvers, defaults } from "./resolvers";

const cache = new InMemoryCache();

const typeDefs = `
 type Todo {
   id: Int!
   text: String!
   completed: Boolean!
 }
 type Query {
   todos: [Todo]
 }
 type Mutation {
   addTodo : Todo
 }
`;
const client = new ApolloClient({
  cache,
  link: withClientState({ resolvers, typeDefs, defaults, cache })
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
