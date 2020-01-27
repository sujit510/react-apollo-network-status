import React from "react";
import { render } from "react-dom";
import { Hello } from "./Hello";
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from "react-apollo";

import { InMemoryCache } from 'apollo-cache-inmemory'

import gql from 'graphql-tag'

import { ApolloNetworkStatusProvider } from 'react-apollo-network-status'
import { createHttpLink } from 'apollo-link-http';


const cache = new InMemoryCache({
  dataIdFromObject: object => object.id
})

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const query = gql`
  query Continents {
    continents {
      code
      name
    }
  }
`;

console.log(query);

export const apolloClient = new ApolloClient({
    link: createHttpLink({ uri: "https://countries.trevorblades.com/" }),
    cache
  })

const Provider = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ApolloNetworkStatusProvider client={apolloClient}>
      <App />
      </ApolloNetworkStatusProvider>
    </ApolloProvider>
  );
};

const App = () => {
  return (
    <div style={styles}>
      <Hello name="CodeSandbox" apolloClient={apolloClient} query={query} />
    </div>
  );
};

render(<Provider />, document.getElementById("root"));
