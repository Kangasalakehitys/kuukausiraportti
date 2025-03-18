import {csvFormat, csvParse} from "d3-dsv";
//node /Users/kanga/Documents/Observable/testi/src/data/report/report.csv.js

async function text(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return response.text();
}

//const csvURL = "https://gist.githubusercontent.com/Juuso1/bcf73887d82a9498403351785758e8a4/raw/data_urls.csv";
const csvURL = "https://gist.githubusercontent.com/Juuso1/3b99b4d966dc8dcb1d94432d50e97e90/raw/ae0ec3286121c2831e7c9062dc27fe425ac3601b/migration.csv";

// Load and parse launch-log and trim down to smaller size.
const data = csvParse(await text(csvURL), (d) => ({
  source: d.source,
  target: d.target,
  value: d.value
}));

  //Log must be console.warn if console.log JSON dont work
  console.warn(data)

  // Write out csv formatted data.
  process.stdout.write(csvFormat(data));
