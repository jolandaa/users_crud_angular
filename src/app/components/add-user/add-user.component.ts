import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {AppEvents} from "../../app-events.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userFormGroup = new FormGroup({});

  hasErrors = false;
  constructor(private fb: FormBuilder,
              private appEventService: AppEvents,
              private usersService: UsersService,
              private dialogRef: MatDialogRef<AddUserComponent>) {
    this.userFormGroup = this.fb.group({
      name: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      address: this.fb.group({
        street: [],
        city: [],
        zipcode: [],
        geo: this.fb.group({
          lng: [],
          lat: []
        })
      })
    })
  }

  ngOnInit(): void {
  }

  saveUser() {
    if (this.userFormGroup.invalid) {
      this.hasErrors = true;
      return;
    }
    this.appEventService.setAppLoadingState(true);
    this.usersService.createUser(this.userFormGroup.value).subscribe(res => {
      this.dialogRef.close(true);
      this.appEventService.showSuccessToast('You have created a new user!');
    }, error => {
      this.appEventService.showFailureToast('Something went wrong');
    }).add(() => this.appEventService.setAppLoadingState(false));
  }

  get Name() {
    return this.userFormGroup.get('name') as FormControl;
  }
  get Username() {
    return this.userFormGroup.get('username') as FormControl;
  }
  get Email() {
    return this.userFormGroup.get('email') as FormControl;
  }
  get Phone() {
    return this.userFormGroup.get('phone') as FormControl;
  }
  get Street() {
    return this.userFormGroup.get('address.street') as FormControl;
  }
  get City() {
    return this.userFormGroup.get('address.city') as FormControl;
  }
  get ZipCode() {
    return this.userFormGroup.get('address.zipcode') as FormControl;
  }
  get Latitude() {
    return this.userFormGroup.get('address.geo.lat') as FormControl;
  }
  get Longitude() {
    return this.userFormGroup.get('address.geo.lng') as FormControl;
  }
}
