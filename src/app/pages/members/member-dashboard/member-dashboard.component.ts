import { Component, OnInit } from '@angular/core';
import { SignUpService } from 'src/app/services/sign-up.service';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css'],
})
export class MemberDashboardComponent implements OnInit {
  constructor(private signUpService: SignUpService) {}

  ngOnInit(): void {}
}
