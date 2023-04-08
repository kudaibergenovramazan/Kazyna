import { Transform } from "class-transformer";
import { Languages } from "./translation.type";

export class StoreTranslationDto{
    from: Languages;
    to: Languages;

    @Transform((param) => {
        return param.value.toLowerCase()
    })
    text: string;

    @Transform((param) => {
        return param.value.toLowerCase()
    })
    translatedText: string;
}