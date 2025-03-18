---
title: Työpaikat ja työvoima
---

```js
//Texts import
import {texts} from "../../data/report/texts.js";
//Data import
import {part_1_tyokay_115b,part_3_tyokay_115b} from "./tyovoima.js";
import {flat_tyonv_12ti} from "./tyopaikka_tyoton.js";
import {all_tyokay_115h, part_1_tyokay_115h, part_2_tyokay_115h} from "./toimiala.js";
import {tyonv_12ti_toimi} from "./tyopaikka_tyoton_toimiala.js";
import {tyokay_125s} from "./omavaraisuus.js";

//Chart import
import {
lineChart_1,
lineChart_1_avg,   
lineChart_multi, 
lineChart_multi_avg} from "../../components/line_chart.js";
import {
facedBar_vert,
stackBar_vert, 
basicBar_vert} from "../../components/faced_bar.js"
import {cellMark} from "../../components/cell_mark.js";
//D3 map
import {choroplethMapD3} from "../../components/d3_map.js";

//Functions
import {join} from "../../functions/functions.js";
//Module imports
import * as d3 from "npm:d3";
import {utcFormat} from "d3-time-format";

//Variable import
import {
KUNTA_ID,
VIIM_KUUKAUSI,
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
} from "../../variables/variables.js";

const kunnat2024topo = FileAttachment("../../data/maps/Kunnat2024Topo.json").json()
const kunnat2025topo = FileAttachment("../../data/maps/Kunnat2025Topo.json").json()
const maakunnat_2024_topo =  FileAttachment("../../data/maps/Maakunnat2024Topo.json").json()


const files = [
  {id: 1, file: FileAttachment("../../data/stat/tyossakaynti/tyonv_12r5.json")},
  {id: 2, file: FileAttachment("../../data/stat/tyossakaynti/tyonv_12r5_map.json")},
  {id: 3, file: FileAttachment("../../data/stat/ennakkotiedot/hopea_kunkku_2_14c2_kans.json")},
  {id: 4, file: FileAttachment("../../data/stat/ennakkotiedot/hopea_vamuu_pxt_119e_kunta.json")}
]



```
```js
const formatYear4 = utcFormat("%Y");

const flat_12ti = flat_tyonv_12ti.map(d => ({
        ...d,
        xColumn_1: d.xColumn_1
        .replace("Työpaikat","Avoimet työpaikat")
    }))



//Chart labels
const data = part_1_tyokay_115b
const title_label = "Joku otsikko"
const subTitle_label = ""
const captionTitle_label = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label = "Vuosi"
const yColumn_label = "Lkm"
const x = "xColumn"
const y = "yColumn"
const category = "xColumn_1"
const time = "%Y"



//Chart labels
const data_1 = flat_12ti
const title_label_1 = "Joku otsikko"
const subTitle_label_1 = ""
const captionTitle_label_1 = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_1 = "Vuosi"
const yColumn_label_1 = "Lkm"
const x_1 = "xColumn"
const y_1 = "yColumn"
const category_1 = "xColumn_1"
const time_1 = "%Y %m"


// const hoursBackOfData = Math.ceil(Math.abs(1 - 5) / (2)) - 1;
// const hoursAgoInput = Inputs.range([hoursBackOfData, 0], {step: 1, value: 0, width: 150});
// const hoursAgo = Generators.input(hoursAgoInput);
// hoursAgoInput.querySelector("input[type=number]").remove();

//Moving average input
const movingRange = 1;
const movingInput = Inputs.range([movingRange, 48], {label: html`Liukuva keskiarvo:`, step: 1, value: 1});
const movingGen = Generators.input(movingInput);
movingInput.querySelector("input[type=number]").remove();
```
<div class="grid grid-cols-1">
    <div class="card">
        <h1>Työllisyys</h1>
        Tästä osiosta löydät tietoa työvoimasta, työpaikoista ja työttömyydestä.<br><br>
    </div>
</div>
<div class="grid grid-cols-1">
    <div class="card">
        <h2>Työvoima, työlliset ja työpaikat</h2>
        Voit tarkistella ja tasoittaa kuukausittaista lukemaa liukuvalla keskiarvolla alapuolen vetovalikon kautta.<br><br>
        <h2 class="center">${movingGen} kuukautta</h2>
        ${movingInput}
        <br>
    </div>
