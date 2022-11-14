import { Component, Input } from '@angular/core';
import { IColumn } from '../../../models/column.model';
import { Observable } from 'rxjs';
import { ITask } from '../../../models/task.model';

@Component({
  selector: 'app-columns-item',
  templateUrl: './columns-item.component.html',
  styleUrls: ['./columns-item.component.scss'],
})
export class ColumnsItemComponent {
  @Input() column: IColumn | undefined;

  tasks$: Observable<ITask[]> | undefined;
}
