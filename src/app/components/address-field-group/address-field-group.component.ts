import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
// @ts-ignore
import {} from 'googlemaps';

@Component({
  selector: 'app-address-field-group',
  templateUrl: './address-field-group.component.html',
  styleUrls: ['./address-field-group.component.scss']
})
export class AddressFieldGroupComponent implements OnInit, AfterViewInit {

  @Input() Street!: FormControl
  @Input() City!: FormControl;
  @Input() ZipCode!: FormControl;
  @Input() Latitude!: FormControl;
  @Input() Longitude!: FormControl;
  @ViewChild('addresstext') addresstext: any;

  adressType = 'address';

  selectedAddress: any;

  useGoogleAddress = new FormControl(false);
  constructor() { }

  ngOnInit(): void {
    this.useGoogleAddress.valueChanges.subscribe(res => {
      if (res && this.selectedAddress) {
        this.Latitude.setValue(this.selectedAddress.geometry?.location.lat());
        this.Longitude.setValue(this.selectedAddress.geometry?.location.lng());
      }
    })
    this.useGoogleAddress.setValue(!!(this.Latitude.value && this.Longitude.value));
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: { country: 'US' },
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.selectedAddress = place;
      this.City.setValue(place.vicinity);
      if (this.useGoogleAddress.value) {
        this.Latitude.setValue(place.geometry?.location.lat());
        this.Longitude.setValue(place.geometry?.location.lng());
      }
    });
  }

}
