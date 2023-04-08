import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CurrentTranslationModule } from '../current-translation/current-translation.module';
import { GcpTranslateController } from './gcp-translation.controller';
import { GcpTranslateService } from './gcp-translation.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        CurrentTranslationModule
    ],
    controllers: [GcpTranslateController],
    providers: [GcpTranslateService]
})
export class GcpTranslationModule {}
