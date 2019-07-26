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
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getPets().subscribe(data => {
      console.log(data);
    });
  }
}
