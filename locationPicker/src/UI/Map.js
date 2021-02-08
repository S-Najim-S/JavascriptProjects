export class Map {
  constructor(coord) {
    this.render(coord);
  }

  render(coordinates) {
    if (!google) {
      alert("Could not load Maps - Please try again later!");
      return;
    }
    const map = new google.maps.Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 16,
    });

    new google.maps.Marker({
      position: coordinates,
      map: map,
    });
  }
}
