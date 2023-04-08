import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CurrentTranslationModule } from './app/current-translation/current-translation.module';
import { Language } from './app/current-translation/entities/languages.entity';
import { Translation } from './app/current-translation/entities/translation.entity';
import { GcpTranslationModule } from './app/gcp-translation/gcp-translation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
			type: 'postgres',
			url: process.env.DB_URL,
			entities: [Language, Translation],
			synchronize: true,
			namingStrategy: new SnakeNamingStrategy(),
		}),
    GcpTranslationModule,
    CurrentTranslationModule
  ],
})
export class AppModule {}
