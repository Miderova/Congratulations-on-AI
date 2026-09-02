import { GoogleGenAI } from "@google/genai";
import { OccasionType, ToneType, type LanguageType } from "./types";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const generateGreeting = async (
  occasion: OccasionType,
  name: string,
  age: string,
  interests: string,
  tone: ToneType,
  language: LanguageType,
): Promise<string> => {
  try {
    const promt = `
    Напиши уникальное праздничное поздравление на языке ${language}.
    
    Повод: ${occasion},
    Для кого: ${name},
    Возраст: ${age ? age : "Не указан"},
    Интересы/хобби: ${interests ? interests : "Не указаны"},
    Тон: ${tone}

    Инструкции по стилю (адаптируй под культурный контекст языка ${language}):
    — Официальный: Сдержанный, уважительный.
    — Дружеский: Теплый, неформальный.
    — Юмористический: Веселый, забавный, с доброй шуткой.
    — Романтический: Нежный, любящий, чувственный.
    — Трогательный: Душевный, эмоциональный.
    — 18+: Дерзкое, с перчинкой, сарказмом или взрослыми шутками. (Только если уместно для контекста 18+).

    Общие требования:
    — Обязательно учитывай возраст и интересы человека. Длина: От 2 до 5 предложений.
    — Используй 2-3 подходящих по смыслу эмодзи.
    — Форматирование: Просто текст, без markdown заголовков. Язык ответа СТРОГО: ${language}.
    
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promt,
      config: {
        temperature: tone === ToneType.ADULT ? 0.9 : 0.8,
      },
    });

    if (response.text) {
      return response.text;
    } else {
      throw new Error("Ошибка генерации текста >:(");
    }
  } catch (error) {
    console.error("Gemini text API error:", error);
    throw new Error("[generateGreeting] Ошибка генерации >:(");
  }
};

// Функция теперь просто генерирует стабильную ссылку на фотосток
export const generateGreetingImage = async (occasion: OccasionType, _tone: ToneType, interests?: string): Promise<string> => {
    try {
        // Словарь для подбора ключевых слов под каждый праздник
        const keywordMap: Record<string, string> = {
            'Birthday': 'birthday,cake,party',
            'BIRTHDAY': 'birthday,cake,party',
            'День рождения': 'birthday,cake,party',
            'NewYear': 'newyear,celebration',
            'NEW_YEAR': 'newyear,celebration',
            'Новый год': 'newyear,celebration',
            'Christmas': 'christmas,gifts',
            'Рождество': 'christmas,gifts'
        };

        // Берем базовое ключевое слово или добавляем интересы, если они есть
        let searchKeyword = keywordMap[occasion] || 'celebration';
        
        if (interests && interests.trim()) {
            // Переводим популярные темы для фотостока, если нужно, или просто добавляем к поиску
            searchKeyword += `,${encodeURIComponent(interests.trim())}`;
        }

        // Формируем ссылку на случайное качественное фото с Unsplash по ключевым словам
        // Добавляем случайное число sig, чтобы при каждом нажатии картинка была новой
        const imageUrl = `https://unsplash.com{randomSignature}&keyword=${searchKeyword}`;

        return imageUrl;

    } catch (error) {
        console.error("Ошибка при подборе картинки:", error);
        // Резервная красивая праздничная картинка на случай любого сбоя
        return "https://unsplash.com";
    }
};
