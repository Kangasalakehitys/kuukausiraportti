---
title: Väestö
toc: true
---



```js
//Leaflet style
import * as L from "npm:leaflet";

//Functions import
import {serialize} from "../../functions/serialize.js";

//Texts import
import {texts} from "../../data/report/texts.js";

//Data import
import {avain_142h_laaja_1} from "./vaesto.js";
import {vaenn_14wx,all_vaenn_14wx} from "./pyramidi.js";
import {muuttoliike, muuttoliike_tulo, muuttoliike_lahto, muuttoliike_tulo_lahto} from "../../pages/muuttoliike/muuttoliike.js";

//Data map
import {vaesto_Tilastoalueet} from "../../pages/vaesto/vaesto_osa.js";

//Map import
import {choroplethMap} from "../../components/leaflet_map.js";
//D3 map
import {choroplethMapD3} from "../../components/d3_map.js";

//Chart import
import {
lineChart_1,    
lineChart_multi, 
lineChart_multi_avg} from "../../components/line_chart.js";
import {pyramidPlot} from "../../components/pyramid.js";
import {chordChart} from "../../components/chord_chart.js";

//Module imports
import * as d3 from "npm:d3";
import {utcFormat} from "d3-time-format";

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

//Map div
const div = display(document.createElement("div"));
div.style = "height: 600px;";

const files = [
  {id: 1, file: FileAttachment("../../data/stat/ennakkotiedot/vamuu_pxt_11lj.json")},
  {id: 2, file: FileAttachment("../../data/stat/ennakkotiedot/vamuu_pxt_119e.json")},
  {id: 3, file: FileAttachment("../../data/stat/ennakkotiedot/hopea_kunkku_2_14c2.json")},
  {id: 4, file: FileAttachment("../../data/maps/kunta_center.csv")}
]

let data_kunta_center = await files[3].file.csv()

const lat_long = data_kunta_center.filter((element) => {
        return element.kunta == KUNTA_ID
      });

const lat = +lat_long[0].lat
const lng = +lat_long[0].lng


```

```js
//D3 map topojson
//const data_population_change = FileAttachment("../../data/stat/ennakkotiedot/vamuu_pxt_11lj.json").json();
//const data_population_change_12month = FileAttachment("../../data/stat/ennakkotiedot/vamuu_pxt_119e.json").json();
const data_population_fore = FileAttachment("../../data/stat/ennakkotiedot/vamuu_pxt_11lj_kunta.json").json();



const kunnat2024topo = FileAttachment("../../data/maps/Kunnat2024Topo.json").json()
const kunnat2025topo = FileAttachment("../../data/maps/Kunnat2025Topo.json").json()
const maakunnat_2024_topo =  FileAttachment("../../data/maps/Maakunnat2024Topo.json").json()


```



```js
//Filter correct text
const txt_1 = texts.filter((element) => {
                  return element.cat_1_fi === "Väestö"
                });

// Väkiluku
// 1. Väestönlisäys
// 2. Väkiluvun muutos edellisestä vuodesta, %
// Miehiä
// Naisia
// Alle 7-vuotiaita
// 6. Alle 7-vuotiaita, %
// Alle 15-vuotiaita
// 8. Alle 15-vuotiaita, %
// 15-64-vuotiaita
// 10. 15-64-vuotiaita, %
// Yli 64-vuotiaita
// 12. Yli 64-vuotiaita, %
// Väestön keski-ikä
// Ulkomaan kansalaisia, %
// Syntyneitä
// Kuolleita
// Syntyneiden enemmyys (luonnollinen väestönlisäys), promillea
// Nettomuutto
// Maahanmuuttaneita
// Maastamuuttaneita
// Nettomaahanmutto
// Kuntien välistä lähtömuuttoa
// Kuntien välistä tulomuuttoa
// Kuntien välistä muuttovoittoa/-tappiota, henkilöä

const startDate = new Date("2000-01-01");

const population_fore = data_population_fore.map(d => ({
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
        yColumn: +d.arvo_vakiluku,
        yColumn_1: d.cat
    })).filter((element) => {
      return element.xColumn > startDate
      });

 
```

