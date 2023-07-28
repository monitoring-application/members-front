import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpRequestService } from './http-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { requestRoutes } from '../util/request_routes';
import { PayoutRequestFormGroup } from '../shared/model/formgroup/payout-request-form-group';
import { AuthService } from './auth.service';

var routes = new requestRoutes();
@Injectable({
  providedIn: 'root',
})
export class PayoutRequestService {
  form = this.fb.group({
    id: '',
    member_id: '',
    member_name: '',
    gcash_number: ['', Validators.required],
    amount: ['', Validators.required],
    status: 0,
    created_at: new Date(),
    paid_at: new Date(),
  }) as PayoutRequestFormGroup;
  resetform = this.fb.group({
    id: '',
    member_id: '',
    member_name: '',
    gcash_number: ['', Validators.required],
    amount: ['', Validators.required],
    status: 0,
    created_at: new Date(),
    paid_at: new Date(),
  }) as PayoutRequestFormGroup;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  create(): Observable<any> {
    const payload = this.form.value;
    var url: string = routes.baseBackendUrl + routes.payoutRequest;
    let header = new HttpHeaders();
    header = header.set('api-key', routes.apiKey);

    return this.httpClient.post(url, payload, {
      headers: header,
    });
  }

  fetchData() {
    var id = this.authService.getUserId();
    var url: string = routes.baseBackendUrl + routes.payoutRequest + `/${id}`;

    let header = new HttpHeaders();
    header = header.set('api-key', routes.apiKey);

    const data = this.httpClient.get(url, {
      headers: header,
    });
    return data;
  }
}
