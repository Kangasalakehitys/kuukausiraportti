import * as d3 from "../../_npm/d3@7.9.0/a7907588.js";
import {utcFormat} from "../../_node/d3-time-format@4.1.0/index.4b8e4965.js";


export function chordChart(data) {

  
    const width = 500;
    const height = 500;
    const innerRadius = Math.min(width, height) * 0.5 - 120;
    const outerRadius = innerRadius + 5;
  
    // Compute a dense matrix from the weighted links in data.
    const names = d3.sort(d3.union(data.map(d => d.source), data.map(d => d.target)));
    const index = new Map(names.map((name, i) => [name, i]));
    const matrix = Array.from(index, () => new Array(names.length).fill(0));
    for (const {source, target, value} of data) matrix[index.get(source)][index.get(target)] += value;
  
    const chord = d3.chordDirected()
        .padAngle(10 / innerRadius)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending);
  
    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
  
    const ribbon = d3.ribbonArrow()
        .radius(innerRadius - 1)
        .padAngle(1 / innerRadius);
  
    const colors = d3.quantize(d3.interpolateRainbow, names.length);
  
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "width: 100%; height: auto; font: 12px Century Gothic,CenturyGothic,AppleGothic,sans-serif;");
  
    const chords = chord(matrix);
  
    const group = svg.append("g")
      .selectAll()
      .data(chords.groups)
      .join("g");
  
    group.append("path")
        .attr("fill", d => colors[d.index])
        .attr("d", arc);
  
    group.append("text")
        .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
        .attr("dy", "0.35em")
        .attr("transform", d => `
          rotate(${(d.angle * 180 / Math.PI - 90)})
          translate(${outerRadius + 5})
          ${d.angle > Math.PI ? "rotate(180)" : ""}
        `)
        .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
        .text(d => names[d.index]);
  
    group.append("title")
        .text(d => `${names[d.index]}
  ${d3.sum(chords, c => (c.source.index === d.index) * c.source.value)} lähtee →
  ${d3.sum(chords, c => (c.target.index === d.index) * c.source.value)} tulee ←
  ${d3.sum(chords, c => (c.target.index === d.index) * c.source.value)-d3.sum(chords, c => (c.source.index === d.index) * c.source.value)} netto`);
  
    svg.append("g")
        .attr("fill-opacity", 0.75)
      .selectAll()
      .data(chords)
      .join("path")
        .style("mix-blend-mode", "multiply")
        .attr("fill", d => colors[d.target.index])
        .attr("d", ribbon)
      .append("title")
        .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`);
  
    return svg.node();

  
 
}

