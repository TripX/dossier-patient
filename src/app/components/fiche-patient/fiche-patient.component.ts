import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MatSort, MatTableDataSource} from '@angular/material';

import {FrenchDateAdapter} from '../../services/FrenchDateAdapter';

import {IActivity, IConsultation, IPatient, NEW_PATIENT} from '../../models/patient';
import {GROUP_PATIENT} from '../../models/group-patient';
import {TITLE_PATIENT} from '../../models/title-patient';
import {SEX_PATIENT} from '../../models/sex-patient';
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
export class FichePatientComponent implements OnInit, AfterViewInit, OnChanges {

  groupPatient: string[] = GROUP_PATIENT;
  titlePatient: string[] = TITLE_PATIENT;
  sexPatient: string[] = SEX_PATIENT;
  maritalStatus: string[] = MARITAL_STATUS;
  favoriteContactType: string[] = FAVORITE_CONTACT_TYPE;
  paymentMethod: string[] = PAYMENT_METHOD;
  tarificationType: string[] = TARIFICATION_TYPE;

  @Input() patient: IPatient;
  tabForm: FormGroup;
  startToday: Date;
  startBirthDate: Date;
  activities: IActivity[];
  indexSport: number;
  displayedColumnsConsultation = ['date', 'cost', 'tarificationType'];
  dataSource: MatTableDataSource<IConsultation>;
  @ViewChild(MatSort) sort: MatSort;
  @Output() onSelectedIndex = new EventEmitter<number>();

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('fr');
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

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    if (this.patient) {
      if (this.patient.consultation) {
        this.dataSource.data = this.patient.consultation;
      }
      if (this.patient.activity) {
        this.activities = this.patient.activity;
      }
    }
  }

  ngOnInit() {

    this.patient = NEW_PATIENT;

    this.dataSource = new MatTableDataSource(this.patient.consultation);

    this.tabForm = new FormGroup({
      group: new FormControl(),
      title: new FormControl(),
      firstname: new FormControl(),
      name: new FormControl(),
      sex: new FormControl(),
      birthdate: new FormControl(),
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
      freeNotes: new FormControl()
    });

    console.log('tabForm fiche patient', this.tabForm);

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

  savePatient() {
    console.log('save');
    this.onSelectedIndex.emit(2); // Redirection vers mon évolution
  }

}
