import {FileAttachment} from "observablehq:stdlib";

// //Texts
export const texts = (await FileAttachment("../../data/report/report.csv")
              .csv({typed: true}));
