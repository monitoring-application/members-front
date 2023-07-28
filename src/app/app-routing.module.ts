import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MembersLoginComponent } from './pages/members/members-login/members-login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: MembersLoginComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/landing-page/landing-page.module').then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
