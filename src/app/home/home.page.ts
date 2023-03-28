import { Component } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;

  constructor() {}

  async ionViewDidEnter() {

    Geolocation.watchPosition({ enableHighAccuracy: true, maximumAge : 0 }, (coordinates) => {
      console.log('Current position:', coordinates);
      if (coordinates) {
        this.map = L.map('mapId').setView([ coordinates.coords.latitude, coordinates.coords.longitude ], 20);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',  {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);

        const markPoint = L.marker([ coordinates.coords.latitude, coordinates.coords.longitude ], {
          title: 'Estou aqui',
          icon: L.icon({
            iconUrl: 'https://cdn.kernvalley.us/img/adwaita-icons/actions/mark-location.svg',
            iconSize: [32, 32]
        })});
        markPoint.bindPopup('<p>Estou aqui!</p>')
        this.map.addLayer(markPoint);
      }
    });

  }

  ionViewDidLeave(){
    this.map.remove();
  }
}
