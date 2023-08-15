import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SignUpService } from 'src/app/services/sign-up.service';
import { ISignUpModel } from 'src/app/shared/model/interface/i-sign-up-model';
import { NotificationType } from 'src/app/util/notification_type';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css'],
})
export class MemberProfileComponent implements OnInit {
  userCounts = 0;
  isVerified = 0;
  User!: any;
  referralLink = '';

  constructor(
    private signUpService: SignUpService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  submit() {
    this.notificationService.showNotification(
      NotificationType.warning,
      'This feature is not yet available!',
      'Warning'
    );
  }

  loadUserProfile() {
    let User = this.authService.getUserInfo();

    this.signUpService.findAndcount()?.subscribe((result) => {
      const res: any = result;
      const { data } = res;

      this.userCounts = data;
    });
    this.referralLink = this.authService.getReferralLink();
    this.User = User;

    if (this.User.status == 4) this.isVerified = 10;

    console.log(this.isVerified);
  }

  convertStatus(status: string) {
    if (status === '0') {
      return 'Pending';
    } else if (status === '1') {
      return 'Approve';
    } else if (status === '2') {
      return 'Disapprove';
    } else if (status === '3') {
      return 'In Active';
    } else if (status === '4') {
      return 'Verified';
    }
    return 'Undefined';
  }
}
