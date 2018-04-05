import {app as appElectron, BrowserWindow, screen} from 'electron';
import * as path from 'path';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
import * as url from 'url';

if (serve) {
  require('electron-reload')(__dirname, {
  });
}

// SERVER SIDE BEGIN

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

import {patientsData} from './src/assets/data/patients';
const initialPatients = patientsData;
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

api.put('/patients/:id', (req, res) => {
  const updatedPatient = req.body;
  const index = initialPatients.indexOf(initialPatients.find(x => x.id === updatedPatient.id));
  if (index !== -1) {
    initialPatients[index] = updatedPatient;
  }
  res.json(updatedPatient);
});

/*api.get('/search/:group/:name?/:sex?', (req, res) => {
  const group = req.params.group;
  let name = req.params.name;
  let sex = req.params.sex;

  let patients = getAllPatients().filter(j => (j.group.map( c => c.toLowerCase()).indexOf(group) !== -1));
  if (name) {
    name = name.toLowerCase().trim();
    patients = patients.filter(j => (j.name.toLowerCase() === name));
  }
  if (sex) {
    sex = sex.toLowerCase().trim();
    patients = patients.filter(j => (j.sex.toLowerCase() === sex));
  }
  res.json({ success: true, patients });
});*/

api.get('/patients/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const patient = getAllPatients().filter(p => p.id === id);
  if (patient.length === 1) {
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
// SERVER SIDE END

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    protocol: 'file:',
    pathname: path.join(__dirname, '/index.html'),
    slashes:  true
  }));

  // Open the DevTools.
  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  appElectron.on('ready', createWindow);

  // Quit when all windows are closed.
  appElectron.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      appElectron.quit();
    }
  });

  appElectron.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
