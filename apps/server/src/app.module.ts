import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { WebhookModule } from './webhook/webhook.module';
import { TypeModule } from './type/type.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, WebhookModule, TypeModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
