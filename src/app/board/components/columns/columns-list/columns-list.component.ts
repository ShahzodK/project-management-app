import { Component, Input } from '@angular/core';
import { IBoard } from 'src/app/main/models/board.model';
import { IColumn } from '../../../models/column.model';

@Component({
  selector: 'app-columns-list',
  templateUrl: './columns-list.component.html',
  styleUrls: ['./columns-list.component.scss'],
})
export class ColumnsListComponent {

  @Input() columns: IColumn[] = [];

  @Input() board: IBoard | undefined;
}
