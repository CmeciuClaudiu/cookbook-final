import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCoursePageComponent } from './first-course-page.component';

describe('FirstCoursePageComponent', () => {
  let component: FirstCoursePageComponent;
  let fixture: ComponentFixture<FirstCoursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstCoursePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
