import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Petr';
  pets: any[];
  included: any[];
  constructor(private apiService: ApiService) {}
  public getPicUrl(picturesData: any[]) {
    if (picturesData.length > 0) {
      const picId = picturesData[0].id;
      const pic = this.included.find(include => include.id === picId);
      return pic.attributes.large.url;
    }
    return 'https://vignette.wikia.nocookie.net/warriorcatsclanroleplay/images/f/fc/Placeholder-pet.png/revision/latest?cb=20130716185616';
  }
  ngOnInit() {
    this.apiService.getPets().subscribe(response => {
      console.log(response);
      this.pets = response.data;
      this.included = response.included;
    });
  }
}
