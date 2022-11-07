import { Component, Input } from '@angular/core';
import { BoardApiService } from './../../services/board-api.service';
import { BoardService } from './../../services/board.service';
import { IBoard } from 'src/app/main/models/board.model';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {

  constructor(private api: BoardApiService, public boardService: BoardService) { }

  @Input() board: IBoard | undefined;

  public deleteBoardError = false;

  public deleteBoard(id: string): void {
    console.log('boarder');
    this.api.deleteBoard(id).subscribe({
      next: () => {
        this.boardService.boards = this.boardService.boards.filter((board) => board.id !== id);
        this.boardService.deletingBoard = '';
        this.deleteBoardError = false;
      },
      error: () => this.deleteBoardError = true,
    });
  }

  cancelDeletingBoard(): void {
    this.boardService.deletingBoard = '';
  }
}
