import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import axios from 'axios';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class WeatherRepository {
  constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
  ) {}

  async getWeatherData(location: string): Promise<any> {
    try {
      const apiKey = 'UgC9wzII6tVLAunArlMlyNjSDCc2shR4';
      const maxRetries = 3;
      let retries = 0;

      while (retries < maxRetries) {
        try {
          // Simulando la probabilidad de fallo del 20%
          if (Math.random() < 0.2) throw new Error('The API Request Failed');

          // Hacer la llamada a la API meteorológica.
          const response = await axios.get(
            `https://api.tomorrow.io/v4/weather/forecast`,
            {
              params: {
                location,
                apikey: apiKey,
              },
            },
          );

          // Almacenar el resultado en Redis
          const client = this.redisService.getClient();
          await client.set(location, JSON.stringify(response.data));

          return response.data;
        } catch (error) {
          retries++;
          // Almacenar el error y el timestamp en Redis
          const client = this.redisService.getClient();
          await client.set(
            `error:${location}:${new Date().toISOString()}`,
            error.message,
          );

          // Si se han agotado los reintentos, lanza el error
          if (retries >= maxRetries) {
            throw new HttpException(
              `Error fetching weather data for location ${location} after ${maxRetries} retries.`,
              HttpStatus.SERVICE_UNAVAILABLE,
            );
          }
        }
      }
    } catch (error) {
      throw new HttpException(
        `Unexpected error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
