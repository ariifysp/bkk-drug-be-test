import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator'

class Location {
  @IsNotEmpty()
  @IsNumber()
  lat: number

  @IsNotEmpty()
  @IsNumber()
  lng: number
}

export class FindBranchesNearByDto {
  @ValidateNested()
  @Type(() => Location)
  location: Location

  @IsNotEmpty()
  @IsNumber()
  distance: number

  @IsNotEmpty()
  @IsNumber()
  page: number

  @IsNotEmpty()
  @IsNumber()
  size: number

  @IsNotEmpty()
  @IsNumber()
  acerolaCherry1000mg: number

  @IsNotEmpty()
  @IsNumber()
  salmonFish1000mg: number
}
