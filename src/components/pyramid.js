import * as Plot from "npm:@observablehq/plot";
import {utcFormat} from "d3-time-format";

export function pyramidPlot(data, title_label, subTitle_label, captionTitle_label, xColumn_label, yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15) {

  const translations = ({2023: "2023",2024: "2024",2025: "2025",2030: "2030",2035: "2035", 2040: "2040", 2045: "2045"})

  const formatTime = utcFormat("%Y");

  return Plot.plot({
    title: "",
    subtitle: subTitle_label,
    caption: captionTitle_label,
    inset: 10,
    grid: true,
    width: 500,
    height: 500,
    marginTop: 20,
    marginRight: 40,
    marginBottom: 70,
    marginLeft: 80,
    x: {
      label: "← mies · väestö lukumäärä · nainen →",
      labelAnchor: "center",
      tickFormat: Math.abs,
      //domain: [-300, 300]
    },
    y: { tickSize: 0, label: yColumn_label, labelAnchor: "top" },
    style: "font-size: 18px; font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif;",
    color: {
      domain: ["2024", "2035", "2045"],
      range: [COLOR_1, COLOR_2, COLOR_6],
      legend: true,
      tickFormat: (d) => translations[d],
      style: "font-size: 18px; font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif;",
    },
    marks: [
      Plot.lineX(data,  {
        x: (d) => d.yColumn * (d.xColumn_1 === "Miehet" ? -1 : 1),
        y: "xColumn_2",
        z: (d) => [d.xColumn_1, d.xColumn].join(","),
        stroke: "xColumn",
        strokeWidth: 5.0,
        fill: "xColumn",
        fillOpacity: 0
      }),
      Plot.ruleX([0]),
      Plot.ruleY([0]),
            Plot.tip(data, 
              Plot.pointer({
              x: (d) => d.yColumn * (d.xColumn_1 === "Miehet" ? -1 : 1),
              y: "xColumn_2",
              title: (d) => ["Vuosi: " + formatTime(new Date(d.xColumn)), d.xColumn_1 + " - " + d.xColumn_2, "Arvo: " + d.yColumn].join("\n\n"),
              strokeDasharray: [2, 2],
              fontSize: 20,
              anchor: "bottom",
              frameAnchor: "top"
              })
            )
    ]
  })

}

