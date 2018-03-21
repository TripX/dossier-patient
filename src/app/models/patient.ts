export const NEW_PATIENT: IPatient = this.patient = {
  'id': null,
  'creationDate': new Date(),
  'lastUpdate': new Date(),
  'title': '',
  'name': '',
  'firstname': '',
  'sex': '',
  'birthdate': null,
  'email': '',
  'mobile': '',
  'landline': '',
  'favoriteContactType': '',
  'profession': '',
  'maritalStatus': '',
  'groupPatient': [],
  'metabolism': '',
  'healthHistory': '',
  'regularDoctor': '',
  'healthNote': '',
  'freeNotes': '',
  'activity': [
    {
      'index': null,
      'title': '',
      'hoursPerWeek' : null
    }
  ],
  'consultation': [
    {
      'date': null,
      'cost': null,
      'paymentMethod': '',
      'tarificationType': ''
    }
  ],
  'evolution': [
    {
      'date': new Date(),
      'height': null,
      'weight': null,
      'bicipital': null,
      'tricipital': null,
      'subscapulaire': null,
      'suprailiaque': null,
      'waist': null,
      'hip': null,
      'pectoral': null,
      'arm': null,
      'thigh': null
    }
  ]
};

export interface IPatient {
  id: number;
  creationDate: Date;
  lastUpdate: Date;
  title: string;
  name: string;
  firstname: string;
  sex: string;
  birthdate: Date;
  email: string;
  mobile: string;
  landline: string;
  favoriteContactType: string;
  profession: string;
  maritalStatus: string;
  groupPatient: string[];
  metabolism: string;
  healthHistory: string;
  regularDoctor: string;
  healthNote: string;
  freeNotes: string;
  activity: IActivity[];
  consultation: IConsultation[];
  evolution: IEvolution[];
}

export interface IActivity {
  index: number;
  title: string;
  hoursPerWeek: number;
}

export interface IConsultation {
  date: Date;
  cost: number;
  paymentMethod: string;
  tarificationType: string;
}

export interface IEvolution {
  date: Date,
  height: number,
  weight: number,
  bicipital: number,
  tricipital: number,
  subscapulaire: number,
  suprailiaque: number,
  waist: number,
  hip: number,
  pectoral: number,
  arm: number,
  thigh: number
}
