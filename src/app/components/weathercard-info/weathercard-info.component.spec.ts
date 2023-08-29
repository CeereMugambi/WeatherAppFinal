import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathercardInfoComponent } from './weathercard-info.component';

describe('WeathercardInfoComponent', () => {
  let component: WeathercardInfoComponent;
  let fixture: ComponentFixture<WeathercardInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeathercardInfoComponent]
    });
    fixture = TestBed.createComponent(WeathercardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
