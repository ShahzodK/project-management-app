import { IBoard } from 'src/app/main/models/board.model';
import { Component, Input } from '@angular/core';
import { BoardApiService } from './../../services/board-api.service';
import { BoardService } from './../../services/board.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {

  constructor(private api: BoardApiService, public boardService: BoardService) { }

  @Input() board: IBoard | undefined;

  public deleteBoard(id: string): void {
    console.log('boarder');
    this.api.deleteBoard(id).subscribe({
      next: () => {
        this.boardService.boards = this.boardService.boards.filter((board) => board.id !== id);
        this.boardService.deletingBoard = '';
      },
      error: (err) => console.log(`oops something went wrong, status:${err.status}`),
    });
  }

  cancelDeletingBoard(): void {
    this.boardService.deletingBoard = '';
  }
}
