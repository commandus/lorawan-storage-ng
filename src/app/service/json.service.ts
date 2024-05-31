import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Device } from '../model/device';
import { RequestLs } from '../model/request-ls-device';
import { RequestChangeDevice } from '../model/request-ch-device';
import { RequestGetByAddr } from '../model/request-get-by-addr';
import { RequestGetByEui } from '../model/request-get-by-eui';
import { RequestCount } from '../model/request-count-device';

class EndPoint {
  public url = "";
  public name = "";
  public selected = false;
}

// @see https://stackoverflow.com/questions/65152373/typescript-serialize-bigint-in-json
declare global
{
  interface BigInt {
    /** Convert to BigInt to string form in JSON.stringify */
    toJSON: () => string;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

BigInt.prototype.toJSON = function() { return this.toString() }

export class EndPointList {
  public endpoints: EndPoint[] = [
    { url: "http://localhost:4246", name: "Тест(локальный)", selected: true }
  ];
  public current = this.endpoints[0];

  public select(name: string | null) : void {
    if (name == null) {
      this.current = this.endpoints[0];
      return;
    }
    this.endpoints.forEach(e => {
      e.selected = e.name == name;
      if (e.selected)
        this.current = e;
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  public endpoints = new EndPointList;

  constructor(private httpClient: HttpClient) { }

  getDeviceByAddr(request: RequestGetByAddr): Observable<Device> {
    return this.httpClient.post<Device>(this.endpoints.current.url, request);
  }
  getDeviceByEui(request: RequestGetByEui): Observable<Device> {
    return this.httpClient.post<Device>(this.endpoints.current.url, request);
  }

  lsDevice(request: RequestLs): Observable<Device[]> {
    return this.httpClient.post<Device[]>(this.endpoints.current.url, request);
  }

  countDevice(request: RequestCount): Observable<number> {
    return this.httpClient.post<number>(this.endpoints.current.url, request);
  }

  chDevice(request: RequestChangeDevice): Observable<Device> {
    return this.httpClient.post<Device>(this.endpoints.current.url, request);
  }
}
