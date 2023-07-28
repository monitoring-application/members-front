import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  filter,
  distinctUntilChanged,
  debounceTime,
  tap,
  switchMap,
  finalize,
} from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SignUpService } from 'src/app/services/sign-up.service';
import { ISignUpModel } from 'src/app/shared/model/interface/i-sign-up-model';
import { requestRoutes } from 'src/app/util/request_routes';

const columns = [
  'membersCode',
  'fullName',
  'email',
  'contactNo',
  'status',
  'downline',
];

var routes = new requestRoutes();

@Component({
  selector: 'app-referals',
  templateUrl: './referals.component.html',
  styleUrls: ['./referals.component.css'],
})
export class ReferalsComponent implements OnInit {
  search = '';
  id = this.authService.getUserId();
  result_length = 0;
  pageNumber = 1;
  pageSize = 10;
  isLoading = false;

  displayedColumns: string[] = columns;

  dataSource = new MatTableDataSource<ISignUpModel>();
  searchControl = new FormControl();
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private signUpService: SignUpService,
    private notificationService: NotificationService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchData();

    this.searchControl.valueChanges
      .pipe(
        filter((res) => {
          return res !== null;
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap((value) => {
          this.search = value;

          var url: string =
            routes.baseBackendUrl +
            routes.signUp +
            `/pagination?id=${this.authService.userInfo.id}&search_value=${value}&pageNumber=${this.pageNumber}&pageSize=${this.pageSize}`;
          let header = new HttpHeaders();
          header = header.set('api-key', routes.apiKey);

          return this.httpClient
            .get(url, {
              headers: header,
            })
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            );
        })
      )
      .subscribe({
        next: (res) => {
          const retVal: any = res;
          const { data } = retVal;
          const { result } = data;
          const { count } = data;

          this.result_length = count;
          this.dataSource = new MatTableDataSource(result);
        },
        error: (err) => {
          console.log({
            error: err,
          });
        },
        complete: () => {
          setTimeout(async () => {
            this.isLoading = false;
            console.log('completed');
          }, 1000);
        },
      });
  }

  fetchData() {
    this.isLoading = true;
    this.signUpService
      .fetchData(1, this.search, this.pageNumber, this.pageSize)
      ?.subscribe({
        next: (res) => {
          const retVal: any = res;
          const { data } = retVal;
          const { result } = data;
          const { count } = data;

          this.result_length = count;
          this.dataSource = new MatTableDataSource(result);
        },
        error: (err) => {
          console.log({
            error: err,
          });
        },
        complete: () => {
          setTimeout(async () => {
            this.isLoading = false;
          }, 1000);
        },
      });
  }
  refresh() {
    this.clear();
    this.fetchData();
  }
  clear() {
    this.search = '';
    this.searchControl.reset();
    this.paginator.firstPage();

    this.fetchData();
  }
  paginate(param: any) {}
  convertStatus(status: number) {
    if (status === 0) {
      return 'Pending';
    } else if (status === 1) {
      return 'Approve';
    } else if (status === 2) {
      return 'Disapprove';
    } else if (status === 3) {
      return 'In Active';
    }
    return 'Undefined';
  }
}
