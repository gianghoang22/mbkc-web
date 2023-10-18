import { NavigateFunction } from 'react-router-dom'

export interface KitchenCentersData {
  no: number
  kitchenCenter: string
  status: string
}

export interface KitchenCenter {
  kitchenCenterId: number
  name: string
  address: string
  status: string
  logo: string
  kitchenCenterManagerEmail: string
}

export interface KitchenCenterToAdd {
  Name: string
  Address: string
  Logo?: string
  ManagerEmail: string
}

export interface KitchenCenterToUpdate {
  Name: string
  Address: string
  Logo?: string
  ManagerEmail: string
  Status: string
}

export interface KitchenCenterOptions {
  itemsPerPage: number
  currentPage: number
  searchValue?: string
}

export interface CreateKitchenCenterParams {
  newKitchenCenter: KitchenCenterToAdd
  navigate: NavigateFunction
}
