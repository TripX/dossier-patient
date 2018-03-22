import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DateAdapter, MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource} from '@angular/material';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';

import {IPatient, NEW_PATIENT} from '../../models/patient';
import {PatientsService} from '../../services/patient-service';
import {FrenchDateAdapter} from '../../services/FrenchDateAdapter';

@Component({
  selector: 'app-recherche-patient',
  templateUrl: './recherche-patient.component.html',
  styleUrls: ['./recherche-patient.component.scss'],
  providers: [{provide: DateAdapter, useClass: FrenchDateAdapter}, MatPaginatorIntl]
})
export class RecherchePatientComponent implements OnInit, AfterViewInit {

  displayedColumnsSearch = ['groupPatient', 'name', 'firstname', 'birthdate', 'profession', 'email', 'mobile', 'icon'];
  dataSource: MatTableDataSource<IPatient> = new MatTableDataSource();
  resultsLength = 0;
  isLoadingResults = true;
  error = '';

  @Output() onSelectedIndex = new EventEmitter<number>();
  @Output() onSearchPatient = new EventEmitter<IPatient>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private patientsService: PatientsService,
              private matPaginatorIntl: MatPaginatorIntl,
              private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('fr');
  }

  ngOnInit() {
    // Label paginator
    this.matPaginatorIntl.previousPageLabel = 'Précédente';
    this.matPaginatorIntl.nextPageLabel = 'Suivante';
    this.matPaginatorIntl.lastPageLabel = 'Dernière page';
    this.matPaginatorIntl.firstPageLabel = 'Première page';
    this.matPaginatorIntl.firstPageLabel = 'Première page';
    this.matPaginatorIntl.itemsPerPageLabel = 'Éléments par page';
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const rangeLabel = 'sur';
      if (length === 0 || pageSize === 0) {
        return `0 ${rangeLabel} ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} à ${endIndex} ${rangeLabel} ${length}`;
    };

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
          this.error = 'Une erreur serveur est survenue. Contacter votre administrateur.';
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  goToFichePatient(patient: IPatient, onglet: number) {
    console.log('patient', patient, onglet);
    if (patient) {
      this.onSearchPatient.emit(patient);
    } else {
      this.onSearchPatient.emit(NEW_PATIENT);
    }
    this.onSelectedIndex.emit(onglet);
  }

}
