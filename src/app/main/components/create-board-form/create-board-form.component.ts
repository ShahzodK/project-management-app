import { Component } from '@angular/core';
import { BoardService } from '../../services/board.service';


@Component({
  selector: 'app-create-board-form',
  templateUrl: './create-board-form.component.html',
  styleUrls: ['./create-board-form.component.scss'],
})
export class CreateBoardFormComponent  {

  constructor(
    public boardService: BoardService,
  ) { }
}
