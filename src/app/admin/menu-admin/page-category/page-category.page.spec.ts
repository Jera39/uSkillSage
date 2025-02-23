import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageCategoryPage } from './page-category.page';

describe('PageCategoryPage', () => {
  let component: PageCategoryPage;
  let fixture: ComponentFixture<PageCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
