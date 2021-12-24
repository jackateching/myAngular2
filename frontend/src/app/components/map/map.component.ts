import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitude = 38.0;
  longitude = -100;
  locationChosen = false;

  constructor() { }

  ngOnInit(): void {
  }

  onChoseLocation(event:any){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }
}
