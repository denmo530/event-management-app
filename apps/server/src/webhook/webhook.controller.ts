import {
  BadRequestException,
  Controller,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Request } from 'express'; // Import the Request type from express

@Controller('webhook')
export class WebhookController {
  constructor(private webhookService: WebhookService) {}

  @Post(':service') // This is the route that will be used to receive webhook events
  async handleWebhook(
    @Req() req: Request,
    @Param('service') service: string,
  ): Promise<void> {
    try {
      const payloadString = JSON.stringify(req.body);
      const headerPayload = req.headers;

      await this.webhookService.processWebhook(
        service,
        payloadString,
        headerPayload,
      );
    } catch (error) {
      console.error('Error processing webhook:', error);
      throw new BadRequestException('Invalid webhook payload or headers');
    }
  }
}
