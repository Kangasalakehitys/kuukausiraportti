import * as Plot from "npm:@observablehq/plot";
import {utcFormat} from "d3-time-format";


export function facedBar_vert(data, x, y, category, time, title_label, subTitle_label, captionTitle_label, xColumn_label, yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15) {

  const timeFormat = utcFormat(time);

  const seasonColors = ["#959C00", "#9C5A00", "#465C9C", "#109F73"];
  
   return Plot.plot({
    title: "",
    subtitle: subTitle_label,
    caption: captionTitle_label,
    inset: 10,
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
      //x: {type: "band",label: null},
      marks: [
        Plot.barX(data, {
          x: y, 
          y: x, 
          fill: category}),
        // Plot.ruleY([0]),
        Plot.tip(
          data, 
          Plot.pointerY(
            Plot.stackX({
              x: y, 
              y: x,
              title: (d) =>
                //`${d[x]}: ${d[category]} ${d[y]}`,
              [timeFormat(new Date(d[x])) + ': ', d[category], d[y]].join("\n"),
              strokeDasharray: [2, 2],
              fontSize: 20,
              anchor: "bottom",
              frameAnchor: "top"
            })
          )
        )
      ]
    })
  
  }

export function stackBar_vert(data, x, y, category, time, title_label, subTitle_label, captionTitle_label, xColumn_label, yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15) {

  const timeFormat = utcFormat(time);

  const seasonColors = ["#959C00", "#9C5A00", "#465C9C", "#109F73"];
  
   return Plot.plot({
    title: "",
    subtitle: subTitle_label,
    caption: captionTitle_label,
    inset: 10,
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
      //x: {type: "band",label: null},
      marks: [
        Plot.barY(data, {
          x: x, 
          y: y, 
          fill: category}),
        Plot.ruleY([0]),
        Plot.tip(
          data, 
          Plot.pointerX(
            Plot.stackY({
              x: x, 
              y: y,
              title: (d) =>
                //`${d[x]}: ${d[category]} ${d[y]}`,
              [timeFormat(new Date(d[x])) + ': ', d[category], d[y]].join("\n"),
              strokeDasharray: [2, 2],
              fontSize: 20,
              anchor: "bottom",
              frameAnchor: "top"
            })
          )
        )
      ]
    })
  
  }

  export function basicBar_vert(data, x, y, category, time, title_label, subTitle_label, captionTitle_label, xColumn_label, yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15) {

    const timeFormat = utcFormat(time);
  
    const seasonColors = ["#959C00", "#9C5A00", "#465C9C", "#109F73"];
    
     return Plot.plot({
      title: "",
      subtitle: subTitle_label,
      caption: captionTitle_label,
      inset: 10,
      grid: false,
      fx: {interval: "year", tickRotate: -45, label: xColumn_label, padding: 0, tickSize: 0, tickPadding: 0, labelAnchor: "right"},
      x: {axis: null, tickRotate: -45},
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
        //x: {type: "band",label: null},
        marks: [
        Plot.barY(
          data, {
          fx: x,
          x: category,
          y: y,
          fill: category,
          //tip: true
        }
      ),
      // Plot.tip(
      //   [`Työvoima 2023: 16567`],
      //   {fx: new Date("2023-01-21"), y: 100, dy: -350, anchor: "bottom"}
      // ),
      // Plot.tip(
      //   [`Työpaikat 2023: 8812`],
      //   {fx: new Date("2023-01-21"), y: 100, dy: -200, anchor: "bottom"}
      // ),
        Plot.tip(data, 
          Plot.pointer({
            fx: x,
            x: category,
            y: y,
            fill: category,
            title: (d) => [d[category], timeFormat(new Date(d[x])), d[y]].join("\n"),
            strokeDasharray: [2, 2],
            fontSize: 20,
            anchor: "bottom",
            frameAnchor: "top"
          })),

        Plot.ruleY([0]),
        ]
      })
    
    }

      // Plot.tip(data, 
      //   Plot.pointer({
      //   x: x, 
      //   y: y,
      //   //title: (d) => [d.xColumn_1, "Vuosi: " + formatTime(new Date(d.xColumn)), "Arvo: " + d.yColumn].join("\n\n"),
      //   title: (d) => [d[category], timeFormat(new Date(d[x])), d[y]].join("\n"),
      //   strokeDasharray: [2, 2],
      //   fontSize: 20,
      //   anchor: "bottom",
      //   frameAnchor: "top"
      //   })
      // )

    //Plot.barY(data, {fx: "Date", y: "Value", x: "Name", fill: "Name"}),

    // xColumn_4: 2023-01-01
    // xColumn_1: "Omakoti- ja paritalot"
    // xColumn: "1754 - 1920"
    // xColumn_3: "SSS"
    // yColumn_1: 669

    // x: "key",
    // y: "population",
    // fill: "key",
    // fx: "state",