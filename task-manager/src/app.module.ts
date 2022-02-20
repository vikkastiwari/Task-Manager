import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal:true}),
        TypeOrmModule.forRoot(typeOrmConfig),
        TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
