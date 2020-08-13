import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  ApolloLink,
  NormalizedCacheObject,
} from "@apollo/client";

import { BrowserRouter } from "react-router-dom";

import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { IS_LOGGED_IN } from "./graphAPIs/index";

const server: string = "http://localhost:5000";

const wsServer: string = "ws://localhost:5000/graphql";

const wsLink = new WebSocketLink({
  uri: wsServer,
  options: {
    reconnect: true,
  },
});
const cache = new InMemoryCache();

const httpLink = new HttpLink({ uri: server });

const asyncAuthLink = setContext((_, { headers, ...context }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    ...context,
  };
}); // headers set for request

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );

      if (message === "Not authenticated!") {
        cache.writeQuery({
          query: IS_LOGGED_IN,
          data: {
            isLoggedIn: false,
          },
        });
      }
      return null;
    });
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  ApolloLink.from([errorLink, asyncAuthLink, httpLink]),
);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: splitLink,
  cache,
});

console.log(cache);

cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
});

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById("root"),
);
