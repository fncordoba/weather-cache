// redis.service.ts
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      port: 6379,
      host: 'localhost',
    });
  }

  getClient(): Redis {
    return this.client;
  }
}
