import { Body, Controller, Post } from '@nestjs/common'
import { FindBranchesNearByDto } from 'src/modules/branches/dto/branches.dto'
import { BranchesService } from 'src/modules/branches/branches.service'
import { ResponseSuccess } from 'src/shared/interface/response.interface'

@Controller('/v1/branch')
export class BranchesController {
  constructor(
    private readonly branchesService: BranchesService 
  ) {}

  @Post('/nearby')
  async findBranchesNearBy(@Body() body: FindBranchesNearByDto) {
    const result = await this.branchesService.findBranchesNearBy(body)
    return new ResponseSuccess({ data: result }) 
  }
}