import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MongooseConfig } from 'src/config/mongoose.config'
import { RawBodyMiddleware } from 'src/middlewares/body.middleware'
import { LoggerMiddleware } from 'src/middlewares/logger.middleware'
import { AppController } from 'src/app.controller'
import { AppService } from 'src/app.service'
import { BranchesModule } from 'src/modules/branches/branches.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfig,
    }),
    BranchesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
