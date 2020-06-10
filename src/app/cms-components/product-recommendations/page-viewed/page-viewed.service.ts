import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PageViewedService {
  private clickUrl = 'https://click-stream.k112ac.cx-coe.shoot.canary.k8s-hana.ondemand.com';

  constructor(private http: HttpClient) {
  }

  postView ( customer: string, product: string, auth: boolean ): Observable<any> {
    console.log( customer + product + auth );
    let body = {
      productId: product,
      personId: customer,
      auth: auth ? "yes" : "no"
    };

    var response = this.http.post(this.clickUrl,body,httpOptions);
    console.log(`response = ${JSON.stringify(response)}`);
    return response;
  }
}
