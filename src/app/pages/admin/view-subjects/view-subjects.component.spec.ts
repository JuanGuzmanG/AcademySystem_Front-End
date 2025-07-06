import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsubjectsComponent } from './view-subjects.component';

describe('ViewCategoriesComponent', () => {
  let component: ViewsubjectsComponent;
  let fixture: ComponentFixture<ViewsubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewsubjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewsubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
