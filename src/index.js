import React from "react";
import { render } from "react-dom";
import { Hello } from "./Hello";
import {
  ApolloClient,
  ApolloProvider,
  graphql,
  gql,
  createNetworkInterface
} from "react-apollo";

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

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "https://countries.trevorblades.com/"
  })
});

const Provider = () => {
  // const res = apolloClient.query({ query })
  // console.log('res>>%j', res)
  return (
    <ApolloProvider client={apolloClient}>
      <App apolloClient={apolloClient} />
    </ApolloProvider>
  );
};

const App = props => {
  return (
    <div style={styles}>
      <Hello name="CodeSandbox" apolloClient={apolloClient} query={query} />

      <h2>Start editing to see some magic happen {"\u2728"}</h2>
    </div>
  );
};

render(<Provider />, document.getElementById("root"));
