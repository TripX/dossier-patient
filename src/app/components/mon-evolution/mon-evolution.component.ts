import {Component, EventEmitter, Input, LOCALE_ID, OnChanges, OnInit, Output, SimpleChange, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeFR from '@angular/common/locales/fr';

import * as Plotly from 'plotly.js/lib/core';
import {ImcClassPipe} from '../../pipes/imc-class.pipe';
import {CalculateAgePipe} from '../../pipes/calculate-age.pipe';
import {IActivity, IEvolution, IPatient, Patient} from '../../models/patient';
import {CORPULENCE_FILLE, CORPULENCE_GARCON} from '../../models/corpulence';
import {PatientsService} from '../../services/patient-service';
import {MatDialog} from '@angular/material';
import {DialogRemoveComponent} from '../dialog-remove/dialog-remove.component';

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
  @Output() outSelectedIndex = new EventEmitter<number>();

  selectedIndexInside = 0;

  @Input() patient: IPatient;
  formattedPatientData = [];
  tabForm: FormGroup;
  evolutionButtonRemove: IEvolution[];

  constructor(private patientsService: PatientsService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.patient = new Patient().patient;

    const datePipe = new DatePipe('fr');
    this.tabForm = new FormGroup({
      date: new FormControl(datePipe.transform(new Date(), 'd/M/y')),
      age: new FormControl(),
      height: new FormControl(),
      weight: new FormControl(),
      imc: new FormControl(),
      bodyWater: new FormControl(),
      boneMineral: new FormControl(),
      metabolicAge: new FormControl(),
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
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    this.updateFormatedData();
  }

  updateFormatedData() {
    if (this.patient) {
      this.evolutionButtonRemove = this.patient.evolution.slice();
      this.evolutionButtonRemove.sort(
        function(a, b) {
          return (b.idEvolution > a.idEvolution) ? 1 : ((a.idEvolution > b.idEvolution) ? -1 : 0);
        }
      );

      const calculateAge = new CalculateAgePipe();
      const datePipe = new DatePipe('fr');
      const imcClassPipe = new ImcClassPipe();

      // En étroite correspondance avec le tabForm, le paramètre title est le lien
      this.formattedPatientData = [];
      this.formattedPatientData.push({'title': 'date', 'label': 'Date', 'data': []});
      this.formattedPatientData.push({'title': 'age', 'label': 'Age', 'data': []});
      this.formattedPatientData.push({'title': 'height', 'label': 'Taille(cm)', 'data': []});
      this.formattedPatientData.push({'title': 'weight', 'label': 'Poids(kg)', 'data': []});
      this.formattedPatientData.push({'title': 'imc', 'label': 'IMC(kg·m−2)', 'data': []});
      this.formattedPatientData.push({'title': 'bodyWater', 'label': 'Masse Hydrique (%)', 'data': []});
      this.formattedPatientData.push({'title': 'boneMineral', 'label': 'Masse Minérale Osseuse', 'data': []});
      this.formattedPatientData.push({'title': 'metabolicAge', 'label': 'Age Métabolique', 'data': []});
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
      const imcTable = [];
      const birthdate = this.patient.birthdate;
      Object.keys(this.patient.evolution).map(key => {
        let idx = 0;
        const dateEvolution = datePipe.transform(this.patient.evolution[key].date, 'd/M/y');
        this.formattedPatientData[idx].data.unshift({'value': dateEvolution, 'class': ''});

        // Calcul de l'age au moment donné
        const [day, month, year] = dateEvolution.split('/');
        const calculatedAge = calculateAge.transform(birthdate, new Date(Number(year), Number(month) - 1, Number(day)));
        age.push(calculatedAge);
        this.formattedPatientData[++idx].data.unshift(
          {'value': calculatedAge, 'class': ''}
        );

        const height = this.patient.evolution[key].height;
        this.formattedPatientData[++idx].data.unshift({'value': height, 'class': ''});

        const weight = this.patient.evolution[key].weight;
        this.formattedPatientData[++idx].data.unshift({'value': weight, 'class': ''});

        const IMC = height > 0 && weight > 0 ? this.calculateIMC(height, weight) : '';
        imcTable.push(IMC);
        this.formattedPatientData[++idx].data.unshift(
          {'value': IMC, 'class': Number(calculatedAge) >= 18 ? imcClassPipe.transform(IMC) : 'young-person-cell'}
        );

        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].bodyWater, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].boneMineral, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].metabolicAge, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].bicipital, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].tricipital, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].subscapulaire, 'class': ''});
        this.formattedPatientData[++idx].data.unshift({'value': this.patient.evolution[key].suprailiaque, 'class': ''});

        const masse = this.calculateMGandMM(calculatedAge, weight, this.patient.evolution[key].bicipital,
          this.patient.evolution[key].tricipital, this.patient.evolution[key].subscapulaire, this.patient.evolution[key].suprailiaque);
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
        this.plotCorpulence(CORPULENCE_GARCON, age, imcTable, 'rgba(108, 154, 255, 0.37)', 'Courbe de corpulence - Garçon');
      } else {
        this.plotCorpulence(CORPULENCE_FILLE, age, imcTable, 'rgba(255, 154, 108, 0.37)', 'Courbe de corpulence - Fille');
      }

      age.some(value => value < 18) ? this.showCourbeCroissance = true : this.showCourbeCroissance = false;

      // Remise à zéro des données en cours de saisie
      if (this.tabForm) {
        this.tabForm.get('date').setValue(datePipe.transform(new Date(), 'd/M/y'));
        this.tabForm.get('age').setValue(calculateAge.transform(birthdate, new Date()));
        this.tabForm.get('height').setValue('');
        this.tabForm.get('weight').setValue('');
        this.tabForm.get('imc').setValue('');
        this.tabForm.get('bodyWater').setValue('');
        this.tabForm.get('boneMineral').setValue('');
        this.tabForm.get('metabolicAge').setValue('');
        this.tabForm.get('bicipital').setValue('');
        this.tabForm.get('tricipital').setValue('');
        this.tabForm.get('subscapulaire').setValue('');
        this.tabForm.get('suprailiaque').setValue('');
        this.tabForm.get('mgPercent').setValue('');
        this.tabForm.get('mgKg').setValue('');
        this.tabForm.get('mmPercent').setValue('');
        this.tabForm.get('mmKg').setValue('');
        this.tabForm.get('waist').setValue('');
        this.tabForm.get('hip').setValue('');
        this.tabForm.get('pectoral').setValue('');
        this.tabForm.get('arm').setValue('');
        this.tabForm.get('thigh').setValue('');
      }
    }
  }

  updateData() {
    const height = this.tabForm.get('height').value;
    const weight = this.tabForm.get('weight').value;
    const age = this.tabForm.get('age').value;
    if (age && height && weight) {
      const imc = height > 0 && weight > 0 ? this.calculateIMC(height, weight) : '';
      this.tabForm.get('imc').setValue(imc);

      const imcClassPipe = new ImcClassPipe();
      this.formattedPatientData[4].class = Number(age) >= 18 ? imcClassPipe.transform(Number(imc)) : 'young-person-cell';
    }

    const bicipital = this.tabForm.get('bicipital').value;
    const tricipital = this.tabForm.get('tricipital').value;
    const subscapulaire = this.tabForm.get('subscapulaire').value;
    const suprailiaque = this.tabForm.get('suprailiaque').value;
    if (age && weight && bicipital && tricipital && subscapulaire && suprailiaque) {
      const masse = this.calculateMGandMM(age, weight, bicipital, tricipital, subscapulaire, suprailiaque);
      this.tabForm.get('mgPercent').setValue(masse.mgPercent);
      this.tabForm.get('mgKg').setValue(masse.mgKg);
      this.tabForm.get('mmPercent').setValue(masse.mmPercent);
      this.tabForm.get('mmKg').setValue(masse.mmKg);
    }
  }

  calculateIMC(height: number, weight: number): string {
      return Number(weight / Math.pow(Number(height / 100), 2)).toFixed(2);
  }

  calculateMGandMM(age, weight, bicipital, tricipital, subscapulaire, suprailiaque) {
    const sexe = this.patient.sex.toString();
    const C = this.getCM(age, sexe)[0];
    const M = this.getCM(age, sexe)[1];
    const plis = Number(bicipital) + Number(tricipital) + Number(subscapulaire) + Number(suprailiaque);
    const MG = (495 / Number(C - (M * (Math.log10(plis))))) - 450;
    const MM = 100 - MG;

    if ((C === 0 && M === 0) || MG <= 0) {
      return {
        'mgPercent': '-',
        'mgKg': '-',
        'mmPercent': '-',
        'mmKg': '-'
      };
    } else {
      return {
        'mgPercent': Number(MG).toFixed(2),
        'mgKg': Number((MG * weight) / 100).toFixed(2),
        'mmPercent': Number(MM).toFixed(2),
        'mmKg': Number(MM * weight / 100).toFixed(2)
      };
    }
  }

  getCM(age: number, sexe: string): number[] {
    if (sexe === 'Masculin') {
      if (age < 17) {
        return [0, 0];
      } else if (age >= 17 && age <= 19) {
        return [1.1620, 0.0678];
      } else if (age >= 20 && age <= 29) {
        return [1.1631, 0.0632];
      } else if (age >= 30 && age <= 39) {
        return [1.1422, 0.0544];
      } else if (age >= 40 && age <= 49) {
        return [1.1620, 0.0700];
      } else if (age >= 50) {
        return [1.1620, 0.0678];
      }
    } else {
      if (age < 17) {
        return [0, 0];
      } else if (age >= 17 && age <= 19) {
        return [1.1549, 0.0678];
      } else if (age >= 20 && age <= 29) {
        return [1.1599, 0.0717];
      } else if (age >= 30 && age <= 39) {
        return [1.1423, 0.0632];
      } else if (age >= 40 && age <= 49) {
        return [1.1333, 0.0612];
      } else if (age >= 50) {
        return [1.1339, 0.0645];
      }
    }

  }

  onSelectedIndexInside(val: number) {
    this.selectedIndexInside = val;
  }

  savePatient() {
    const date = (this.tabForm.get('date').value).split('/');
    this.patient.evolution.push({
      idEvolution: new Date().getTime(),
      date:  new Date(Number(date[2]), Number(date[1]) - 1, Number(date[0]), 12),
      height: this.tabForm.get('height').value,
      weight: this.tabForm.get('weight').value,
      bodyWater: this.tabForm.get('bodyWater').value,
      boneMineral: this.tabForm.get('boneMineral').value,
      metabolicAge: this.tabForm.get('metabolicAge').value,
      bicipital: this.tabForm.get('bicipital').value,
      tricipital: this.tabForm.get('tricipital').value,
      subscapulaire: this.tabForm.get('subscapulaire').value,
      suprailiaque: this.tabForm.get('suprailiaque').value,
      waist: this.tabForm.get('waist').value,
      hip: this.tabForm.get('hip').value,
      pectoral: this.tabForm.get('pectoral').value,
      arm: this.tabForm.get('arm').value,
      thigh: this.tabForm.get('thigh').value,
    });

    this.patientsService.updatePatient(this.patient).subscribe( res => {
      this.updateFormatedData();
    });

    this.tabForm.markAsPristine();
    this.tabForm.reset();
  }

  openDialog(evolutionToRemove) {
    const dialogRef = this.dialog.open(DialogRemoveComponent, {
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Suppression évolution
        console.log('avant', this.patient.evolution);
        console.log(evolutionToRemove);
        this.patient.evolution = this.patient.evolution
          .filter(evolution => evolution !== evolutionToRemove);
        console.log('après', this.patient.evolution);

        if (this.patient.id) {
          this.patientsService.updatePatient(this.patient).subscribe();
          this.updateFormatedData();
        }
      }
    });
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
