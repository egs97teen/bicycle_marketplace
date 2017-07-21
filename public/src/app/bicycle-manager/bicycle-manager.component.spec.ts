import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BicycleManagerComponent } from './bicycle-manager.component';

describe('BicycleManagerComponent', () => {
  let component: BicycleManagerComponent;
  let fixture: ComponentFixture<BicycleManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicycleManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BicycleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
