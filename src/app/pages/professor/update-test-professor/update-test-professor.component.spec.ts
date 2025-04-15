import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTestProfessorComponent } from './update-test-professor.component';

describe('UpdateTestProfessorComponent', () => {
  let component: UpdateTestProfessorComponent;
  let fixture: ComponentFixture<UpdateTestProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTestProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTestProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
