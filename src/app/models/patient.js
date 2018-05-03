"use strict";
exports.__esModule = true;
var Patient = /** @class */ (function () {
    function Patient() {
        this.patient = {
            id: null,
            creationDate: new Date(),
            lastUpdate: new Date(),
            title: '',
            name: '',
            firstname: '',
            sex: '',
            birthdate: null,
            email: '',
            mobile: '',
            landline: '',
            favoriteContactType: '',
            profession: '',
            maritalStatus: '',
            groupPatient: [],
            metabolism: '',
            healthHistory: '',
            regularDoctor: '',
            healthNote: '',
            freeNotes: '',
            activity: [],
            consultation: [],
            evolution: []
        };
    }
    return Patient;
}());
exports.Patient = Patient;
