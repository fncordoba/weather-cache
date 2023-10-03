import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherRepository } from './weather.repository';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [WeatherService, WeatherRepository],
  exports: [WeatherService],
})
export class WeatherModule {}
