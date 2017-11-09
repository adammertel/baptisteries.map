import React from 'react';

var Shapes = {
  shapesDictionary: {
    default: 'circle',
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
  parseShape: shape => {
    return Shapes.shapesDictionary[shape]
      ? Shapes.shapesDictionary[shape]
      : Shapes.shapesDictionary['default'];
  }
};

module.exports = Shapes;
