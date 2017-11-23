import Base from './../base';
import * as d3 from 'd3';
require('d3-geo');

import Shapes from './../helpers/shapes';

var scales = require('d3-scale-chromatic');
var projections = require('d3-geo-projection');
var d3Hexbin = require('d3-hexbin');

const svgW = 1100;
const svgH = 1050;

const data = [
  { name: 'baptisteries', path: './../data/baptisteries.geojson' },
  { name: 'countries', path: './../data/ne_50m_admin.geojson' }
];

const layers = {};

const projection = projections
  .geoNaturalEarth2()
  .scale(1300)
  .center([18, 32])
  .translate([svgW / 2, svgH / 2]);

const path = d3
  .geoPath()
  .projection(projection)
  .pointRadius(1.5);

const hexbin = d3Hexbin
  .hexbin()
  .size([svgW, svgH])
  .radius(45);

const pie = d3
  .pie()
  .value(d => d.count)
  .sort(null);

window.svg = d3
  .select('body')
  .append('svg')
  .attr('width', svgW)
  .attr('height', svgH);

// loading datasets
let dataFilesLoaded = 0;
data.map(dataFile => {
  Base.getData(dataFile.path, res => {
    window[dataFile.name] = res;
    dataFilesLoaded++;
    if (dataFilesLoaded === data.length) {
      init();
    }
  });
});

const distance = (cs1, cs2) =>
  Math.sqrt(Math.pow(cs1[0] - cs2[0], 2) + Math.pow(cs1[1] - cs2[1], 2));

const createLayer = layerName => {
  layers[layerName] = svg
    .append('g')
    .classed('map-layer', true)
    .classed('layer-' + layerName, true);
};

// create visualisation
const init = () => {
  // getting all shapes
  const allShapes = Shapes.shapesDictionary;
  allShapes.map(s => (s.count = 0));
  baptisteries.features.map(b => {
    const bShape = b.properties.shape;

    const shape = Shapes.getShape(bShape);
    shape.count++;
  });

  // projecting baptisteries
  baptisteries.features.map(r => {
    const c = r.geometry.coordinates;
    c[0] = projection([c[0], c[1]])[0];
    c[1] = projection([c[0], c[1]])[1];
  });

  // creating hexbin and pie helpers
  const bins = hexbin(baptisteries.features.map(f => f.geometry.coordinates));
  const binColors = d3
    .scaleSequential(scales.interpolateYlGn)
    .domain([700, 400]);

  const pieColors = d3.scaleOrdinal().range(scales.schemeSet1);

  createLayer('countries');
  createLayer('bins');

  layers.countries
    .selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('d', path)
    .style('fill', 'lightgrey')
    .style('fill-opacity', 0.4)
    .style('stroke', 'grey')
    .style('stroke-opacity', 0.7);

  // get inside points
  bins.map(b => (b.inside = []));

  baptisteries.features.map(b => {
    const coords = b.geometry.coordinates.slice();
    let nearestDistance = 9999;
    let nearestBin = false;

    bins.map((bin, bi) => {
      const binC = [bin.x, bin.y];
      const dist = distance(coords, binC);
      if (dist < nearestDistance) {
        nearestDistance = dist;
        nearestBin = bi;
      }
    });

    bins.map((bin, bi) => {
      if (bi === nearestBin) {
        bin.inside.push(b);
      }
    });
  });

  bins.filter(bin => bin.inside.length).map(bin => {
    const binG = layers.bins.append('g');

    const dates = bin.inside.map(b => b.properties.date).filter(d => d);
    const avgDate = d3.median(dates);

    const shapes = bin.inside.map(b => b.properties.shape);

    const shapeCounts = {};
    shapes.map(shape => {
      shapeCounts[shape] = shapeCounts[shape] ? shapeCounts[shape] + 1 : 1;
    });

    const shapeDict = [];
    Object.keys(shapeCounts).map(shape => {
      shapeDict.push({ label: shape, count: shapeCounts[shape] });
    });

    // hexes

    binG
      .append('path')
      .attr('transform', 'translate(' + bin.x + ',' + bin.y + ')')
      .attr('fill', binColors(avgDate))
      .attr('fill-opacity', 0.5)
      .attr('stroke', 'black')
      .attr('stroke-weight', 1)
      .attr('d', hexbin.hexagon());

    // pie
    const binPie = pie(shapeDict);
    const pieG = binG.append('g');

    const radius = Math.sqrt(bin.length) * 4;
    binPie.map(binP => {
      const arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius);

      pieG
        .append('path')
        .attr('transform', 'translate(' + bin.x + ',' + bin.y + ')')
        .attr('d', arc(binP))
        .attr('fill', Shapes.getColor(binP.data.label));
    });
    pieG
      .append('circle')
      .attr('transform', 'translate(' + bin.x + ',' + bin.y + ')')
      .attr('r', radius + 0.75)
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .attr('fill', 'none');
  });

  // legend
  const legendW = 600;
  const legendItemH = 25;
  const legendItemW = 35;
  const headingH = 40;
  const legendPadding = 30;
  const legendMargin = 50;

  const legendH =
    allShapes.length / 2 * legendItemH + legendPadding * 2 + headingH + 200;

  const alignX = legendMargin + legendPadding;

  createLayer('legend');
  const legendG = layers.legend.append('g');

  legendG
    .append('rect')
    .attr('x', legendMargin)
    .attr('y', svgH - legendH - legendMargin)
    .attr('width', legendW)
    .attr('height', legendH)
    .attr('fill', 'white')
    .attr('opacity', 0.9);

  text(
    legendG,
    'CHRISTIAN BAPTISTERIES',
    alignX,
    svgH - legendH - legendMargin + legendPadding,
    { fontSize: 15, fontWeight: 'bold' }
  );

  allShapes.map((shape, si) => {
    const y =
      svgH -
      legendH -
      legendMargin +
      legendPadding +
      Math.floor(si / 2) * legendItemH +
      headingH * 2;
    const x = si % 2 ? alignX + 150 : alignX;

    legendG
      .append('rect')
      .attr('y', y)
      .attr('x', x)
      .attr('height', legendItemH - 5)
      .attr('width', legendItemW)
      .attr('fill', Shapes.getColor(shape.label, true))
      .attr('stroke', 'black')
      .attr('stroke-width', 1);

    text(legendG, shape.label, x + legendItemW + 8, y);
  });

  // big pie
  const allShapesPie = pie(allShapes);
  const bigPieRadius = 60;
  const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(bigPieRadius);

  allShapesPie.map(shapeP => {
    legendG
      .append('path')
      .attr(
        'transform',
        'translate(' + (alignX + 480) + ',' + (svgH - legendMargin - 270) + ')'
      )
      .attr('d', arc(shapeP))
      .attr('fill', Shapes.getColor(shapeP.data.label, true));
  });
  legendG
    .append('circle')
    .attr(
      'transform',
      'translate(' + (alignX + 480) + ',' + (svgH - legendMargin - 270) + ')'
    )
    .attr('r', bigPieRadius + 0.5)
    .attr('stroke', 'black')
    .attr('stroke-width', 1.5)
    .attr('fill', 'none');
};

const text = (el, text, x, y, usedStyle = {}) => {
  const defaultStyle = {
    fontWeight: 'normal',
    fontSize: 10
  };
  const style = Object.assign({}, defaultStyle, usedStyle);
  el
    .append('text')
    .text(text)
    .attr('x', x)
    .attr('font-family', 'Ubuntu')
    .attr('font-weight', style.fontWeight)
    .attr('font-size', style.fontSize)
    .attr('y', y + style.fontSize + 2)
    .attr('color', 'black');
};
