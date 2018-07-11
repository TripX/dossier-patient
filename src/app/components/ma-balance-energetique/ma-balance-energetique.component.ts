import {Component, EventEmitter, Input, LOCALE_ID, OnChanges, OnInit, Output} from '@angular/core';
import {IPatient, Patient} from '../../models/patient';
import {CalculateAgePipe} from '../../pipes/calculate-age.pipe';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-ma-balance-energetique',
  templateUrl: './ma-balance-energetique.component.html',
  styleUrls: ['./ma-balance-energetique.component.scss'],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'fr' }]
})
export class MaBalanceEnergetiqueComponent implements OnInit, OnChanges {

  @Output() outSelectedIndex = new EventEmitter<number>();
  @Input() patient: IPatient;
  height: number;
  weight: number;
  deb: number;

  napOptions = [
    {
      'title': 'Journée passée au repos allongé',
      'value': 1
    },
    {
      'title': 'Travail sédentaire, -30 min marche',
      'value': 1.2
    },
    {
      'title': 'Travail sédentaire, +30 min marche',
      'value': 1.4
    },
    {
      'title': 'Travail sédentaire, 1h - 1h15 sport',
      'value': 1.6
    },
    {
      'title': 'Travail sédentaire, 1h30 - 2h sport',
      'value': 1.7
    },
    {
      'title': 'Travail physique, 1h30 à 2h sport',
      'value': 1.8
    },
    {
      'title': 'Travail physique, 3h à 4h sport',
      'value': 2
    },
  ];

  constructor() { }

  ngOnInit() {
    this.patient = new Patient().patient;
  }

  ngOnChanges() {
    this.height = null;
    this.weight = null;
    if (this.patient && this.patient.evolution) {
      const lastIndex = this.patient.evolution[0] ? this.patient.evolution.length - 1 : -1;
      if (lastIndex !== -1) {
        this.height = lastIndex !== -1 ? this.patient.evolution[lastIndex].height : null;
        this.weight = lastIndex !== -1 ? this.patient.evolution[lastIndex].weight : null;

        if (this.patient.birthdate && this.height && this.weight) {
          const datePipe = new DatePipe('fr');
          const dateEvolution = datePipe.transform(this.patient.evolution[lastIndex].date, 'd/M/y');
          const [day, month, year] = dateEvolution.split('/');
          const calculateAge = new CalculateAgePipe();
          const calculatedAge = calculateAge.transform(this.patient.birthdate, new Date(Number(year), Number(month) - 1, Number(day)));
          if (this.patient.sex === 'Masculin') {
            this.deb =
              Number(((13.707 * this.weight) + (492.3 * (this.height / 100)) - (6.673 * Number(calculatedAge)) + 77.607).toFixed(3));
          } else {
            this.deb =
              Number(((9.74 * this.weight) + (172.9 * (this.height / 100)) - (4.737 * Number(calculatedAge)) + 667.051).toFixed(3));
          }
        }
      }
    }
  }

  calculateBE(deb: number, nap: string): number {
    return Number(Number(deb * Number(nap)).toFixed(3));
  }

  calculateAET(percentAET: string, be: number) {
    return ((Number(percentAET) / 100) * be).toFixed(2);
  }

}
