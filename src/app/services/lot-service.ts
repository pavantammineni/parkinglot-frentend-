import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LotService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'charset': 'UTF-8'
    })
  };

  constructor(
    public httpClient: HttpClient
  ) { }

  addLot(lotInfo) {
    return this.httpClient.post('http://localhost:8080' + '/api/parkings', lotInfo, this.httpOptions);
  }

  getAllLots() {
    return this.httpClient.get('http://localhost:8080' + '/api/parkings');
  }

  getLotInfo(lotId) {
    return this.httpClient.get('http://localhost:8080' + '/api/parkings/' + lotId);
  }
}
