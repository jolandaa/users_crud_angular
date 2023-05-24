import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {USERS} from "../components/constants/endpoint.data";
import {catchError, map, Observable, shareReplay, throwError} from "rxjs";
import {UsersModel} from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}


  getAllUsers(): Observable<UsersModel[]> {
    return this.http.get(USERS.LIST)
      .pipe(
        map((data: any) => data),
        catchError((error) => throwError(error)),
        shareReplay()
      );
  }

  createUser(data: UsersModel) {
    return this.http.post(USERS.LIST, data)
      .pipe(
        map(data => data),
        catchError((error) => throwError(error)),
        shareReplay()
      );
  }

  editUser(id: number, data: UsersModel) {
    return this.http.put(USERS.LIST + `/${id}`, data)
      .pipe(
        map(data => data),
        catchError((error) => throwError(error)),
        shareReplay()
      );
  }

  deleteUser(id: number) {
    return this.http.delete(USERS.LIST + `/${id}`)
      .pipe(
        map(data => data),
        catchError((error) => throwError(error)),
        shareReplay()
      );
  }
}
