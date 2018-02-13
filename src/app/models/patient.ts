export interface IPatient {
  id: number;
  creationDate: string;
  lastUpdate: string;
  title: string;
  name: string;
  firstname: string;
  sex: string;
  birthdate: string;
  email: string;
  mobile: string;
  landline: string;
  favoriteContact: string;
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
  paymentMethod: string;
  tarificationType: string;
  weight: IWeight[];
  height: IHeight[];
  skinfold: ISkinfold[];
  size: ISize[];
}

export interface IActivity {
  title: string;
  hoursPerWeek: number
}

export interface IConsultation {
  date: string;
  cost: number;
}

export interface IWeight {
  date: string;
  kg: number;
}

export interface IHeight {
  date: string;
  cm: number;
}

export interface ISkinfold {
  date: string;
  bicipital: number;
  tricipital: number;
  subscapulaire: number;
  suprailiaque: number;
}

export interface ISize {
  date: string;
  waist: number;
  hip: number;
  pectoral: number;
  arm: number;
  thigh: number;
}
