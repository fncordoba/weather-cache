import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  private readonly cities = [
    'Santiago, CL',
    'Zúrich, CH',
    'Auckland, NZ',
    'Sídney, AU',
    'Londres, UK',
    'Georgia, USA',
  ];

  constructor(private readonly weatherService: WeatherService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this.logger.debug('Called every 5 minutes');
    for (const city of this.cities) {
      try {
        await this.weatherService.getWeatherData(city);
        this.logger.debug(`Weather data fetched for ${city}`);
      } catch (error) {
        this.logger.error(
          `Failed to fetch weather data for ${city}: ${error.message}`,
        );
      }
    }
  }
}