<div class="grid grid-cols-1">
    <div class="card">
        <h1>Väestö</h1>
        Osio sisältää tietoa väestömäärästä, -rakenteesta ja väestön muutoksista sekä muuttoliikkeestä. <br><br>
    </div>
</div>

```js
//Timeformat
const formatYear4 = utcFormat("%Y");

//Väestö
const data = avain_142h_laaja_1;
const title_label = "Väestö"
const subTitle_label = ""
const captionTitle_label = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label = "Vuosi"
const yColumn_label = "Väestö"
const x = "xColumn"
const y = "yColumn"
const time = "%Y"

//Väestönlisäys
const data_1 = avain_142h_laaja_1.filter((suodatus) => suodatus.xColumn > new Date('2004-01-01'));
const title_label_1 = "Väestönlisäys"
const subTitle_label_1 = ""
const captionTitle_label_1 = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_1 = "Vuosi"
const yColumn_label_1 = "Väestönlisäys"
const x_1 = "xColumn"
const y_1 = "yColumn_1"
const time_1 = "%Y"


//Väkiluvun muutos edellisestä vuodesta, %
const title_label_2 = "Väkiluvun muutos edellisestä vuodesta, %"
const subTitle_label_2 = ""
const captionTitle_label_2 = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_2 = "Vuosi"
const yColumn_label_2 = "Väkiluvun muutos edellisestä vuodesta, %"
const x_2 = "xColumn"
const y_2 = "yColumn_2"
const time_2 = "%Y"

//Väestö ja ennakkotieto
const data_4 = population_fore
const title_label_4 = "Väestö ja ennakkotieto"
const subTitle_label_4 = ""
const captionTitle_label_4 = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_4 = "Vuosi"
const yColumn_label_4 = "Lkm"
const x_4 = "xColumn"
const y_4 = "yColumn"
const category_4 = "yColumn_1"
const time_4 = "%Y"

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
    lineChart_1(data_1, x_1, y_1, time_1, title_label_1, subTitle_label_1, captionTitle_label_1, xColumn_label_1,yColumn_label_1, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
    )
    }
  </div>
</div>

<div class="grid grid-cols-2">
        <div class="card">
        ${
            resize((width) => 
                lineChart_multi(data_4, x_4, y_4, category_4, time_4, title_label_4, subTitle_label_4, captionTitle_label_4, xColumn_label_4,yColumn_label_4, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
  </div>
    <div class="card">
    ${resize((width) => 
    lineChart_1(data, x_2, y_2, time_2, title_label_2, subTitle_label_2, captionTitle_label_2, xColumn_label_2,yColumn_label_2, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
    )
    }
  </div>

</div>


```js
//Timeformat
const formatYear4 = utcFormat("%Y");


// const alle_15 = avain_142h_laaja_1.map(d => ({
//         xColumn: new Date(d.data.xColumn),
//         cat: "Alle 15",
//         yColumn: +d.data.yColumn_8,
//         updated: d.meta.updated,
//         label: d.meta.label,
//         source: d.meta.source
//     }))
// const v15_64 = avain_142h_laaja_1.map(d => ({
//         xColumn: new Date(d.data.xColumn),
//         cat: "15-64",
//         yColumn: +d.data.yColumn_10,
//         updated: d.meta.updated,
//         label: d.meta.label,
//         source: d.meta.source
//     }))
// const yli_64 = avain_142h_laaja_1.map(d => ({
//         xColumn: new Date(d.data.xColumn),
//         cat: "Yli 64",
//         yColumn: +d.data.yColumn_12,
//         updated: d.meta.updated,
//         label: d.meta.label,
//         source: d.meta.source
//     }))

