import { Injectable } from '@angular/core';
import { requestRoutes } from '../util/request_routes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ISignUpModel } from '../shared/model/interface/i-sign-up-model';
import { SignUpModel } from '../shared/model/base/sign-up-model';

var routes = new requestRoutes();
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo: ISignUpModel = new SignUpModel();

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
    sessionStorage.setItem('isLoggedIn', 'true');

    sessionStorage.setItem('id', result.data.id);
    sessionStorage.setItem('member_code', result.data.member_code);
    sessionStorage.setItem('email', result.data.email);
    sessionStorage.setItem('full_name', result.data.full_name);
    sessionStorage.setItem('ttlDownline', result.data.ttlDownline);
    sessionStorage.setItem('mobile_number', result.data.mobile_number);
    sessionStorage.setItem('status', result.data.status);
  }
  getUserInfo() {
    let User = {
      id: sessionStorage.getItem('id'),
      member_code: sessionStorage.getItem('member_code'),
      email: sessionStorage.getItem('email'),
      full_name: sessionStorage.getItem('full_name'),
      ttlDownline: sessionStorage.getItem('ttlDownline'),
      mobile_number: sessionStorage.getItem('mobile_number'),
      status: sessionStorage.getItem('status'),
    };

    return User;
  }

  getUserId() {
    const id = sessionStorage.getItem('id');
    return id;
  }
  getUserFullName() {
    const retVal = sessionStorage.getItem('full_name');
    return retVal;
  }
  getUserEmail() {
    const retVal = sessionStorage.getItem('email');
    return retVal;
  }
  getStatus() {
    const retVal = sessionStorage.getItem('status');
    return retVal;
  }
  getMobileNumber() {
    const retVal = sessionStorage.getItem('mobile_number');
    return retVal;
  }
  getDownline() {
    const retVal = sessionStorage.getItem('downline');
    return retVal;
  }
  getReferralLink() {
    const retVal = ` https://signup.friendsofroselin.com/?code=${this.getUserId()}`;

    return retVal;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}
