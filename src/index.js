import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import {
  ApolloNetworkStatusProvider,
  useApolloNetworkStatus
} from "react-apollo-network-status";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Query } from "react-apollo";
import {ApolloProvider} from '@apollo/react-common';

import gql from "graphql-tag";

function GlobalLoadingIndicator() {
  const status = useApolloNetworkStatus();

  console.log('status>>%j', status);

  return <p>Global status: {JSON.stringify(status)}</p>;
}

function QueryWithRenderProp() {
  return (
    <Query
      query={gql`
      query Continents {
        continents {
          code
          name
        }
      }
    `}
    >
      {data => {
          console.log('data>>%j', data);
          return 'DONE'
      }}
    </Query>
  );
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: "https://countries.trevorblades.com/" })
});

const element = (
  <ApolloProvider client={client}>
    <ApolloNetworkStatusProvider>
      <GlobalLoadingIndicator />
      <QueryWithRenderProp />
    </ApolloNetworkStatusProvider>
  </ApolloProvider>
);
ReactDOM.render(element, document.getElementById("root"));
