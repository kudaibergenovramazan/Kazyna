export enum Languages{
    KAZAKH = 'kk',
    RUSSIAN = 'ru'
}

export interface GetTranslationInterface{
    word: string;
    meaning_kk: string;
    meaning_ru: string;
}