import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Distrilion } from './distrilion';

describe('Distrilion', () => {
  let component: Distrilion;
  let fixture: ComponentFixture<Distrilion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Distrilion],
    }).compileComponents();

    fixture = TestBed.createComponent(Distrilion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
