import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EndPointList } from '../model/service-end-point';

@Injectable({
  providedIn: 'root'
})
export class UrnService {
  public endpoints = new EndPointList;
  constructor(private httpClient: HttpClient) {
    this.endpoints.add({ url: "http://localhost:4248", name: "Тест(локальный)", selected: true });
  }

  getUrnByAddr(addr: string): Observable<string> {
    const urn = 'LW:D0:::PXA' + addr;
    return this.httpClient.post(this.endpoints.current.url, urn, { responseType: 'text' });
  }
  
}