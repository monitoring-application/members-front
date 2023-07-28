import { Injectable } from '@angular/core';
import { RouteInfo } from '../util/routeInfo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private authService: AuthService) {}

  routes: RouteInfo[] = [
    {
      path: '/attachments',
      title: 'Attachments',
      icon: 'attachment',
      class: '',
      children: [],
      visible: true,
    },
    {
      path: '/referrals',
      title: 'Referrals',
      icon: 'supervisor_account',
      class: '',
      children: [],
      visible: true,
    },
    {
      path: '/request-payout',
      title: 'Request Payout',
      icon: 'paid',
      class: '',
      children: [],
      visible: true,
    },
  ];
}
