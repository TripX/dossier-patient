import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MatSort, MatTableDataSource} from '@angular/material';

import {FrenchDateAdapter} from '../../services/FrenchDateAdapter';

import {IActivity, IConsultation} from '../../models/patient';
import {GROUP_PATIENT} from '../../models/group-patient';
import {TITLE_PATIENT} from '../../models/title-patient';
import {MARITAL_STATUS} from '../../models/marital-status';
import {FAVORITE_CONTACT_TYPE} from '../../models/favorite-contact-type';
import {PAYMENT_METHOD} from '../../models/payment-method';
import {TARIFICATION_TYPE} from '../../models/tarification-type';

@Component({
  selector: 'app-fiche-patient',
  templateUrl: './fiche-patient.component.html',
  styleUrls: ['./fiche-patient.component.scss'],
  providers: [{provide: DateAdapter, useClass: FrenchDateAdapter}],
})
export class FichePatientComponent implements OnInit, AfterViewInit {

  tabForm: FormGroup;

  groupPatient: string[] = GROUP_PATIENT;
  titlePatient: string[] = TITLE_PATIENT;
  maritalStatus: string[] = MARITAL_STATUS;
  favoriteContactType: string[] = FAVORITE_CONTACT_TYPE;
  paymentMethod: string[] = PAYMENT_METHOD;
  tarificationType: string[] = TARIFICATION_TYPE;

  age: string;
  activities: IActivity[];
  indexSport: number;

  consultations: IConsultation[];
  displayedColumnsConsultation = ['date', 'cost', 'tarificationType'];
  dataSource: MatTableDataSource<IConsultation>;
  @ViewChild(MatSort) sort: MatSort;

  startBirthDate: Date;
  startToday: Date;

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('fr');

    this.age = '';
    this.indexSport = 0;
    this.activities = [{
      index: this.indexSport,
      title: '',
      hoursPerWeek: null
    }];

    this.startBirthDate = new Date(1990, 0, 1);
    this.startToday = new Date();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {

    // TODO get list of past consultations
    this.consultations = [
      {
        date: this.startToday,
        cost: 35,
        paymentMethod: 'Espèce',
        tarificationType: 'Type 1'
      },
      {
        date: this.startToday,
        cost: 50,
        paymentMethod: 'Chéque',
        tarificationType: 'Type 2'
      }
    ];
    this.dataSource = new MatTableDataSource(this.consultations);

    this.tabForm = new FormGroup({
      group: new FormControl(),
      title: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      birthDate: new FormControl(),
      profession: new FormControl(),
      maritalStatus: new FormControl(),
      landline: new FormControl(),
      mobile: new FormControl(),
      email: new FormControl('', Validators.email),
      creationDate: new FormControl(),
      favoriteContactType: new FormControl(),
      metabolism: new FormControl(),
      healthHistory: new FormControl(),
      regularDoctor: new FormControl(),
      healthNote: new FormControl(),
      activityTitle: new FormControl(),
      activityHoursPerWeek: new FormControl(),
      consultationCost: new FormControl(),
      consultationPaymentMethod: new FormControl(),
      consultationTarificationType: new FormControl(),
    });

    this.tabForm.valueChanges.subscribe(value => {
        this.age = this.calculateAge(value.birthDate);
      }
    );

    console.log('tabForm', this.tabForm);
  }

  addNewActivity() {
    this.activities.push({
      index: ++this.indexSport,
      title: '',
      hoursPerWeek: null
    });
  }

  removeActivity(activityToRemove: IActivity) {
    this.activities = this.activities.filter(activity => activity !== activityToRemove);
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