// //Combine results
// const result0 = alle_15.concat(v15_64);
// const result = result0.concat(yli_64);

// const data_3 = result;

//Väkiluvun muutos edellisestä vuodesta, %
const title_label_3 = "Ikäluokkien %-osuudet"
const subTitle_label_3 = ""
const captionTitle_label_3 = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_3 = "Vuosi"
const yColumn_label_3 = "Ikäluokkien %-osuudet"
const x_3 = "xColumn"
const y_3 = "yColumn"
const category_3 = "cat"
const time_3 = "%Y"



let data_cat = await files[2].file.json();

const pop_3_cat = data_cat.map(d => ({
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
        yColumn: +d.Arvo,
        yColumn_1: d.Luokka
    }))
    .filter((element) => {
        return element.xColumn > startDate
      })
    .filter((suodatus) => {
        if (
        suodatus.yColumn_1 == "0-15" || 
        suodatus.yColumn_1 == "16-64" || 
        suodatus.yColumn_1 == "65+"
        )
        return  suodatus.yColumn_1
  
});

const pop_3_cat_pro = data_cat.map(d => ({
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
        yColumn: +d.Arvo,
        yColumn_1: d.Luokka
    }))
    .filter((element) => {
        return element.xColumn > startDate
      })
    .filter((suodatus) => {
        if (
        suodatus.yColumn_1 == "0-15 %" || 
        suodatus.yColumn_1 == "16-64 %" || 
        suodatus.yColumn_1 == "65+ %"
        )
        return  suodatus.yColumn_1
  
});

const pop_3_cat_v = data_cat.map(d => ({
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
        yColumn: +d.Arvo,
        yColumn_1: d.Luokka
    }))
    .filter((element) => {
        return element.xColumn > startDate
      })
    .filter((suodatus) => {
        if (
        suodatus.yColumn_1 == "0-18" || 
        suodatus.yColumn_1 == "19-64" || 
        suodatus.yColumn_1 == "65+"
        )
        return  suodatus.yColumn_1
  
});

const pop_3_cat_pro_v = data_cat.map(d => ({
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
        yColumn: +d.Arvo,
        yColumn_1: d.Luokka
    }))
    .filter((element) => {
        return element.xColumn > startDate
      })
    .filter((suodatus) => {
        if (
        suodatus.yColumn_1 == "0-18 %" || 
        suodatus.yColumn_1 == "19-64 %" || 
        suodatus.yColumn_1 == "65+ %"
        )
        return  suodatus.yColumn_1
  
});

const pop_5_cat = data_cat.map(d => ({
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
        yColumn: +d.Arvo,
        yColumn_1: d.Luokka
    }))
    .filter((element) => {
        return element.xColumn > startDate
      })
    .filter((suodatus) => {
        if (
        suodatus.yColumn_1 == "0-6" || 
        suodatus.yColumn_1 == "7-15" || 
        suodatus.yColumn_1 == "16-64" || 
        suodatus.yColumn_1 == "65-79" || 
        suodatus.yColumn_1 == "80+"
        )
        return  suodatus.yColumn_1
  
});

const pop_5_cat_pro = data_cat.map(d => ({
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
        yColumn: +d.Arvo,
        yColumn_1: d.Luokka
    }))
    .filter((element) => {
        return element.xColumn > startDate
      })
    .filter((suodatus) => {
        if (
        suodatus.yColumn_1 == "0-6 %" || 
        suodatus.yColumn_1 == "7-15 %" || 
        suodatus.yColumn_1 == "16-64 %" || 
        suodatus.yColumn_1 == "65-79 %" || 
        suodatus.yColumn_1 == "80+ %"
        )
        return  suodatus.yColumn_1
  
});

