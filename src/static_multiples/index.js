import Base from "../base";
import * as d3 from "d3";
require("d3-geo");
var projections = require("d3-geo-projection");
var d3Hexbin = require("d3-hexbin");

import Shapes from "../helpers/shapes";

import baptisteries from "./../data/baptisteries.json";
import countries from "./../data/ne_50m_admin.json";

const distance = (cs1, cs2) =>
  Math.sqrt(Math.pow(cs1[0] - cs2[0], 2) + Math.pow(cs1[1] - cs2[1], 2));

const sizeRadius = (size) => {
  return Math.sqrt(size);
};

const text = (el, text, x, y, usedStyle = {}) => {
  const defaultStyle = {
    fontWeight: "normal",
    fontSize: 12,
    color: "black",
    stroke: "none",
    strokeWidth: 0,
    textAnchor: "start",
  };
  const style = Object.assign({}, defaultStyle, usedStyle);
  el.append("text")
    .text(text)
    .attr("x", x)
    .attr("font-family", "Ubuntu")
    .attr("font-weight", style.fontWeight)
    .attr("text-anchor", style.textAnchor)
    .attr("stroke", style.stroke)
    .attr("stroke-width", style.strokeWidth)
    .attr("fill", style.color)
    .attr("font-size", style.fontSize)
    .attr("y", y + style.fontSize + 2)
    .attr("color", "black");
};

const w = 500;
const h = 350;

const init = () => {
  // getting all shapes
  let allShapes = Shapes.shapesDictionary.slice();
  allShapes.map((s) => (s.count = 0));
  baptisteries.features.map((b) => {
    const bShape = b.properties.shape;
    const shape = Shapes.getShape(bShape);
    shape.count++;
  });

  allShapes = allShapes.filter((s) => s.count);
  console.log(allShapes);
  //const totalCount = d3.sum(allShapes.map((s) => s.count));

  const projection = projections
    .geoNaturalEarth2()
    .scale(450)
    .center([25, 33])
    .translate([w / 2, h / 2]);

  const hexbin = d3Hexbin.hexbin().size([w, h]).radius(12);

  // projecting baptisteries
  baptisteries.features.map((r) => {
    const c = r.geometry.coordinates;
    c[0] = projection([c[0], c[1]])[0];
    c[1] = projection([c[0], c[1]])[1];
  });

  // iterating over shapes
  Shapes.shapesDictionary
    .filter((s) => s.label !== "unknown")
    .map((shape, si) => {
      const sLabel = shape.label;
      const shapeColor = Shapes.getColor(shape.label, true);

      window.svg = d3
        .select("body")
        .append("svg")
        .attr("class", shape.label)
        .attr("width", w)
        .attr("height", h);

      const path = d3.geoPath().projection(projection).pointRadius(1.5);

      // base layer
      const countriesLayer = svg.append("g").attr("class", "countries");

      countriesLayer
        .selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "lightgrey")
        .style("fill-opacity", 0.8)
        .style("stroke", "white")
        .style("stroke-opacity", 0.7);

      // creating hexbin
      const bins = hexbin(
        baptisteries.features.map((f) => f.geometry.coordinates)
      );

      // get inside points
      bins.map((b) => (b.all = 0));
      bins.map((b) => (b.thatShape = 0));

      baptisteries.features.map((b) => {
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
      bins.map((bin) => {
        bin.relative = bin.thatShape / bin.all;
      });

      const maxAbsolute = d3.max(bins.map((b) => b.thatShape));
      const maxRelative = d3.max(bins.map((b) => b.relative));

      const binColors = d3
        .scaleLinear()
        .domain([0, maxRelative])
        .range(["white", shapeColor]);

      bins
        .filter((b) => b.thatShape)
        .map((bin) => {
          const binG = svg.append("g");

          const hexColor = binColors(bin.relative);

          // console.log('shapeRelative', shapeRelative);
          // console.log('binRelative', binRelative);
          // console.log('thisBinRelative', thisBinRelative);
          // console.log('hexColor', hexColor);
          // console.log('');

          // hexes
          binG
            .append("path")
            .attr("transform", "translate(" + bin.x + "," + bin.y + ")")
            .attr("fill", hexColor)
            .attr("fill-opacity", 0.5)
            .attr("stroke", "grey")
            .attr("stroke-width", 1)
            .attr("d", hexbin.hexagon());

          binG
            .append("circle")
            .attr("transform", "translate(" + bin.x + "," + bin.y + ")")
            .attr("r", sizeRadius(bin.thatShape))
            .attr("fill", "black");
        });

      // legend
      const legendW = 265;
      const legendH = 120;

      const legendPadding = 3;
      const legendMargin = 8;

      const alignX = legendMargin + legendPadding;
      const alignY = h - legendH - legendMargin + legendPadding;

      const legendG = svg.append("g").attr("class", "legend");

      legendG
        .append("rect")
        .attr("x", legendMargin)
        .attr("y", h - legendH - legendMargin)
        .attr("width", legendW)
        .attr("height", legendH)
        .attr("fill", "white")
        .attr("opacity", 0.85);

      text(legendG, "CHRISTIAN BAPTISTERIES 230\u20131200", alignX, alignY, {
        fontSize: 11,
        fontWeight: "bold",
      });
      text(legendG, "Distribution of building shape", alignX, alignY + 15, {
        fontSize: 11,
      });

      text(legendG, shape.label, alignX + 150, alignY + 14, {
        fontSize: 12,
        fontWeight: "normal",
        color: "black",
        stroke: shapeColor,
        strokeWidth: 1,
      });
      text(legendG, shape.label, alignX + 150, alignY + 14, {
        fontSize: 12,
        fontWeight: "normal",
        color: "black",
      });

      text(legendG, " - relative distribution", alignX + 5, alignY + 30, {
        fontSize: 11,
      });

      text(legendG, " - absolute distribution", alignX + 5, alignY + 75, {
        fontSize: 11,
      });

      // arrays of domains
      let absoluteArr = d3.scaleLinear().domain([0, maxAbsolute]).ticks(3);
      absoluteArr[0] = 1;
      absoluteArr[absoluteArr.length - 1] = maxAbsolute;

      if (maxAbsolute < 5) {
        absoluteArr = [];
        for (let i = 1; i != maxAbsolute + 1; i++) {
          absoluteArr[i - 1] = i;
        }
      }
      console.log(absoluteArr);

      const relativeArr = d3.scaleLinear().domain([0, maxRelative]).ticks(4);
      relativeArr[0] = 0;
      relativeArr[relativeArr.length - 1] = maxRelative;

      relativeArr.map((r, ri) => {
        const rColor = binColors(r);
        const y = alignY + 60;
        const x = alignX + 30 + 20 * ri;

        legendG
          .append("path")
          .attr("d", (d) => {
            return "M" + x + "," + y + hexbin.hexagon();
          })
          .attr("fill-opacity", 0.6)
          .attr("fill", rColor)
          .attr("stroke", "grey");
        text(legendG, r.toFixed(2), x, y - 5, {
          fontSize: 8,
          textAnchor: "middle",
        });
      });

      absoluteArr.map((a, ai) => {
        const aSize = sizeRadius(a);
        const y = alignY + 100;
        const x = alignX + 30 + 20 * ai;

        legendG
          .append("circle")
          .attr("r", aSize)
          .attr("transform", "translate(" + x + "," + (y - aSize / 2) + ")")
          .attr("fill", "black");
        text(legendG, a, x, y + 3, {
          fontSize: 8,
          textAnchor: "middle",
        });
      });
    });
};

init();
