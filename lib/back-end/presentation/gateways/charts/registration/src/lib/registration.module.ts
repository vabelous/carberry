import { Module } from '@nestjs/common';
import { RegistrationGateway } from './registration.gateway';

@Module({
  controllers: [],
  providers: [RegistrationGateway],
  exports: [],
})
export class RegistrationModule {}
