import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-dossier-patient',
  templateUrl: './dossier-patient.component.html',
  styleUrls: ['./dossier-patient.component.scss']
})
export class DossierPatientComponent implements OnInit {

  myControl: FormControl = new FormControl();

  options: [
    'Un',
    'Deux',
    'Trois'
  ];

  constructor() { }

  ngOnInit() {
  }

}
