import { AbstractControl, FormGroup } from '@angular/forms';
import { ISignUpModel } from '../interface/i-sign-up-model';

export interface SignUpFormGroup extends FormGroup {
  value: ISignUpModel;
  controls: {
    id: AbstractControl;
    member_code: AbstractControl;
    full_name: AbstractControl;
    email: AbstractControl;
    password: AbstractControl;
    mobile_number: AbstractControl;
    upline: AbstractControl;
    ttlDownline: AbstractControl;
    status: AbstractControl;
  };
}
