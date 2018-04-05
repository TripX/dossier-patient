import {Component, EventEmitter, Input, LOCALE_ID, OnChanges, OnInit, Output, SimpleChange, ViewChild} from '@angular/core';
import * as Plotly from 'plotly.js/lib/core';
import {IPatient, Patient} from '../../models/patient';
import {FormControl, FormGroup} from '@angular/forms';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeFR from '@angular/common/locales/fr';
import {ImcClassPipe} from '../../pipes/imc-class.pipe';
import {CORPULENCE_FILLE, CORPULENCE_GARCON} from '../../models/corpulence';
import {ScatterData} from 'plotly.js';
import {CalculateAgePipe} from '../../pipes/calculate-age.pipe';

registerLocaleData(localeFR);

@Component({
  selector: 'app-mon-evolution',
  templateUrl: './mon-evolution.component.html',
  styleUrls: ['./mon-evolution.component.scss'],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'fr' }]
})
export class MonEvolutionComponent implements OnInit, OnChanges {

  showCourbeCroissance = false;
  @ViewChild('heightChart') heightChart;
  @ViewChild('courbecorpulence') courbecorpulence;
  @Output() onSelectedIndex = new EventEmitter<number>();
  selectedIndexInside: number;
  @ViewChild('insideTabGroup') insideTabGroup;

  @Input() patient: IPatient;
  tabForm: FormGroup;

  formattedPatientData = [];

  constructor() {}

  ngOnInit() {
    this.patient = new Patient().patient;
    this.selectedIndexInside = 0;

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
    this.selectedIndexInside = 0; // TODO NEXT sur le switch parfois la tab est vide ??? // Tester avec 1??

    if (this.patient && this.patient.evolution) {
      const calculateAge = new CalculateAgePipe();
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

      const age = [];
      const imc = [];
      const birthdate = this.patient.birthdate;
      Object.keys(this.patient.evolution).map(key => {
        let idx = 0;
        const dateEvolution = datePipe.transform(this.patient.evolution[key].date, 'd/M/y');
        this.formattedPatientData[idx].data.unshift({'value': dateEvolution, 'class': ''});

        // Calcul de l'age au moment donné
        const [day, month, year] = dateEvolution.split('/');
        const calculatedAge = calculateAge.transform(birthdate, new Date(Number(year), Number(month) - 1, Number(day)));
        age.push(calculatedAge);

        const height = this.patient.evolution[key].height;
        this.formattedPatientData[++idx].data.unshift({'value': height, 'class': ''});

        const weight = this.patient.evolution[key].weight;
        this.formattedPatientData[++idx].data.unshift({'value': weight, 'class': ''});

        const IMC = this.calculateIMC(height, weight);
        imc.push(IMC);
        this.formattedPatientData[++idx].data.unshift(
          {'value': IMC, 'class': Number(calculatedAge) > 17 ? imcClassPipe.transform(IMC) : ''}
        );

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

      if (this.patient.sex === 'Masculin') {
        this.plotCorpulence(CORPULENCE_GARCON, age, imc, 'rgba(108, 154, 255, 0.37)', 'Courbe de corpulence - Garçon');
      } else {
        this.plotCorpulence(CORPULENCE_FILLE, age, imc, 'rgba(255, 154, 108, 0.37)', 'Courbe de corpulence - Fille');
      }

      age.some(value => value < 18) ? this.showCourbeCroissance = true : this.showCourbeCroissance = false;

      // Remise à zéro des données en cours de saisie
      this.tabForm.get('height').setValue('');
      this.tabForm.get('weight').setValue('');
      this.tabForm.get('imc').setValue('');
      // TODO AUTRES DONNEES SAISIES
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

  updateData() {
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

  plotCorpulence(constant, xData, yData, color, title) {

    const imcData = {
      name: '',
      x: xData,
      y: yData,
      type: 'scatter',
      line: {
        color: 'green',
        shape: 'spline',
        smoothing: 0.5
      }
    };

    const min = {
      name: '',
      x: constant.x,
      y: constant.miny,
      fill: 'tonexty',
      fillcolor: color,
      type: 'scatter',
      line: {
        shape: 'spline',
        smoothing: 0.5
      },
      mode: 'none'
    };

    const max = {
      name: '',
      x: constant.x,
      y: constant.maxy,
      fill: 'tozeroy',
      fillcolor: 'transparent',
      type: 'scatter',
      mode: 'none'
    };

    const layout = {
      height: 600,
      width: 600,
      xaxis: {
        title: 'Age',
        range: [0, 18],
        autotick: false,
        ticks: 'outside',
        dtick: 1,
        ticklen: 8,
        tickwidth: 2,
        tickcolor: 'lightgrey'
      },
      yaxis: {
        title: 'IMC',
        range: [0, 27],
        autotick: false,
        ticks: 'outside',
        dtick: 1,
        ticklen: 8,
        tickwidth: 2,
        tickcolor: 'lightgrey'
      },
      title: title
    };

    const data = [max, min, imcData];

    Plotly.newPlot(this.courbecorpulence.nativeElement, data as any, layout as any);
  }
}
