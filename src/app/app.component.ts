import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { environment } from '../environments/environment';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Petr';
  pets = new MatTableDataSource<any[]>([]);
  included: any[];
  columnsToDisplay = ['image', 'name'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private apiService: ApiService) {}
  public getPicUrl(picturesData: any[]) {
    const placeholder =
      'https://vignette.wikia.nocookie.net/warriorcatsclanroleplay/images/f/fc/Placeholder-pet.png';
    if (picturesData.length > 0) {
      const picId = picturesData[0].id;
      const pic = this.included.find(include => include.id === picId);
      return pic.attributes.large.url;
    }
    return placeholder;
  }
  public getZip() {
    return new Promise((resolve, reject) => {
      const cookiedZip = document.cookie.match(/zip=(\d{5})/);
      if (cookiedZip) {
        resolve(parseInt(cookiedZip[1], 10));
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          let zip = 90210;
          const { latitude, longitude } = position.coords;
          const geocoder = new google.maps.Geocoder();
          const latlng = new google.maps.LatLng(latitude, longitude);
          geocoder.geocode({ location: latlng }, (results, status) => {
            if (String(status) === 'OK') {
              zip = parseInt(
                results
                  .find(result => result.types.includes('postal_code'))
                  .address_components.find(component =>
                    component.types.includes('postal_code')
                  ).short_name,
                10
              );
            } else {
              reject(status);
            }
            document.cookie = `zip=${zip};max-age=86400`; // set a cookie for 24 hours
            resolve(zip);
          });
        });
      }
    });
  }
  ngOnInit() {
    this.getZip().then(zip => {
      this.apiService.getPets(zip).subscribe(response => {
        console.log(response);
        this.pets.data = response.data;
        this.pets.paginator = this.paginator;
        this.included = response.included;
      });
    });
  }
}
