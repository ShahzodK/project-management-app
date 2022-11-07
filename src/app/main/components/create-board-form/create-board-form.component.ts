import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { BoardApiService } from '../../services/board-api.service';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-create-board-form',
  templateUrl: './create-board-form.component.html',
  styleUrls: ['./create-board-form.component.scss'],
})
export class CreateBoardFormComponent {

  constructor(public boardService: BoardService, private api: BoardApiService) { }

  public isClicked = false;

  public boardError = false;

  public createBoard = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable:true,
      validators: [
        Validators.required,
      ],
    }),
    description: new FormControl<string>('', {
      nonNullable:true,
      validators: [
        Validators.required,
      ],
    }),
  });

  public submit(): void {
    const boardTitle = this.createBoard.getRawValue().title;
    const boardDescription = this.createBoard.getRawValue().description;
    if (boardTitle && boardDescription) {
      this.api.createBoard(boardTitle, boardDescription).subscribe({
        next: ({ id, title, description }) => {
          this.boardService.boards.push({ id, title, description });
          this.boardService.IsCreateBoardModalVisible = false;
          this.boardError = false;
        },
        error: () => this.boardError = true,
      });
    }
  }

  public showCreateBoardForm(): void {
    this.isClicked = true;
  }
}
