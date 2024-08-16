import apiClient from "../http-common";
import ChangeUrl from "../ChangeUrl"

  const listFilm=async ()=> {
    let dataGroupes = ["characters","planets","starships","vehicles","species"]
    let data = await apiClient.get("/films/")
    data.data["results"]=await ChangeUrl.multiplesUrlToIdAndName(data.data["results"],dataGroupes)
    for (let i = 0 ; i < data.data.results.length;i++){
      data.data.results[i]["title"]=data.data.results[i]["title"].toLowerCase()
    }
    return data;
  }

 const getFilmById= async (id)=> {
    let dataGroupes = ["characters","planets","starships","vehicles","species"]
    let data = await apiClient.get("/films/" + id)
    console.log(data.data)
    data.data["results"]=await ChangeUrl.urlToIdAndName(data.data,dataGroupes)
    data.data.results["title"]=data.data.results["title"].toLowerCase()
    return data.data;
  }

  const searchFilm=async (searchInput) =>{
    let dataGroupes = ["characters","planets","starships","vehicles","species"]
    let data = await apiClient.get("/films/?search=" + searchInput)
    data.data["results"]=await ChangeUrl.urlToIdAndName(data.data["results"][0],dataGroupes)
    data.data.results["title"]=data.data.results["title"].toLowerCase()
    return data;
  }

  export { listFilm, getFilmById, searchFilm };
