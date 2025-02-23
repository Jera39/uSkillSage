import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageSubcategoryPage } from './page-subcategory.page';

describe('PageSubcategoryPage', () => {
  let component: PageSubcategoryPage;
  let fixture: ComponentFixture<PageSubcategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSubcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
