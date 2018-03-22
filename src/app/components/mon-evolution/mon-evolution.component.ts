import {Component, EventEmitter, Input, LOCALE_ID, OnChanges, OnInit, Output, SimpleChange, ViewChild} from '@angular/core';
import * as Plotly from 'plotly.js/lib/core';
import {IPatient, NEW_PATIENT} from '../../models/patient';
import {FormControl, FormGroup} from '@angular/forms';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeFR from '@angular/common/locales/fr';
import {ImcClassPipe} from '../../pipes/imc-class.pipe';

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

    const datePipe = new DatePipe('fr');
    this.tabForm = new FormGroup({
      date: new FormControl(datePipe.transform(new Date(), 'd/M/y')),
      height: new FormControl(),
      weight: new FormControl(),
      imc: new FormControl(),
      bicipital: new FormControl(),
      tricipital: new FormControl(),
      subscapulaire: new FormControl(),
      suprailiaque: new FormControl(),
      mgPercent: new FormControl(),
      mgKg: new FormControl(),
      mmPercent: new FormControl(),
      mmKg: new FormControl(),
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
      const imcClassPipe = new ImcClassPipe();

      this.formattedPatientData = [];

      this.formattedPatientData.push({'title': 'date', 'label': ' ', 'data': []}); // Espace non sécable dans le label Alt+255
      this.formattedPatientData.push({'title': 'height', 'label': 'Taille(cm)', 'data': []});
      this.formattedPatientData.push({'title': 'weight', 'label': 'Poids(kg)', 'data': []});
      this.formattedPatientData.push({'title': 'imc', 'label': 'IMC(kg·m−2)', 'data': []});
      this.formattedPatientData.push({'title': 'bicipital', 'label': 'Plis b', 'data': []});
      this.formattedPatientData.push({'title': 'tricipital', 'label': 'Plis t', 'data': []});
      this.formattedPatientData.push({'title': 'subscapulaire', 'label': 'Plis sous', 'data': []});
      this.formattedPatientData.push({'title': 'suprailiaque', 'label': 'Plis sup', 'data': []});
      this.formattedPatientData.push({'title': 'mgPercent', 'label': 'MG(%)', 'data': []});
      this.formattedPatientData.push({'title': 'mgKg', 'label': 'MG(kg)', 'data': []});
      this.formattedPatientData.push({'title': 'mmPercent', 'label': 'MM(%)', 'data': []});
      this.formattedPatientData.push({'title': 'mmKg', 'label': 'MM(kg)', 'data': []});
      this.formattedPatientData.push({'title': 'waist', 'label': 'Tour taille', 'data': []});
      this.formattedPatientData.push({'title': 'hip', 'label': 'Tour hanche', 'data': []});
      this.formattedPatientData.push({'title': 'pectoral', 'label': 'Tour pec', 'data': []});
      this.formattedPatientData.push({'title': 'arm', 'label': 'Tour bras', 'data': []});
      this.formattedPatientData.push({'title': 'thigh', 'label': 'Tour cuisse', 'data': []});

      Object.keys(this.patient.evolution).map(key => {
        let idx = 0;
        this.formattedPatientData[idx].data.unshift({'value': datePipe.transform(this.patient.evolution[key].date, 'd/M/y'), 'class': ''});

        const height = this.patient.evolution[key].height;
        this.formattedPatientData[++idx].data.unshift({'value': height, 'class': ''});

        const weight = this.patient.evolution[key].weight;
        this.formattedPatientData[++idx].data.unshift({'value': weight, 'class': ''});

        const IMC = this.calculateIMC(height, weight);
        this.formattedPatientData[++idx].data.unshift({'value': IMC, 'class': imcClassPipe.transform(IMC)});

        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].bicipital, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].tricipital, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].subscapulaire, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].suprailiaque, 'class': ''});

        const masse = this.calculateMGandMM(weight); // TODO
        this.formattedPatientData[++idx].data.unshift({'value': masse.mgPercent, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': masse.mgKg, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': masse.mmPercent, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': masse.mmKg, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].waist, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].hip, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].pectoral, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].arm, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].thigh, 'class': ''});
      });

      // this.makeNewPlot(this.heightChart.nativeElement, this.date, this.height);
    }
  }

  savePatient() {
    console.log('save');
    this.onSelectedIndex.emit(3); // Redirection vers ma balance énergétique
  }

  calculateIMC(height: number, weight: number): string {
    return Number(weight / Math.pow(Number(height / 100), 2)).toFixed(2)
  }

  calculateMGandMM(weight) { // TODO !!!!!!!
    const MG = 15;
    const MM = weight - MG;
    return {
      'mgPercent': Number((MG * 100) / (MM + MG)).toFixed(2),
      'mgKg': MG,
      'mmPercent': Number((MM * 100) / (MG + MM)).toFixed(2),
      'mmKg': MM
    }
  }

  onKeyUp() {
    const height = this.tabForm.get('height').value;
    const weight = this.tabForm.get('weight').value;
    if (height && weight) {
      const imc = this.calculateIMC(height, weight);
      this.tabForm.get('imc').setValue(imc);

      const imcClassPipe = new ImcClassPipe();
      this.formattedPatientData[3].class = imcClassPipe.transform(imc);

      // const masse = this.calculateMGandMM(weight); // TODO
      // this.tabForm.get('mgPercent').setValue(masse.mgPercent);
      // this.tabForm.get('mgKg').setValue(masse.mgKg);
      // this.tabForm.get('mmPercent').setValue(masse.mmPercent);
      // this.tabForm.get('mmKg').setValue(masse.mmKg);
    }
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
