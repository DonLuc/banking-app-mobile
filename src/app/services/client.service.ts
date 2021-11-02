import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = "http://localhost:4041"
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }
  
  getClients() {
    return this.httpClient.get(BASE_URL + '/clients')
  }

  getClientByUsername(username: string) {
    return this.httpClient.post(BASE_URL + '/client', {
      "clientName": username
    })
  }
}