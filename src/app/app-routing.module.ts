import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DossierPatientComponent} from './components/dossier-patient/dossier-patient.component';
import {FichePatientComponent} from './components/fiche-patient/fiche-patient.component';

const routes: Routes = [
  { path: '', component: DossierPatientComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
