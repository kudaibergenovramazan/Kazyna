import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { TranslateDto } from "../gcp-translation/gcp-translation.dto";
import { Language } from "./entities/languages.entity";
import { Translation } from "./entities/translation.entity";
import { StoreTranslationDto } from "./translation.dto";
import { GetTranslationInterface, Languages } from "./translation.type";

@Injectable()
export class TranslationService{
    constructor(
        @InjectRepository(Language)
        private languageRepository: Repository<Language>,
        @InjectRepository(Translation)
        private translationRepository: Repository<Translation>
    ) {}

    async getLanguages(): Promise<Language[]>{
        return await this.languageRepository.find();
    }

    async store(payload: StoreTranslationDto): Promise<{success: boolean}>{
        if(payload.from == Languages.KAZAKH && payload.to == Languages.RUSSIAN){
            await this.translationRepository.save({
                word_kk: payload.text.toLowerCase(),
                word_ru: payload.translatedText.toLowerCase()
            })
        }else if(payload.from == Languages.RUSSIAN && payload.to == Languages.KAZAKH){  
            await this.translationRepository.save({
                word_ru: payload.text.toLowerCase(),
                word_kk: payload.translatedText.toLowerCase()
            })
        } else return {success: false}

        return {success: true}
    }

    async getTranslation(payload: TranslateDto): Promise<GetTranslationInterface>{
        if(payload.from == Languages.KAZAKH && payload.to == Languages.RUSSIAN){
            const translation =  await this.translationRepository.findOne({
                where: {word_kk: payload.text.toLowerCase()}
            });
            if(translation) return {
                word: translation.word_ru,
                meaning_kk: translation.meaning_kk,
                meaning_ru: translation.meaning_ru
            }
        }
        else if(payload.from == Languages.RUSSIAN && payload.to == Languages.KAZAKH){
            const translation =  await this.translationRepository.findOne({
                where: {word_ru: payload.text.toLowerCase()}
            });
            if(translation) return {
                word: translation.word_kk,
                meaning_kk: translation.meaning_kk,
                meaning_ru: translation.meaning_ru
            }
        }

        return null;
    }

    async storeExternal(payload: Partial<Translation>): Promise<Translation>{
        const similarTranslation = await this.translationRepository.findOne({
            where: {
                word_kk: payload.word_kk.toLowerCase(),
                word_ru: payload.word_ru.toLowerCase()
            }
        })

        if(similarTranslation) return similarTranslation;

        return await this.translationRepository.save(payload);
    }

    async update(payload: Partial<Translation>, id: string): Promise<Translation>{
        await this.translationRepository.update(id, payload);
        return await this.getOne(id);
    }

    async getOne(id: string): Promise<Translation>{
        return await this.translationRepository.findOne({
            where: {id}
        })
    }

    async delete(id: string): Promise<UpdateResult>{
        return await this.translationRepository.softDelete(id);
    }

    async getAllTranslatedWords(): Promise<{data: Translation[], total: number}>{
        const translations = await this.translationRepository.find(
            {order: {word_kk: 'ASC'}
        });
        return {
            data: translations,
            total: translations.length
        }
    }

}