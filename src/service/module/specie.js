import apiClient from "../http-common";
import ChangeUrl from "../ChangeUrl";

const listSpecies = async (page = 1) => {
  let dataGroupes = ["films", "homeworld", "people"];
  let data = await apiClient.get("/species/?page=" + page);
/*   data.data["results"] = await ChangeUrl.multiplesUrlToIdAndName(
    data.data["results"],
    dataGroupes
  );
  for (let i = 0; i < data.data.results.length; i++) {
    data.data.results[i]["name"] = data.data.results[i]["name"].toLowerCase();
  } */

  return data.data;
};

const getSpecieById = async (id) => {
  let dataGroupes = ["films", "homeworld", "people"];
  let data = await apiClient.get("/species/" + id);
  data.data["results"] = await ChangeUrl.urlToIdAndName(data.data, dataGroupes);
  data.data.results["name"] = data.data.results["name"].toLowerCase();
  console.log(data.data)
  return data.data;
};

const searchSpecie = async (searchInput) => {
  let dataGroupes = ["films", "homeworld", "people"];
  let data = await apiClient.get("/species/?search=" + searchInput);
  data.data["results"] = await ChangeUrl.urlToIdAndName(
    data.data["results"][0],
    dataGroupes
  );
  data.data.results["name"] = data.data.results["name"].toLowerCase();
  return data;
};

export { listSpecies, getSpecieById, searchSpecie };
