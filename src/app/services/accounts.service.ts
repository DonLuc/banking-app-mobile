import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BASE_URL = "http://localhost:4041"
@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  accountToQuery: string = ""
  constructor(private httpClient: HttpClient) { }

  getAccounts() {
    return this.httpClient.get(BASE_URL + '/accounts/')
  }

  withdraw(accountNumber: string, amount: number ) {
    return this.httpClient.post(BASE_URL + "/withdraw", {
      "accountNumber": accountNumber,
      "amount": amount
    })
  }

  deposit(accountNumber: string, amount: number ) {
    return this.httpClient.post(BASE_URL + "/deposit", {
      "accountNumber": accountNumber,
      "amount": amount
    })
  }


}
