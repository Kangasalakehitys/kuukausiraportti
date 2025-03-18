import * as Plot from "npm:@observablehq/plot";
import {utcFormat} from "d3-time-format";

// One line
// US electricity demand, generation and forecasting chart
export function cellMark(data, title_label, subTitle_label, captionTitle_label, xColumn_label, yColumn_label, COLOR_1) {


  Plot.plot({
    axis: null,
    label: null,
    height: 260,
    marginTop: 20,
    marginBottom: 70,
    title: "Subdued",
    subtitle: "Of 120 surveyed Syrian teenagers:",
    marks: [
      Plot.axisFx({lineWidth: 10, anchor: "bottom", dy: 20}),
      Plot.waffleY({length: 1}, {y: 120, fillOpacity: 0.4, rx: "100%"}),
      Plot.waffleY(survey, {fx: "question", y: "yes", rx: "100%", fill: "orange"}),
      Plot.text(survey, {fx: "question", text: (d) => (d.yes / 120).toLocaleString("en-US", {style: "percent"}), frameAnchor: "bottom", lineAnchor: "top", dy: 6, fill: "orange", fontSize: 24, fontWeight: "bold"})
    ]
  })

}




    

