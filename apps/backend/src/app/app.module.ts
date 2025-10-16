import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationModule } from '@carberry/back-end-presentation-gateways-charts-registration';

@Module({
  imports: [RegistrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
