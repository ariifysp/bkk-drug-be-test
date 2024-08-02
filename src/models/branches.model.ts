import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Type } from 'class-transformer'
import { IsNumber, IsString, ValidateNested } from 'class-validator'

export type BranchesDocument = Branches & Document

class Location {
  @Prop({ required: true })
  @IsString()
  type: string

  @Prop({ type: [Number], required: true })
  @IsNumber({}, { each: true })
  coordinates: number[]
}

@Schema()
export class Branches {
  @Prop({ required: true })
  @IsString()
  _id: string

  @Prop({ required: true })
  @IsString()
  site_id: string

  @Prop({ required: true })
  @IsString()
  site_desc: string

  @Prop({ required: true })
  @IsString()
  site_address: string

  @Prop({ required: true })
  @IsString()
  site_tel: string

  @Prop({ type: Location, required: true })
  @ValidateNested()
  @Type(() => Location)
  location: Location

  @Prop({ required: true })
  @IsString()
  site_close_time: string

  @Prop({ required: true })
  @IsString()
  site_open_time: string

  @Prop({ required: true })
  @IsNumber()
  acerola_cherry_1000mg: number

  @Prop({ required: true })
  @IsNumber()
  salmon_fish_1000mg: number
}

export const BranchesSchema = SchemaFactory.createForClass(Branches)
