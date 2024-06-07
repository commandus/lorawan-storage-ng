import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Device } from '../model/device';
import { RequestLs } from '../model/request-ls-device';
import { RequestPutDevice } from '../model/request-put-device';
import { RequestGetByAddr } from '../model/request-get-by-addr';
import { RequestGetByEui } from '../model/request-get-by-eui';
import { RequestCount } from '../model/request-count-device';
import { RequestCloseResources } from '../model/request-close-resources';
import { EndPointList } from '../model/service-end-point';
import { RequestRemoveDevice } from '../model/request-rm-device';

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

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  public endpoints = new EndPointList;

  constructor(private httpClient: HttpClient) {
    this.endpoints.add({ url: "http://localhost:4246", name: "Тест(локальный)", selected: true });
  }

  getDeviceByAddr(request: RequestGetByAddr): Observable<Device> {
    return this.httpClient.post<Device>(this.endpoints.current.url, request).pipe(
      map((value:Device) => {
        value.addr = request.addr;
        return value;
    }));
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

  chDevice(request: RequestPutDevice): Observable<Device> {
    return this.httpClient.post<Device>(this.endpoints.current.url, request);
  }

  rmDevice(request: RequestRemoveDevice): Observable<number> {
    return this.httpClient.post<number>(this.endpoints.current.url, request);
  }

  closeResources(request: RequestCloseResources): Observable<Device> {
    return this.httpClient.post<Device>(this.endpoints.current.url, request);
  }

}
