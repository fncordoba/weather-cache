import { Module } from '@nestjs/common';
import { CronService } from './modules/cron/cron.service';
import { WeatherService } from './modules/weather/weather.service';
import { WeatherController } from './modules/weather/weather.controller';
import { WeatherRepository } from './modules/weather/weather.repository';
import { RedisModule } from 'nestjs-redis';
import { WeatherModule } from './modules/weather/weather.module';

@Module({
  imports: [RedisModule, WeatherModule],
  controllers: [WeatherController],
  providers: [CronService, WeatherService, WeatherRepository],
})
export class AppModule {}
