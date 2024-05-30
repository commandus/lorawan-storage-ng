import { Component, ViewChild } from '@angular/core';
import { CollectionViewer, ListRange, SelectionModel } from '@angular/cdk/collections';
import { RcrJsonService } from '../rcr-json.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, delay, startWith, tap } from 'rxjs';
import { WebappService } from '../webapp.service';
import { BoxDataSource } from '../box.ds.service';
import { Box } from '../model/box.model';


class dumbCollectionViewer implements CollectionViewer {
  viewChange!: Observable<ListRange>;
}

@Component({
  selector: 'app-box-table',
  templateUrl: './box-table.component.html',
  styleUrls: ['./box-table.component.css']
})
export class BoxTableComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  public ds: BoxDataSource;
  public selection = new SelectionModel<number>(true, []);
  public selectionMode = 0; // 0- manually selected, 1- select all, 2- unselect all
  public displayedColumns: string[] = ['box_id', 'name'];
  public start_box_id = 0n;
  
  constructor(
    public rcr: RcrJsonService,
    public app: WebappService
  ) {
    this.ds = new BoxDataSource(this.rcr, this.app);
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
    this.ds.load(this.start_box_id, this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize);
  }

  edit(row: Box) {
    this.app.showBox(row).then(
      v=>{
        this.load();
      });
  }

  add() {
    this.app.showBox(new Box).then(
      v=>{
        this.load();
      });
  }

  reload(start_box_id: bigint): void {
    this.start_box_id = start_box_id;
    this.paginator.pageIndex = 0;
    this.load();
  }

}
