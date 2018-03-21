import {Component, EventEmitter, Input, LOCALE_ID, OnChanges, OnInit, Output, SimpleChange, ViewChild} from '@angular/core';
import * as Plotly from 'plotly.js/lib/core';
import {IPatient, NEW_PATIENT} from '../../models/patient';
import {FormControl, FormGroup} from '@angular/forms';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeFR from '@angular/common/locales/fr';

registerLocaleData(localeFR);

@Component({
  selector: 'app-mon-evolution',
  templateUrl: './mon-evolution.component.html',
  styleUrls: ['./mon-evolution.component.scss'],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'fr' }]
})
export class MonEvolutionComponent implements OnInit, OnChanges {

  @ViewChild('heightChart') heightChart;
  @Output() onSelectedIndex = new EventEmitter<number>();
  @Input() patient: IPatient;
  tabForm: FormGroup;

  date: Array<string> = [];
  height: Array<number> = [];
  weight: Array<number> = [];
  bicipital: Array<number> = [];
  tricipital: Array<number> = [];
  subscapulaire: Array<number> = [];
  suprailiaque: Array<number> = [];
  waist: Array<number> = [];
  hip: Array<number> = [];
  pectoral: Array<number> = [];
  arm: Array<number> = [];
  thigh: Array<number> = [];

  constructor() {}

  ngOnInit() {

    this.patient = NEW_PATIENT;

    this.tabForm = new FormGroup({
      date: new FormControl(),
      height: new FormControl(),
      weight: new FormControl(),
      bicipital: new FormControl(),
      tricipital: new FormControl(),
      subscapulaire: new FormControl(),
      suprailiaque: new FormControl(),
      waist: new FormControl(),
      hip: new FormControl(),
      pectoral: new FormControl(),
      arm: new FormControl(),
      thigh: new FormControl()
    });

    console.log('tabForm evolution', this.tabForm);
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    if (this.patient && this.patient.evolution) {
      const datePipe = new DatePipe('fr');

      console.log('evolution data', this.patient.evolution);

      Object.keys(this.patient.evolution).map(key => {
        this.date.push(datePipe.transform(this.patient.evolution[key].date));
        this.height.push(this.patient.evolution[key].height);
        this.weight.push(this.patient.evolution[key].weight);
        this.bicipital.push(this.patient.evolution[key].bicipital);
        this.tricipital.push(this.patient.evolution[key].tricipital);
        this.subscapulaire.push(this.patient.evolution[key].subscapulaire);
        this.suprailiaque.push(this.patient.evolution[key].suprailiaque);
        this.waist.push(this.patient.evolution[key].waist);
        this.hip.push(this.patient.evolution[key].hip);
        this.pectoral.push(this.patient.evolution[key].pectoral);
        this.arm.push(this.patient.evolution[key].arm);
        this.thigh.push(this.patient.evolution[key].thigh);
      });
    }
  }

  savePatient() {
    console.log('save');
    this.onSelectedIndex.emit(3); // Redirection vers ma balance énergétique
  }

  makeNewTableAndPlot(divElement: HTMLElement, xData: Array<number | string>, yData: Array<number | string>) {
    Plotly.newPlot(divElement, [{
      x: xData,
      y: yData
    }], {
      margin: {t: 0}
    });
  }
}
