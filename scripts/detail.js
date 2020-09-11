console.log("%cAll systems are go!", "color: royalblue; font-size: 25px");

const main = document.querySelector("main");
const API_URL =
  "https://spreadsheets.google.com/feeds/list/1F03XU0D7d4PgkYM36hcgyJU-VCnJKF3RrStEXSECWcE/od6/public/values?alt=json";

fetchJson(API_URL).then((data) => {
  console.log(data);
  data.forEach((drug) => {
    const t = document.querySelector("#drug-tile").content;
    const c = t.cloneNode(true);
    c.querySelector("img").src = `./images/${drug.imageMain}`;
    c.querySelector("h2").textContent = drug.name;
    main.appendChild(c);
  });
});
