import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCoursePageComponent } from './main-course-page.component';

describe('MainCoursePageComponent', () => {
  let component: MainCoursePageComponent;
  let fixture: ComponentFixture<MainCoursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCoursePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
