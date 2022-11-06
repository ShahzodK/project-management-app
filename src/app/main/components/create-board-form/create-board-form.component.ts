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

  constructor(private boardService: BoardService, private api: BoardApiService) { }

  public isClicked = false;

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

  public submit() {
    const boardTitle = this.createBoard.getRawValue().title;
    const boardDescription = this.createBoard.getRawValue().description;
    this.api.createBoard(boardTitle, boardDescription).subscribe({
      next: ({ id, title, description }) => {
        this.boardService.boards.push({ id, title, description });
        this.isClicked = false;
      },
      error: (err) => console.log(`oops something went wrong, status: ${err.status}`),
    });
  }

  public showCreateBoardForm() {
    this.isClicked = true;
  }
}