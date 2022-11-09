import { Component, Input } from '@angular/core';
import { IBoard } from 'src/app/main/models/board.model';
import { BoardService } from './../../../services/board.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {

  constructor(public boardService: BoardService) { }

  @Input() public board: IBoard | undefined;

}
