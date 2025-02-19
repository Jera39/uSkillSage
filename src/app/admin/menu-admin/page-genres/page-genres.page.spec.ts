import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageGenresPage } from './page-genres.page';

describe('PageGenresPage', () => {
  let component: PageGenresPage;
  let fixture: ComponentFixture<PageGenresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGenresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
