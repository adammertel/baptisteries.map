import React from 'react';

var Shapes = {
  shapesDictionary: [
    {
      label: 'rectangle',
      values: ['rectangle'],
      icon: '&#9646;'
    },
    {
      label: 'square',
      values: ['square'],
      icon: '&#9632;'
    },
    {
      label: 'circle',
      values: ['round', 'circle', 'central building', 'semicircle'],
      icon: '&#9679;'
    },
    {
      label: 'inside the church',
      values: ['inside the church'],
      icon: '&#10752;'
    },
    {
      label: 'cross',
      values: ['cross'],
      icon: '&#128932;'
    },
    {
      label: 'foil',
      values: ['trefoil', 'quatrefoil', 'octofoil'],
      icon: '&#9827;'
    },
    {
      label: 'unknown;',
      values: [''],
      icon: '&#10067;'
    },
    {
      label: 'hexagon',
      values: ['hexagon', 'octogon'],
      icon: '&#11042;'
    },
    {
      label: 'other',
      values: [
        'trapezoid',
        'irregular',
        'polygon',
        'dekagon',
        'dodekagon',
        'octofoil',
        'other'
      ],
      icon: '&#9676;'
    }
  ],
  defaultShape: () => {
    return Shapes.getShape('other');
  },
  getIcon: shape => {
    return Shapes.getShape(shape) ? Shapes.getShape(shape).icon : false;
  },
  getShape: shapeValue => {
    const shape = Shapes.shapesDictionary.find(s => {
      return s.values.includes(shapeValue);
    });
    return shape ? shape : Shapes.defaultShape();
  },
  getLabel: shapeValue => {
    const shape = Shapes.getShape(shapeValue);
    return shape ? shape.label : false;
  }
};

module.exports = Shapes;
