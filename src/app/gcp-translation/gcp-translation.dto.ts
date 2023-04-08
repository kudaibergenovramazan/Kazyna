import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Languages } from "../current-translation/translation.type";

export class DetectDto {
    @IsString()
    @IsNotEmpty()
    readonly text: string;
}

export class LanguagesDto {
    @IsString()
    @IsOptional()
    readonly displayLanguage?: string;
}

export class TranslateDto {
    @IsString()
    @IsNotEmpty()
    @Transform((param) => {
        return param.value.toLowerCase()
    })
    readonly text: string;
  
    @IsEnum(Languages)
    @IsNotEmpty()
    readonly to: Languages;
  
    @IsEnum(Languages)
    @IsOptional()
    readonly from?: Languages;
  }
  