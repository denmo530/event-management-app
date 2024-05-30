import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '@server/user/user.service';
import { PrismaService } from '@server/prisma/prisma.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UserService, PrismaService, AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
