import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import 'hammerjs';

import {HttpClientModule, HttpClient} from '@angular/common/http';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMaterialModule} from './module/angular-material';

import {AppRoutingModule} from './app-routing.module';

// NG Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {ElectronService} from './providers/electron.service';
import {SaveDataService} from './services/save-data.service';
import {PatientsService} from './services/patient-service';

import {WebviewDirective} from './directives/webview.directive';

import {AppComponent} from './app.component';
import {DossierPatientComponent} from './components/dossier-patient/dossier-patient.component';
import {FichePatientComponent} from './components/fiche-patient/fiche-patient.component';
import {MonEvolutionComponent} from './components/mon-evolution/mon-evolution.component';
import {MaBalanceEnergetiqueComponent} from './components/ma-balance-energetique/ma-balance-energetique.component';
import {RecherchePatientComponent} from './components/recherche-patient/recherche-patient.component';
import {MonEnqueteAlimentaireComponent} from './components/mon-enquete-alimentaire/mon-enquete-alimentaire.component';
import { BeautifyArrayPipe } from './pipes/beautify-array.pipe';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    DossierPatientComponent,
    FichePatientComponent,
    MonEvolutionComponent,
    MaBalanceEnergetiqueComponent,
    RecherchePatientComponent,
    MonEnqueteAlimentaireComponent,
    BeautifyArrayPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    NoopAnimationsModule,
    CustomMaterialModule
  ],
  providers: [
    ElectronService,
    SaveDataService,
    PatientsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
