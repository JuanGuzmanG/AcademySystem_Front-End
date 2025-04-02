import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestQuestionsComponent } from './view-test-questions.component';

describe('ViewTestQuestionsComponent', () => {
  let component: ViewTestQuestionsComponent;
  let fixture: ComponentFixture<ViewTestQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTestQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTestQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
