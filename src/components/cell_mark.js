import * as Plot from "npm:@observablehq/plot";
import {utcFormat} from "d3-time-format";

// One line
// US electricity demand, generation and forecasting chart
export function cellMark(data, x, y, category, title_label, subTitle_label, captionTitle_label, xColumn_label, yColumn_label, COLOR_1) {


  return Plot.plot({
    title: title_label,
    subtitle: subTitle_label,
    caption: captionTitle_label,
    inset: 10,
    grid: true,
    style: "font-size: 20px; font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif;",
    marginTop: 260,
    marginRight: 60,
    marginBottom: 60,
    marginLeft: 350,
    x: { tickSize: 0, tickPadding: 3, label: xColumn_label, tickRotate: -45, axis: "top", label: xColumn_label},
    y: { tickSize: 0, label: yColumn_label },
    color: {type: "diverging", scheme: "RdYlGn"},
    marks: [
      Plot.cell(data, {
        x: x, 
        y: y, 
        fill: category, inset: 0.5}),
      Plot.text(data, {
        x: x, 
        y: y, 
        text: (d) => d[category].toFixed(0), fill: "black", 
        title: (d) => [d[x], yColumn_label + ': ' + d.yColumn, xColumn_label + ': ' + d.yColumn_1, title_label + ': ' + d.yColumn_2].join("\n"), fontSize: 14, fontWeight: "bold"})
    ]
  });
}




    