const pop_6_cat = data_cat.map(d => ({
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
        yColumn: +d.Arvo,
        yColumn_1: d.Luokka
    }))
    .filter((element) => {
        return element.xColumn > startDate
      })
    .filter((suodatus) => {
        if (
        suodatus.yColumn_1 == "0-6" || 
        suodatus.yColumn_1 == "7-15" || 
        suodatus.yColumn_1 == "16-18" || 
        suodatus.yColumn_1 == "19-64" || 
        suodatus.yColumn_1 == "65-79" || 
        suodatus.yColumn_1 == "80+"
        )
        return  suodatus.yColumn_1
  
});

const pop_6_cat_pro = data_cat.map(d => ({
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
        yColumn: +d.Arvo,
        yColumn_1: d.Luokka
    }))
    .filter((element) => {
        return element.xColumn > startDate
      })
    .filter((suodatus) => {
        if (
        suodatus.yColumn_1 == "0-6 %" || 
        suodatus.yColumn_1 == "7-15 %" || 
        suodatus.yColumn_1 == "16-18 %" || 
        suodatus.yColumn_1 == "19-64 %" || 
        suodatus.yColumn_1 == "65-79 %" || 
        suodatus.yColumn_1 == "80+ %"
        )
        return  suodatus.yColumn_1
  
});

const title_label_3_lk = "Väestönmuutokset - Väestöennakko, 3 ikäluokkaa"
const subTitle_label_3_lk = ""
const captionTitle_label_3_lk = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_3_lk = "Vuosi"
const yColumn_label_3_lk = "Lkm"
const x_3_lk = "xColumn"
const y_3_lk = "yColumn"
const category_3_lk = "yColumn_1"
const time_3_lk = "%Y"

const title_label_3_lk_p = "Väestönmuutokset - Väestöennakko, 3 ikäluokkaa %"
const subTitle_label_3_lk_p = ""
const captionTitle_label_3_lk_p = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_3_lk_p = "Vuosi"
const yColumn_label_3_lk_p = "%"
const x_3_lk_p = "xColumn"
const y_3_lk_p = "yColumn"
const category_3_lk_p = "yColumn_1"
const time_3_lk_p = "%Y"

const title_label_3_lk_v = "Väestönmuutokset - Väestöennakko, 3 ikäluokkaa (Kuntaliiton veroarvion pohja)"
const subTitle_label_3_lk_v = ""
const captionTitle_label_3_lk_v = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_3_lk_v = "Vuosi"
const yColumn_label_3_lk_v = "Lkm"
const x_3_lk_v = "xColumn"
const y_3_lk_v = "yColumn"
const category_3_lk_v = "yColumn_1"
const time_3_lk_v = "%Y"

const title_label_3_lk_p_v = "Väestönmuutokset - Väestöennakko, 3 ikäluokkaa %  (Kuntaliiton veroarvion pohja)"
const subTitle_label_3_lk_p_v = ""
const captionTitle_label_3_lk_p_v = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_3_lk_p_v = "Vuosi"
const yColumn_label_3_lk_p_v = "%"
const x_3_lk_p_v = "xColumn"
const y_3_lk_p_v = "yColumn"
const category_3_lk_p_v = "yColumn_1"
const time_3_lk_p_v = "%Y"

