import Base from './../base';
import * as d3 from 'd3';
require('d3-geo');
var d3Hexbin = require('d3-hexbin');

const svgW = 900;
const svgH = 600;
const margin = { top: 40, right: 20, bottom: 20, left: 40 };

const data = [
  { name: 'baptisteries', path: './../data/baptisteries.geojson' },
  { name: 'countries', path: './../data/ne_50m_admin.geojson' }
];

const layers = {};

const projection = d3
  .geoNaturalEarth1()
  .scale(700)
  .center([10, 30])
  .translate([svgW / 2, svgH / 2]);

const path = d3
  .geoPath()
  .projection(projection)
  .pointRadius(1.5);

const hexbin = d3Hexbin
  .hexbin()
  .size([svgW, svgH])
  .radius(30);

const arc = d3
  .arc()
  .innerRadius(0)
  .outerRadius(10);

const pie = d3
  .pie()
  .value(d => d.count)
  .sort(null);

window.svg = d3
  .select('body')
  .append('svg')
  .attr('width', svgW)
  .attr('height', svgH);

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

const createLayer = layerName => {
  layers[layerName] = svg
    .append('g')
    .classed('map-layer', true)
    .classed('layer-' + layerName, true);
};

const init = () => {
  baptisteries.features.map(r => {
    const c = r.geometry.coordinates;
    c[0] = projection([c[0], c[1]])[0];
    c[1] = projection([c[0], c[1]])[1];
  });

  const bins = hexbin(baptisteries.features.map(f => f.geometry.coordinates));

  const color = d3.scaleSequential(d3.interpolateMagma).domain([
    d3.max(bins, function(d) {
      return d.length;
    }),
    0
  ]);

  createLayer('countries');
  createLayer('bins');

  layers.countries
    .selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('d', path)
    .style('fill', 'none')
    .style('stroke', 'black')
    .style('color', 'black');

  bins.map(bin => {
    const binG = layers.bins.append('g');
    //console.log(bin);

    const sampleDataset = [
      { label: 'Abulia', count: 10 },
      { label: 'Betelgeuse', count: 20 },
      { label: 'Cantaloupe', count: 30 },
      { label: 'Dijkstra', count: 40 }
    ];

    console.log(pie(sampleDataset));

    const pieColors = d3
      .scaleOrdinal()
      .range(['#A60F2B', '#648C85', '#B3F2C9', '#528C18', '#C3F25C']);

    binG
      .append('path')
      .attr('transform', 'translate(' + bin.x + ',' + bin.y + ')')
      .attr('fill', color(bin.length))
      .attr('fill-opacity', 0.8)
      .attr('stroke', 'white')
      .attr('stroke-weight', 3)
      .attr('d', hexbin.hexagon());

    // pie
    const binPie = pie(sampleDataset);
    const pieG = binG.append('g');

    binPie.map(binP => {
      pieG
        .append('path')
        .attr('transform', 'translate(' + bin.x + ',' + bin.y + ')')
        .attr('d', arc(binP))
        .attr('fill', pieColors(binP.data.label));
    });
  });
};
