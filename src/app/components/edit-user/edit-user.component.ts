import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppEvents} from "../../app-events.service";
import {UsersService} from "../../services/users.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsersModel} from "../../models/users.model";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userFormGroup = new FormGroup({});

  hasErrors = false;

  userId!: number;
  constructor(private fb: FormBuilder,
              private appEventService: AppEvents,
              private usersService: UsersService,
              @Inject(MAT_DIALOG_DATA) public data: UsersModel,
              private dialogRef: MatDialogRef<EditUserComponent>) {
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
    this.userId = this.data.id;
    this.userFormGroup.patchValue(this.data);
  }

  editUser() {
    if (this.userFormGroup.invalid) {
      this.hasErrors = true;
      return;
    }
    this.appEventService.setAppLoadingState(true);
    this.usersService.editUser(this.userId, this.userFormGroup.value).subscribe(res => {
      this.dialogRef.close(true);
      this.appEventService.showSuccessToast('You have edited this user!');
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
