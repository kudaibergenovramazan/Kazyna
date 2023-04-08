import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './entities/languages.entity';
import { Translation } from './entities/translation.entity';
import { TranslationController } from './translation.controller';
import { TranslationService } from './translation.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([Language, Translation]),
    ],
    controllers: [TranslationController],
    providers: [TranslationService],
    exports: [TranslationService]
})
export class CurrentTranslationModule {}
