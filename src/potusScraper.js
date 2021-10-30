const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const url =
  "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States";

async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const listItems = $("td > b > a");
    // Stores data for all presidents
    let presidents = [];
    // Use .each method to loop through the element we selected
    listItems.each((idx, el) => {
      // Object holding data for each president
      let pres = { name: "", number: "" };
      // Select the text content of "a" elements
      // Store the textcontent in the above object
      pres.name = $(el).text();
      pres.number = idx + 1;
      // Populate presidents array
      presidents.push(pres);
    });
    // Logs presidents array to the console
    console.log(presidents);
    // Write presidents array in prsidents.json file
    fs.writeFile(
      "presidents.json",
      JSON.stringify(presidents, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file");
      }
    );
  } catch (err) {
    console.error(err);
  }
}
//call fxn
scrapeData();
