import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entity/user.entity';

@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory: (ConfigService: ConfigService) => ({
          type: 'mysql',
          host: ConfigService.getOrThrow('DB_HOST'),
          port: ConfigService.getOrThrow('DB_PORT'),
          username: ConfigService.getOrThrow('DB_USERNAME'),
          password: ConfigService.getOrThrow('DB_PASSWORD'),
          database: ConfigService.getOrThrow('DB_DATABASE'),
          entities: [User],
          synchronize: true,
        }),
        inject: [ConfigService],
           })
      ]
})
export class DatabaseModule {}
