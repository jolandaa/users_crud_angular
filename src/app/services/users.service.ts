import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {USERS} from "../components/constants/endpoint.data";
import {catchError, map, shareReplay, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}


  getAllUsers() {
    return this.http.get(USERS.LIST)
      .pipe(
        map(data => data),
        catchError((error) => throwError(error)),
        shareReplay()
      );
  }

  createUser(data: any) {
    return this.http.post(USERS.LIST, data)
      .pipe(
        map(data => data),
        catchError((error) => throwError(error)),
        shareReplay()
      );
  }

  editUser(id: string, data: any) {
    return this.http.put(USERS.LIST + `/${id}`, data)
      .pipe(
        map(data => data),
        catchError((error) => throwError(error)),
        shareReplay()
      );
  }

  deleteUser(id: string) {
    return this.http.delete(USERS.LIST + `/${id}`)
      .pipe(
        map(data => data),
        catchError((error) => throwError(error)),
        shareReplay()
      );
  }
}
