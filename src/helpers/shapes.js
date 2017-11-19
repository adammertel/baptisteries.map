import React from 'react';

var Shapes = {
  colors: [
    '#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#33a02c',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#ff7f00',
    '#cab2d6',
    '#6a3d9a'
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
      icon: '&#128932;',
      color: 5
    },
    {
      label: 'foil',
      values: ['trefoil', 'quatrefoil', 'octofoil'],
      icon: '&#9827;',
      color: 6
    },
    {
      label: 'other regular polygons (octogons...)',
      values: ['triangle', 'hexagon', 'octogon', 'dodekagon', 'dekagon'],
      icon: '&#11042;',
      color: 7
    },
    {
      label: 'other',
      values: ['trapezoid', 'irregular', 'other', 'polygon'],
      icon: '&#9676;',
      color: 8
    },
    {
      label: 'unknown',
      values: [''],
      icon: '&#10067;',
      color: 9
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
    console.log(shapeValue);
    return shape ? Shapes.colors[shape.color] : false;
  }
};

module.exports = Shapes;
