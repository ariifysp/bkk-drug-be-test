import { Injectable } from '@nestjs/common'

import { FindBranchesNearByDto } from 'src/modules/branches/dto/branches.dto'
import { BranchesRepository } from 'src/modules/branches/branches.repository'
import { Branches } from 'src/models/branches.model'
import { BranchesNearBy, Location, ResponseBranchesNearBy } from 'src/shared/interface'
import { calculateDistance } from 'src/shared/helper'

@Injectable()
export class BranchesService {
  constructor(
   private readonly branchesRepository: BranchesRepository,
  ) {}

  async findBranchesNearBy(dto: FindBranchesNearByDto): Promise<ResponseBranchesNearBy> {
    const { location, page, size } = dto
    const branches: BranchesNearBy[] = []
    const total: number = await this.branchesRepository.countBranchesNearBy(dto)
    if (total === 0) {
      return {
        page: page,
        totalPage: 0,
        branches: branches,
      }
    }

    const branchesNearBy: Branches[] = await this.branchesRepository.findBranchesNearBy(dto)
    for (const item of branchesNearBy) {
      const pickup: Location = {
        lat: item.location.coordinates[1],
        lng: item.location.coordinates[0],
      }
      const distance = await calculateDistance(pickup, location)
      
      branches.push({
        siteId: item._id,
        address: item.site_address,
        description: item.site_desc,
        openTime: item.site_open_time,
        closeTime: item.site_close_time,
        tel: item.site_tel,
        distance: +distance.toFixed(1),
      })
    }
    
    return {
      page: page,
      totalPage: Math.ceil(total/size),
      branches: branches,
    }
  }
}