import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FindBranchesNearByDto } from 'src/modules/branches/dto/branches.dto'
import { Branches, BranchesDocument } from 'src/models/branches.model'
import { BranchesNearByCondition } from 'src/shared/interface'

@Injectable()
export class BranchesRepository {
  constructor(
    @InjectModel(Branches.name) private readonly branchesModel: Model<BranchesDocument>,
  ) {}

  async countBranchesNearBy(dto: FindBranchesNearByDto): Promise<number> {
    const { location, distance, acerolaCherry1000mg, salmonFish1000mg } = dto
    const radians = distance / 6378100
    const conditions: BranchesNearByCondition = {
      location: {
        $geoWithin: {
          $centerSphere: [[location.lng, location.lat], radians],
        },
      },
    }
    if (dto.acerolaCherry1000mg) conditions.acerola_cherry_1000mg = { $gte: acerolaCherry1000mg }
    if (dto.salmonFish1000mg) conditions.salmon_fish_1000mg = { $gte: salmonFish1000mg }
    return this.branchesModel.countDocuments(conditions).exec()
  }

  async findBranchesNearBy(dto: FindBranchesNearByDto): Promise<Branches[]> {
    const { location, distance, acerolaCherry1000mg, salmonFish1000mg, page, size } = dto
    const skip = (page - 1) * size
    const conditions: BranchesNearByCondition = {
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [location.lng, location.lat] },
          $maxDistance: distance,
        },
      },
    }
    if (dto.acerolaCherry1000mg) conditions.acerola_cherry_1000mg = { $gte: acerolaCherry1000mg }
    if (dto.salmonFish1000mg) conditions.salmon_fish_1000mg = { $gte: salmonFish1000mg }
    return await this.branchesModel.find(conditions).skip(skip).limit(size).exec()
  }
}