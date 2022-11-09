import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from './../models/board.model';
import { BoardService } from './../services/board.service';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  constructor(private boardService: BoardService) {}

  transform(boards: IBoard[], searchValue: string): IBoard[] {
    const filteredBoards: IBoard[] = boards.filter((board: IBoard) => board.title.toLowerCase().includes(searchValue.toLowerCase()));
    return filteredBoards;
  }

}
