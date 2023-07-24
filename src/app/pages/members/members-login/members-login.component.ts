import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { SignUpService } from 'src/app/services/sign-up.service';

@Component({
  selector: 'app-members-login',
  templateUrl: './members-login.component.html',
  styleUrls: ['./members-login.component.css'],
})
export class MembersLoginComponent implements OnInit {
  mediaSub!: Subscription;
  public isMobile: boolean = false;
  constructor(
    public router: Router,
    public mediaObserver: MediaObserver,
    private signUpService: SignUpService
  ) {}

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
  submit() {
    // this.signUpService.memberLogin('AKFTNZDDP')?.subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (err) => {
    //     console.log({
    //       error: err,
    //     });
    //   },
    //   complete: () => {
    //     setTimeout(async () => {
    //       // this.isLoading = false;
    //     }, 1000);
    //   },
    // });
    this.router.navigateByUrl('/member-attachments');
  }
}
