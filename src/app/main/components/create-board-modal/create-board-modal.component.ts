import { Component } from '@angular/core';
import { BoardService } from '../../services/board.service';


@Component({
  selector: 'app-create-board-form',
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.scss'],
})
export class CreateBoardModalComponent {

  constructor(
    public boardService: BoardService,
  ) { }
}
