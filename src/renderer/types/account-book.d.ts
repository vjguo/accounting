import type { BaseModel } from './base-model'
import type { Currency } from './currency'

export declare interface AccountBook extends BaseModel {
  name: string
  currency: Currency
  monthStartDay: number
  isDefault: boolean
}
