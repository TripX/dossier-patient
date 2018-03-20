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
  'weight': [
    {
      'date': null,
      'kg': null
    }
  ],
  'height':  [
    {
      'date': null,
      'cm': null
    }
  ],
  'skinfold': [
    {
      'date': null,
      'bicipital': null,
      'tricipital': null,
      'subscapulaire': null,
      'suprailiaque': null
    }
  ],
  'size': [
    {
      'date': null,
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
  weight: IWeight[];
  height: IHeight[];
  skinfold: ISkinfold[];
  size: ISize[];
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

export interface IWeight {
  date: Date;
  kg: number;
}

export interface IHeight {
  date: Date;
  cm: number;
}

export interface ISkinfold {
  date: Date;
  bicipital: number;
  tricipital: number;
  subscapulaire: number;
  suprailiaque: number;
}

export interface ISize {
  date: Date;
  waist: number;
  hip: number;
  pectoral: number;
  arm: number;
  thigh: number;
}
