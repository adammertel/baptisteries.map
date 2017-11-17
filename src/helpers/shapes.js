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
      icon: '\\25A0'
    },
    {
      label: 'circle',
      values: ['round', 'circle', 'central building', 'semicircle'],
      icon: '\\25AE'
    },
    {
      label: 'inside the church',
      values: ['inside the church'],
      icon: '\\25C9'
    },
    {
      label: 'cross',
      values: ['cross'],
      icon: '\\1F7A4'
    },
    {
      label: 'foil',
      values: ['trefoil', 'quatrefoil', 'octofoil'],
      icon: '\\2663'
    },
    {
      label: 'unknown',
      values: [''],
      icon: '\\2663'
    },
    {
      label: 'hexagon',
      values: ['hexagon', 'octogon'],
      icon: '\\2B22'
    },
    {
      label: 'other',
      values: [
        'trapezoid',
        'irregular',
        'polygon',
        'dekagon',
        'dodekagon',
        'octofoil'
      ],
      icon: '\\25AE'
    }
  ],
  getIcon: shape => {
    return Shapes.getShape(shape) ? Shapes.getShape(shape).icon : false;
  },
  getShape: shapeValue => {
    const shape = Shapes.shapesDictionary.find(s => {
      return s.values.includes(shapeValue);
    });
    return shape ? shape : false;
  }
};

module.exports = Shapes;
