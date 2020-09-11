console.log("%cAll systems are go!", "color: royalblue; font-size: 25px");

const main = document.querySelector("main");
const API_URL =
  "https://spreadsheets.google.com/feeds/list/1F03XU0D7d4PgkYM36hcgyJU-VCnJKF3RrStEXSECWcE/od6/public/values?alt=json";

fetch(API_URL)
  .then((data) => data.json())
  .then(({ feed }) => {
    console.log(feed.entry);

    feed.entry.forEach((element) => {
      main.insertAdjacentHTML(
        "beforeend",
        `
        <div>
        <h2>${element.gsx$name.$t}</h2>
        <p>${element.gsx$category.$t}</p>
        <img src="./images/${element.gsx$image.$t}">
        </div>
      `
      );
    });
  });
