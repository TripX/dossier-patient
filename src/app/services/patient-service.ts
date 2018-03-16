import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IPatient} from '../models/patient';

@Injectable()
export class PatientsService {

  BASE_URL = 'http://localhost:4201/';

  constructor(private http: HttpClient) {}

  findAllPatients(sort: string, order: string, page: number): Observable<IPatient[]> {
    const href = this.BASE_URL + 'api/patients';
    const requestUrl = `${href}?sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<IPatient[]>(requestUrl);
  }
}
