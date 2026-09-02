import { Globe, ImageIcon } from "lucide-react";
import type { Dispatch, FC, SetStateAction } from "react";
import { LANGUAGES } from "../constants";
import type { LanguageType, ToneType } from "../types";
import { ToneSelector } from "./ToneSelector";

interface IExtraDetailsSectionProps {
  error: string | null;
  language: string;
  selectedTone: ToneType;
  isImageEnabled: boolean;
  setTone: Dispatch<SetStateAction<ToneType>>;
  setLanguage: Dispatch<SetStateAction<LanguageType>>;
  setIsImageEnabled: Dispatch<SetStateAction<boolean>>;
}

export const ExtraDetailsSection: FC<IExtraDetailsSectionProps> = ({
  error,
  language,
  selectedTone,
  isImageEnabled,
  setTone,
  setLanguage,
  setIsImageEnabled,
}) => {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs">3</span>
        Настройки
      </h3>

      <ToneSelector selectedTone={selectedTone} setTone={setTone} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 mt-4">
        <div className="relative group">
          <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Язык</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageType)}
              className="block w-full pl-9 pr-8 py-3 bg-white border-2 border-gray-100 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all appearance-none cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center pt-2 sm:pt-6">
          <label
            className={`
                relative flex items-center p-3 rounded-xl border-2 cursor-pointer w-full h-[52px] transition-all duration-200 select-none
                ${isImageEnabled ? "border-purple-500 bg-purple-50" : "border-gray-100 bg-white hover:border-purple-200"}
            `}
          >
            <input
              type="checkbox"
              className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 accent-purple-600"
              checked={isImageEnabled}
              onChange={(e) => setIsImageEnabled(e.target.checked)}
            />
            <span className={`ml-3 text-sm font-medium ${isImageEnabled ? "text-purple-700" : "text-gray-700"}`}>
              Сгенерировать открытку
            </span>
            {isImageEnabled && <ImageIcon className="w-4 h-4 ml-auto text-purple-600" />}
          </label>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm ml-1 animate-pulse">{error}</p>}
    </section>
  );
};