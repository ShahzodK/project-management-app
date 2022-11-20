import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BoardApiService } from '../../services/board-api.service';
import { BoardService } from '../../services/board.service';
import { Store } from '@ngrx/store';
import * as BoardActions from '../../redux/actions/boards.actions';
import { IBoard } from '../../models/board.model';

@Component({
  selector: 'app-create-board-form',
  templateUrl: './create-board-form.component.html',
  styleUrls: ['./create-board-form.component.scss'],
})
export class CreateBoardFormComponent implements OnDestroy {

  constructor(
    public boardService: BoardService,
    private api: BoardApiService,
    private store: Store,
  ) { }

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

  public createBoardSub: Subscription | undefined;

  public submit(): void {
    const boardTitle = this.createBoard.getRawValue().title;
    const boardDescription = this.createBoard.getRawValue().description;
    if (boardTitle && boardDescription) {
      this.createBoardSub = this.api.createBoard(boardTitle, boardDescription).subscribe({
        next: ({ id, title, description }) => {
          const board: IBoard = {
            id,
            title,
            description,
            columns: [],
          };
          this.store.dispatch(BoardActions.createBoard({ board }));
          this.boardService.IsCreateBoardModalVisible = false;
          this.boardError = false;
          this.createBoard.reset();
        },
        error: () => this.boardError = true,
      });
    }
  }

  public showCreateBoardForm(): void {
    this.isClicked = true;
  }

  ngOnDestroy(): void {
    this.createBoardSub?.unsubscribe();
  }
}
