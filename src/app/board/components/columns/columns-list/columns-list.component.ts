import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { IColumn } from '../../../models/column.model';

@Component({
  selector: 'app-columns-list',
  templateUrl: './columns-list.component.html',
  styleUrls: ['./columns-list.component.scss'],
})
export class ColumnsListComponent implements OnChanges {
  @Input() columns: IColumn[] | undefined;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
}
