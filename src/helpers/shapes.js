import React from 'react';

var Shapes = {
  colors: [
    '#e41a1c',
    '#377eb8',
    '#4daf4a',
    '#984ea3',
    '#ff7f00',
    '#ffff33',
    '#a65628',
    '#f781bf',
    '#999999',
    'black'
  ],
  shapesDictionary: [
    {
      label: 'rectangle',
      values: ['rectangle'],
      icon: '&#9646;',
      color: 0
    },
    {
      label: 'square',
      values: ['square'],
      icon: '&#9632;',
      color: 1
    },
    {
      label: 'circle',
      values: ['round', 'circle', 'semicircle'],
      icon: '&#9679;',
      color: 2
    },
    {
      label: 'central building',
      values: ['central building'],
      icon: '&#9711;',
      color: 3
    },
    {
      label: 'inside the church',
      values: ['inside the church'],
      icon: '&#10752;',
      color: 4
    },
    {
      label: 'cross',
      values: ['cross'],
      icon: '&#10010;',
      color: 5
    },
    {
      label: 'foil',
      values: ['trefoil', 'quatrefoil', 'octofoil'],
      icon: '&#9827;',
      color: 6
    },
    {
      label: 'polygon',
      values: ['triangle', 'hexagon', 'octogon', 'dodekagon', 'dekagon'],
      icon: '&#11039;',
      color: 7
    },
    {
      label: 'other',
      values: ['trapezoid', 'irregular', 'other', 'polygon'],
      icon: '&#9676;',
      color: 9
    },
    {
      label: 'unknown',
      values: ['', 'unknown'],
      icon: '&#10067;',
      color: 8
    }
  ],
  defaultShape: () => {
    return Shapes.getShape('other');
  },
  getIcon: shape => {
    return Shapes.getShape(shape) ? Shapes.getShape(shape).icon : false;
  },
  getShape: (shapeValue, label = false) => {
    const shape = Shapes.shapesDictionary.find(s => {
      return label ? s.label === shapeValue : s.values.includes(shapeValue);
    });
    return shape ? shape : Shapes.defaultShape();
  },
  getLabel: shapeValue => {
    const shape = Shapes.getShape(shapeValue);
    return shape ? shape.label : false;
  },
  getColor: (shapeValue, label = false) => {
    const shape = Shapes.getShape(shapeValue, label);
    return shape ? Shapes.colors[shape.color] : false;
  },
  getIndex: (shapeValue, label = false) => {
    const shape = Shapes.getShape(shapeValue, label);
    return Shapes.shapesDictionary.indexOf(shape);
  },
  sortByIndex: (a, b) => {
    const idA = Shapes.getIndex(a.label, true);
    const idB = Shapes.getIndex(b.label, true);
    return idA > idB ? 1 : -1;
  }
};

module.exports = Shapes;
