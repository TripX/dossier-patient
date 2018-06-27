import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IEvolution, IPatient} from '../models/patient';

@Injectable()
export class PatientsService {

  private BASE_URL = 'http://localhost:4201/api/patients';

  constructor(private http: HttpClient) {}

  findAllPatients(sort: string, order: string, page: number): Observable<IPatient[]> {
    return this.http.get<IPatient[]>(`${this.BASE_URL}?sort=${sort}&order=${order}&page=${page + 1}`);
  }

  addPatient(patientData: IPatient): Observable<IPatient> {
    patientData.id = new Date().getTime();
    return this.http.post<IPatient>(this.BASE_URL, patientData);
  }

  updatePatient(patientData: IPatient): Observable<IPatient> {
    return this.http.put<IPatient>(`${this.BASE_URL}/${patientData.id}`, patientData);
  }

  removePatient(patientData: IPatient): Observable<IPatient> {
    return this.http.delete<IPatient>(`${this.BASE_URL}/${patientData.id}`);
  }

  getPatient(id): Observable<IPatient> {
    return this.http.get<IPatient>(`${this.BASE_URL}/${id}`);
  }

  /*searchPatient(criteria): Observable<Array<IPatient>> {
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
  }*/
}
