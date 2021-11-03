import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppetizersPageComponent } from './appetizers-page.component';

describe('AppetizersPageComponent', () => {
  let component: AppetizersPageComponent;
  let fixture: ComponentFixture<AppetizersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppetizersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppetizersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