```

<div class="grid grid-cols-2">
  <div class="card">
          ${
            resize((width) => 
                lineChart_multi(pop_3_cat, x_3_lk, y_3_lk, category_3_lk, time_3_lk, title_label_3_lk, subTitle_label_3_lk, captionTitle_label_3_lk, xColumn_label_3_lk,yColumn_label_3_lk, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }

  </div>
    <div class="card">
        ${
            resize((width) => 
                lineChart_multi(pop_3_cat_pro, x_3_lk_p, y_3_lk_p, category_3_lk_p, time_3_lk_p, title_label_3_lk_p, subTitle_label_3_lk_p, captionTitle_label_3_lk_p, xColumn_label_3_lk_p,yColumn_label_3_lk_p, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
  </div>
</div>

<div class="grid grid-cols-2">
  <div class="card">
  <h2>3 ikäluokkaa %  (Kuntaliiton veroarvion pohja)</h2>
          ${
            resize((width) => 
                lineChart_multi(pop_3_cat_v, x_3_lk_v, y_3_lk_v, category_3_lk_v, time_3_lk_v, title_label_3_lk_v, subTitle_label_3_lk_v, captionTitle_label_3_lk_v, xColumn_label_3_lk_v,yColumn_label_3_lk, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }

  </div>
    <div class="card">
    <h2>3 ikäluokkaa %  (Kuntaliiton veroarvion pohja)</h2>
        ${
            resize((width) => 
                lineChart_multi(pop_3_cat_pro_v, x_3_lk_p_v, y_3_lk_p_v, category_3_lk_p_v, time_3_lk_p_v, title_label_3_lk_p_v, subTitle_label_3_lk_p_v, captionTitle_label_3_lk_p_v, xColumn_label_3_lk_p_v,yColumn_label_3_lk_p_v, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
  </div>
</div>

<div class="grid grid-cols-2">
  <div class="card">
  <h2>Ikäpyramidi</h2>
${resize((width) => 
                pyramidPlot(all_vaenn_14wx, title_label, subTitle_label, captionTitle_label, xColumn_label,yColumn_label, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
 )
}
  </div>
<div class="card">
    <h2>Muuttoliike - 2023</h2> 
    ${
            resize((width) => 
                chordChart(muuttoliike_tulo_lahto)
            )
        }
  </div>
</div>
  <div class="card">
  <h2>Kuntien tilastolliset osa-alueet - 2023</h2>
  <p>Tilastokeskus ylläpitää kuntien tilastollisten osa-alueiden kartta-aineistoa ja luokitusta osa-alueittaista tilastotuotantoa varten. Kunnat päättävät itse aluejaosta ja siihen tehtävistä muutoksista.</p>
    ${resize((width) => 
         choroplethMap(div,vaesto_Tilastoalueet, lat, lng)
        )
    }
  </div>

```js
//Vuonna 2025
const mapTopoJSON = topojson.feature(kunnat2025topo, kunnat2025topo.objects.Kunnat2025_geo).features
const borderMesh = topojson.mesh(maakunnat_2024_topo, maakunnat_2024_topo.objects.maakunnat_2024, (a, b) => a !== b);

let data_population_change = await files[0].file.json();
let data_population_change_12month = await files[1].file.json();
//const mapTopoJSON = topojson.feature(kunnat2024topo, kunnat2024topo.objects.Kunnat2024_geo).features
//const borderMesh = topojson.mesh(maakunnat_2024_topo, maakunnat_2024_topo.objects.maakunnat_2024, (a, b) => a !== b);

const min_max = d3.extent(data_population_change, d => d.muutos)
const min = -1.5
const max = 1.5
const med = 0



const min_max_2 = d3.extent(data_population_change_12month, d => d.muutos)
const min_2 = min_max_2[0]
const max_2 = min_max_2[1]
const med_2 = d3.median(data_population_change_12month, d => d.muutos)

const chart_height = 700
const chart_width = 800
const title_txt_map = "Väkiluvun muutos-% vuoden 2023 lopusta"
const title_txt_map_2 = "Kuntien välinen nettomuutto - viimeiset 12kk"

const mapInterpolatePiYG = d3.scaleDiverging([min, med, max], d3.interpolatePiYG);
const borderColor = "#525252";
const borderColor_2 = "#525252";

const mapInterpolatePiYG_2 = d3.scaleDiverging([min_2, med_2, max_2], d3.interpolatePiYG);


