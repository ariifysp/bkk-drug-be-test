export interface BranchesNearBy {
  siteId: string
  address: string
  description: string
  openTime: string
  closeTime: string
  tel: string
  distance: number
}

export interface BranchesNearByCondition {
  location: any
  acerola_cherry_1000mg?: any
  salmon_fish_1000mg?: any
}

export interface ResponseBranchesNearBy {
  page: number
  totalPage: number
  branches: BranchesNearBy[]
}