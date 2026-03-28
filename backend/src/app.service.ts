import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  healthCheck() {
    return JSON.stringify({ ok: true, message: 'Запущен!', status: 200 });
  }
  @Cron(CronExpression.EVERY_5_MINUTES)
  async cleanerSessions() {
    const dateFormatter = Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const now = new Date(Date.now());
    console.log(
      `Чистка сессий и кодов восстановления начата ${dateFormatter.format(now)}`,
    );
    try {
      const resultSessions = await this.prisma.devices.deleteMany({
        where: { expiresAt: { lt: now } },
      });
      const resultCodes = await this.prisma.user.updateMany({
        where: {
          recoveryCode: { not: null },
          recoveryCodeExpires: { lt: now },
        },
        data: { recoveryCode: null, recoveryCodeExpires: null },
      });
      await this.prisma.kindergarten.updateMany({
        where: { endSubscription: { lt: now } },
        data: { isFreeTier: false },
      });
      console.log(
        `Чистка завершена ${dateFormatter.format(new Date(Date.now()))}`,
      );
      console.log(`Очищено ${resultSessions.count} сессий`);
      console.log(`Очищено ${resultCodes.count} кодов`);
    } catch {
      console.log('Произошла ошибка во время очистки сессий и кодов');
    }
  }
}
