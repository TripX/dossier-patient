import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IPatient, Patient} from '../../models/patient';

@Component({
  selector: 'app-ma-balance-energetique',
  templateUrl: './ma-balance-energetique.component.html',
  styleUrls: ['./ma-balance-energetique.component.scss']
})
export class MaBalanceEnergetiqueComponent implements OnInit, OnChanges {

  @Output() outSelectedIndex = new EventEmitter<number>();
  @Input() patient: IPatient;
  height: Number;
  weight: Number;

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
      }
    }
  }

}
