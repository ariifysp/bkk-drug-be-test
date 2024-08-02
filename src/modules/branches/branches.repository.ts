import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FindBranchesNearByDto } from 'src/modules/branches/dto/branches.dto'
import { Branches, BranchesDocument } from 'src/models/branches.model'

@Injectable()
export class BranchesRepository {
  constructor(
    @InjectModel(Branches.name) private readonly branchesModel: Model<BranchesDocument>,
  ) {}

  async countBranchesNearBy(dto: FindBranchesNearByDto): Promise<number> {
    const { location, distance, acerolaCherry1000mg, salmonFish1000mg } = dto
    const radians = distance / 6378100
    return this.branchesModel.countDocuments({
      location: {
        $geoWithin: {
          $centerSphere: [[location.lng, location.lat], radians],
        },
      },
      acerola_cherry_1000mg: { $gte: acerolaCherry1000mg },
      salmon_fish_1000mg: { $gte: salmonFish1000mg },
    }).exec()
  }

  async findBranchesNearBy(dto: FindBranchesNearByDto): Promise<Branches[]> {
    const { location, distance, acerolaCherry1000mg, salmonFish1000mg, page, size } = dto
    const skip = (page - 1) * size
    return await this.branchesModel.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [location.lng, location.lat] },
          $maxDistance: distance,
        },
      },
      acerola_cherry_1000mg: { $gte: acerolaCherry1000mg },
      salmon_fish_1000mg: { $gte: salmonFish1000mg },
    }).skip(skip).limit(size).exec()
  }
}