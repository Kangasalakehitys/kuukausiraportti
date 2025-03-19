import * as Plot from "npm:@observablehq/plot";
import {utcFormat} from "d3-time-format";
import * as d3 from "d3";


// One line
export function lineChart_1(data, x, y, time, title_label, subTitle_label, captionTitle_label, xColumn_label, yColumn_label, COLOR_1) {

  const timeFormat = utcFormat(time);
  
  return Plot.plot({
    title: "",
    subtitle: subTitle_label,
    caption: captionTitle_label,
    inset: 20,
    grid: true,
    x: { tickSize: 0, tickPadding: 3, label: xColumn_label, tickRotate: -30},
    y: { tickSize: 0, label: yColumn_label, labelAnchor: "top" },
    style: "font-size: 18px; font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif;",
    marginTop: 60,
    marginRight: 60,
    marginBottom: 60,
    marginLeft: 80,
    color: {
      legend: true,
      domain: [title_label],
      range: [COLOR_1],
      style: "font-size: 18px; font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif;",
    },
    marks: [
      Plot.lineY(data, {
        x: x, 
        y: y,
        strokeWidth: 5.0,
        stroke: COLOR_1,
        curve: "catmull-rom"
      }),
      Plot.ruleY([0]),
      Plot.tip(data, 
        Plot.pointerX({
        x: x, 
        y: y,
        title: (d) => [timeFormat(new Date(d[x])) + ": " + d[y]],
        strokeDasharray: [2, 2],
        fontSize: 20,
        anchor: "bottom",
        frameAnchor: "top"
        })
      )
    ]
  });
}

//formatTime(new Date(d[x]))
// Three variables
export function lineChart_multi(data, x, y, category, time, title_label, subTitle_label, captionTitle_label, xColumn_label, yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15) {

  const timeFormat = utcFormat(time);

  return Plot.plot({
    title: "",
    subtitle: subTitle_label,
    caption: captionTitle_label,
    inset: 20,
    grid: true,
    x: { tickSize: 0, tickPadding: 3, label: xColumn_label, tickRotate: -30},
    y: { tickSize: 0, label: yColumn_label, labelAnchor: "top" },
    style: "font-size: 18px; font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif;",
    marginTop: 60,
    marginRight: 60,
    marginBottom: 60,
    marginLeft: 80,
    color: {
      legend: true,
      range: [COLOR_1, COLOR_2, COLOR_6, COLOR_4, COLOR_5, COLOR_3, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15],
      style: "font-size: 18px; font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif;",
    },
    marks: [
      Plot.lineY(data, {
        x: x, 
        y: y,
        strokeWidth: 5.0,
        stroke:  category,
        curve: "catmull-rom"
      }),
      Plot.ruleY([0]),
      Plot.tip(data, 
        Plot.pointerX({
        x: x, 
        y: y,
        //title: (d) => [d.xColumn_1, "Vuosi: " + formatTime(new Date(d.xColumn)), "Arvo: " + d.yColumn].join("\n\n"),
        title: (d) => [d[category], timeFormat(new Date(d[x])), d[y]].join("\n"),
        strokeDasharray: [2, 2],
        fontSize: 20,
        anchor: "bottom",
        frameAnchor: "top"
        })
      )
    ]
  });
}

// Three variables
export function lineChart_multi_avg(data, x, y, category, time, mov_avg, title_label, subTitle_label, captionTitle_label, xColumn_label, yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15) {

  const timeFormat = utcFormat(time);

  return Plot.plot({
    title: "",
    subtitle: subTitle_label,
    caption: captionTitle_label,
    inset: 20,
    grid: true,
    x: { tickSize: 0, tickPadding: 3, label: xColumn_label, tickRotate: -30},
    y: { tickSize: 0, label: yColumn_label, labelAnchor: "top" },
    style: "font-size: 18px; font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif;",
    marginTop: 60,
    marginRight: 60,
    marginBottom: 60,
    marginLeft: 80,
    color: {
      legend: true,
      range: [COLOR_1, COLOR_2, COLOR_6, COLOR_4, COLOR_5, COLOR_3, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15],
      style: "font-size: 18px; font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif;",
    },
    marks: [
      Plot.lineY(data, 
          Plot.windowY(mov_avg, {
          x: x, 
          y: y,
          strokeWidth: 5.0,
          stroke:  category,
          curve: "catmull-rom"
        })
      ),
      Plot.ruleY([0]),
      Plot.tip(data, 
        Plot.pointer({
        x: x, 
        y: y,
        //title: (d) => [d.xColumn_1, "Vuosi: " + formatTime(new Date(d.xColumn)), "Arvo: " + d.yColumn].join("\n\n"),
        title: (d) => [d[category], timeFormat(new Date(d[x])), d[y]].join("\n"),
        strokeDasharray: [2, 2],
        fontSize: 20,
        anchor: "bottom",
        frameAnchor: "top"
        })
      )
    ]
  });
}
    