```

<div class="grid grid-cols-2">
  <div class="card">
          ${display(choroplethMapD3(data_population_change, mapInterpolatePiYG, borderColor, borderColor_2, mapTopoJSON, borderMesh, title_txt_map, chart_width, chart_height)) }
  </div>
  <div class="card">
  ${display(choroplethMapD3(data_population_change_12month, mapInterpolatePiYG_2, borderColor, borderColor_2, mapTopoJSON, borderMesh, title_txt_map_2, chart_width, chart_height)) }
    </div>
</div>


```js
const title_label_5_lk = "Väestönmuutokset - Väestöennakko, 5 ikäluokkaa"
const subTitle_label_5_lk = ""
const captionTitle_label_5_lk = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_5_lk = "Vuosi"
const yColumn_label_5_lk = "Lkm"
const x_5_lk = "xColumn"
const y_5_lk = "yColumn"
const category_5_lk = "yColumn_1"
const time_5_lk = "%Y"

const title_label_5_lk_p = "Väestönmuutokset - Väestöennakko, 5 ikäluokkaa %"
const subTitle_label_5_lk_p = ""
const captionTitle_label_5_lk_p = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_5_lk_p = "Vuosi"
const yColumn_label_5_lk_p = "%"
const x_5_lk_p = "xColumn"
const y_5_lk_p = "yColumn"
const category_5_lk_p = "yColumn_1"
const time_5_lk_p = "%Y"
```

<div class="grid grid-cols-2">
  <div class="card">
          ${
            resize((width) => 
                lineChart_multi(pop_5_cat, x_5_lk, y_5_lk, category_5_lk, time_5_lk, title_label_5_lk, subTitle_label_5_lk, captionTitle_label_5_lk, xColumn_label_5_lk,yColumn_label_5_lk, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }

  </div>
    <div class="card">
        ${
            resize((width) => 
                lineChart_multi(pop_5_cat_pro, x_5_lk_p, y_5_lk_p, category_5_lk_p, time_5_lk_p, title_label_5_lk_p, subTitle_label_5_lk_p, captionTitle_label_5_lk_p, xColumn_label_5_lk_p,yColumn_label_5_lk_p, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
  </div>
</div>


```js
const title_label_6_lk = "Väestönmuutokset - Väestöennakko, 6 ikäluokkaa"
const subTitle_label_6_lk = ""
const captionTitle_label_6_lk = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_6_lk = "Vuosi"
const yColumn_label_6_lk = "Lkm"
const x_6_lk = "xColumn"
const y_6_lk = "yColumn"
const category_6_lk = "yColumn_1"
const time_6_lk = "%Y"

const title_label_6_lk_p = "Väestönmuutokset - Väestöennakko, 6 ikäluokkaa %"
const subTitle_label_6_lk_p = ""
const captionTitle_label_6_lk_p = "" + data[0].label + "  (Lähde: " + data[0].source + ", päivitetty: " + data[0].updated.slice(0, 10) + ")"
const xColumn_label_6_lk_p = "Vuosi"
const yColumn_label_6_lk_p = "%"
const x_6_lk_p = "xColumn"
const y_6_lk_p = "yColumn"
const category_6_lk_p = "yColumn_1"
const time_6_lk_p = "%Y"
```

<div class="grid grid-cols-2">
  <div class="card">
          ${
            resize((width) => 
                lineChart_multi(pop_6_cat, x_6_lk, y_6_lk, category_6_lk, time_6_lk, title_label_6_lk, subTitle_label_6_lk, captionTitle_label_6_lk, xColumn_label_6_lk,yColumn_label_6_lk, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }

  </div>
    <div class="card">
        ${
            resize((width) => 
                lineChart_multi(pop_6_cat_pro, x_6_lk_p, y_6_lk_p, category_6_lk_p, time_6_lk_p, title_label_6_lk_p, subTitle_label_6_lk_p, captionTitle_label_6_lk_p, xColumn_label_6_lk_p,yColumn_label_6_lk_p, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, COLOR_13, COLOR_14, COLOR_15)
            )
        }
  </div>
</div>
