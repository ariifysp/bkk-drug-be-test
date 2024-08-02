import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { Branches, BranchesSchema } from 'src/models/branches.model'
import { BranchesController } from 'src/modules/branches/branches.controller'
import { BranchesService } from 'src/modules/branches/branches.service'
import { BranchesRepository } from 'src/modules/branches/branches.repository'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeatureAsync([
      {
        name: Branches.name,
        useFactory: () => {
          const schema = BranchesSchema
          return schema
        }
      }
    ]),
    BranchesModule,
  ],
  controllers: [BranchesController],
  providers: [BranchesService, BranchesRepository],
})

export class BranchesModule {}