import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WeatherRepository } from './weather.repository';

@Injectable()
export class WeatherService {
  constructor(private readonly weatherRepository: WeatherRepository) {}

  async getWeatherData(city: string) {
    try {
      return await this.weatherRepository.getWeatherData(city);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        `Unexpected error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
