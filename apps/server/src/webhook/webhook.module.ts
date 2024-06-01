import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { ClerkWebhookHandler } from '@server/webhook/clerk/clerkWebhook.handler';
import { UserService } from '@server/user/user.service';
import { UserModule } from '@server/user/user.module';
import { PrismaService } from '@server/prisma/prisma.service';

@Module({
  imports: [UserModule],
  controllers: [WebhookController],
  providers: [WebhookService, ClerkWebhookHandler, UserService, PrismaService],
})
export class WebhookModule {}
