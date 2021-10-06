import React from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { GOOGLE_MAPS_API_KEY } from "../../constants/api-keys";
import "./maps.css";

//loading map with @googlemaps/js-api-loader library
const Maps = ({ location }) => {
  const loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });

  loader
    .load()
    .then((google) => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 8,
      });

      new google.maps.Marker({
        position: location,
        map: map,
      });
    })
    .catch((e) => {
      // do something
      console.log(e);
    });

  return <div id="map"></div>;
};

export default Maps;
