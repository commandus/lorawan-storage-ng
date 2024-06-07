import { Component, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionViewer, ListRange, SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Observable, delay, startWith, tap } from 'rxjs';
import { Device } from '../model/device';
import { JsonService } from '../service/json.service';
import { EnvService } from '../service/env.service';
import { DeviceDataSource } from '../service/device.ds.service';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

class dumbCollectionViewer implements CollectionViewer {
  viewChange!: Observable<ListRange>;
}

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatPaginatorModule, MatProgressBarModule, MatTableModule, MatSortModule,
    MatButtonModule, MatTooltipModule ],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public ds: DeviceDataSource;
  public selection = new SelectionModel<number>(true, []);
  public selectionMode = 0; // 0- manually selected, 1- select all, 2- unselect all
  public displayedColumns: string[] = ['addr', "activation", "class", "deveui", "nwkSKey", "appSKey", "version", "appeui", "appKey", "nwkKey", "devNonce", "joinNonce", 'name'];
  
  constructor(
    public env: EnvService,
    public json: JsonService
  ) {
    this.ds = new DeviceDataSource(this.env, this.json);
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith(null),
        delay(0),
        tap(() => {
          this.load();
        })
        )
      .subscribe();
    
    this.sort.sortChange
    .pipe(
      tap(() => {
        this.paginator.pageIndex = 0;
        this.load();
      })
    )
    .subscribe();

    this.ds.connect(new dumbCollectionViewer).subscribe(value => {
      this.paginator.length = this.ds.count;
    });
  }

  load(): void {
    this.ds.load(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize);
  }

  edit(row: Device) {
    this.env.showDevice(row).then(
      v => {
        if (v =='saved') {
          this.load();
        }
        if (v =='removed') {
          this.load();
        }
      });
  }

  add() {
    this.env.showDevice(new Device).then(
      v => {
        if (v =='saved') {
          this.load();
        }
      });
  }

  reload(): void {
    this.paginator.pageIndex = 0;
    this.load();
  }

}
