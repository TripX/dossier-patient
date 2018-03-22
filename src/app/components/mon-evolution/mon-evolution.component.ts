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

  formattedPatientData = [];

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

      this.formattedPatientData = [];

      this.formattedPatientData.push({'label': '-', 'data': []});
      this.formattedPatientData.push({'label': 'Taille(cm)', 'data': []});
      this.formattedPatientData.push({'label': 'Poids(kg)', 'data': []});
      this.formattedPatientData.push({'label': 'IMC(kg·m−2)', 'data': []});
      this.formattedPatientData.push({'label': 'Plis b', 'data': []});
      this.formattedPatientData.push({'label': 'Plis t', 'data': []});
      this.formattedPatientData.push({'label': 'Plis sous', 'data': []});
      this.formattedPatientData.push({'label': 'Plis sup', 'data': []});
      this.formattedPatientData.push({'label': 'MG(%)', 'data': []});
      this.formattedPatientData.push({'label': 'MG(kg)', 'data': []});
      this.formattedPatientData.push({'label': 'MM(%)', 'data': []});
      this.formattedPatientData.push({'label': 'MM(kg)', 'data': []});
      this.formattedPatientData.push({'label': 'Tour taille', 'data': []});
      this.formattedPatientData.push({'label': 'Tour hanche', 'data': []});
      this.formattedPatientData.push({'label': 'Tour pec', 'data': []});
      this.formattedPatientData.push({'label': 'Tour bras', 'data': []});
      this.formattedPatientData.push({'label': 'Tour cuisse', 'data': []});

      Object.keys(this.patient.evolution).map(key => {
        let idx = 0;
        this.formattedPatientData[idx].data.unshift(datePipe.transform(this.patient.evolution[key].date, 'd/M/y'));
        this.formattedPatientData[++idx].data.unshift(this.patient.evolution[key].height);

        const weight = this.patient.evolution[key].weight;
        this.formattedPatientData[++idx].data.unshift(weight);

        const IMC = this.patient.evolution[key].height * weight; // TODO calcul
        this.formattedPatientData[++idx].data.unshift(IMC);

        this.formattedPatientData[++idx].data.unshift(this.patient.evolution[key].bicipital);
        this.formattedPatientData[++idx].data.unshift(this.patient.evolution[key].tricipital);
        this.formattedPatientData[++idx].data.unshift(this.patient.evolution[key].subscapulaire);
        this.formattedPatientData[++idx].data.unshift(this.patient.evolution[key].suprailiaque);

        const MG = 15; // en kg TODO calcul
        const MM = weight - MG;
        this.formattedPatientData[++idx].data.unshift(Number((MG * 100) / (MM + MG)).toFixed(2));
        this.formattedPatientData[++idx].data.unshift(MG);
        this.formattedPatientData[++idx].data.unshift(Number((MM * 100) / (MG + MM)).toFixed(2));
        this.formattedPatientData[++idx].data.unshift(MM);
        this.formattedPatientData[++idx].data.unshift(this.patient.evolution[key].waist);
        this.formattedPatientData[++idx].data.unshift(this.patient.evolution[key].hip);
        this.formattedPatientData[++idx].data.unshift(this.patient.evolution[key].pectoral);
        this.formattedPatientData[++idx].data.unshift(this.patient.evolution[key].arm);
        this.formattedPatientData[++idx].data.unshift(this.patient.evolution[key].thigh);
      });

      // this.makeNewPlot(this.heightChart.nativeElement, this.date, this.height);
    }
  }

  savePatient() {
    console.log('save');
    this.onSelectedIndex.emit(3); // Redirection vers ma balance énergétique
  }

  makeNewPlot(divElement: HTMLElement, xData: Array<number | string>, yData: Array<number | string>) {
    Plotly.newPlot(divElement, [{
      x: xData,
      y: yData
    }], {
      margin: {t: 0}
    });
  }
}