</div>
<div class="grid grid-cols-2">
  <div class="card">
    ${
            resize((width) => 
                lineChart_multi_avg(data, x, y, category, time, movingGen, title_label, subTitle_label, captionTitle_label, xColumn_label,yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
  </div>
    <div class="card">
        ${
            resize((width) => 
                lineChart_multi_avg(data_1, x_1, y_1, category_1, time_1, movingGen, title_label_1, subTitle_label_1, captionTitle_label_1, xColumn_label_1,yColumn_label_1, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
    }
    </div>
</div>

```js
//Chart labels
const data_2 = all_tyokay_115h
const title_label_2 = "Työpaikat toimialoittain"
const subTitle_label_2 = ""
const captionTitle_label_2 = "" + data_2[0].label + "  (Lähde: " + data_2[0].source + ", päivitetty: " + data_2[0].updated.slice(0, 10) + ")"
const xColumn_label_2 = "Vuosi"
const yColumn_label_2 = "Lkm"
const x_2 = "xColumn"
const y_2 = "yColumn"
const time_2 = "%Y"


const data_3 = part_1_tyokay_115h
const title_label_3 = "Työpaikat toimialoittain 1/2"
const subTitle_label_3 = ""
const captionTitle_label_3 = "" + data_3[0].label + "  (Lähde: " + data_3[0].source + ", päivitetty: " + data_3[0].updated.slice(0, 10) + ")"
const xColumn_label_3 = "Vuosi"
const yColumn_label_3 = "Lkm"
const x_3 = "xColumn"
const y_3 = "yColumn"
const category_3 = "xColumn_1"
const time_3 = "%Y"

const data_4 = part_2_tyokay_115h
const title_label_4 = "Työpaikat toimialoittain 2/2"
const subTitle_label_4 = ""
const captionTitle_label_4 = "" + data_4[0].label + "  (Lähde: " + data_4[0].source + ", päivitetty: " + data_4[0].updated.slice(0, 10) + ")"
const xColumn_label_4 = "Vuosi"
const yColumn_label_4 = "Lkm"
const x_4 = "xColumn"
const y_4 = "yColumn"
const category_4 = "xColumn_1"
const time_4 = "%Y"

//const data_5 = tyonv_12ti_toimi

const data_5 = tyonv_12ti_toimi.map(d => ({
        ...d,
        xColumn_2: d.xColumn_2.slice(0, 30)
    }))

const title_label_5 = "Kohtaanto"
const subTitle_label_5 = ""
const captionTitle_label_5 = "" + data_5[0].label + "  (Lähde: " + data_5[0].source + ", päivitetty: " + data_5[0].updated.slice(0, 10) + ")"
const xColumn_label_5 = "Avoin työpaikka"
const yColumn_label_5 = "Työttömät"
const x_5 = "xColumn_2"
const y_5 = "xColumn_2"
const category_5 = "yColumn_2"
const time_5 = "%Y"

const data_6 = tyokay_125s
const title_label_6 = "Työpaikkaomavaraisuus-%"
const subTitle_label_6 = ""
const captionTitle_label_6 = "" + data_6[0].label + "  (Lähde: " + data_6[0].source + ", päivitetty: " + data_6[0].updated.slice(0, 10) + ")"
const xColumn_label_6 = "Vuosi"
const yColumn_label_6 = "Lkm"
const x_6 = "xColumn"
const y_6 = "yColumn"
const time_6 = "%Y"

let data_25v = await files[0].file.json();

const data_25_vuotta = data_25v.map(d => ({
        xColumn: new Date(d.data.xColumn_2
        .replace("M","-")),
        yColumn: +d.data.yColumn_7
    }))

//Timeformat



//Chart labels
const data_7 = data_25_vuotta
const title_label_7 = "Alle 25-v. työttömät työnhakijat (lkm.)"
const subTitle_label_7 = ""
const captionTitle_label_7 = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_7 = "Vuosi/kk"
const yColumn_label_7 = "Lkm"
const x_7 = "xColumn"
const y_7 = "yColumn"
const category_7 = "yColumn"
const time_7 = "%Y %m"

```
<!-- Työpaikat yhteensä Chart -->
<div class="grid grid-cols-2">
  <div class="card">
        ${
            resize((width) => 
                lineChart_1(data_2, x_2, y_2, time_2, title_label_2, subTitle_label_2, captionTitle_label_2, xColumn_label_2,yColumn_label_2, COLOR_1, COLOR_2, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
    }
</div>
<div class="card">
           ${
            resize((width) => 
                lineChart_1(data_6, x_6, y_6, time_6, title_label_6, subTitle_label_6, captionTitle_label_6, xColumn_label_6,yColumn_label_6, COLOR_1, COLOR_2, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
    }
</div>
</div>

<!-- Toimialat työpaikat yhteensä Chart -->
<div class="grid grid-cols-2">
<div class="card">
<h2>Työpaikat toimialoittain</h2>
            ${
            resize((width) => 
                lineChart_multi(data_3, x_3, y_3, category_3, time_3, title_label_3, subTitle_label_3, captionTitle_label_3, xColumn_label_3,yColumn_label_3, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
    }
</div>
  <div class="card">
        ${
            resize((width) => 
                lineChart_multi(data_4, x_4, y_4, category_4, time_4, title_label_4, subTitle_label_4, captionTitle_label_4, xColumn_label_4,yColumn_label_4, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
    }
  </div>
</div>
<div class="grid grid-cols-2">
<div class="card">
<h2>${VIIM_KUUKAUSI}</h2>
            ${
            resize((width) => 
                cellMark(data_5, x_5, y_5, category_5, title_label_5, subTitle_label_5, captionTitle_label_5, xColumn_label_5,yColumn_label_5, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
</div>
  <div class="card">
                ${
            resize((width) => 
                lineChart_1(data_7, x_7, y_7, time_7, title_label_7, subTitle_label_7, captionTitle_label_7, xColumn_label_7,yColumn_label_7, COLOR_1, COLOR_2, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
    }
  </div>
</div>

```js
//Vuonna 2025
const mapTopoJSON = topojson.feature(kunnat2025topo, kunnat2025topo.objects.Kunnat2025_geo).features
const borderMesh = topojson.mesh(maakunnat_2024_topo, maakunnat_2024_topo.objects.maakunnat_2024, (a, b) => a !== b);

let data_employment_change = await files[1].file.json();

//const mapTopoJSON = topojson.feature(kunnat2024topo, kunnat2024topo.objects.Kunnat2024_geo).features
//const borderMesh = topojson.mesh(maakunnat_2024_topo, maakunnat_2024_topo.objects.maakunnat_2024, (a, b) => a !== b);

const min_max = d3.extent(data_employment_change, d => d.muutos)

const min = min_max[0]
const max = min_max[1]
const med = d3.median(data_employment_change, d => d.muutos)


const chart_height = 700
const chart_width = 800
const title_txt_map = "Työttömien työnhakijoiden %-osuus työvoimasta"

//const mapInterpolateRdBu = d3.scaleDiverging([-1.5, 0, 1.5], d3.interpolatePiYG);
//Väritetään kartta
const mapInterpolateReds = d3.scaleDiverging([min, med, max], d3.interpolateReds);
const borderColorWhite = "#FFFFFF";

```

```js
let data_inter = await files[2].file.json();
const data_8 = data_inter.map(d => ({
        xColumn: new Date(d.Vuosi
        .replace("2023","2023-12-31")
        .replace("M01*","-01-01")
        .replace("M02*","-02-01")
        .replace("M03*","-03-01")
        .replace("M04*","-04-01")
        .replace("M05*","-05-01")
        .replace("M06*","-06-01")
        .replace("M07*","-07-01")
        .replace("M08*","-08-01")
        .replace("M09*","-09-01")
        .replace("M10*","-10-01")
        .replace("M11*","-11-01")
        .replace("M12*","-12-01")),
        yColumn: +d.Vieraskieliset,
        yColumn_1: +d.muutos
    }))

//Chart labels
const title_label_8 = "Vieraskieliset ja saame"
const subTitle_label_8 = ""
const captionTitle_label_8 = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_8 = "Vuosi/kk"
const yColumn_label_8 = "Lkm"
const x_8 = "xColumn"
const y_8 = "yColumn"
const category_8 = "yColumn"
const time_8 = "%Y %m"      
```

```js
let data_inter_multi = await files[3].file.json();


const data_9 = data_inter_multi.map(d => ({
        xColumn: new Date(d.Vuosi
        .replace("2023","2023-12-31")
        .replace("M01*","-01-01")
        .replace("M02*","-02-01")
        .replace("M03*","-03-01")
        .replace("M04*","-04-01")
        .replace("M05*","-05-01")
        .replace("M06*","-06-01")
        .replace("M07*","-07-01")
        .replace("M08*","-08-01")
        .replace("M09*","-09-01")
        .replace("M10*","-10-01")
        .replace("M11*","-11-01")
        .replace("M12*","-12-01")),
        yColumn: +d.Nettomaahanmuutto
    }))
//Vuosi: "1990", Maahanmuutto Suomeen: 36, Maahanmuutto Suomeen Pohjoismaista: 24, Maahanmuutto Suomeen EU-maista: 29, Nettomaahanmuutto: 21}
//Chart labels
const title_label_9 = "Nettomaahanmuutto"
const subTitle_label_9 = ""
const captionTitle_label_9 = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_9 = "Vuosi"
const yColumn_label_9 = "Lkm"
const x_9 = "xColumn"
const y_9 = "yColumn"
const time_9 = "%Y %m"

const data_yhd_0 = part_1_tyokay_115b
.filter(function (suodatus) {
  if (suodatus.xColumn_1 == "Työvoima") return  suodatus.xColumn_1
})
.filter(function (suodatus) {
  if (suodatus.xColumn >= new Date("2007-01-01")) return  suodatus.xColumn
});

//const data_yhd = d3.merge([[data_yhd_0], [data_2]])

const data_yhd = [...data_yhd_0, ...data_2]

const data_10 = data_yhd.filter(function (suodatus) {
  return suodatus.xColumn_1 == "Yhteensä" ? suodatus.xColumn_1 = "Työpaikat"
    : suodatus.xColumn_1
});
const title_label_10 = "Työpaikat ja työvoima"
const subTitle_label_10 = ""
const captionTitle_label_10 = ""
const xColumn_label_10 = "Vuosi"
const yColumn_label_10 = "Lkm"
const x_10 = "xColumn"
const y_10 = "yColumn"
const category_10 = "xColumn_1"
const time_10 = "%Y"  

const data_11 = part_3_tyokay_115b.filter(function (suodatus) {
    if (
    suodatus.xColumn_1 == "Työlliset" || 
    suodatus.xColumn_1 == "Työttömät" || 
    suodatus.xColumn_1 == "0-14-vuotiaat" || 
    suodatus.xColumn_1 == "Opiskelijat" || 
    suodatus.xColumn_1 == "Varusmiehet (siviilipalv.)" || 
    suodatus.xColumn_1 == "Eläkeläiset" || 
    suodatus.xColumn_1 == "Muut työvoiman ulkopuolella"
    )
   return  suodatus.xColumn_1;
})

const title_label_11 = "Pääasiallinen toiminta"
const subTitle_label_11 = ""
const captionTitle_label_11 = ""
const xColumn_label_11 = "Vuosi"
const yColumn_label_11 = "Lkm"
const x_11 = "xColumn"
const y_11 = "yColumn"
const category_11 = "xColumn_1"
const time_11 = "%Y"  


```


<div class="grid grid-cols-2">
  <div class="card">
  Voit zoomata karttoja hiiren rullalla.
  </div>
</div>
<div class="grid grid-cols-2">
  <div class="card">
          ${display(choroplethMapD3(data_employment_change, mapInterpolateReds, borderColorWhite, borderColorWhite, mapTopoJSON, borderMesh, title_txt_map, chart_width, chart_height)) }
  </div>
  <div class="card">
  <h2>Kansainvälisyys, vieraskielisten määrä</h2>
                  ${
            resize((width) => 
                lineChart_1(data_8, x_8, y_8, time_8, title_label_8, subTitle_label_8, captionTitle_label_8, xColumn_label_8,yColumn_label_8, COLOR_1, COLOR_2, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
    }
    </div>
</div>
<div class="grid grid-cols-2">
  <div class="card">
    <div class="card">
  <h2>Maahanmuutto - nettomaahanmuutto</h2>
        ${
            resize((width) => 
                lineChart_1(data_9, x_9, y_9, time_9, title_label_9, subTitle_label_9, captionTitle_label_9, xColumn_label_9,yColumn_label_9, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
    }
    </div>
  </div>
  <div class="card">
        ${
            resize((width) => 
                basicBar_vert(data_10, x_10, y_10, category_10, time_10, title_label_10, subTitle_label_10, captionTitle_label_10, xColumn_label_10,yColumn_label_10, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
    }
  </div>
</div>
<div class="grid grid-cols-2">
  <div class="card">
    <div class="card">
  <h2>Väestö pääasiallisen toiminnan mukaan</h2>
        ${
            resize((width) => 
                lineChart_multi(data_11, x_11, y_11, category_11, time_11, title_label_11, subTitle_label_11, captionTitle_label_11, xColumn_label_11,yColumn_label_11, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
    }
    </div>
  </div>
  <div class="card">

  </div>
</div>


