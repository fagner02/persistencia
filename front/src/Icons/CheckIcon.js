import React, { Component } from "react";

export default class CheckhIcon extends Component {
  constructor(/**@type {any}*/ props) {
    super(props);
    this.state = {
      size: props.size,
      color: props.color,
      stroke: props.stroke,
      id: props.id,
      style: props.style,
    };
  }

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.state.size}
        height={this.state.size}
        focusable="false"
        viewBox="0 0 12 12"
        style={this.state.style}
        id={this.state.id}>
        <path
          stroke={this.state.stroke}
          strokeLinecap="round"
          strokeWidth="2"
          d="M3.5 8.5l5-5m0 5l-5-5"
        />
      </svg>
    );
  }
}
