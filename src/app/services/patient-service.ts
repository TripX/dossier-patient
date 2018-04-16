import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IPatient} from '../models/patient';
import {Subject} from 'rxjs/Rx';

@Injectable()
export class PatientsService {

  private BASE_URL = 'http://localhost:4201/';

  searchResultSubject = new Subject();

  constructor(private http: HttpClient) {}

  findAllPatients(sort: string, order: string, page: number): Observable<IPatient[]> {
    const href = this.BASE_URL + 'api/patients';
    const requestUrl = `${href}?sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<IPatient[]>(requestUrl);
  }

  savePatient(patientData: IPatient): Observable<IPatient> {
    if (!patientData.id) {
      patientData.id = new Date().getTime();
      return this.http.post<IPatient>(this.BASE_URL + 'api/patients', patientData);
    } else {
      console.log('call put', patientData);
      return this.http.post<IPatient>(this.BASE_URL + 'api/patients/update', patientData);
    }
  }

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
