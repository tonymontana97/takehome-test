import { CurrencyType } from '@app/types/enums';

export interface ICurrency {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: CurrencyType;
  name: string;
  code: string;
  precision: number;
  addressRegex: string;
  testnetAddressRegex: string;
  supportsAddressTag: boolean;
  addressTagRegex: string;
  supportsTestMode: boolean;
  isSuspended: boolean;
  isSupportedInUS: boolean;
}
