import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';

import {IPatient} from '../../models/patient';
import {SaveDataService} from '../../services/save-data.service';
import {PatientsService} from '../../services/patient-service';

@Component({
  selector: 'app-recherche-patient',
  templateUrl: './recherche-patient.component.html',
  styleUrls: ['./recherche-patient.component.scss']
})
export class RecherchePatientComponent implements OnInit {

  displayedColumnsSearch = ['groupPatient', 'name', 'firstname', 'birthdate', 'profession', 'email', 'mobile'];
  dataSource: MatTableDataSource<IPatient> = new MatTableDataSource();
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private saveDataService: SaveDataService,
              private patientsService: PatientsService) { }

  ngOnInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.patientsService!.findAllPatients(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.length;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  goToFichePatient(patient) {
    console.log('patient', patient);
    this.saveDataService.currentPatient = patient;
    // TODO Redirection vers fiche patient
  }
}
