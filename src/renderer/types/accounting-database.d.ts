import type Dexie from 'dexie'
import type { Table } from 'dexie'
import type { AccountBook } from './account-book'

export interface AccountingDatabase extends Dexie {
  accountBooks: Table<AccountBook, number>
}
