const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./patients');

let initialPatients = data.patients;
let addedPatients = [];

const getAllPatients = () => {
  return [...addedPatients, ...initialPatients];
};

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const api = express.Router();

api.get('/patients', (req, res) => {
  res.json(getAllPatients());
});

api.post('/patients', (req, res) => {
  const patient = req.body;
  addedPatients = [patient, ...addedPatients];
  res.json(patient);
});

api.get('/search/:group/:name?/:sex?', (req, res) => {
  const group = req.params.group;
  let name = req.params.name;
  let sex = req.params.sex;

  console.log('params', req.params);

  let patients = getAllPatients().filter(j => (j.group.map( c => c.toLowerCase()).indexOf(group) !== -1));
  if(name) {
    name = name.toLowerCase().trim();
    patients = patients.filter(j => (j.name.toLowerCase() === name));
  }
  if(sex) {
    sex = sex.toLowerCase().trim();
    patients = patients.filter(j => (j.sex.toLowerCase() === sex));
  }
  res.json({ success: true, patients });
});

api.get('/patients/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const patient = getAllPatients().filter(p => p.id === id);
  if(patient.length === 1) {
    res.json({ success: true, patient: patient[0]});
  } else {
    res.json({ success: false, message: `pas de patient pour id ${id}`});
  }
});

app.use('/api', api);

const port = 4201;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
