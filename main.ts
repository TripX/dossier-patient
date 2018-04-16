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
// TODO mettre dans un fichier server.js séparé

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Datastore = require('nedb')
  , db = new Datastore({ filename: 'src/assets/db/patients.db', autoload: true });


// TODO TO USE TO Ajout faux patients
/*import {patientsData} from './src/assets/data/patients';
const initialPatients = patientsData;
db.insert(initialPatients, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});*/

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const api = express.Router();

api.get('/patients', (req, res) => {
  db.find({}, function (err, docs) {
    res.json(docs);
  });
});

/*api.get('/patients/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.findOne({ id: id}, function (err, doc) {
    if (doc.id) {
      res.json({ success: true, patient: doc});
    } else {
      res.json({ success: false, message: `pas de patient pour id ${id}`});
    }
  });
});*/

// Nouveau patient
api.post('/patients', (req, res) => {
  const patient = req.body;
  db.insert(patient, function (err, newDoc) {
    res.json(newDoc);
  });
});

// TODO Modification patient
/*api.post('/patients/update', (req, res) => {

  console.log('req.body', req.body);
  res.json(req);*/

  /*db.remove({ id: req.body.id }, {}, function (err, numRemoved) {
    // numRemoved = 1
  });

  const patient = req.body;
  db.insert(patient, function (err, newDoc) {
    res.json(newDoc);
  });*/

  /*db.update({ id: req.body.id }, req.body, {}, function (err, numReplaced) {
    // numReplaced = 1
    // The doc #3 has been replaced by { _id: 'id3', planet: 'Pluton' }
    // Note that the _id is kept unchanged, and the document has been replaced
    // (the 'system' and inhabited fields are not here anymore)
    console.log('err', err);
    res.json(numReplaced);
  });*/
// });

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
