import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Subject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {IPatient} from '../models/patient';

@Injectable()
export class SaveDataService {
  patientSubject = new Subject();
  searchResultSubject = new Subject();

  BASE_URL = 'http://localhost:4201/';

  constructor(private http: HttpClient) { }

  // TODO NOTE : NE PAS UTILISER CE SERVICE !

  getPatient(id): Observable<IPatient> {
    return this.http.get<IPatient>(this.BASE_URL + `api/patients/${id}`);
  }

  searchPatient(criteria): Observable<Array<IPatient>> {
    let sex = '';
    let name = '';
    if (criteria.name) {
      name = criteria.name ? `/${criteria.name.toLowerCase()}` : '';
      if (criteria.sex && name) {
        sex = criteria.sex ? `/${criteria.sex.toLowerCase()}` : '';
      }
    }
    return this.http.get<Array<IPatient>>(`${this.BASE_URL}api/search/${criteria.group.toLowerCase()}${name}${sex}`)
      .do(res => this.searchResultSubject.next(res));
  }
}
