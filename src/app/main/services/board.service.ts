import { Injectable } from '@angular/core';
import { IBoard } from './../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {


  public boards: IBoard[] = [];

  public deletingBoard = '';

}
