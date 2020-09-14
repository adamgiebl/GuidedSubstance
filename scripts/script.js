import fetchJson from "./utils.js";
import * as AdamRouter from "./router.js";

console.log("%cAll systems are go!", "color: royalblue; font-size: 25px");

const main = document.querySelector("#content");
const API_URL =
  "https://spreadsheets.google.com/feeds/list/1F03XU0D7d4PgkYM36hcgyJU-VCnJKF3RrStEXSECWcE/od6/public/values?alt=json";

const renderTiles = (allDrugs) => {
  return () => {
    const categories = document.querySelector("#categories").content;
    const categoriesClone = categories.cloneNode(true);

    allDrugs.forEach((drug) => {
      const tile = document.querySelector("#drug-tile").content;
      const tileClone = tile.cloneNode(true);
      tileClone.querySelector("hyper-link").setAttribute("item", drug.name);
      tileClone.querySelector("img").src = `./images/${drug.imageMain}`;
      tileClone.querySelector("h4").textContent = drug.name;
      categoriesClone
        .querySelector(`#${drug.category.toLowerCase()}`)
        .appendChild(tileClone);
    });

    main.appendChild(categoriesClone);
  };
};

const renderDetail = (allDrugs) => {
  return (name) => {
    const drug = allDrugs.find((drug) => drug.name === name);
    console.log(drug);
    const t = document.querySelector("#drug-detail").content;
    const c = t.cloneNode(true);
    c.querySelector(".image-main").src = `./images/${drug.imageMain}`;
    c.querySelector("h2").textContent = drug.name;
    c.querySelector(".description-content").textContent =
      drug.description || "";
    c.querySelector(".description-link").setAttribute(
      "href",
      drug.source || ""
    );
    c.querySelector(".effects-description").textContent = drug.effectsDesc;
    console.log(
      "renderDetail -> c.querySelector('.image-compound')",
      c.querySelector(".image-compound")
    );
    c.querySelector(".image-compound").src = `./images/${drug.imageCompound}`;

    c.querySelector(".street-names").textContent = drug.streetNames;
    c.querySelector(".schedule").textContent = "Schedule " + drug.schedule;
    c.querySelector(".category").textContent = drug.category;
    c.querySelector("iframe").src = drug.youtube;
    main.appendChild(c);
  };
};

fetchJson(API_URL).then((data) => {
  const push = AdamRouter.createRoutes({
    GuidedSubstance: renderTiles(data),
    Detail: renderDetail(data),
  });

  push("Detail", "LSD");
});
