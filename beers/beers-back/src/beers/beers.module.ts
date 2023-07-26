import { Module } from '@nestjs/common';
import { BeersService } from './beers.service';
import { BeersController } from './beers.controller';

@Module({
  controllers: [BeersController],
  providers: [BeersService]
})
export class BeersModule {}
