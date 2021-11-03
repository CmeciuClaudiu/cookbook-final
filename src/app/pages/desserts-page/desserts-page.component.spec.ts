import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertsPageComponent } from './desserts-page.component';

describe('DessertsPageComponent', () => {
  let component: DessertsPageComponent;
  let fixture: ComponentFixture<DessertsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DessertsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
