import apiClient from "../http-common";
import ChangeUrl from "../ChangeUrl"

  const listFilm=async ()=> {
    try {
      let dataGroupes = ["characters","planets","starships","vehicles","species"]
    let res = await apiClient.get("/films/")

   /*  res.data["results"]=await ChangeUrl.multiplesUrlToIdAndName(res.data["results"],dataGroupes)
    for (let i = 0 ; i < data.data.results.length;i++){
      res.data.results[i]["title"]=data.data.results[i]["title"].toLowerCase()
    } */

    return res.data.results;
    } catch (error) {
      throw error;
    }
    
  }

 const getFilmById= async (id)=> {
  try {
     let dataGroupes = ["characters","planets","starships","vehicles","species"]
    let res = await apiClient.get("/films/" + id)
    console.log(res)
    res.data["results"]=await ChangeUrl.urlToIdAndName(res.data,dataGroupes)
    res.data.results["title"]=res.data.results["title"].toLowerCase()
    return res.data.results;
  } catch (error) {
    throw error;
  }
   
  }

  const searchFilm=async (searchInput) =>{
    let dataGroupes = ["characters","planets","starships","vehicles","species"]
    let data = await apiClient.get("/films/?search=" + searchInput)
    data.data["results"]=await ChangeUrl.urlToIdAndName(data.data["results"][0],dataGroupes)
    data.data.results["title"]=data.data.results["title"].toLowerCase()
    return data;
  }

  export { listFilm, getFilmById, searchFilm };
