import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from './http-request.service';
import { IResult } from '../shared/model/interface/i-result-model';
import { IAttachedModel } from '../shared/model/interface/i-attached-model';
import { requestRoutes } from '../util/request_routes';
import { AuthService } from './auth.service';

var routes = new requestRoutes();
@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  constructor(
    private http: HttpRequestService,
    private client: HttpClient,
    private authService: AuthService
  ) {}

  upload(file: any) {
    var url: string = routes.baseBackendUrl + routes.fileManager;

    var data = this.client.post(`${url}/upload`, file);
    return data;
  }
  findAll() {
    var id: string = this.authService.getUserId() || '';
    var url: string =
      routes.baseBackendUrl + routes.fileManager + '/per-member/' + id;
    var data = this.client.get(`${url}`);
    return data;
  }

  remove(id: number) {
    var url: string = routes.baseBackendUrl + routes.fileManager + '/' + id;
    var data = this.client.delete(`${url}`);
    return data;
  }
}
