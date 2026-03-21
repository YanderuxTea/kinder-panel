import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): string {
    return JSON.stringify({ ok: true, message: 'Запущен!', status: 200 });
  }
}
