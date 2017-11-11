import React from 'react';

var Shapes = {
  shapesDictionary: {
    other: 'circle',
    rectangle: 'rectangle',
    square: 'square',
    round: 'circle',
    semicircle: 'circle',
    'inside the church': 'inside',
    'central building': 'circle',
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
      : Shapes.shapesDictionary['others'];
  }
};

module.exports = Shapes;
