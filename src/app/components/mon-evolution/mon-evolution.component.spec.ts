import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEvolutionComponent } from './mon-evolution.component';

describe('MonEvolutionComponent', () => {
  let component: MonEvolutionComponent;
  let fixture: ComponentFixture<MonEvolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonEvolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
