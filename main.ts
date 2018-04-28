import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

import fs = require('fs');
import {mkdir} from 'fs';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

try {
  require('dotenv').config();
} catch {
  console.log('asar');
}

// SERVER SIDE BEGIN
const express = require('express');
const appExpress = express();
const bodyParser = require('body-parser');

const pathPatients = 'C:/DossierPatient/db/patients.db';

const Datastore = require('nedb')
  , db = new Datastore({ filename: pathPatients, autoload: true });

// TODO TO USE TO Ajout faux patients
/*import {patientsData} from './src/assets/data/patients';
const initialPatients = patientsData;
db.insert(initialPatients, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});*/

appExpress.use(bodyParser.json());

appExpress.use((req, res, next) => {
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

api.get('/patients/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.findOne({ id: id}, function (err, doc) {
    if (doc.id) {
      res.json({ success: true, patient: doc});
    } else {
      res.json({ success: false, message: `Pas de patient pour l'id : ${id}`});
    }
  });
});

// Nouveau patient
api.post('/patients', (req, res) => {
  const patient = req.body;
  db.insert(patient, function (err, newDoc) {
    res.json(newDoc);
  });
});

// Modification patient
api.put('/patients/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const patient = req.body;
  db.update({ id: id }, patient, {}, function (err, numReplaced) {
    res.json(numReplaced);
  });
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

appExpress.use('/api', api);

const port = 4201;

appExpress.listen(port, () => {
  console.log(`listening on port ${port}`);
});
// SERVER SIDE END

function ensureExists(pathFile, mask, cb) {
  fs.mkdir(pathFile, mask, function(err) {
    if (err) {
      if (err.code === 'EEXIST') {
        cb(null); // ignore the error if the folder already exists
      } else {
        cb(err); // something else went wrong
      }
    } else {
      cb(null); // successfully created folder
    }
  });
}

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

  if (serve) {
    require('electron-reload')(__dirname, {
     electron: require(`${__dirname}/node_modules/electron`)});
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.webContents.openDevTools();

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
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {

    versionning();

    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
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


function versionning() {
  // Versionning BDD
  const pathDossierPatient = 'C:/DossierPatient';
  const pathDropbox = pathDossierPatient + '/Dropbox';
  const pathDB = pathDropbox + '/db';
  const pathVersion = pathDB + '/' + (new Date().getDate()).toString();
  const fileName = 'patients.db';
  const allRWEPermissions = parseInt('0777', 8);
  ensureExists(pathDossierPatient, allRWEPermissions, function(errDossierPatient) {
    if (errDossierPatient) {
      // S'il n'existe pas, création du Dossier Patient
      fs.mkdir(pathDossierPatient);
    }
  });
  ensureExists(pathDropbox, allRWEPermissions, function(errDropbox) {
    if (errDropbox) {
      // S'il n'existe pas, création du Dossier Dropbox
      fs.mkdir(pathDropbox);
    }
  });
  ensureExists(pathDB, allRWEPermissions, function(errDB) {
    if (errDB) {
      // S'il n'existe pas, création du Dossier Dropbox
      fs.mkdir(pathDB);
    }
  });
  ensureExists(pathVersion, allRWEPermissions, function (errVersion) {
    if (errVersion) {
      // S'il n'existe pas, création du dossier de version
      fs.mkdir(pathVersion);
    }

    // Versionning = copie du fichier db
    function copyFile(source, target, cb) {
      var cbCalled = false;

      var rd = fs.createReadStream(source);
      rd.on("error", function(err) {
        done(err);
      });
      var wr = fs.createWriteStream(target);
      wr.on("error", function(err) {
        done(err);
      });
      wr.on("close", function(ex) {
        done(ex);
      });
      rd.pipe(wr);

      function done(err) {
        if (!cbCalled) {
          cb(err);
          cbCalled = true;
        }
      }
    }

    copyFile(pathPatients, pathVersion, x => console.log(x));

    /*fs.writeFile(pathVersion + '/' + fileName,
      fs.readFile(pathPatients, (x => console.log('ReadFile : ', x))), x => console.log('WriteFile : ', x));*/
  });
}
