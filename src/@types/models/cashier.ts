import { Gender, Status } from 'common/enum'

export interface Cashier {
  accountId: number
  email: string
  fullName: string
  gender: Gender
  dateOfBirth: string
  avatar: string
  citizenNumber: string
  status: Status
  kitchenCenter?: {
    kitchenCenterId: number
    name: string
    address: string
    status: string
    logo: string
    kitchenCenterManagerEmail: string
  }
}

export interface CashierToCreate {
  email: string
  fullName: string
  gender: string
  dateOfBirth: string
  avatar?: string
  citizenNumber: string
}
