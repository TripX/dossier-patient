import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-dossier-patient',
  templateUrl: './dossier-patient.component.html',
  styleUrls: ['./dossier-patient.component.scss'],
  providers: [MatIconRegistry]
})
export class DossierPatientComponent {

  constructor(private domSanitizer: DomSanitizer,
              public matIconRegistry: MatIconRegistry) {

    // Custom material icons
    matIconRegistry.addSvgIconSetInNamespace('addCircleBlack"',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/svg-icons/add_circle_black.svg'));
  }
}
