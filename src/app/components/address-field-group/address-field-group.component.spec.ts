import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFieldGroupComponent } from './address-field-group.component';

describe('AddressFieldGroupComponent', () => {
  let component: AddressFieldGroupComponent;
  let fixture: ComponentFixture<AddressFieldGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressFieldGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFieldGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
