import React from 'react';

var Shapes = {
  create: (shape, d, s, style) => {
    return (
      <svg width={s} height={s}>
        {Shapes[shape](d, s, style)}
      </svg>
    );
  },
  circle: (d, s, style) => {
    return (
      <circle
        {...Object.assign({}, style, {
          cx: s / 2,
          cy: s / 2,
          r: s / 2 - d
        })}
      />
    );
  },
  triangle: (d, s, style) => {
    const p1 = [s / 2, d];
    const p2 = [s - d, s - d];
    const p3 = [d, s - d];

    let points = [p1, p2, p3]
      .map(point => {
        return point[0] + ',' + point[1];
      })
      .join(' ');

    return <polygon {...Object.assign({}, style, { points: points })} />;
  },
  square: (d, s, style) => {
    const p1 = [d, d];
    const p2 = [s - d, d];
    const p3 = [s - d, s - d];
    const p4 = [d, s - d];

    let points = [p1, p2, p3, p4]
      .map(point => {
        return point[0] + ',' + point[1];
      })
      .join(' ');

    return <polygon {...Object.assign({}, style, { points: points })} />;
  },
  star: (d, s, style) => {
    const s1 = (s - 2 * d) / 8;

    const pointCoordinates = [
      [s / 2, d],
      [d + 5 * s1, d + 3 * s1],
      [s - d, d + 3 * s1],
      [d + 6 * s1, d + 5 * s1],
      [d + 7 * s1, s - d],
      [s / 2, d + 6 * s1],
      [d + s1, s - d],
      [d + 2 * s1, d + 5 * s1],
      [d, d + 3 * s1],
      [d + 3 * s1, d + 3 * s1]
    ];

    let points = pointCoordinates
      .map(point => {
        return point[0] + ',' + point[1];
      })
      .join(' ');
    return <polygon {...Object.assign({}, style, { points: points })} />;
  }
};

module.exports = Shapes;
