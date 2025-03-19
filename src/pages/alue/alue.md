---
title: Alue
---

```js
//Leaflet style
import * as L from "npm:leaflet";

//Texts import
import {texts} from "../../data/report/texts.js";

//Map import
import {bordersMap} from "../../components/leaflet_map.js";

//Data map
import {vaesto_Tilastoalueet} from "../../pages/vaesto/vaesto_osa.js";
import {kangasalaBorders} from "../../data/maps/kangasala_geojson.js";
import {kangasalaTilasto} from "../../data/maps/kangasala-tilasto_geojson.js";

//Data import
import {avain_142h_alue} from "./alue.js";

//Charts
import {
lineChart_1,    
lineChart_multi, 
lineChart_multi_avg} from "../../components/line_chart.js";

//Module import
import * as d3 from "npm:d3";
import {utcFormat} from "d3-time-format";

//Function
import {serialize} from "../../functions/serialize.js";

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
} from "../../variables/variables.js";

//Timeformat
const formatYear4 = utcFormat("%Y");

//Map div
const div = display(document.createElement("div"));
div.style = "height: 600px;";

const files = [
  {id: 1, file: FileAttachment("../../data/maps/kunta_center.csv")},
]

let data_kunta_center = await files[0].file.csv()

const lat_long = data_kunta_center.filter((element) => {
        return element.kunta == KUNTA_ID
      });

const lat = +lat_long[0].lat
const lng = +lat_long[0].lng

```

```js



//Filter correct text
const txt_1 = texts.filter((element) => {return element.cat_1_fi === "Rakentaminen ja asuminen"})
```

<div class="grid grid-cols-1">
    <div class="card">
        <h1>Alue</h1>
        Tästä osiosta löydät tietoa esimerkiksi taajamaväestöstä ja -asteesta sekä väestötiheydestä ja tilastoalueista.
    </div>
</div>
<div class="grid grid-cols-1">
    <div class="card" >
        <h2>Taajamaväestö ja -aste</h2>
        Taajama on Suomessa Tilastokeskuksen määritelmän mukaan vähintään 200 asukkaan rakennusryhmä, jossa rakennusten välinen etäisyys ei yleensä ole 200 metriä suurempi. Taajama-aste on taajamien väestön osuus koko kunnan väestöstä. Yli 90 % taajama-aste tarkoittaa rakenteeltaan kaupunkimaista kuntaa. Suomessa on noin 750 taajamaa.
    </div>
</div>

```js

const data = avain_142h_alue.filter((suodatus) => suodatus.yColumn_1 > 0);

//Chart labels
const title_label = "Taajamaväestö"
const subTitle_label = ""
const captionTitle_label = "" + avain_142h_alue[0].label + "  (Lähde: " + avain_142h_alue[0].source + ", päivitetty: " + avain_142h_alue[0].updated.slice(0, 10) + ")"
const xColumn_label = "Vuosi"
const yColumn_label = "Taajamaväestöä"
const x = "xColumn"
const y = "yColumn_1"
const time = "%Y"

const data_2 = avain_142h_alue.filter((suodatus) => suodatus.yColumn_2 > 0);

//Chart labels
const title_label_2 = "Taajama-aste"
const subTitle_label_2 = ""
const captionTitle_label_2 = "" + avain_142h_alue[0].label + "  (Lähde: " + avain_142h_alue[0].source + ", päivitetty: " + avain_142h_alue[0].updated.slice(0, 10) + ")"
const xColumn_label_2 = "Vuosi"
const yColumn_label_2 = "Taajama-aste"
const x_2 = "xColumn"
const y_2 = "yColumn_2"
const time_2 = "%Y"


```
<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => 
    lineChart_1(data, x, y, time, title_label, subTitle_label, captionTitle_label, xColumn_label,yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
    )
    }
  </div>
  <div class="card">
    ${resize((width) => 
    lineChart_1(data_2, x_2, y_2, time_2, title_label_2, subTitle_label_2, captionTitle_label_2, xColumn_label_2,yColumn_label_2, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
    )
    }
  </div>
</div>

<div class="grid grid-cols-1">
    <div class="card">
        <h2>Kunta- ja tilastoaluerajat</h2>
        Tilastokeskus ylläpitää kuntien tilastollisten osa-alueiden kartta-aineistoa ja luokitusta osa-alueittaista tilastotuotantoa varten. Kunnat päättävät itse aluejaosta ja siihen tehtävistä muutoksista. Tilastokeskus ylläpitää aineistoa kuntien tarpeiden mukaan ja aineiston päivitys tehdään vuosittain. <br><br>
        <em>Voi zoomata karttaa hiiren rullalla ja klikkaamalla osa-aluetta saat tiedoksi osa-alueen nimen.</em>
    </div>
</div>
<div class="grid grid-cols-1">
    <div class="card">
    ${resize((width) => 
         bordersMap(div,kangasalaTilasto,lat,lng)
        )
    }
    </div>
</div>


