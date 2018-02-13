import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {GROUP_PATIENT} from '../../models/group-patient';
import {TITLE_PATIENT} from '../../models/title-patient';

@Component({
  selector: 'app-fiche-patient',
  templateUrl: './fiche-patient.component.html',
  styleUrls: ['./fiche-patient.component.scss']
})
export class FichePatientComponent implements OnInit {

  tabForm: FormGroup;

  groupPatient: string[] = GROUP_PATIENT;
  titlePatient: string[] = TITLE_PATIENT;
  age = '';

  startDate = new Date(1990, 0, 1);

  constructor() { }

  ngOnInit() {
    this.tabForm = new FormGroup({
      group: new FormControl(),
      title: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      birthDate: new FormControl()
    });

    this.tabForm.valueChanges.subscribe(value => {
        this.age = this.calculateAge(value.birthDate);
      }
    );

    console.log('tabForm', this.tabForm);
  }

  calculateAge(birthDate): string {
    if (birthDate) {
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
    }
    return null;
  }

}
