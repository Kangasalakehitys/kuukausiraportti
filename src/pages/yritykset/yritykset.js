import {FileAttachment} from "observablehq:stdlib";
import {utcFormat} from "d3-time-format";

//Timeformat
const formatYear4 = utcFormat("%Y %q");
const quarterFormat = d => `Q${utcFormat('%y-%q')(d)}`;

function kvartaaliMuunnos(a) {
  let result;
  if (a === "1") {
    result = "01-01";
  } 
  else if (a === "2") {
    result = "04-01";
  }
  else if (a === "3") {
    result = "07-01";
  }
  else if (a === "4") {
    result = "10-01";
  }
  return result;
}

// //Data
export const aly_pxt_11yq = (await FileAttachment("../../data/stat/yritykset/aly_pxt_11yq.json")
            .json())
                .map(d => ({
                    ...d,
                    //AIka
                    xColumn: new Date(d.data.xColumn_1.slice(0, 4)+'-' + kvartaaliMuunnos(d.data.xColumn_1.slice(5, 6))),
                    //TOimiala 
                    xColumn_1: d.data.xColumn_3,
                    //Tiedot
                    xColumn_2: d.data.xColumn_4,
                    xColumn_3: d.data.xColumn_2,
                    yColumn: +d.data.yColumn_1,
                    yColumn_1: +d.data.yColumn_2,
                    yColumn_2: +d.data.yColumn_3,
                    updated: d.meta.updated,
                    label: d.meta.label,
                    source: d.meta.source
                }))

//Filters
export const all_aly_pxt_11yq = aly_pxt_11yq.filter(function (suodatus) {
    if (suodatus.xColumn_1 == "SSS") return  suodatus.xColumn_1 = "Yhteensä"
});



//Flat
export const flat_all_aly_pxt_11yq = all_aly_pxt_11yq
  .flatMap(({xColumn, ...categories}) => Object.entries(categories)
    .map(([xColumn_1, yColumn]) => ({
      xColumn, 
      xColumn_1, 
      yColumn
    }))
  ).filter(function (suodatus) {
    return (suodatus.xColumn_1 === 'yColumn' || suodatus.xColumn_1 === 'yColumn_1' || suodatus.xColumn_1 === 'yColumn_2')
  }).filter(function (suodatus) {
    return suodatus.xColumn_1 === "yColumn" ? suodatus.xColumn_1 = "Aloittaneet yritykset" 
    : suodatus.xColumn_1 === "yColumn_1" ? suodatus.xColumn_1 = "Lopettaneet yritykset"
    : suodatus.xColumn_1 === "yColumn_2" ? suodatus.xColumn_1 = "Yrityskanta"
    : suodatus.xColumn_1
    }).filter(function (suodatus) {
      return (suodatus.xColumn_1 != "Yrityskanta")
      })


//Toimialat 
export const part_1_aly_pxt_11yq = aly_pxt_11yq.filter(function (suodatus) {

    if (
      suodatus.xColumn_1 == "C" || 
      suodatus.xColumn_1 == "Q" || 
      suodatus.xColumn_1 == "F" ||
      suodatus.xColumn_1 == "N" ||
      suodatus.xColumn_1 == "P" ||
      suodatus.xColumn_1 == "G" ||
      suodatus.xColumn_1 == "M"
      )
     return  suodatus.xColumn_1
  
});

export const part_2_aly_pxt_11yq = aly_pxt_11yq.filter(function (suodatus) {

    if (
      suodatus.xColumn_1 == "A" || 
      suodatus.xColumn_1 == "B" || 
      suodatus.xColumn_1 == "D" ||
      suodatus.xColumn_1 == "E" ||
      suodatus.xColumn_1 == "H" ||
      suodatus.xColumn_1 == "I" ||
      suodatus.xColumn_1 == "J" ||
      suodatus.xColumn_1 == "K" ||
      suodatus.xColumn_1 == "L" ||
      suodatus.xColumn_1 == "O" ||
      suodatus.xColumn_1 == "R" ||
      suodatus.xColumn_1 == "S" ||
      suodatus.xColumn_1 == "T" ||
      suodatus.xColumn_1 == "U"
      )
     return  suodatus.xColumn_1
});
// //Change all names
const part_3_aly_pxt_11yq = aly_pxt_11yq.filter(function (suodatus) {

    return suodatus.xColumn_1 == "C" ? suodatus.xColumn_1 = "C Teollisuus"
      : suodatus.xColumn_1 == "Q" ? suodatus.xColumn_1 = "Q Terveys- ja sosiaalipalvelut"
      : suodatus.xColumn_1 == "F" ? suodatus.xColumn_1 = "F Rakentaminen"
      : suodatus.xColumn_1 == "N" ? suodatus.xColumn_1 = "N Hallinto- ja tukipalvelutoiminta"
      : suodatus.xColumn_1 == "P" ? suodatus.xColumn_1 = "P Koulutus"
      : suodatus.xColumn_1 == "G" ? suodatus.xColumn_1 = "G Tukku- ja vähittäiskauppa"
      : suodatus.xColumn_1 == "A" ? suodatus.xColumn_1 = "A Maatalous, metsätalous ja kalatalous"
      : suodatus.xColumn_1 == "B" ? suodatus.xColumn_1 = "B Kaivostoiminta ja louhinta"
      : suodatus.xColumn_1 == "D" ? suodatus.xColumn_1 = "D Sähkö-, kaasu- ja lämpöhuolto"
      : suodatus.xColumn_1 == "E" ? suodatus.xColumn_1 = "E Vesihuolto, viemäri- ja jätevesihuolto"
      : suodatus.xColumn_1 == "H" ? suodatus.xColumn_1 = "H Kuljetus ja varastointi"
      : suodatus.xColumn_1 == "I" ? suodatus.xColumn_1 = "I Majoitus- ja ravitsemistoiminta"
      : suodatus.xColumn_1 == "J" ? suodatus.xColumn_1 = "J Informaatio ja viestintä"
      : suodatus.xColumn_1 == "K" ? suodatus.xColumn_1 = "K Rahoitus- ja vakuutustoiminta"
      : suodatus.xColumn_1 == "L" ? suodatus.xColumn_1 = "L Kiinteistöalan toiminta"
      : suodatus.xColumn_1 == "M" ? suodatus.xColumn_1 = "M Ammatillinen, tieteellinen ja tekninen toiminta"
      : suodatus.xColumn_1 == "O" ? suodatus.xColumn_1 = "N Hallinto- ja tukipalvelutoiminta"
      : suodatus.xColumn_1 == "R" ? suodatus.xColumn_1 = "R Taiteet, viihde ja virkistys"
      : suodatus.xColumn_1 == "S" ? suodatus.xColumn_1 = "S Muu palvelutoiminta"
      : suodatus.xColumn_1 == "T" ? suodatus.xColumn_1 = "T Kotitalouksien toiminta työnantajina"
      : suodatus.xColumn_1 == "U" ? suodatus.xColumn_1 = "U Kansainvälisten organisaatioiden ja toimielinten toiminta"
      : suodatus.xColumn_1
  
});


