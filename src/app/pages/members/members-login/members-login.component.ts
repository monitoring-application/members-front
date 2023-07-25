import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { SignUpService } from 'src/app/services/sign-up.service';
import { NotificationType } from 'src/app/util/notification_type';

@Component({
  selector: 'app-members-login',
  templateUrl: './members-login.component.html',
  styleUrls: ['./members-login.component.css'],
})
export class MembersLoginComponent implements OnInit {
  mediaSub!: Subscription;
  hide: boolean = true;
  loginError: string = '';
  isProcessing: boolean = false;
  username: string = '';
  password: string = '';
  form: FormGroup = <FormGroup>{};

  public isMobile: boolean = false;

  constructor(
    public router: Router,
    fBuilder: FormBuilder,
    public mediaObserver: MediaObserver,
    private signUpService: SignUpService,
    private notificationService: NotificationService
  ) {
    this.onCreateForm(fBuilder);
  }

  ngOnInit(): void {
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

  onCreateForm(builder: FormBuilder) {
    this.form = builder.group({
      username: builder.control('', { validators: [Validators.required] }),
      password: builder.control('', { validators: [Validators.required] }),
    });
  }
  submit() {
    const _payload = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
    };

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      setTimeout(() => {}, 1500);

      // just return
      return;
    }

    setTimeout(() => {
      this.signUpService.onLogin(_payload).then(
        (res) => {
          if (!this.validation(res)) return;
          setTimeout(() => {
            this.router.navigate(['member-attachments']);
          });
        },
        (rej) => {
          this.notificationService.showNotification(
            NotificationType.warning,
            rej,
            'Warning'
          );
        }
      );
    }, 1500);
  }
  validation(stats: any): boolean {
    if (stats == 0) {
      this.notificationService.showNotification(
        NotificationType.warning,
        'User not found',
        'Warning'
      );
      return false;
    } else if (stats == 1) {
      this.notificationService.showNotification(
        NotificationType.warning,
        'User is inactive',
        'Warning'
      );
      return false;
    } else if (stats == 2) {
      this.notificationService.showNotification(
        NotificationType.warning,
        'Invalid passwrod',
        'Warning'
      );
      return false;
    }

    return true;
  }
}
