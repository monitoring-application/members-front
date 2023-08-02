import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, filter, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PayoutRequestService } from 'src/app/services/payout-request.service';
import { IPayoutRequestModel } from 'src/app/shared/model/interface/i-payout-request-model';
import { NotificationType } from 'src/app/util/notification_type';

const columns = ['method', 'amount', 'dateRequested', 'datePaid', 'status'];

@Component({
  selector: 'app-request-payout',
  templateUrl: './request-payout.component.html',
  styleUrls: ['./request-payout.component.css'],
})
export class RequestPayoutComponent implements OnInit {
  form = this.payoutRequestService.form;
  User!: any;
  mediaSub!: Subscription;
  public isMobile: boolean = false;

  totalEarn: any = 0;
  currentEarn = 0;
  totalCashedOut = 0;

  displayedColumns: string[] = columns;
  dataSource = new MatTableDataSource<IPayoutRequestModel>();

  constructor(
    private authService: AuthService,
    public mediaObserver: MediaObserver,
    private notificationService: NotificationService,
    private payoutRequestService: PayoutRequestService
  ) {}

  ngOnInit(): void {
    this.fetchData();

    this.mediaSub = this.mediaObserver
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((change: MediaChange) => {
        this.isMobile = change.mqAlias === 'xs' ? true : false;
      });
  }

  submit() {
    if (!this.validation()) return;

    this.form.controls.member_id.setValue(this.authService.getUserId());
    this.form.controls.member_name.setValue(this.authService.getUserFullName());

    this.payoutRequestService.create()?.subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log({
          error: err,
        });
      },
      complete: () => {
        this.notificationService.showNotification(
          NotificationType.success,
          'Request Submitted!',
          'Success'
        );
        setTimeout(() => {
          this.fetchData();
          this.payoutRequestService.form.reset(
            this.payoutRequestService.resetform.value
          );
        }, 500);
      },
    });
  }

  fetchData() {
    this.User = this.authService.getUserInfo();

    this.payoutRequestService.fetchData()?.subscribe({
      next: (res) => {
        const retVal: any = res;
        const { data } = retVal;

        this.totalCashedOut = this.totalCashOut(data);

        this.dataSource = new MatTableDataSource(data);
      },
      error: (err) => {
        console.log({
          error: err,
        });
      },
      complete: () => {
        setTimeout(async () => {
          this.totalEarn = this.User.ttlDownline;

          this.currentEarn = parseInt(this.totalEarn) - this.totalCashedOut;
        }, 1000);
      },
    });
  }

  totalCashOut(data: IPayoutRequestModel[]) {
    const totalCashout = data
      .filter(({ status }) => status === 1)
      .map((a: { amount: any }) => a.amount)
      .reduce((acc: any, n: any) => acc + n, 0);

    return totalCashout;
  }

  validation(): boolean {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      this.notificationService.showNotification(
        NotificationType.warning,
        'Please supply needed!',
        'Warning'
      );

      return false;
    }
    if (this.currentEarn < this.form.controls.amount.value) {
      this.notificationService.showNotification(
        NotificationType.warning,
        'Amount requested is higher than current earnings!',
        'Warning'
      );

      return false;
    }

    return true;
  }
}
