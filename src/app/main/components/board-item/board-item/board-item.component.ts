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

  constructor(public boardService: BoardService) { }

  @Input() public board: IBoard | undefined;

  onBoardClick(): void {
    this.boardClick.emit(this.board?.id);
  }

  onDeleteClick(event: MouseEvent): void {
    event.stopPropagation();

    this.boardService.deletingBoard = this.board!.id!;
  }
}
