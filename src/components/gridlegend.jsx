import React from "react";

class GridLegend extends React.Component {
  render() {
    const legendColors = window.gridCellColors.slice();
    legendColors.push(["black"]);
    const w = 600;
    const h = 200;
    const rh = 20;
    const rd = 5;
    const d = 20;
    const rw = (w - 2 * d - 200) / legendColors.length - rd;

    const ageLabelY = 20;
    const cellY = 40;
    const ageTextY = 80;
    const sizeTextY = 130;
    const sizeCircleY = 160;

    const textStyle = {
      fill: "black"
    };

    const sizeCircles = Array(6)
      .fill()
      .map((_, i) => i * 2);

    const circleStyle = {
      fill: "black"
    };

    const cw = (w / 3 - 2 * d) / sizeCircles.length - rd;

    return (
      <div className="time-legend-wrapper">
        <svg width={w} height={h} style={{ fill: "white" }}>
          <rect x="0" y="0" width={w} height={h} style={{ fill: "white" }} />
          <text x="10" y={ageLabelY} style={textStyle}>
            Median year of the aggregated buildings
          </text>
          <g>
            {legendColors.map((col, ci) => {
              const x =
                ci !== legendColors.length - 1 ? d + ci * (rw + rd) : 400;
              const style = {
                fill: col,
                stroke: "black",
                fillOpacity: 0.6,
                strokeOpacity: 1
              };
              return (
                <rect
                  style={style}
                  key={ci}
                  x={x}
                  y={cellY}
                  height={rh}
                  width={rw}
                />
              );
            })}
            <text x={20} y={ageTextY} style={textStyle}>
              240
            </text>
            <text x={w - 290} y={ageTextY} style={textStyle}>
              1200
            </text>
            <text x={w - 225} y={ageTextY} style={textStyle}>
              unknown
            </text>
          </g>
          <g>
            <text x="10" y={sizeTextY} style={textStyle}>
              Number of aggregated points
            </text>
            <text x="15" y={sizeTextY + 50} style={textStyle}>
              few
            </text>
            <text
              x={10 + cw * sizeCircles.length}
              y={sizeTextY + 50}
              style={textStyle}
            >
              more
            </text>
            {sizeCircles.map((cRadius, ci) => {
              const x = d + ci * cw;
              return (
                <circle
                  key={ci}
                  r={cRadius}
                  cx={x}
                  cy={sizeCircleY}
                  style={circleStyle}
                />
              );
            })}
          </g>
        </svg>
      </div>
    );
  }
}

export default GridLegend;
