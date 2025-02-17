import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutaInicialPage } from './ruta-inicial.page';

describe('RutaInicialPage', () => {
  let component: RutaInicialPage;
  let fixture: ComponentFixture<RutaInicialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaInicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
