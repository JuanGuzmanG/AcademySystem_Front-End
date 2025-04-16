import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestProfessorComponent } from './add-test-professor.component';

describe('AddTestProfessorComponent', () => {
  let component: AddTestProfessorComponent;
  let fixture: ComponentFixture<AddTestProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTestProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
