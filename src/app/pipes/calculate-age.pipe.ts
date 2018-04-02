import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateAge'
})
export class CalculateAgePipe implements PipeTransform {

  transform(birthDate: Date, args?: Date): string {
    if (birthDate) {
      let endDate = Date.now();
      if (args) {
        endDate = args.getTime();
      }
      const ageDifMs = endDate - new Date(birthDate).getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
    }
    return null;
  }

}
