import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-address-field-group',
  templateUrl: './address-field-group.component.html',
  styleUrls: ['./address-field-group.component.scss']
})
export class AddressFieldGroupComponent implements OnInit {

  @Input() Street!: FormControl
  @Input() City!: FormControl;
  @Input() ZipCode!: FormControl;
  @Input() Latitude!: FormControl;
  @Input() Longitude!: FormControl;

  useGoogleAddress = new FormControl(false);
  constructor() { }

  ngOnInit(): void {
    this.useGoogleAddress.setValue(!!(this.Latitude.value && this.Longitude.value));
  }

}
