import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'langTransform',
})
export class LangTransformPipe implements PipeTransform {

  transform(lang: string): string {
    return `languages.${lang}`;
  }

}
