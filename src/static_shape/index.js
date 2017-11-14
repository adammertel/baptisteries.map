import Base from './../base';
import * as d3 from 'd3';
require('d3-geo');
var d3Hexbin = require('d3-hexbin');

const svgW = 1000;
const svgH = 900;
const margin = { top: 40, right: 20, bottom: 20, left: 40 };

const data = [
  { name: 'baptisteries', path: './../data/baptisteries.geojson' },
  { name: 'countries', path: './../data/ne_50m_admin.geojson' }
];

const layers = {};

const projection = d3
  .geoNaturalEarth1()
  .scale(1100)
  .center([20, 34])
  .translate([svgW / 2, svgH / 2]);

const path = d3
  .geoPath()
  .projection(projection)
  .pointRadius(1.5);

const hexbin = d3Hexbin
  .hexbin()
  .size([svgW, svgH])
  .radius(35);

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
  const allShapes = [];
  baptisteries.features.map(b => {
    const bShape = b.properties.shape;

    const allShapeFound = allShapes.find(s => s.label === bShape);
    if (!allShapeFound) {
      allShapes.push({ label: bShape, count: 1 });
    } else {
      allShapeFound.count++;
    }
  });

  // projecting baptisteries
  baptisteries.features.map(r => {
    const c = r.geometry.coordinates;
    c[0] = projection([c[0], c[1]])[0];
    c[1] = projection([c[0], c[1]])[1];
  });

  // creating hexbin and pie helpers
  const bins = hexbin(baptisteries.features.map(f => f.geometry.coordinates));
  const color = d3.scaleSequential(d3.interpolate('red', 'white')).domain([
    d3.max(bins, function(d) {
      return d.length;
    }),
    0
  ]);
  const pieColors = d3
    .scaleOrdinal()
    .range([
      '#a6cee3',
      '#1f78b4',
      '#b2df8a',
      '#33a02c',
      '#fb9a99',
      '#e31a1c',
      '#fdbf6f',
      '#ff7f00',
      '#cab2d6',
      '#6a3d9a',
      '#ffff99',
      '#b15928'
    ]);

  createLayer('countries');
  createLayer('bins');

  layers.countries
    .selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('d', path)
    .style('fill', 'grey')
    .style('opacity', '0.4')
    .style('stroke', 'white');

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

  /*
  bins.map(bin => {
    if (bin.length !== bin.inside.length) {
      console.log('not the same length', bin);
    }
  });
  */

  bins.map(bin => {
    const binG = layers.bins.append('g');
    //console.log(bin);

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
      .attr('fill', color(bin.inside.length))
      .attr('fill-opacity', 0.5)
      .attr('stroke', 'black')
      .attr('stroke-weight', 3)
      .attr('d', hexbin.hexagon());

    // pie
    const binPie = pie(shapeDict);
    const pieG = binG.append('g');

    const radius = Math.sqrt(bin.length) * 2 + 5;
    binPie.map(binP => {
      const arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius);

      pieG
        .append('path')
        .attr('transform', 'translate(' + bin.x + ',' + bin.y + ')')
        .attr('d', arc(binP))
        .attr('fill', pieColors(binP.data.label));
    });
    pieG
      .append('circle')
      .attr('transform', 'translate(' + bin.x + ',' + bin.y + ')')
      .attr('r', radius + 0.5)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('fill', 'none');
  });

  allShapes.map(shape => {
    //console.log(shape.label, pieColors(shape.label));
  });

  // legend
  const legendW = 300;
  const legendH = 400;
  const legendPadding = 10;
  const legendMargin = 25;

  createLayer('legend');
  const legendG = layers.legend.append('g');

  legendG
    .append('rect')
    .attr('x', legendMargin)
    .attr('y', svgH - legendH - legendMargin)
    .attr('width', legendW)
    .attr('height', legendH)
    .attr('fill', 'white');
};
