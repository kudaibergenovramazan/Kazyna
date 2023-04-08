import { Get, ParseUUIDPipe, Post } from "@nestjs/common";
import { Body, Delete, Param, Patch } from "@nestjs/common/decorators";
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { UpdateResult } from "typeorm";
import { Language } from "./entities/languages.entity";
import { Translation } from "./entities/translation.entity";
import { TranslationService } from "./translation.service";

@Controller('translation')
export class TranslationController{

    constructor(private translationService: TranslationService) {}

    @Get('languages')
    getLanguages(): Promise<Language[]>{
        return this.translationService.getLanguages();
    }

    @Get('words')
    getAllTranslatedWords(): Promise<{data: Translation[], total: number}>{
        return this.translationService.getAllTranslatedWords();
    }

    @Get('word/:id')
    getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Translation>{
        return this.translationService.getOne(id);
    }

    @Post()
    storeExternal(@Body() payload: Partial<Translation>): Promise<Translation>{
        return this.translationService.storeExternal(payload);
    }

    @Patch(":id")
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() payload: Partial<Translation>
    ): Promise<Translation>{
        return this.translationService.update(payload, id);
    }

    @Delete(":id")
    delete(@Param('id', ParseUUIDPipe) id: string): Promise<UpdateResult>{
        return this.translationService.delete(id);
    }
}