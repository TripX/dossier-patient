import {Component} from '@angular/core';
import {IPatient} from '../../models/patient';

@Component({
  selector: 'app-dossier-patient',
  templateUrl: './dossier-patient.component.html',
  styleUrls: ['./dossier-patient.component.scss']
})
export class DossierPatientComponent {

  selectedIndex = 0;
  searchedPatient: IPatient;

  onSelectedIndex(val: number) {
    this.selectedIndex = val;
  }

  onSearchPatient(patient: IPatient) {
    this.searchedPatient = patient;
  }
}
