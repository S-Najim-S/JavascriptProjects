import { Map } from "./UI/Map";

class LoadPlace {
  constructor(coords, address) {
    new Map(coords);
    const headerTitle = document.querySelector("header h1");
    headerTitle.textContent = address;
  }
}

const url = new URL(location.href);
const addressParams = url.searchParams;

const coordinates = {
  lat: +addressParams.get("lat"),
  lng: +addressParams.get("lng"),
};
const address = addressParams.get("address");

new LoadPlace(coordinates, address);
