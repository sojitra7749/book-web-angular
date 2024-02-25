import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nl2br',
  standalone: true
})
export class Nl2brPipe implements PipeTransform {
  transform(value: string | undefined) {
    if (value) {
      return value.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }
    return value;
  }
}
