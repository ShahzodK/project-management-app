import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByOrder',
})
export class SortByOrderPipe implements PipeTransform {

  transform<T extends { order: number }>(items: T[]): T[] {
    if (!items.length) return items;

    return [...items]
      .sort((itemA, itemB) => itemA.order - itemB.order);
  }

}
