import { ICurrency } from '@app/types/interfaces';
import { CurrencyType } from '@app/types/enums';

export class Currency implements ICurrency {
  addressRegex: string;
  addressTagRegex: string;
  code: string;
  createdAt: string;
  id: string;
  isSupportedInUS: boolean;
  isSuspended: boolean;
  name: string;
  precision: number;
  supportsAddressTag: boolean;
  supportsTestMode: boolean;
  testnetAddressRegex: string;
  type: CurrencyType;
  updatedAt: string;

  constructor(data: any) {
    Object.assign(this, data);
  }

}
