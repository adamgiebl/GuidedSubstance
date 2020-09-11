const fetchJson = async (url) => {
  const response = await fetch(url);
  const {
    feed: { entry: allDrugs },
  } = await response.json();
  return allDrugs.map((drug) => JSON.parse(drug.gsx$json.$t));
};

export default fetchJson;
