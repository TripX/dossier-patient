import {Component, EventEmitter} from '@angular/core';
import {IPatient} from '../../models/patient';

@Component({
  selector: 'app-dossier-patient',
  templateUrl: './dossier-patient.component.html',
  styleUrls: ['./dossier-patient.component.scss']
})
export class DossierPatientComponent {

  selectedIndex = 0;
  searchedPatient: IPatient;
  onSearch: boolean;

  onSelectedIndex(val: number) {
    this.selectedIndex = val;
    val === 0 ? this.onSearch = true : this.onSearch = false;
  }

  onSearchPatient(patient: IPatient) {
    this.searchedPatient = patient;
  }
}
