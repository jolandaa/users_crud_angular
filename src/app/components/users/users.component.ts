import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {AppEvents} from "../../app-events.service";
import {UsersModel} from "../../models/users.model";
import {MatDialog} from "@angular/material/dialog";
import {AddUserComponent} from "../add-user/add-user.component";
import {EditUserComponent} from "../edit-user/edit-user.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  dataSource: UsersModel[] = [];

  constructor(private usersService: UsersService,
              private appEventService: AppEvents,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.appEventService.setAppLoadingState(true);
    this.usersService.getAllUsers().subscribe((res: UsersModel[]) => {
      this.dataSource = res;
    }, error => {

    }).add(() => this.appEventService.setAppLoadingState(false));
  }

  openCreateUserModal() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '590px',
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getUsersList();
      }
    })
  }

  openEditUserModal(user: UsersModel) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user,
      width: '590px',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getUsersList();
      }
    })
  }

  deleteUserConfirmation() {

  }
}
