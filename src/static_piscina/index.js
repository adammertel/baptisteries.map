import Base from "./../base";
import * as d3 from "d3";
require("d3-geo");

import Shapes from "./../helpers/shapes";

var scales = require("d3-scale-chromatic");
var projections = require("d3-geo-projection");
var d3Hexbin = require("d3-hexbin");

const svgW = 1100;
const svgH = 1050;

const hexDepths = [0, 150];

import baptisteries from "./../data/baptisteries.json";
import countries from "./../data/ne_50m_admin.json";

console.log(countries);

const layers = {};

const projection = projections
  .geoNaturalEarth2()
  .scale(1300)
  .center([18, 32])
  .translate([svgW / 2, svgH / 2]);

const path = d3.geoPath().projection(projection).pointRadius(1.5);

const hexbin = d3Hexbin.hexbin().size([svgW, svgH]).radius(45);

const pie = d3
  .pie()
  .value((d) => d.count)
  .sort(Shapes.sortByIndex);

const ciboriumPie = d3
  .pie()
  .value((d) => d.count)
  .sort((a, b) => {
    return a ? -1 : 1;
  });

window.svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgW)
  .attr("height", svgH);

const distance = (cs1, cs2) =>
  Math.sqrt(Math.pow(cs1[0] - cs2[0], 2) + Math.pow(cs1[1] - cs2[1], 2));

const createLayer = (layerName) => {
  layers[layerName] = svg
    .append("g")
    .classed("map-layer", true)
    .classed("layer-" + layerName, true);
};

