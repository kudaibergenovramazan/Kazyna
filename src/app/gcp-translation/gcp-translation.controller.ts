import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  DetectResult,
  LanguageResult,
} from '@google-cloud/translate/build/src/v2';
import { GcpTranslateService } from './gcp-translation.service';
import { DetectDto, LanguagesDto, TranslateDto } from './gcp-translation.dto';
import { GetTranslationInterface } from '../current-translation/translation.type';

@Controller('gcp-translation')
export class GcpTranslateController {
  constructor(private readonly gcpTranslateService: GcpTranslateService) {}

  @Post('translate')
  async translate(@Body() payload: TranslateDto): Promise<GetTranslationInterface> {
    return this.gcpTranslateService.translate(payload);
  }

  @Post('detect')
  async detectLanguage(@Body() payload: DetectDto): Promise<DetectResult> {
    return this.gcpTranslateService.detect(payload);
  }

  @Get('list')
  async getSupportedLanguages(
    @Query() query: LanguagesDto,
  ): Promise<LanguageResult[]> {
    return this.gcpTranslateService.supportedLanguages(query);
  }
}
