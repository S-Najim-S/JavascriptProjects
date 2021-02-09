import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromAddress, getAddressFromCords } from "./Utility/Location";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");

    locateBtn.addEventListener("click", this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  sharePlaceHandler() {
    const shareLinkInput = document.getElementById("share-link");
    if (!navigator.clipboard) {
      shareLinkInput.select();
      return;
    }
    navigator.clipboard
      .writeText(shareLinkInput.value)
      .then(() => {
        alert("link copied in clipboard");
      })
      .catch((err) => {
        console.log(err);
        shareLinkInput.select();
      });
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;
    const shareLinkInput = document.getElementById("share-link");
    shareLinkInput.value = `${location.origin}/my-place?address=${encodeURI(
      address
    )}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
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
      async (successResult) => {
        const cordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };

        const address = await getAddressFromCords(cordinates);
        modal.hide();
        this.selectPlace(cordinates, address);
      },
      (error) => {
        modal.hide();
        alert("an error occured while getting your location!");
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();

    const address = event.target.querySelector("input").value;

    if (!address || address.trim().length === 0) {
      alert("Invalid address - Please enter a valid address!");

      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location please wait!!!"
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates, address);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }
}

const placefinder = new PlaceFinder();
