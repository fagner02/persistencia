import React, { Component } from "react";

export default class ZipIcon extends Component {
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
        style={this.state.style}
        id={this.state.id}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={this.state.color}
        strokeWidth={2}
        fill="none">
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
        <path d="M16 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
        <path d="M12 15v6" />
        <path d="M5 15h3l-3 6h3" />
      </svg>
    );
  }
}