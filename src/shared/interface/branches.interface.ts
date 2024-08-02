export interface BranchesNearBy {
  siteId: string
  address: string
  description: string
  openTime: string
  closeTime: string
  tel: string
  distance: number
}

export interface ResponseBranchesNearBy {
  page: number
  totalPage: number
  branches: BranchesNearBy[]
}