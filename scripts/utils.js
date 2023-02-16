const fetchJson = async (url) => {
  const response = await fetch(url);
  console.log(response);
  const allDrugs = await response.json();
  console.log(allDrugs);
  return allDrugs.map((drug) => JSON.parse(drug.json));
};

export default fetchJson;
