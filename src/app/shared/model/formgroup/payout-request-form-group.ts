import { AbstractControl, FormGroup } from '@angular/forms';
import { IPayoutRequestModel } from '../interface/i-payout-request-model';

export interface PayoutRequestFormGroup extends FormGroup {
  value: IPayoutRequestModel;
  controls: {
    id: AbstractControl;
    member_id: AbstractControl;
    member_name: AbstractControl;
    gcash_number: AbstractControl;
    amount: AbstractControl;
    status: AbstractControl;
    created_at: AbstractControl;
    paid_at: AbstractControl;
  };
}
