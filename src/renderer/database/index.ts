import Dexie from 'dexie'
import type { AccountingDatabase } from '@/types'

const database = new Dexie('AccountingDatabase') as AccountingDatabase

const version = database.version(1)

version.stores({
  accountBooks: '++id'
})

database.open()

export default database
