import {Component, EventEmitter, Input, LOCALE_ID, OnChanges, OnInit, Output, SimpleChange, ViewChild} from '@angular/core';
import * as Plotly from 'plotly.js/lib/core';
import {IPatient, NEW_PATIENT} from '../../models/patient';
import {FormControl, FormGroup} from '@angular/forms';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeFR from '@angular/common/locales/fr';

registerLocaleData(localeFR);

interface ICell {
  nbRow: number;
  nbCol: number;
  content: string | number
}
@Component({
  selector: 'app-mon-evolution',
  templateUrl: './mon-evolution.component.html',
  styleUrls: ['./mon-evolution.component.scss'],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'fr' }]
})
export class MonEvolutionComponent implements OnInit, OnChanges {

  @ViewChild('monEvolution') monEvolution;
  @Output() onSelectedIndex = new EventEmitter<number>();
  @Input() patient: IPatient;
  tabForm: FormGroup;

  originalNumberCols = 3;
  numberCols = this.originalNumberCols;
  rows = [
    '', 'Taille(cm)', 'Graphique Taille', 'Poids(kg)', 'Graphique Poids', 'Plis b', 'Graphique plis b',
    'Plis t', 'Graphique plis t', 'Plus sous', 'Graphique plis sous', 'Plus sup', 'Graphique plis sup',
    'MG(%)', 'MG(kg)', 'Graphique MG', 'MM(%)', 'MM(kg)', 'Graphique MM'
  ];

  // Création du tableau à double entrée se créant ligne par ligne de gauche à droite
  cells: Array<ICell>;

  constructor() {}

  ngOnInit() {

    this.cells = [];

    this.patient = NEW_PATIENT;

    this.tabForm = new FormGroup({
      height: new FormControl(),
      weight: new FormControl()
    })
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    if (this.patient) {
      const lengthOfAllTable = [];
      const datePipe = new DatePipe('fr');
      if (this.patient.height) {
        const dateHeightData: Array<string> = [];
        const cmHeightData: Array<number> = [];

        Object.keys(this.patient.height).map(key => {
          dateHeightData.push(datePipe.transform(this.patient.height[key].date));
          cmHeightData.push(this.patient.height[key].cm);
        });

        // Ligne 1 - Dates (Utilisation des dates hauteur par défaut)
        this.cells.push({nbRow: 1, nbCol: 1, content: this.rows[0]});
        Object.keys(dateHeightData).map(key => this.cells.push({nbRow: 1, nbCol: 1, content: dateHeightData[key].date}));
        this.cells.push({nbRow: 1, nbCol: 1, content: 'TODO new Date Input'});

        // Ligne 2 - Taille
        this.cells.push({nbRow: 1, nbCol: 1, content: this.rows[1]});
        Object.keys(cmHeightData).map(key => this.cells.push({nbRow: 1, nbCol: 1, content: cmHeightData[key].date}));
        this.cells.push({nbRow: 1, nbCol: 1, content: 'TODO new Taile Input'});

        // Ligne 3 - Graphique Taille
        this.cells.push({nbRow: 1, nbCol: 1, content: this.rows[2]});
        this.cells.push({nbRow: 1, nbCol: this.numberCols - this.originalNumberCols + 1, content: '<div id="heightChart"></div>'});

        /*Plotly.newPlot(this.grid.heightChart.nativeElement, [{
          x: dateHeightData,
          y: cmHeightData
        }], {
          margin: {t: 0}
        });*/
        lengthOfAllTable.push(this.patient.height.length);
      }
      if (this.patient.weight) {
        const dateWeightData: Array<string> = [];
        const kgWeightData: Array<number> = [];
        Object.keys(this.patient.weight).map(key => {
          dateWeightData.push(datePipe.transform(this.patient.weight[key].date));
          kgWeightData.push(this.patient.weight[key].kg);
        });

        // Ligne 4 - Poids
        this.cells.push({nbRow: 1, nbCol: 1, content: this.rows[3]});
        Object.keys(kgWeightData).map(key => this.cells.push({nbRow: 1, nbCol: 1, content: kgWeightData[key].date}));
        this.cells.push({nbRow: 1, nbCol: 1, content: 'TODO new Poids Input'});

        // Ligne 5 - Graphique Poids
        this.cells.push({nbRow: 1, nbCol: 1, content: this.rows[4]});
        this.cells.push({nbRow: 1, nbCol: this.numberCols - this.originalNumberCols + 1, content: '<div class="weightChart"></div>'});

        console.log(this.monEvolution.nativeElement.getElementsByClassName('weightChart'));
        // TODO NEXT
        Plotly.newPlot(this.monEvolution.nativeElement.getElementsByClassName('weightChart')[0], [{
          x: dateWeightData,
          y: kgWeightData
        }], {
          margin: {t: 0}
        });
        lengthOfAllTable.push(this.patient.weight.length);
      }
      this.numberCols += Math.max( ...lengthOfAllTable );

      console.log('cells', this.cells);
    }
  }

  savePatient() {
    console.log('save');
    this.onSelectedIndex.emit(3); // Redirection vers ma balance énergétique
  }
}
