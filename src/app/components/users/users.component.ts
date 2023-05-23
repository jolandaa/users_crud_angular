import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {AppEvents} from "../../app-events.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private usersService: UsersService,
              private appEventService: AppEvents) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.appEventService.setAppLoadingState(true);
    this.usersService.getAllUsers().subscribe(res => {
      console.log(res);
    }, error => {

    })
  }
}
