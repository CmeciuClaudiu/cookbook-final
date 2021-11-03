import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeveragesPageComponent } from './beverages-page.component';

describe('BeveragesPageComponent', () => {
  let component: BeveragesPageComponent;
  let fixture: ComponentFixture<BeveragesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeveragesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeveragesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
