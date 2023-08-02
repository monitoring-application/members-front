import { ISignUpModel } from '../interface/i-sign-up-model';

export class SignUpModel implements ISignUpModel {
  id = '';
  member_code = '';
  full_name = '';
  email = '';
  password = '';
  mobile_number = '';
  upline = '';
  ttlDownline = 0;
  status = 0;
}
