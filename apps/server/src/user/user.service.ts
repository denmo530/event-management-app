import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async upsertUser(createUserDto: CreateUserDto): Promise<void> {
    try {
      await this.prismaService.user.upsert({
        where: {
          externalId: createUserDto.externalId,
        },
        update: {
          name: createUserDto.name,
          email: createUserDto.email,
          orgIds: createUserDto.orgIds,
        },
        create: {
          externalId: createUserDto.externalId,
          name: createUserDto.name,
          email: createUserDto.email,
          orgIds: createUserDto.orgIds ?? [],
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to upsert user');
    }
  }

  async deleteUser(externalId: string): Promise<void> {
    try {
      await this.prismaService.user.delete({
        where: {
          externalId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  async addOrgIdToUser(externalId: string, orgId: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: {
        externalId,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    try {
      await this.prismaService.user.update({
        where: {
          externalId,
        },
        data: {
          orgIds: [...user.orgIds, orgId],
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to add org id to user');
    }
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
}
