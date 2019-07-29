import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as qs from 'query-string';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_KEY = environment.apiKey;

  constructor(private httpClient: HttpClient) {}

  public getPets() {
    const url =
      'https://api.rescuegroups.org/v5/public/animals/search/available/';
    const queryOptions = {
      'fields[animals]': ['name', 'sex'],
      'fields[breeds]': 'name',
      'fields[colors]': 'name',
      'fields[fosters]': ['name', 'email'],
      'fields[locations]': 'name',
      'fields[orgs]': ['name', 'email', 'url', 'facebookUrl', 'adoptionUrl'],
      'fields[patterns]': 'name',
      'fields[pictures]': ['large', 'small'],
      'fields[species]': 'singular',
      'fields[videos]': 'url',
      'fields[videourls]': ['url', 'urlThumbnail'],
      include: [
        'breeds',
        'colors',
        'fosters',
        'locations',
        'orgs',
        'patterns',
        'pictures',
        'species',
        'videos',
        'videourls'
      ],
      limit: '10',
      options: 'meta',
      sort: '-animals.createdDate'
    };
    const query = qs.stringify(queryOptions, { arrayFormat: 'comma'});
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
    return this.httpClient.post<Response>(`${url}?${query}`, data, options);
  }
}
