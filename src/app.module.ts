import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }), 
    DatabaseModule, 
    UserModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
