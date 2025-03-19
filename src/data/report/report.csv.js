import {csvFormat, tsvParse} from "d3-dsv";
//node /Users/kanga/Documents/Observable/testi/src/data/report/report.csv.js


async function text(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return response.text();
}


//const csvURL = "https://gist.githubusercontent.com/Juuso1/bcf73887d82a9498403351785758e8a4/raw/data_urls.csv";
const tsvURL = "https://gist.githubusercontent.com/Juuso1/7698ab25254095f52b42a3e74ddb6baa/raw/1b41200c306d8f1c6497af101f0bb2cbf1ee333e/txt_urls.tsv";



// Load and parse launch-log and trim down to smaller size.
const tekstit = tsvParse(await text(tsvURL), (d) => ({
  id: d.Id,
  cat_1_fi: d.Category1_fi,
  cat_2_fi: d.Category2_fi,
  cat_1_en: d.Category1_en,
  cat_2_en: d.Category2_en,
  rec_index: d.Recommandation_index,
  two_layout: d.Two_column_layout,
  three_layout: d.Three_column_layout,
  chart: d.Chart,
  table: d.Table,
  title_fi: d.Title_fi,
  title_en: d.Title_en,
  text_fi: d.Text_fi,
  text_en: d.Text_en,
  description_fi: d.Description_fi,
  description_en: d.Description_en,
  url: d.Url,
}));

  //Log must be console.warn if console.log JSON dont work
  console.warn(tekstit)

  // Write out csv formatted data.
  process.stdout.write(csvFormat(tekstit));

