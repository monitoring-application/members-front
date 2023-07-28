import { Injectable } from '@angular/core';
import { requestRoutes } from '../util/request_routes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ISignUpModel } from '../shared/model/interface/i-sign-up-model';

var routes = new requestRoutes();
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo!: ISignUpModel;

  constructor(private httpClient: HttpClient) {}

  public isAuthenticated(): boolean {
    const loginStatus = sessionStorage.getItem('isLoggedIn');

    return loginStatus == 'true';
  }

  userLogin(params: any) {
    var url: string = routes.baseBackendUrl + routes.signUp + '/login';
    let header = new HttpHeaders();
    header = header.set('api-key', routes.apiKey);
    // const data = this.httpClient.post(url, params, { headers: header });

    // return data;
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, params, { headers: header }).subscribe({
        next: (result) => {
          console.log(result);
          // if (result.statusCode == 201 && result.data) {
          //   sessionStorage.setItem('isLoggedIn', 'true');
          //   sessionStorage.setItem('user', JSON.stringify(result.data));
          //   resolve(true);
          // } else {
          //   reject(false);
          // }
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
  setUserInfo(result: any) {
    this.userInfo = result.data;
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('id', result.data.id);
    sessionStorage.setItem('member_code', result.data.member_code);
    sessionStorage.setItem('email', result.data.email);
    sessionStorage.setItem('full_name', result.data.full_name);
    sessionStorage.setItem('mobile_number', result.data.mobile_number);
    sessionStorage.setItem('status', result.data.status);
  }
  getUserId() {
    const id = sessionStorage.getItem('id');
    return id;
  }
  getUserFullName() {
    const item = sessionStorage.getItem('full_name');
    return item;
  }
  getUserEmail() {
    const item = sessionStorage.getItem('email');
    return item;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}
