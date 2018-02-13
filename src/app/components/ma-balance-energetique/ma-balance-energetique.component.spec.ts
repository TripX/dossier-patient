import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaBalanceEnergetiqueComponent } from './ma-balance-energetique.component';

describe('MaBalanceEnergetiqueComponent', () => {
  let component: MaBalanceEnergetiqueComponent;
  let fixture: ComponentFixture<MaBalanceEnergetiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaBalanceEnergetiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaBalanceEnergetiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
