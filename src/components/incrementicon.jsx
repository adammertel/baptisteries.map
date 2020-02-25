import React from "react";

class IncrementIcon extends React.Component {
  render() {
    return (
      <span className="icon" onClick={this.props.handleClick}>
        <i className={"fa time-increment-button fa-" + this.props.icon} />
      </span>
    );
  }
}

export default IncrementIcon;
