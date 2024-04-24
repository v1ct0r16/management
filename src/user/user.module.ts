import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
    imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
        imports:[ConfigModule],
        useFactory: async (configService: ConfigService) =>({
            secret: configService.getOrThrow<string>('JWT_SECRET'),
            signOptions: {
                algorithm: configService.getOrThrow('JWT_ALGORITHM'),
                expression: configService.getOrThrow<string>('JWT_EXPRESSION'),
            }
            
        }),
        inject: [ConfigService],
}),
PassportModule.register({
    defaultStrategy: 'jwt',
    // property: 'user',
    session: false,
})
],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
