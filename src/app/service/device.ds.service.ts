import { CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { JsonService } from '../service/json.service';
import { Device } from '../model/device';
import { RequestLs } from '../model/request-ls-device';
import { EnvService } from './env.service';

/**
 * @see https://blog.angular-university.io/angular-material-data-table/
 * @see https://github.com/angular-university/angular-material-course/tree/2-data-table-finished
 */
export class DeviceDataSource implements DataSource<Device> {
  private subject = new BehaviorSubject<Device[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading = this.loadingSubject.asObservable();
  public count = 0;

  constructor(
    private env: EnvService,
    private service: JsonService
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<Device[]> {
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.subject.complete();
      this.loadingSubject.complete();
  }

  load(
    ofs: number,
    pagesize: number
  ): void {
    // this.env.settings
    this.loadingSubject.next(true);
    let r = new RequestLs;
    this.service.lsDevice(r)
    .subscribe(
      value => {
        if (value.length) 
          this.count = value.length;
        else
          this.count = 0;
        this.subject.next(value);
        this.loadingSubject.next(false);
      });
  }
}
