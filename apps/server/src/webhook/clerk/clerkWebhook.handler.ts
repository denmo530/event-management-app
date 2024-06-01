import { Injectable, BadRequestException } from '@nestjs/common';
import { WebhookEvent } from '@clerk/clerk-sdk-node';
import { Webhook } from 'svix';
import { UserService } from '@server/user/user.service';

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

@Injectable()
export class ClerkWebhookHandler {
  private webhook: Webhook;

  constructor(private readonly userService: UserService) {
    this.webhook = new Webhook(WEBHOOK_SECRET as string);
  }

  async verifyPayload(
    payloadString: string,
    headers: any,
  ): Promise<WebhookEvent> {
    try {
      return this.webhook.verify(payloadString, headers) as WebhookEvent;
    } catch (error) {
      throw new BadRequestException(
        'Invalid webhook payload or headers clerk webhook handler',
      );
    }
  }

  async handleEvent(event: WebhookEvent): Promise<void> {
    switch (event.type) {
      case 'user.created':
      case 'user.updated':
        await this.userService.upsertUser({
          externalId: event.data.id,
          email: event.data.email_addresses?.[0].email_address ?? '',
          orgIds:
            event.data.organization_memberships?.map((org) => org.id) ?? [],
          name:
            event.data.username ??
            `${event.data.first_name} ${event.data.last_name}`,
        });
        break;
      case 'user.deleted':
        await this.userService.deleteUser(event.data.id!);
        break;
      case 'organizationMembership.created':
        await this.userService.addOrgIdToUser(
          event.data.public_user_data.user_id,
          event.data.organization.id,
        );
        break;
      case 'organizationMembership.updated':
        // TODO: Add update organization membership mutation
        break;
      case 'organizationMembership.deleted':
        // TODO: Add delete organization mutation
        break;
      default:
        throw new BadRequestException('Unhandled webhook event type');
    }
  }
}
