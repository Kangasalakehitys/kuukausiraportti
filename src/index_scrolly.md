---
title: Esipuhe
---

```js
//Leaflet style
import * as L from "npm:leaflet";
//Module imports
import * as d3 from "npm:d3";
import {utcFormat} from "d3-time-format";
import scrollama from "scrollama";
//Data import
//Väestökehitys
import {avain_142h,avain_142h_tbl} from "./pages/vaesto/vaesto.js";
//Väestöpyramidi
import {vaenn_14wx,all_vaenn_14wx} from "./pages/vaesto/pyramidi.js";
//Chart import
import {
lineChart_1,    
lineChart_multi, 
lineChart_multi_avg} from "./components/line_chart.js";
import {pyramidPlot} from "./components/pyramid.js";
import {leafletMap} from "./components/leaflet_map.js";
//Variable import
import {
KUNTA_ID,
COLOR_1,
COLOR_2,
COLOR_3,
COLOR_4,
COLOR_5,
COLOR_6,
COLOR_7,
COLOR_8,
COLOR_9,
COLOR_10,
COLOR_11,
COLOR_12,
COLOR_13,
COLOR_14,
COLOR_15
} from "./variables/variables.js";

//Texts
const texts = (await FileAttachment("./data/report/report.csv")
              .csv({typed: true}));

	// using d3 for convenience
		var main = d3.select("main");
		var scrolly = main.select("#scrolly");
		var figure = scrolly.select("#figure");
		var article = scrolly.select("article");
		var step = article.selectAll(".step");

		// initialize the scrollama
		var scroller = scrollama();

		// generic window resize listener event
		function handleResize() {
			// 1. update height of step elements
			var stepH = Math.floor(window.innerHeight * 1.5); /* 75 */
			step.style("height", stepH + "px");

			var figureHeight = window.innerHeight / 1.2;
			var figureMarginTop = (window.innerHeight - figureHeight) / 2.4;

			figure
				.style("height", figureHeight + "px")
				.style("top", figureMarginTop + "px");

			// 3. tell scrollama to update new element dimensions
			scroller.resize();
		}

		// scrollama event handlers
		function handleStepEnter(response) {
			console.log("response",response);
			// response = { element, direction, index }

			// add color to current step only
			step.classed("is-active", function (d, i) {
				return i === response.index;
			});

      //Handle image change
      const image_name = response.element.dataset.image;

			// update graphic based on step
			figure.select("p").text(response.index + 1);
      // figure.select("p").style("background", response.element.dataset.color);
      // figure.select("p").style("background","url('" + image_name + "') no-repeat");

      figure.style("background","url('" + image_name + "') no-repeat");
      figure.style("background-position","center");
      figure.style("background-size","cover");


      

		}


		function init() {

			// 1. force a resize on load to ensure proper dimensions are sent to scrollama
			handleResize();

			// 2. setup the scroller passing options
			// 		this will also initialize trigger observations
			// 3. bind scrollama event handlers (this can be chained like below)
      // <p>${await FileAttachment( "./images/haralanharju.jpg" ).image()}</p>
			scroller
				.setup({
					step: "#scrolly article .step",
					offset: 0.33,
					debug: false
				})
				.onStepEnter(handleStepEnter);
		}

		// kick things off
		init();

//Leafletmap DIV
//const div = display(document.createElement("div"));
//div.style = "height: 600px;";

```
```js
//Filter correct text
const txt_1 = texts.filter((element) => {
                  return element.cat_1_fi === "Väestö"
                });

//Timeformat
const formatYear4 = utcFormat("%Y");

//Chart labels
const title_label = txt_1[0].cat_2_fi
const subTitle_label = ""
const captionTitle_label = "Kuva 1. " + avain_142h[0].label + "  (Lähde: " + avain_142h[0].source + ", päivitetty: " + avain_142h[0].updated.slice(0, 10) + ")"
const xColumn_label = "Vuosi"
const yColumn_label = "Lkm"


```

<div class="grid grid-cols-2">
  <div>
  <h1>Esipuhe</h1><p>Tekstiä...</p></div>
  <div class="card">${resize((width) => 
                lineChart_1(avain_142h, title_label, subTitle_label, captionTitle_label, xColumn_label,yColumn_label, COLOR_1)
            )}</div>
</div>
        <section id="scrolly">
        <div id=figure>
        </div>
        <article>
          <div class="step" data-step="1" data-color="red" data-image="https://www.kangasala.fi/wp-content/uploads/2025/02/kangasalan-vuoden-2024-rakennushanke-omakotitalo-tikka-681x602.jpg">
            <p><b>Väestön kehitys</b></br>
            Tähän jotain tekstiä....</br>${resize((width) => pyramidPlot(all_vaenn_14wx, title_label, subTitle_label, captionTitle_label, xColumn_label,yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15))} 
            </p>
          </div>
          <div class="step" data-step="2" data-color="green" data-image="https://www.kangasala.fi/wp-content/uploads/2025/02/kortteli1523-jatkuva-haku-681x490.jpg">
            <p></p>
          </div>
          <div class="step" data-step="3" data-color="blue" data-image="https://www.kangasala.fi/wp-content/uploads/2025/02/pixapay_parking-spot-825371_1280_edited-1-681x444.jpg">
            <p>STEP 3</p>
          </div>
          <div class="step" data-step="4" data-color="orange" data-image="https://www.kangasala.fi/wp-content/uploads/2025/02/yo_kuva_isabella_rossi-681x383.png">
            <p>STEP 4</p>
          </div>
        </article>
      </section>
      <section id="outro"></section>




