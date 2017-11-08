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
    default: 'foil',
    rectangle: 'rectangle',
    square: 'square',
    round: 'circle',
    semicircle: 'circle',
    'inside the church': 'inside',
    'central building': 'inside',
    polygon: 'trapezoid',
    cross: 'cross',
    trefoil: 'foil',
    quatrefoil: 'foil',
    octofoil: 'foil',
    trapezoid: 'trapezoid',
    hexagon: 'hexagon',
    octogon: 'trapezoid'
  },
  shapeMargins: {
    default: 1.7,
    rectangle: 1
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
    const v = (s - d * 2) / 3.414;
    const a = 1.414 * v;

    const points = [
      [d + v, d],
      [d + v + a, d],
      [s - d, d + v],
      [s - d, d + v + a],
      [d + v + a, s - d],
      [d + v, s - d],
      [d, d + v + a],
      [d, d + v]
    ];

    return (
      <polygon
        {...Object.assign({}, style, {
          points: Shapes.parsePoints(points)
        })}
      />
    );
  },
  trapezoid: (d, s, style) => {
    const s1 = s;
    const s2 = s - 4;
    const a = s / 5;
    const points = [[d + a, d], [s1 - d - a, d], [s1 - d, s2 - d], [d, s2 - d]];

    return (
      <polygon
        {...Object.assign({}, style, {
          points: Shapes.parsePoints(points)
        })}
      />
    );
  },
  foil: (d, s, style) => {
    const r = (s / 2 - d) / 3;
    const c = s / 2;
    const a = s / 5;
    return (
      <g>
        <circle
          {...Object.assign({}, style, {
            cx: s / 2,
            cy: s / 2,
            r: s / 2 - d
          })}
        />
        <circle
          {...Object.assign({}, style, {
            cx: c,
            cy: c - a,
            r: r
          })}
        />
        <circle
          {...Object.assign({}, style, {
            cx: c + a,
            cy: c + a / 2,
            r: r
          })}
        />
        <circle
          {...Object.assign({}, style, {
            cx: c - a,
            cy: c + a / 2,
            r: r
          })}
        />
      </g>
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
      <g>
        <circle
          {...Object.assign({}, style, {
            cx: s / 2,
            cy: s / 2,
            r: s / 2 - d
          })}
        />
        <circle
          {...Object.assign(
            {},
            { fill: 'black' },
            {
              cx: s / 2,
              cy: s / 2,
              r: s / 8
            }
          )}
        />
      </g>
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
    const s1 = s;
    const s2 = s - 4;
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
