import { createRouter, createWebHistory, stringifyQuery } from "vue-router";
import Home from "/src/views/Home.vue";
import People from "../views/People.vue";
import Specie from "../views/Specie.vue";
import Vehicle from "../views/Vehicle.vue";
import Film from "../views/Film.vue";
import Starship from "../views/Starship.vue";
import Planet from "../views/Planet.vue";
import Quizz from "../views/Quizz.vue";
import DescriptionPeople from "../components/people/DescriptionPeople.vue";
import DescriptionSpecie from "../components/specie/DescriptionSpecie.vue";
import DescriptionStarship from "../components/starship/DescriptionStarship.vue";
import DescriptionVehicle from "../components/vehicle/DescriptionVehicle.vue";
import DescriptionPlanet from "../components/planet/DescriptionPlanet.vue";
import DescriptionFilm from "../components/film/DescriptionFilm.vue";

import Search from "../views/Search.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/people",
    name: "People",
    component: People,
    children: [
      {
        path: "",
        redirect: "/people/1",
      },
      {
        path: ":id",
        component: DescriptionPeople,
        name: "PeopleDetails",
        props: true,
      },
    ],
  },
  {
    path: "/species",
    name: "Species",
    component: Specie,
    children: [
      {
        path: "",
        redirect: "/species/1",
      },
      {
        path: ":id",
        component: DescriptionSpecie,
        name: "SpecieDetails",
        props: true,
      },
    ],
  },
  {
    path: "/starships",
    name: "Starships",
    component: Starship,
    children: [
      {
        path: "",
        redirect: "/starships/2",
      },
      {
        path: ":id",
        component: DescriptionStarship,
        name: "StarshipDetails",
        props: true,
      },
    ],
  },
  {
    path: "/planets",
    name: "Planets",
    component: Planet,
    children: [
      {
        path: "",
        redirect: "/planets/1",
      },
      {
        path: ":id",
        component: DescriptionPlanet,
        name: "PlanetDetails",
        props: true,
      },
    ],
  },

  {
    path: "/films",
    name: "Movie",
    component: Film,
    children: [
      {
        path: "",
        redirect: "/films/1",
      },
      {
        path: ":id",
        component: DescriptionFilm,
        name:"MovieDetails",
        props: true,
      },
    ],
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    component: Vehicle,
    children: [
      {
        path: "",
        redirect: "/vehicles/4",
      },
      {
        path: ":id",
        component: DescriptionVehicle,
        name: "VehicleDetails",
        props: true,
      },
    ],
  },
  {
    path: "/quizz",
    name: "Quizz",
    component: Quizz,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
