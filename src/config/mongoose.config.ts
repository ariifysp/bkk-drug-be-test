import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MongooseConfig implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    console.log('MONGODB_URI', this.configService.get<string>('MONGODB_URI'))
    return {
      uri: this.configService.get<string>('MONGODB_URI'),
    }
  }
}
