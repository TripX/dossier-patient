import {IPatient} from '../../app/models/patient';

export let patientsData: IPatient[] = [
  {
    'id': 1,
    'creationDate': new Date('2017-08-01'),
    'lastUpdate':  new Date('2017-09-01'),
    'title': 'Monsieur',
    'name': 'Rousseau',
    'firstname': 'Bastien',
    'sex': 'Masculin',
    'birthdate': new Date('1989-12-13'),
    'email': 'test@test.com',
    'mobile': '0601020304',
    'landline': '0801020304',
    'favoriteContactType': 'SMS',
    'profession': 'Ingénieur',
    'maritalStatus': 'Couple',
    'groupPatient': ['Patients', 'Patients Coaching'],
    'metabolism': 'A contracté tel maladie à tel moment, forte corpulance',
    'healthHistory': 'Antécédents ...',
    'regularDoctor': 'Dr Test Test',
    'healthNote': 'Autres notes sur la santé !',
    'freeNotes': 'Champ Notes blablablabla, j\'ai fais cela, ceci et ça.',
    'activity': [
      {
        'index': 0,
        'title': 'Karaté',
        'hoursPerWeek' : 2
      },
      {
        'index': 1,
        'title': 'Vélo',
        'hoursPerWeek' : 3
      }
    ],
    'consultation': [
      {
        'date': new Date('2017-08-22'),
        'cost': 57,
        'paymentMethod': 'Espèce',
        'tarificationType': 'Type 1'
      },
      {
        'date': new Date('2017-09-22'),
        'cost': 50,
        'paymentMethod': 'CB',
        'tarificationType': 'Type 1'
      }
    ],
    'evolution': [
      {
        'date': new Date('2017-08-22'),
        'height': 178,
        'weight': 80,
        'bicipital': 2,
        'tricipital': 2,
        'subscapulaire': 1,
        'suprailiaque': 1,
        'waist': 70,
        'hip': 70,
        'pectoral': 110,
        'arm': 10,
        'thigh': 40
      },
      {
        'date': new Date('2017-09-22'),
        'height': 178,
        'weight': 78,
        'bicipital': 2,
        'tricipital': 2,
        'subscapulaire': 1,
        'suprailiaque': 1,
        'waist': 70,
        'hip': 70,
        'pectoral': 110,
        'arm': 10,
        'thigh': 40
      },
      {
        'date': new Date('2017-10-22'),
        'height': 178,
        'weight': 77,
        'bicipital': 2,
        'tricipital': 2,
        'subscapulaire': 1,
        'suprailiaque': 1,
        'waist': 70,
        'hip': 70,
        'pectoral': 108,
        'arm': 10,
        'thigh': 40
      }
    ]
  },
  {
    'id': 2,
    'creationDate': new Date('2017-08-22'),
    'lastUpdate': new Date('2017-10-17'),
    'title': 'Madame',
    'name': 'Garciau',
    'firstname': 'Naomi',
    'sex': 'Féminin',
    'birthdate': new Date('1996-10-13'),
    'email': 'naomi.garciau@test.com',
    'mobile': '0615009900',
    'landline': '0800000000',
    'favoriteContactType': 'SMS',
    'profession': 'Diététicienne',
    'maritalStatus': 'Couple',
    'groupPatient': ['Patients', 'Patients Coaching', 'Patients Novagym'],
    'metabolism': 'A contracté tel maladie à tel moment, maigre, gras, gros',
    'healthHistory': 'Antécédents femme ...',
    'regularDoctor': 'Dr Test Femme',
    'healthNote': 'Autres notes sur la santé de cette femme !',
    'freeNotes': 'Champ Notes blablablabla, j\'ai fais cela, ceci et ça à cette femme.',
    'activity': [
      {
        'index': 0,
        'title': 'Karaté',
        'hoursPerWeek' : 3
      },
      {
        'index': 1,
        'title': 'Body Karaté',
        'hoursPerWeek' : 3
      },
      {
        'index': 2,
        'title': 'Musculation',
        'hoursPerWeek' : 5
      }
    ],
    'consultation': [
      {
        'date': new Date('2017-08-22'),
        'cost': 75,
        'paymentMethod': 'Espèce',
        'tarificationType': 'Type 1'
      },
      {
        'date': new Date('2017-09-22'),
        'cost': 45,
        'paymentMethod': 'Espèce',
        'tarificationType': 'Type 1'
      }
    ],
    'evolution': [
      {
        'date': new Date('2017-08-22'),
        'height': 165,
        'weight': 70,
        'bicipital': 2,
        'tricipital': 2,
        'subscapulaire': 1,
        'suprailiaque': 1,
        'waist': 70,
        'hip': 70,
        'pectoral': 110,
        'arm': 10,
        'thigh': 40
      },
      {
        'date': new Date('2017-09-22'),
        'height': 165,
        'weight': 70,
        'bicipital': 2,
        'tricipital': 2,
        'subscapulaire': 1,
        'suprailiaque': 1,
        'waist': 70,
        'hip': 70,
        'pectoral': 110,
        'arm': 10,
        'thigh': 40
      }
    ]
  },
  {
    'id': 3,
    'creationDate': new Date('2017-08-22'),
    'lastUpdate': new Date('2017-10-17'),
    'title': 'Madame',
    'name': 'Tartufe',
    'firstname': 'Emmeline',
    'sex': 'Féminin',
    'birthdate': new Date('1991-12-13'),
    'email': 'testFemme@test.com',
    'mobile': '0625450000',
    'landline': '0800000000',
    'favoriteContactType': 'Téléphone Fixe',
    'profession': 'Professeur',
    'maritalStatus': 'Mariée',
    'groupPatient': ['Patients'],
    'metabolism': 'A contracté tel maladie à tel moment, maigre',
    'healthHistory': 'Antécédents femme ...',
    'regularDoctor': 'Dr Test Femme',
    'healthNote': 'Autres notes sur la santé de cette femme !',
    'freeNotes': 'Champ Notes blablablabla, j\'ai fais cela, ceci et ça à cette femme.',
    'activity': [
      {
        'index': 0,
        'title': 'Pilate',
        'hoursPerWeek' : 3
      }
    ],
    'consultation': [
      {
        'date': new Date('2017-08-22'),
        'cost': 72,
        'paymentMethod': 'Espèce',
        'tarificationType': 'Type 3'
      },
      {
        'date': new Date('2017-09-22'),
        'cost': 52,
        'paymentMethod': 'Espèce',
        'tarificationType': 'Type 1'
      }
    ],
    'evolution': [
      {
        'date': new Date('2017-09-22'),
        'height': 155,
        'weight': 65,
        'bicipital': 2,
        'tricipital': 2,
        'subscapulaire': 1,
        'suprailiaque': 1,
        'waist': 70,
        'hip': 70,
        'pectoral': 110,
        'arm': 10,
        'thigh': 40
      }
    ]
  },
  {
    'id': 4,
    'creationDate': new Date('2017-08-22'),
    'lastUpdate': new Date('2017-10-17'),
    'title': 'Monsieur',
    'name': 'Test',
    'firstname': 'Temoi',
    'sex': 'Féminin',
    'birthdate': new Date('1980-01-30'),
    'email': 'testtemoi@test.com',
    'mobile': '0609000045',
    'landline': '0800000000',
    'favoriteContactType': 'Téléphone Portable',
    'profession': 'Agriculteur',
    'maritalStatus': 'Célibataire',
    'groupPatient': ['Patients Novagym'],
    'metabolism': 'A contracté tel maladie à tel moment, maigre',
    'healthHistory': 'Antécédents femme ...',
    'regularDoctor': 'Dr Test Femme',
    'healthNote': 'Autres notes sur la santé de cette femme !',
    'freeNotes': 'Champ Notes blablablabla, j\'ai fais cela, ceci et ça à cette femme.',
    'activity': [],
    'consultation': [
      {
        'date': new Date('2017-08-22'),
        'cost': 0,
        'paymentMethod': 'Espèce',
        'tarificationType': 'Type 1'
      }
    ],
    'evolution': []
  },
  {
    'id': 5,
    'creationDate': new Date('2017-08-22'),
    'lastUpdate': new Date('2017-10-17'),
    'title': 'Monsieur',
    'name': 'Tube',
    'firstname': 'Jean',
    'sex': 'Masculin',
    'birthdate': new Date('2003-06-19'),
    'email': 'babilolilo@da.com',
    'mobile': '0690001020',
    'landline': '0800000000',
    'favoriteContactType': 'Mail',
    'profession': 'Serveur',
    'maritalStatus': 'Veuf',
    'groupPatient': ['Patients'],
    'metabolism': 'A contracté tel maladie à tel moment, maigre',
    'healthHistory': 'Antécédents femme ...',
    'regularDoctor': 'Dr Test Femme',
    'healthNote': 'Autres notes sur la santé de cette femme !',
    'freeNotes': 'Champ Notes blablablabla, j\'ai fais cela, ceci et ça à cette femme.',
    'activity': [
      {
        'index': 0,
        'title': 'Course à pied',
        'hoursPerWeek' : 5
      }
    ],
    'consultation': [
      {
        'date': new Date('2017-08-22'),
        'cost': 70,
        'paymentMethod': 'Espèce',
        'tarificationType': 'Type 1'
      },
      {
        'date': new Date('2017-09-22'),
        'cost': 70,
        'paymentMethod': 'Espèce',
        'tarificationType': 'Type 1'
      }
    ],
    'evolution': [
      {
        'date': new Date('2006-02-22'),
        'height': 80,
        'weight': 12,
        'bicipital': 2,
        'tricipital': 2,
        'subscapulaire': 1,
        'suprailiaque': 1,
        'waist': 70,
        'hip': 70,
        'pectoral': 110,
        'arm': 10,
        'thigh': 40
      },
      {
        'date': new Date('2010-02-22'),
        'height': 130,
        'weight': 30,
        'bicipital': 2,
        'tricipital': 2,
        'subscapulaire': 1,
        'suprailiaque': 1,
        'waist': 70,
        'hip': 70,
        'pectoral': 110,
        'arm': 10,
        'thigh': 40
      },
      {
        'date': new Date('2018-02-22'),
        'height': 160,
        'weight': 55,
        'bicipital': 2,
        'tricipital': 2,
        'subscapulaire': 1,
        'suprailiaque': 1,
        'waist': 70,
        'hip': 70,
        'pectoral': 110,
        'arm': 10,
        'thigh': 40
      }
    ]
  }, {
    'id': 6,
    'creationDate': new Date('2018-03-01'),
    'lastUpdate': new Date('2018-03-20'),
    'title': 'Madame',
    'name': 'Jacqueline',
    'firstname': 'Pinageeeeeee',
    'sex': 'Féminin',
    'birthdate': new Date('1954-10-13'),
    'email': 'herocorp@canada.com',
    'mobile': '0600700045',
    'landline': '0800000000',
    'favoriteContactType': 'Mail',
    'profession': 'Professeur',
    'maritalStatus': 'Mariée',
    'groupPatient': ['Patients', 'Patients Coaching'],
    'metabolism': 'A contracté tel maladie à tel moment, maigre',
    'healthHistory': 'Antécédents femme ...',
    'regularDoctor': 'Dr Test Femme',
    'healthNote': 'Autres notes sur la santé de cette femme !',
    'freeNotes': 'Champ Notes blablablabla, j\'ai fais cela, ceci et ça à cette femme.',
    'activity': [
      {
        'index': 0,
        'title': 'Pilate',
        'hoursPerWeek': 9
      }
    ],
    'consultation': [
      {
        'date': new Date('2017-08-22'),
        'cost': 50,
        'paymentMethod': 'Espèce',
        'tarificationType': 'Type 1'
      },
      {
        'date': new Date('2017-09-22'),
        'cost': 45,
        'paymentMethod': 'Espèce',
        'tarificationType': 'Type 1'
      }
    ],
    'evolution': [
      {
        'date': new Date('2017-08-22'),
        'height': 165,
        'weight': 70,
        'bicipital': 2,
        'tricipital': 2,
        'subscapulaire': 1,
        'suprailiaque': 1,
        'waist': 70,
        'hip': 70,
        'pectoral': 110,
        'arm': 10,
        'thigh': 40
      },
      {
        'date': new Date('2017-09-22'),
        'height': 165,
        'weight': 70,
        'bicipital': 2,
        'tricipital': 2,
        'subscapulaire': 1,
        'suprailiaque': 1,
        'waist': 70,
        'hip': 70,
        'pectoral': 110,
        'arm': 10,
        'thigh': 40
      },
      {
        'date': new Date('2017-10-22'),
        'height': 165,
        'weight': 70,
        'bicipital': 2,
        'tricipital': 2,
        'subscapulaire': 1,
        'suprailiaque': 1,
        'waist': 70,
        'hip': 70,
        'pectoral': 110,
        'arm': 10,
        'thigh': 40
      },
      {
        'date': new Date('2017-11-22'),
        'height': 165,
        'weight': 70,
        'bicipital': 2,
        'tricipital': 2,
        'subscapulaire': 1,
        'suprailiaque': 1,
        'waist': 70,
        'hip': 70,
        'pectoral': 110,
        'arm': 10,
        'thigh': 40
      },
      {
        'date': new Date('2017-12-22'),
        'height': 165,
        'weight': 70,
        'bicipital': 2,
        'tricipital': 2,
        'subscapulaire': 1,
        'suprailiaque': 1,
        'waist': 70,
        'hip': 70,
        'pectoral': 110,
        'arm': 10,
        'thigh': 40
      }
    ]
  }
];
