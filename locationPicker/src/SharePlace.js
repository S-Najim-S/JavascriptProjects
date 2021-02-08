import { Modal } from "./UI/Modal";
// import { Map } from "./UI/Map";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateBtn = document.getElementById("locate-btn");

    locateBtn.addEventListener("click", this.locateUserHandler);

    addressForm.addEventListener("submit", this.findAddressHandler);
  }

  selectCoor(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
  }
  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "Your browser doesn't supprot geolocation! please try add your location manually."
      );
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location please wait!!!"
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      (successResult) => {
        modal.hide();
        const cordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };

        console.log(cordinates);
      },
      (error) => {
        modal.hide();
        alert("an error occured while getting your location!");
      }
    );
  }

  findAddressHandler() {}
}

const placefinder = new PlaceFinder();
