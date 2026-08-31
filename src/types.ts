export enum OccasionType {
  BIRTHDAY = "День Рождения",
  NEW_YEAR = "Новый Год",
}

// Через конст:
// export const OccasionTypeConst = {
//     BIRTHDAY: "День Рождения",
//     NEW_YEAR: "Новый Год",
// } as const;

// export type OccasionTypeConst = typeof OccasionTypeConst[keyof typeof OccasionTypeConst];

export enum ToneType {
  OFFICIAL = "Официальный",
  FRIENDLY = "Дружеский",
  HUMOROUS = "Юмористический",
  ROMANTIC = "Романтический",
  TOUCHING = "Трогательный",
  ADULT = "18+",
}

export type LanguageType =
  | "Русский"
  | "Белорусский"
  | "English"
  | "Deutsch"
  | "Français"
  | "Español"
  | "Italiano"
  | "Português"
  | "Polski"
  | "Nederlands"
  | "Svenska"
  | "Norsk"
  | "Suomi"
  | "Dansk"
  | "Türkçe"
  | "中文（简体）"
  | "中文（繁體）"
  | "日本語"
  | "한국어";
