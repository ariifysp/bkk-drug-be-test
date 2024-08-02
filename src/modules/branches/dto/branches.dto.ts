import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator'

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

  @IsOptional()
  @IsNumber()
  acerolaCherry1000mg?: number

  @IsOptional()
  @IsNumber()
  salmonFish1000mg?: number
}
