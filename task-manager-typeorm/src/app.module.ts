import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import * as config from 'config';

const dbConfig = config.get( 'db' );

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal:true}),
        TypeOrmModule.forRoot({
        type: dbConfig.type,
        url: process.env.DATABASE_URL,
        autoLoadEntities: dbConfig.autoLoadEntities,
        synchronize:dbConfig.synchronize,
    }),
    TasksModule,
    AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
