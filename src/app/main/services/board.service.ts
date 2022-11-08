import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardService {

  public deletingBoard = '';

  public searchValue = '';

  public IsCreateBoardModalVisible = false;

}
