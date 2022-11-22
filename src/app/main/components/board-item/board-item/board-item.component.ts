import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBoard } from 'src/app/main/models/board.model';
import { BoardService } from '../../../services/board.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {
  @Output() public boardClick = new EventEmitter<string>();


  @Input() public board: IBoard | undefined;

  constructor(public boardService: BoardService) { }

  public onBoardClick(): void {
    this.boardClick.emit(this.board?.id);
  }

  public onDeleteClick(event: MouseEvent): void {
    event.stopPropagation();

    this.boardService.showDeleteBoardModal(this.board?.id);
  }
}
