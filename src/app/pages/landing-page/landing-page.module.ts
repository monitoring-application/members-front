import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/angular-material.module';
import { LandingPageRoutes } from './landing-page.routing';
import { NgModule } from '@angular/core';
import { MembersListComponent } from '../members/members-list/members-list.component';
import { ReferalsComponent } from '../members/referals/referals.component';
import { RequestPayoutComponent } from '../members/request-payout/request-payout.component';
import { AttachmentsFieldsComponent } from 'src/app/shared/components/attachments-fields/attachments-fields.component';
import { AttachmentsListComponent } from 'src/app/shared/components/attachments-list/attachments-list.component';
import { MemberDashboardComponent } from '../members/member-dashboard/member-dashboard.component';
import { AttachmentsComponent } from '../members/attachments/attachments.component';
import { MemberSettingsComponent } from '../members/member-settings/member-settings.component';
import { MemberProfileComponent } from '../members/member-profile/member-profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LandingPageRoutes),
    FormsModule,
    OverlayModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MembersListComponent,
    ReferalsComponent,
    RequestPayoutComponent,
    AttachmentsFieldsComponent,
    AttachmentsListComponent,
    AttachmentsComponent,
    MemberDashboardComponent,
    MemberSettingsComponent,
    MemberProfileComponent,
  ],
})
export class AdminLayoutModule {}
