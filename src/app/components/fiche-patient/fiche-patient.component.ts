import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MatDialog, MatSort, MatTableDataSource} from '@angular/material';

import {FrenchDateAdapter} from '../../services/FrenchDateAdapter';

import {IActivity, IConsultation, IPatient, Patient} from '../../models/patient';
import {GROUP_PATIENT} from '../../models/group-patient';
import {TITLE_PATIENT} from '../../models/title-patient';
import {SEX_PATIENT} from '../../models/sex-patient';
import {MARITAL_STATUS} from '../../models/marital-status';
import {FAVORITE_CONTACT_TYPE} from '../../models/favorite-contact-type';
import {PAYMENT_METHOD} from '../../models/payment-method';
import {PatientsService} from '../../services/patient-service';
import {DialogRemoveComponent} from '../dialog-remove/dialog-remove.component';

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
  defaultCost = 45;

  @Input() patient: IPatient;
  tabForm: FormGroup;
  startToday: Date;
  startBirthDate: Date;
  activities: IActivity[];
  indexSport: number;
  displayedColumnsConsultation = ['date', 'cost', 'tarificationType'];
  dataSource: MatTableDataSource<IConsultation>;
  @ViewChild(MatSort) sort: MatSort;
  @Output() outSelectedIndex = new EventEmitter<number>();

  constructor(private dateAdapter: DateAdapter<Date>,
              private patientsService: PatientsService,
              private dialog: MatDialog) {
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
    if (this.tabForm) {
      this.tabForm.get('groupPatient').setValue(this.patient.groupPatient);
      this.tabForm.get('title').setValue(this.patient.title);
      this.tabForm.get('firstname').setValue(this.patient.firstname);
      this.tabForm.get('name').setValue(this.patient.name);
      this.tabForm.get('sex').setValue(this.patient.sex);
      this.tabForm.get('birthdate').setValue(this.patient.birthdate);
      this.tabForm.get('profession').setValue(this.patient.profession);
      this.tabForm.get('maritalStatus').setValue(this.patient.maritalStatus);
      this.tabForm.get('landline').setValue(this.patient.landline);
      this.tabForm.get('mobile').setValue(this.patient.mobile);
      this.tabForm.get('email').setValue(this.patient.email);
      this.tabForm.get('creationDate').setValue(this.patient.creationDate);
      this.tabForm.get('favoriteContactType').setValue(this.patient.favoriteContactType);
      this.tabForm.get('metabolism').setValue(this.patient.metabolism);
      this.tabForm.get('healthHistory').setValue(this.patient.healthHistory);
      this.tabForm.get('regularDoctor').setValue(this.patient.regularDoctor);
      this.tabForm.get('healthNote').setValue(this.patient.healthNote);
      this.tabForm.get('freeNotes').setValue(this.patient.freeNotes);

      this.dataSource.data = this.patient.consultation;
      this.activities = this.patient.activity;
    }
  }

  ngOnInit() {
    this.patient = new Patient().patient;
    this.dataSource = new MatTableDataSource();

    this.tabForm = new FormGroup({
      groupPatient: new FormControl(),
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
      consultationDate: new FormControl(new Date()),
      consultationCost: new FormControl(this.defaultCost),
      consultationPaymentMethod: new FormControl(),
      consultationTarificationType: new FormControl(),
      freeNotes: new FormControl()
    });
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
    this.patient.groupPatient = this.tabForm.get('groupPatient').value;
    this.patient.title = this.tabForm.get('title').value;
    this.patient.firstname = this.tabForm.get('firstname').value;
    this.patient.name = this.tabForm.get('name').value;
    this.patient.sex = this.tabForm.get('sex').value;
    this.patient.sex = this.tabForm.get('sex').value;
    this.patient.birthdate = this.tabForm.get('birthdate').value;
    this.patient.profession = this.tabForm.get('profession').value;
    this.patient.maritalStatus = this.tabForm.get('maritalStatus').value;
    this.patient.landline = this.tabForm.get('landline').value;
    this.patient.mobile = this.tabForm.get('mobile').value;
    this.patient.email = this.tabForm.get('email').value;
    this.patient.creationDate = this.tabForm.get('creationDate').value;
    this.patient.favoriteContactType = this.tabForm.get('favoriteContactType').value;
    this.patient.metabolism = this.tabForm.get('metabolism').value;
    this.patient.healthHistory = this.tabForm.get('healthHistory').value;
    this.patient.regularDoctor = this.tabForm.get('regularDoctor').value;
    this.patient.healthNote = this.tabForm.get('healthNote').value;
    this.patient.activity.concat(this.activities);
    this.patient.consultation.push({
      'date': this.tabForm.get('consultationDate').value,
      'cost': this.tabForm.get('consultationCost').value,
      'paymentMethod': this.tabForm.get('consultationPaymentMethod').value,
      'tarificationType': this.tabForm.get('consultationTarificationType').value
    });
    this.patient.freeNotes = this.tabForm.get('freeNotes').value;

    if (!this.patient.id) {
      this.patientsService.addPatient(this.patient).subscribe( res => {
        console.log(res);
      });
    } else {
      this.patientsService.updatePatient(this.patient).subscribe( res => {
        console.log(res);
      });
    }

    this.outSelectedIndex.emit(2); // Redirection vers mon évolution
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogRemoveComponent, {
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Suppression du patient
        if (this.patient.id) {
          this.patientsService.removePatient(this.patient).subscribe( res => {
            console.log(res);
          });
        }
        this.outSelectedIndex.emit(0); // Redirection vers recherche
      }
    });
  }

}
