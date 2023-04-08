import { Injectable } from '@nestjs/common';
import { DetectResult, LanguageResult } from '@google-cloud/translate/build/src/v2';
import { v2 } from '@google-cloud/translate';
import * as path from 'path';
import { DetectDto, LanguagesDto, TranslateDto } from './gcp-translation.dto';
import { TranslationService } from '../current-translation/translation.service';
import { GetTranslationInterface } from '../current-translation/translation.type';


const translateClient = new v2.Translate({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: path.join(__dirname, `../../../gcp-key.json`)
});

@Injectable()
export class GcpTranslateService {

  constructor(private translationService: TranslationService){}

  async translate(payload: TranslateDto): Promise<GetTranslationInterface> {

    const currentTranslation = await this.translationService.getTranslation(payload);
    if(currentTranslation) return currentTranslation;

    console.log(`${payload.text} сөзі базадан табылмады!`)

    const [translation] = await translateClient.translate(payload.text, {
      from: payload.from,
      to: payload.to,
    });

    if(translation) await this.translationService.store({
        from: payload.from,
        to: payload.to,
        text: payload.text,
        translatedText: translation
    })

    return {
      word: translation,
      meaning_kk: null,
      meaning_ru: null
    };
  }

  async detect(payload: DetectDto): Promise<DetectResult> {
    const [detections] = await translateClient.detect(payload.text);

    return detections;
  }

  async supportedLanguages(query: LanguagesDto): Promise<LanguageResult[]> {
    const [languages] = await translateClient.getLanguages(query.displayLanguage);

    return languages;
  }
}
