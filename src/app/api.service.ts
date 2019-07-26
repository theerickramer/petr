import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_KEY = environment.apiKey;

  constructor(private httpClient: HttpClient) {}

  public getPets() {
    // tslint:disable-next-line:max-line-length
    const url = `https://api.rescuegroups.org/v5/public/animals/search/available/cats/haspic?include=breeds,colors,fosters,locations,orgs,patterns,pictures,species,videos,videourls&fields[animals]=name,sex&fields[orgs]=name,email,url,facebookUrl,adoptionUrl&fields[breeds]=name&fields[colors]=name&fields[fosters]=name,email&fields[locations]=name&fields[patterns]=name&fields[pictures]=large,small&fields[species]=singular&fields[videos]=url&fields[videourls]=url,urlThumbnail&options=meta&limit=10`;
    const data = {
      filters: [],
      filterRadius: {
        miles: 100,
        postalcode: 90210
      }
    };
    const options = {
      headers: new HttpHeaders({
        Authorization: this.API_KEY,
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<Response>(url, data, options);
  }
}
