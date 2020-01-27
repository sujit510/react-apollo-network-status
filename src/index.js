import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from 'react-apollo';
import {ApolloNetworkStatusProvider, useApolloNetworkStatus} from 'react-apollo-network-status';
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

function GlobalLoadingIndicator() {
  const status = useApolloNetworkStatus();
  console.log('status>>%j', status);
  if (status.numPendingQueries > 0) {
    return <p>Loading …</p>;
  } else {
    return null;
  }
}

const query = gql`
  query Continents {
    continents {
      code
      name
    }
  }
`;

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: "https://countries.trevorblades.com/" })
});

const clickHandler = async () => {
  const res = await apolloClient.query({
    query: query
  });
  console.log("res>>%j", res);
};

const element = (
  <ApolloProvider client={apolloClient}>
    <ApolloNetworkStatusProvider>
      <GlobalLoadingIndicator />
      <h3>Hello World!!</h3>
      <button onClick={clickHandler}>Click Me</button>
    </ApolloNetworkStatusProvider>
  </ApolloProvider>
);
ReactDOM.render(element, document.getElementById('root'));