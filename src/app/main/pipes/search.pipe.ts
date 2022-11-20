import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from './../models/board.model';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(boards: IBoard[], searchValue: string): IBoard[] {
    const filteredBoards: IBoard[] = boards.filter((board: IBoard) => board.title.toLowerCase().includes(searchValue.toLowerCase()));
    return filteredBoards;
  }

}
