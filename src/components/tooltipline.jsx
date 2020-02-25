import React from "react";

class TooltipLine extends React.Component {
  render() {
    return (
      <p className="line">
        <span className="definition">{this.props.definition}:</span>
        <span className="value">{this.props.value || "unknown"}</span>
      </p>
    );
  }
}

export default TooltipLine;
