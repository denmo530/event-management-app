import { WebhookEvent } from '@clerk/clerk-sdk-node';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ClerkWebhookHandler } from '@server/webhook/clerk/clerkWebhook.handler';
import { Webhook } from 'svix';

@Injectable()
export class WebhookService {
  private webhook: Webhook;
  constructor(private clerkWebhookHandler: ClerkWebhookHandler) {
    this.webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');
  }

  async processWebhook(
    service: string,
    payloadString: string,
    headers: any,
  ): Promise<void> {
    let event: WebhookEvent;

    switch (service) {
      case 'clerk':
        event = await this.clerkWebhookHandler.verifyPayload(
          payloadString,
          headers,
        );
        await this.clerkWebhookHandler.handleEvent(event);
        break;
      // Add cases for other services here
      default:
        throw new BadRequestException('Unsupported webhook service');
    }
  }
}
