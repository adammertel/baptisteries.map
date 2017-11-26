import Base from './../base';
import * as d3 from 'd3';
require('d3-geo');

import Shapes from './../helpers/shapes';

var scales = require('d3-scale-chromatic');
var projections = require('d3-geo-projection');
var d3Hexbin = require('d3-hexbin');

const mapW = 800;
const mapH = 300;

const distance = (cs1, cs2) =>
  Math.sqrt(Math.pow(cs1[0] - cs2[0], 2) + Math.pow(cs1[1] - cs2[1], 2));

const createLayer = (layers, layerName) => {
  layers[layerName] = svg
    .append('g')
    .classed('map-layer', true)
    .classed('layer-' + layerName, true);
};

const sizeRadius = size => {
  return Math.sqrt(size) * 1.5;
};

const text = (el, text, x, y, usedStyle = {}) => {
  const defaultStyle = {
    fontWeight: 'normal',
    fontSize: 12,
    textAnchor: 'start'
  };
  const style = Object.assign({}, defaultStyle, usedStyle);
  el
    .append('text')
    .text(text)
    .attr('x', x)
    .attr('font-family', 'Ubuntu')
    .attr('font-weight', style.fontWeight)
    .attr('text-anchor', style.textAnchor)
    .attr('font-size', style.fontSize)
    .attr('y', y + style.fontSize + 2)
    .attr('color', 'black');
};

// loading datasets
const data = [
  { name: 'baptisteries', path: './../data/baptisteries.geojson' },
  { name: 'countries', path: './../data/ne_50m_admin.geojson' }
];

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

const w = 500;
const h = 350;

const defaultBinColor = 'none';

const init = () => {
  // getting all shapes
  let allShapes = Shapes.shapesDictionary.slice();
  allShapes.map(s => (s.count = 0));
  baptisteries.features.map(b => {
    const bShape = b.properties.shape;
    const shape = Shapes.getShape(bShape);
    shape.count++;
  });

  allShapes = allShapes.filter(s => s.count);
  const totalCount = d3.sum(allShapes.map(s => s.count));

  const projection = projections
    .geoNaturalEarth2()
    .scale(400)
    .center([18, 32])
    .translate([w / 2, h / 2]);

  const hexbin = d3Hexbin
    .hexbin()
    .size([w, h])
    .radius(12);

  // projecting baptisteries
  baptisteries.features.map(r => {
    const c = r.geometry.coordinates;
    c[0] = projection([c[0], c[1]])[0];
    c[1] = projection([c[0], c[1]])[1];
  });

  // iterating over shapes
  Shapes.shapesDictionary.map((shape, si) => {
    const layers = {};
    const sLabel = shape.label;
    const shapeRelative =
      allShapes.find(s => s.label === sLabel).count / totalCount;

    window.svg = d3
      .select('body')
      .append('svg')
      .attr('class', shape.label)
      .attr('width', w)
      .attr('height', h);

    const path = d3
      .geoPath()
      .projection(projection)
      .pointRadius(1.5);

    // base layer
    const countriesLayer = svg.append('g').attr('class', 'countries');

    countriesLayer
      .selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('d', path)
      .style('fill', 'lightgrey')
      .style('fill-opacity', 0.8)
      .style('stroke', 'white')
      .style('stroke-opacity', 0.7);

    // creating hexbin
    const bins = hexbin(baptisteries.features.map(f => f.geometry.coordinates));

    // get inside points
    bins.map(b => (b.all = 0));
    bins.map(b => (b.thatShape = 0));

    baptisteries.features.map(b => {
      const bShape = Shapes.getShape(b.properties.shape);

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
          bin.all++;
          if (bShape.label === sLabel) {
            bin.thatShape++;
          }
        }
      });
    });

    // setting relative distribution
    bins.map(bin => {
      bin.relative = bin.thatShape / bin.all;
    });

    const binColors = d3
      .scaleLinear()
      .domain([0, d3.max(bins.map(b => b.relative))])
      .range(['white', Shapes.getColor(shape.label, true)]);

    bins.filter(b => b.thatShape).map(bin => {
      const binG = svg.append('g');

      const hexColor = binColors(bin.relative);

      // console.log('shapeRelative', shapeRelative);
      // console.log('binRelative', binRelative);
      // console.log('thisBinRelative', thisBinRelative);
      // console.log('hexColor', hexColor);
      // console.log('');

      // hexes
      binG
        .append('path')
        .attr('transform', 'translate(' + bin.x + ',' + bin.y + ')')
        .attr('fill', hexColor)
        .attr('fill-opacity', 0.5)
        .attr('stroke', 'grey')
        .attr('stroke-width', 1)
        .attr('d', hexbin.hexagon());

      binG
        .append('circle')
        .attr('transform', 'translate(' + bin.x + ',' + bin.y + ')')
        .attr('r', sizeRadius(bin.thatShape))
        .attr('fill', 'black');
    });
    /*
      // legend
      const legendW = 700;
      const legendItemH = 25;
      const legendItemW = 35;
      const headingH = 40;
      const legendPadding = 30;
      const legendMargin = 30;

      const legendH =
        allShapes.length / 2 * legendItemH + legendPadding * 2 + headingH + 200;

      const alignX = legendMargin + legendPadding;

      createLayer('legend');
      const legendG = layers[shape.label].append('g');

      legendG
        .append('rect')
        .attr('x', legendMargin)
        .attr('y', mapH - legendH - legendMargin)
        .attr('width', legendW)
        .attr('height', legendH)
        .attr('fill', 'white')
        .attr('opacity', 0.85);

      text(
        legendG,
        'CHRISTIAN BAPTISTERIES 230–1200',
        alignX,
        svgH - legendH - legendMargin + legendPadding - 10,
        { fontSize: 25, fontWeight: 'bold' }
      );

      // hex legend
      const hexLegendDates = Array(5)
        .fill()
        .map(
          (_, i) => 30 + hexDepths[0] + i * (hexDepths[1] - hexDepths[0]) / 5
        );

      hexLegendDates.push('unknown');

      const hexLegendLabelY = svgH - legendMargin - 230;
      const hexLegendTextY = svgH - legendMargin - 200;
      const hexLegendPathY = svgH - legendMargin - 160;

      text(legendG, 'Median piscina depth [cm]', alignX, hexLegendLabelY, {
        fontSize: 15,
        fontWeight: 'bold'
      });

      hexLegendDates.map((depth, hi) => {
        const x =
          (hi + 1) * ((legendW / 1.4 - 2 * (legendPadding + 20)) / 5) + 20;
        const color = depth !== 'unknown' ? binColors(depth) : defaultBinColor;
        legendG
          .append('path')
          .attr('d', d => {
            return 'M' + x + ',' + hexLegendPathY + hexbin.hexagon();
          })
          .attr('fill-opacity', 0.6)
          .attr('fill', color)
          .attr('stroke', 'black');

        text(legendG, depth, x, hexLegendTextY + 10, { textAnchor: 'middle' });
      });

      */
  });
};
