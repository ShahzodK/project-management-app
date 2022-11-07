import { Injectable } from '@angular/core';
import { IBoard } from './../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {


  public boards: IBoard[] = [];

  public deletingBoard = '';

  public searchValue = '';

  public IsCreateBoardModalVisible = false;

  public searchBoard(value: string): void {
    const filteredBoards: IBoard[] = this.boards.filter((board) => board.title.toLowerCase().includes(value.toLowerCase()));
    console.log(filteredBoards);
  }

}
