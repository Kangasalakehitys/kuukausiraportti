import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

//Map import
//import {Legend} from "../functions/functions.js";


export function choroplethMapD3(data, mapColor, borderColor, borderColor_2, mapTopoJSON, borderMesh, txtTitle, chart_width, chart_height){

const colorBorder = borderColor;
const colorBorder_2 = borderColor_2;
const color = mapColor

const projection = d3.geoMercator()
.scale(1100)
.center([40, 67.3])
.translate([360, 100])
const path = d3.geoPath().projection(projection);
const format = d => `${d}%`;

const valuemap = new Map(data.map(d => [d.id, d.muutos]));

const zoom = d3.zoom()
.scaleExtent([1, 8])
.on("zoom", zoomed);

const svg = d3.create("svg")
.attr("width",280) //900
.attr("height", 600) //650
.attr("viewBox", [-30, 0, 300, 300])
.on("click", reset);

const g = svg.append("g")
.attr("transform", "translate(20,35)")
.append(() => Legend(color, {title: txtTitle, width: 260}));

g.append("g")
.selectAll("path")
.data(mapTopoJSON)
.join("path")
  .attr("fill", d => color(valuemap.get(d.properties.kunta))) 
  .attr("d", path)
  .attr("stroke", colorBorder_2)
  .attr("stroke-opacity", 0.2)
.append("title")
  .text(d => `${d.properties.name},\n(${d.properties.nimi_2}),\n${valuemap.get(d.properties.kunta)}`);


g.append("path")
  .datum(borderMesh)
  .attr("fill", "none")
  .attr("stroke", colorBorder)
  .attr("stroke-linejoin", "round")
  .attr("d", path);


svg.call(zoom);

  function reset() {
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity,
      d3.zoomTransform(svg.node()).invert([chart_width / 2, chart_height / 2])
    );
  }

  function zoomed(event) {
    const {transform} = event;
    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);
  }
  console.log(svg.node())

  return svg.node();
}


 function Legend(color, {
  title,
  tickSize = 10,
  width = 200, 
  height = 44 + tickSize,
  marginTop = -100, //15
  marginRight = 50,
  marginBottom = 115 + tickSize, //15
  marginLeft = -50,
  ticks = width / 64,
  tickFormat,
  tickValues
} = {}) {

  function ramp(color, n = 256) {
    const canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible")
      .style("display", "block");

  let tickAdjust = g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
  let x;

  // Continuous
  if (color.interpolate) {
    const n = Math.min(color.domain().length, color.range().length);

    x = color.copy().rangeRound(d3.quantize(d3.interpolate(marginLeft, width - marginRight), n));

    svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))).toDataURL());
  }

  // Sequential
  else if (color.interpolator) {
    x = Object.assign(color.copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
        {range() { return [marginLeft, width - marginRight]; }});

    svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.interpolator()).toDataURL());

    // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
    if (!x.ticks) {
      if (tickValues === undefined) {
        const n = Math.round(ticks + 1);
        tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
      }
      if (typeof tickFormat !== "function") {
        tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
      }
    }
  }

  // Threshold
  else if (color.invertExtent) {
    const thresholds
        = color.thresholds ? color.thresholds() // scaleQuantize
        : color.quantiles ? color.quantiles() // scaleQuantile
        : color.domain(); // scaleThreshold

    const thresholdFormat
        = tickFormat === undefined ? d => d
        : typeof tickFormat === "string" ? d3.format(tickFormat)
        : tickFormat;

    x = d3.scaleLinear()
        .domain([-1, color.range().length - 1])
        .rangeRound([marginLeft, width - marginRight]);

    svg.append("g")
      .selectAll("rect")
      .data(color.range())
      .join("rect")
        .attr("x", (d, i) => x(i - 1))
        .attr("y", marginTop)
        .attr("width", (d, i) => x(i) - x(i - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", d => d);

    tickValues = d3.range(thresholds.length);
    tickFormat = i => thresholdFormat(thresholds[i], i);
  }

  // Ordinal
  else {
    x = d3.scaleBand()
        .domain(color.domain())
        .rangeRound([marginLeft, width - marginRight]);

    svg.append("g")
      .selectAll("rect")
      .data(color.domain())
      .join("rect")
        .attr("x", x)
        .attr("y", marginTop)
        .attr("width", Math.max(0, x.bandwidth() - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", color);

    tickAdjust = () => {};
  }

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x)
        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues))
      .call(tickAdjust)
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", marginLeft)
        .attr("y", marginTop + marginBottom - height - 6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .style("font-size", "13px")
        .attr("class", "title")
        .text(title));

  return svg.node();
}


function legend({color, ...options}) {
  return Legend(color, options);
}