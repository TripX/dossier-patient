import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icmClassPipe'
})
export class ImcClassPipe implements PipeTransform {

  transform(value: number | string, args?: any): string {
    if (value) {
      if (value >= 0 && value < 7 || value > 40 && value <= 61) {
        return 'black-cell'
      }
      if (value >= 7 && value < 16 || value > 35 && value <= 40) {
        return 'red-cell'
      }
      if (value > 30 && value <= 35) {
        return 'orange-cell'
      }
      if (value >= 16 && value < 19 || value > 25 && value <= 30) {
        return 'yellow-cell'
      }
      if (value >= 19 && value <= 25) {
        return 'yellow-cell'
      }
    }
    return '';
  }

}
