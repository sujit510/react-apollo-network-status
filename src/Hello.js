import React from "react";
import { useApolloNetworkStatus } from 'react-apollo-network-status';

// export default ({ name }) => <h1>Hello {name}!</h1>;

export class Hello extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello {this.props.name}!</h1>
        <button onClick={this.clickHandler}>Click Me</button>
        <Loader></Loader>
      </div>
    );
  }

  clickHandler = async () => {
    const res = await this.props.apolloClient.query({
      query: this.props.query
    });
    console.log("res>>%j", res);
  };
}

function Loader () {
  const status = useApolloNetworkStatus();
  console.log('status>>%j', status);

  if (status.numPendingQueries > 0) {
    return <p>Loading …</p>;
  } else {
    return null;
  }
}
