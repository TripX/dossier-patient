import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beautifyArray'
})
export class BeautifyArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return value.join(' / ');
    }
  }

}
