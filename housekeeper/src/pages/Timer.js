import React, { Component } from "react";

export default class timer extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          This is the timer value: {this.props.timestamp}
        </p>
      </div>
    );
  }
}
