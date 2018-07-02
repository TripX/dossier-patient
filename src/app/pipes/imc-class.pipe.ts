import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icmClassPipe'
})
export class ImcClassPipe implements PipeTransform {

  transform(value: number | string, args?: any): string {
    if (value) {
      if (value < 7) {
        return 'maigreur-morbide-cell'; // black
      } else if (value < 18.5) {
        return 'maigreur-cell'; // red
      } else if (value < 25) {
        return 'souhaitable-cell'; // green
      } else if (value < 30) {
        return 'surpoids-cell'; // orange
      } else if (value < 35) {
        return 'obesite-modere-cell'; // red
      } else {
        return 'obesite-morbide-cell'; // black
      }
    }
    return '';
  }

}