// create visualisation
const init = () => {
  // getting all shapes
  let allShapes = Shapes.shapesDictionary.slice();
  allShapes.map((s) => (s.count = 0));
  baptisteries.features.map((b) => {
    const bShape = b.properties.piscina_shape;
    const shape = Shapes.getShape(bShape);
    shape.count++;
  });
  console.log(allShapes.filter((s) => !s.count));
  allShapes = allShapes.filter((s) => s.count);

  // projecting baptisteries
  baptisteries.features.map((r) => {
    const c = r.geometry.coordinates;
    c[0] = projection([c[0], c[1]])[0];
    c[1] = projection([c[0], c[1]])[1];
  });

  // creating hexbin and pie helpers
  const bins = hexbin(baptisteries.features.map((f) => f.geometry.coordinates));

  const defaultBinColor = "#444";
  const binColors = d3
    .scaleSequential(scales.interpolatePuBuGn)
    .domain([hexDepths[0], hexDepths[1]]);

  const ciboriumColor = "#014636";

  createLayer("countries");
  createLayer("bins");

  layers.countries
    .selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "grey")
    .style("fill-opacity", 0.4)
    .style("stroke", "white")
    .style("stroke-opacity", 0.7);

  // get inside points
  bins.map((b) => (b.inside = []));

  baptisteries.features.map((b) => {
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

  const maxInside = d3.max(bins.map((s) => s.inside.length));

  bins.map((bin) => {
    const binG = layers.bins.append("g");

    const depths = bin.inside
      .map((b) => b.properties.piscina_depth)
      .filter((d) => d);
    const avgDepth = d3.median(depths);

    const shapes = bin.inside.map((b) =>
      Shapes.getLabel(b.properties.piscina_shape)
    );

    const shapeCounts = {};
    shapes.map((shape) => {
      shapeCounts[shape] = shapeCounts[shape] ? shapeCounts[shape] + 1 : 1;
    });

    const shapeDict = [];
    Object.keys(shapeCounts).map((shape) => {
      shapeDict.push({ label: shape, count: shapeCounts[shape] });
    });

    const hexColor = avgDepth ? binColors(avgDepth) : defaultBinColor;
    // hexes
    binG
      .append("path")
      .attr("transform", "translate(" + bin.x + "," + bin.y + ")")
      .attr("fill", hexColor)
      .attr("fill-opacity", 0.5)
      .attr("stroke", "black")
      .attr("stroke-weight", 1)
      .attr("d", hexbin.hexagon());

    // ciborium pies
    const cRadius = sizeRadius(bin.length) + 10;
    const ciboriums = bin.inside.map((b) => b.properties.ciborium);
    const cDict = [
      { label: "true", count: ciboriums.filter((c) => c).length },
      { label: "false", count: ciboriums.filter((c) => !c).length },
    ];

    const cPie = ciboriumPie(cDict);
    const cPieG = binG.append("g");

    cPie.map((cP) => {
      const arc = d3.arc().innerRadius(0).outerRadius(cRadius);

      cPieG
        .append("path")
        .attr("transform", "translate(" + bin.x + "," + bin.y + ")")
        .attr("d", arc(cP))
        .attr("fill-opacity", cP.data.label === "true" ? "1" : "0")
        .attr("fill", cP.data.label === "true" ? ciboriumColor : "black");
    });

    // pies
    const binPie = pie(shapeDict);
    const pieG = binG.append("g");

    const radius = sizeRadius(bin.length);
    binPie.map((binP) => {
      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      pieG
        .append("path")
        .attr("transform", "translate(" + bin.x + "," + bin.y + ")")
        .attr("d", arc(binP))
        .attr("fill", Shapes.getColor(binP.data.label, true));
    });
    pieG
      .append("circle")
      .attr("transform", "translate(" + bin.x + "," + bin.y + ")")
      .attr("r", radius + 0.75)
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("fill", "none");
  });

  // legend
  const legendW = 700;
  const legendItemH = 25;
  const legendItemW = 35;
  const headingH = 40;
  const legendPadding = 30;
  const legendMargin = 30;

  const legendH =
    (allShapes.length / 2) * legendItemH + legendPadding * 2 + headingH + 200;

  const alignX = legendMargin + legendPadding;

  createLayer("legend");
  const legendG = layers.legend.append("g");

  legendG
    .append("rect")
    .attr("x", legendMargin)
    .attr("y", svgH - legendH - legendMargin)
    .attr("width", legendW)
    .attr("height", legendH)
    .attr("fill", "white")
    .attr("opacity", 0.85);

  text(
    legendG,
    "CHRISTIAN BAPTISTERIES 230\u20131200",
    alignX,
    svgH - legendH - legendMargin + legendPadding - 10,
    { fontSize: 25, fontWeight: "bold" }
  );

  text(
    legendG,
    "Piscina shape",
    alignX,
    svgH - legendH - legendMargin + legendPadding + headingH - 5,
    { fontSize: 15, fontWeight: "bold" }
  );

  text(
    legendG,
    "All piscinae",
    alignX + 460,
    svgH - legendH - legendMargin + legendPadding + headingH - 5,
    { fontSize: 15, fontWeight: "bold" }
  );

  allShapes.map((shape, si) => {
    const y =
      svgH -
      legendH -
      legendMargin +
      legendPadding +
      Math.floor(si / 3) * legendItemH +
      60;
    const x =
      si % 3 === 0 ? alignX : si % 3 === 1 ? alignX + 150 : alignX + 300;

    legendG
      .append("rect")
      .attr("y", y)
      .attr("x", x)
      .attr("height", legendItemH - 5)
      .attr("width", legendItemW)
      .attr("fill", Shapes.getColor(shape.label, true))
      .attr("stroke", "black")
      .attr("stroke-width", 1);

    text(legendG, shape.label, x + legendItemW + 8, y);
  });

  // big pie
  const allShapesPie = pie(allShapes);
  const bigPieRadius = 50;
  const arc = d3.arc().innerRadius(0).outerRadius(bigPieRadius);

  const bigPieX = alignX + 500;
  const bigPieY = svgH - legendMargin - 260;

  allShapesPie.map((shapeP) => {
    legendG
      .append("path")
      .attr("transform", "translate(" + bigPieX + "," + bigPieY + ")")
      .attr("d", arc(shapeP))
      .attr("fill", Shapes.getColor(shapeP.data.label, true));
  });

  legendG
    .append("circle")
    .attr("transform", "translate(" + bigPieX + "," + bigPieY + ")")
    .attr("r", bigPieRadius + 0.5)
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("fill", "none");

  // hex legend
  const hexLegendDates = Array(5)
    .fill()
    .map((_, i) => 30 + hexDepths[0] + (i * (hexDepths[1] - hexDepths[0])) / 5);

  hexLegendDates.push("unknown");

  const hexLegendLabelY = svgH - legendMargin - 230;
  const hexLegendTextY = svgH - legendMargin - 200;
  const hexLegendPathY = svgH - legendMargin - 160;

  text(legendG, "Median piscina depth [cm]", alignX, hexLegendLabelY, {
    fontSize: 15,
    fontWeight: "bold",
  });

  hexLegendDates.map((depth, hi) => {
    const x = (hi + 1) * ((legendW / 1.4 - 2 * (legendPadding + 20)) / 5) + 20;
    const color = depth !== "unknown" ? binColors(depth) : defaultBinColor;
    legendG
      .append("path")
      .attr("d", (d) => {
        return "M" + x + "," + hexLegendPathY + hexbin.hexagon();
      })
      .attr("fill-opacity", 0.6)
      .attr("fill", color)
      .attr("stroke", "black");

    text(legendG, depth, x, hexLegendTextY + 10, {
      textAnchor: "middle",
    });
  });

  // size legend
  const sizeLegendLabelY = svgH - legendMargin - 110;
  const sizeLegendTextY = svgH - legendMargin - 30;
  const sizeLegendPathY = svgH - legendMargin - 35;

  const legendSizeSteps = 5;
  const legendSizes = Array(legendSizeSteps)
    .fill()
    .map((_, i) =>
      parseInt(
        (maxInside / (legendSizeSteps * legendSizeSteps)) * ((i + 1) * (i + 1)),
        10
      )
    );
  legendSizes[0] = 1;

  text(legendG, "Number of buildings", alignX, sizeLegendLabelY, {
    fontSize: 15,
    fontWeight: "bold",
  });

  legendSizes.map((legendSize, li) => {
    const circlesD = ((li * (li + 1)) / 2) * 3;
    const gapsD = li * 10;
    const x = alignX + 10 + legendSize * 2 + gapsD + circlesD;
    const radius = sizeRadius(legendSize);

    legendG
      .append("circle")
      .attr("r", radius)
      .attr("cx", x)
      .attr("cy", sizeLegendPathY - radius)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("stroke-width", "1.5");

    text(legendG, legendSize, x, sizeLegendTextY, {
      textAnchor: "middle",
    });
  });

  // ciborium legend
  text(
    legendG,
    "Proportion of piscinae with ciborium",
    alignX + 300,
    sizeLegendLabelY,
    {
      fontSize: 15,
      fontWeight: "bold",
    }
  );
  [0, 0.5, 1].map((c, ci) => {
    const cx = alignX + 320 + ci * 70;
    const cy = sizeLegendPathY - 20;
    const dict = [
      { label: "true", count: c * 10 },
      { label: "false", count: 10 - c * 10 },
    ];

    const cPie = ciboriumPie(dict);
    const arc = d3.arc().innerRadius(0).outerRadius(30);

    cPie.map((cP) => {
      legendG
        .append("path")
        .attr("transform", "translate(" + cx + "," + cy + ")")
        .attr("d", arc(cP))
        .attr("fill-opacity", cP.data.label === "true" ? "1" : "0")
        .attr("fill", cP.data.label === "true" ? ciboriumColor : "black");
    });

    legendG
      .append("circle")
      .attr("r", 20)
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("stroke-width", "1.5");

    text(legendG, c * 100 + "%", cx, cy - 10, {
      textAnchor: "middle",
    });
  });
};

const sizeRadius = (size) => {
  return Math.sqrt(size) * 3.5;
};

const text = (el, text, x, y, usedStyle = {}) => {
  const defaultStyle = {
    fontWeight: "normal",
    fontSize: 12,
    textAnchor: "start",
  };
  const style = Object.assign({}, defaultStyle, usedStyle);
  el.append("text")
    .text(text)
    .attr("x", x)
    .attr("font-family", "Ubuntu")
    .attr("font-weight", style.fontWeight)
    .attr("text-anchor", style.textAnchor)
    .attr("font-size", style.fontSize)
    .attr("y", y + style.fontSize + 2)
    .attr("color", "black");
};

init();
