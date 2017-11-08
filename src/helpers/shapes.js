import React from 'react';

var Shapes = {
  parseShape: shape => {
    return Shapes.shapesDictionary[shape]
      ? Shapes.shapesDictionary[shape]
      : Shapes.shapesDictionary['default'];
  },
  parseShapeMargin: shape => {
    return Shapes.shapeMargins[shape]
      ? Shapes.shapeMargins[shape]
      : Shapes.shapeMargins['default'];
  },
  shapesDictionary: {
    default: 'hexagon',
    rectangle: 'rectangle',
    square: 'square',
    round: 'circle',
    semicircle: 'circle',
    'inside the church': 'inside',
    'central building': 'inside',
    polygon: 'polygon',
    cross: 'cross',
    trefoil: 'trefoil',
    quatrefoil: 'quatrefoil',
    trapezoid: 'trapezoid',
    hexagon: 'hexagon',
    octogon: 'octogon'
  },
  shapeMargins: {
    default: 2
  },
  parsePoints: points => {
    return points
      .map(point => {
        return point[0] + ',' + point[1];
      })
      .join(' ');
  },
  do: (shape, s, style) => {
    const parsedShape = Shapes.parseShape(shape);
    const parsedMargin = Shapes.parseShapeMargin(shape);

    return (
      <svg width={s} height={s}>
        {Shapes[parsedShape](parsedMargin, s, style)}
      </svg>
    );
  },
  hexagon: (d, s, style) => {
    const a = s - d * 2;
    const points = [
      [s - d, d + a / 2],
      [d + a * 0.75, d + a],
      [d + a * 0.25, d + a],
      [d, d + a / 2],
      [d + a * 0.25, d],
      [d + a * 0.75, d]
    ];

    return (
      <polygon
        {...Object.assign({}, style, {
          points: Shapes.parsePoints(points)
        })}
      />
    );
  },
  octogon: (d, s, style) => {
    const points = [[s / 2, d], [s - d, s - d], [d, s - d]];

    return (
      <polygon
        {...Object.assign({}, style, {
          points: Shapes.parsePoints(points)
        })}
      />
    );
  },
  trapezoid: (d, s, style) => {
    const points = [[s / 2, d], [s - d, s - d], [d, s - d]];

    return (
      <polygon
        {...Object.assign({}, style, {
          points: Shapes.parsePoints(points)
        })}
      />
    );
  },
  trefoil: (d, s, style) => {
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
  quatrefoil: (d, s, style) => {
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
  cross: (d, s, style) => {
    const points = [[s / 2, d], [s - d, s - d], [d, s - d]];

    return (
      <polygon
        {...Object.assign({}, style, {
          points: Shapes.parsePoints(points)
        })}
      />
    );
  },
  inside: (d, s, style) => {
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
  polygon: (d, s, style) => {
    const points = [[s / 2, d], [s - d, s - d], [d, s - d]];

    return (
      <polygon
        {...Object.assign({}, style, {
          points: Shapes.parsePoints(points)
        })}
      />
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
    const points = [[s / 2, d], [s - d, s - d], [d, s - d]];

    return (
      <polygon
        {...Object.assign({}, style, {
          points: Shapes.parsePoints(points)
        })}
      />
    );
  },
  rectangle: (d, s, style) => {
    const s1 = s + 2;
    const s2 = s - 2;
    const points = [[d, d], [s1 - d, d], [s1 - d, s2 - d], [d, s2 - d]];

    return (
      <polygon
        {...Object.assign({}, style, {
          points: Shapes.parsePoints(points)
        })}
      />
    );
  },
  square: (d, s, style) => {
    const points = [[d, d], [s - d, d], [s - d, s - d], [d, s - d]];

    return (
      <polygon
        {...Object.assign({}, style, {
          points: Shapes.parsePoints(points)
        })}
      />
    );
  },
  star: (d, s, style) => {
    const s1 = (s - 2 * d) / 8;

    const points = [
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

    return (
      <polygon
        {...Object.assign({}, style, {
          points: Shapes.parsePoints(points)
        })}
      />
    );
  }
};

module.exports = Shapes;
