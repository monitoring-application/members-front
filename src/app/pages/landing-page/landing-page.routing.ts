import { Routes } from '@angular/router';
import { ReferalsComponent } from '../members/referals/referals.component';
import { RequestPayoutComponent } from '../members/request-payout/request-payout.component';
import { MemberDashboardComponent } from '../members/member-dashboard/member-dashboard.component';
import { AttachmentsComponent } from '../members/attachments/attachments.component';
import { MemberProfileComponent } from '../members/member-profile/member-profile.component';
import { MemberSettingsComponent } from '../members/member-settings/member-settings.component';

export const LandingPageRoutes: Routes = [
  { path: 'dashboard', component: MemberDashboardComponent },
  { path: 'attachments', component: AttachmentsComponent },
  { path: 'referrals', component: ReferalsComponent },
  { path: 'request-payout', component: RequestPayoutComponent },
  { path: 'profile', component: MemberProfileComponent },
  { path: 'settings', component: MemberSettingsComponent },
];
