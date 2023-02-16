import fetchJson from "./utils.js";
import * as AdamRouter from "./router.js";

console.log("%cAll systems are go!", "color: royalblue; font-size: 25px");

const main = document.querySelector("#content");
const API_URL =
  "https://spreadsheets.google.com/feeds/list/1F03XU0D7d4PgkYM36hcgyJU-VCnJKF3RrStEXSECWcE/od6/public/values?alt=json";

const renderHomePage = (allDrugs) => {
  return () => {
    renderHero("Guided substance", "A simple guide to the world's drugs");
    renderCategories(allDrugs)();
  };
};
const renderHero = (heading, subheading) => {
  const hero = document.querySelector("#hero").content;
  const heroClone = hero.cloneNode(true);
  heroClone.querySelector("#heading").textContent = heading;
  heroClone.querySelector("#subheading").textContent = subheading;
  main.appendChild(heroClone);
};

const renderDetail = (drug) => {
  const t = document.querySelector("#drug-detail").content;
  const c = t.cloneNode(true);
  c.querySelector(".image-main").src = `./images/${drug.imageMain}`;
  c.querySelector("h2").textContent = drug.name;
  c.querySelector(".description-content").textContent = drug.description || "";
  c.querySelector(".description-link").setAttribute("href", drug.source || "");
  c.querySelector(".effects-description").textContent = drug.effectsDesc;
  c.querySelector(".image-compound").src = `./images/${drug.imageCompound}`;

  c.querySelector(".street-names").textContent = drug.streetNames;
  c.querySelector(".schedule").textContent = "Schedule " + drug.schedule;
  c.querySelector(".category").textContent = drug.category;
  c.querySelector("iframe").src = drug.youtube;
  drug.effects.forEach((effect) => {
    const li = document.createElement("li");
    li.textContent = effect;
    c.querySelector("#actual-effects").appendChild(li);
  });
  drug.negativeEffects.forEach((effect) => {
    const li = document.createElement("li");
    li.textContent = effect;
    c.querySelector("#side-effects").appendChild(li);
  });

  c.querySelector(".threshold-value").textContent =
    drug.dosage.threshold + drug.dosage.unit;
  c.querySelector(".light-value").textContent =
    drug.dosage.light + drug.dosage.unit;
  c.querySelector(".common-value").textContent =
    drug.dosage.common + drug.dosage.unit;
  c.querySelector(".strong-value").textContent =
    drug.dosage.strong + drug.dosage.unit;

  drug.safetyTips.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    c.querySelector("#safety-tips").appendChild(li);
  });
  drug.risks.forEach((risk) => {
    const li = document.createElement("li");
    li.textContent = risk;
    c.querySelector("#risks").appendChild(li);
  });

  main.appendChild(c);
};

const renderCategories = (allDrugs) => {
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

const renderDetailPage = (allDrugs) => {
  return (name) => {
    const drug = allDrugs.find((drug) => drug.name === name);
    renderDetail(drug);
    renderCategories(allDrugs)();
  };
};

const renderHelpPage = (data) => {
  return () => {
    renderHero(
      "Get in touch",
      "Our team is ready to help you with any drug related questions or problems"
    );
    const helpTemplate = document.querySelector("#help").content;
    const helpTemplateClone = helpTemplate.cloneNode(true);

    main.appendChild(helpTemplateClone);
  };
};

const filterBy = (category) => {
  document.querySelectorAll(`hyper-link[data-category]`).forEach((item) => {
    item.classList.add("hidden");
  });
  document
    .querySelectorAll(`hyper-link[data-category="${category}"]`)
    .forEach((item) => {
      item.classList.remove("hidden");
    });
};

const searchBy = (search) => {
  document.querySelectorAll(`hyper-link[data-name]`).forEach((item) => {
    item.classList.add("hidden");
  });
  [...document.querySelectorAll(`hyper-link[data-name]`)]
    .filter((item) => item.dataset.name.includes(search.toLowerCase()))
    .forEach((item) => {
      item.classList.remove("hidden");
    });
};

const renderAllDrugs = (allDrugs) => {
  return () => {
    const allDrugsTemplate = document.querySelector("#all-drugs").content;
    const allDrugsTemplateClone = allDrugsTemplate.cloneNode(true);

    allDrugs.forEach((drug) => {
      const tile = document.querySelector("#drug-tile").content;
      const tileClone = tile.cloneNode(true);
      tileClone
        .querySelector(".tile")
        .classList.add(`${drug.category.toLowerCase()}`);
      tileClone.querySelector("hyper-link").setAttribute("item", drug.name);
      tileClone
        .querySelector("hyper-link")
        .setAttribute("data-category", drug.category.toLowerCase());
      tileClone
        .querySelector("hyper-link")
        .setAttribute("data-name", drug.name.toLowerCase());
      tileClone.querySelector("img").src = `./images/${drug.imageMain}`;
      tileClone.querySelector("h4").textContent = drug.name;
      allDrugsTemplateClone
        .querySelector(".drugs-container")
        .appendChild(tileClone);
    });

    allDrugsTemplateClone
      .querySelectorAll("input[name=category]")
      .forEach((input) => {
        input.addEventListener("click", () => {
          filterBy(input.dataset.category);
        });
      });

    allDrugsTemplateClone
      .querySelector("#search-box")
      .addEventListener("keyup", (e) => {
        console.log(e.target.value);
        searchBy(e.target.value);
      });

    main.appendChild(allDrugsTemplateClone);
  };
};

fetchJson("/resources/guidedSubstanceData.json").then((data) => {
  const push = AdamRouter.createRoutes({
    GuidedSubstance: renderHomePage(data),
    Detail: renderDetailPage(data),
    AllDrugs: renderAllDrugs(data),
    Help: renderHelpPage(data),
    Categories: renderCategories(data),
  });

  push("GuidedSubstance");
});

const chatButton = document.querySelector("#chat-bubble");

chatButton.addEventListener("click", () => {
  document.querySelector("#chat-bubble").classList.toggle("active");
});

document.querySelector("#burger-button").addEventListener("click", () => {
  document.querySelector(".mobile-navigation").classList.add("active");
});

document.querySelector("#burger-button").addEventListener("click", () => {
  document.querySelector(".mobile-navigation").classList.add("active");
});

document.querySelector(".mobile-navigation").addEventListener("click", () => {
  document.querySelector(".mobile-navigation").classList.remove("active");
});
/* AGE GATE
document.querySelector("#enter").addEventListener("click", () => {
  document.querySelector(".age-gate").classList.add("rollUp");
  window.scrollTo(0, 0);
  localStorage.setItem("entered", true);
  setTimeout(() => {
    document.querySelector(".age-gate").classList.add("hidden");
  }, 1000);
});

document.querySelector("#leave").addEventListener("click", () => {
  window.history.back();
});*/
