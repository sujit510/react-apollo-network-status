import React from "react";

// export default ({ name }) => <h1>Hello {name}!</h1>;

export class Hello extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello {this.props.name}!</h1>
        <button onClick={this.clickHandler}>Click Me</button>
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
