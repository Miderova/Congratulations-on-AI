import { useState } from "react";
import { OccasionType } from "./types";
import { ToneType } from "./types";
import type { LanguageType } from "./types";
import { generateGreeting } from "./geminiService";
import { Header } from "./components/Header";
import { AppTitle } from "./components/AppTitle";
import { OccasionButton } from "./components/OccasionButton";
import { Cake, Sparkles } from "lucide-react";
import { Snowflake } from "lucide-react";
import { UserDetailsSection } from "./components/UserDetailsSection";
import { ExtraDetailsSection } from "./components/ExtraDetailsSection";
import { GenerateButton } from "./components/GenerateButton";
import { ResultSection } from "./components/ResultSection";
import { generateGreetingImage } from "./geminiService";

function App() {
  const [occasion, setOccasion] = useState<OccasionType>(OccasionType.BIRTHDAY);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [tone, setTone] = useState<ToneType>(ToneType.FRIENDLY);
  const [language, setLanguage] = useState<LanguageType>("Русский");
  const [isImageEnabled, setIsImageEnabled] = useState<boolean>(false);

  const [generatedText, setGeneratedText] = useState<string>("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (): Promise<void> => {
    if (!name.trim()) {
      setError("Пожалуйста, введите имя.");
      return;
    }

    setError(null);
    setLoading(true);
    setGeneratedText(""); // Очистить предыдущий результат

try {
    // 1. Сначала генерируем текст поздравления через Gemini
    const result = await generateGreeting(
        occasion,
        name,
        age,
        interests,
        tone,
        language,
    );
    setGeneratedText(result);

    // 2. Если галочка "Сгенерировать открытку" стоит — создаем картинку
    if (isImageEnabled) {
        // Обязательно пишем await и сохраняем картинку в переменную imageUrl
        const imageUrl = await generateGreetingImage(occasion, tone, interests); 
        // Записываем полученную Base64-строку в стейт вашего компонента
        setGeneratedImageUrl(imageUrl); 
    } else {
        setGeneratedImageUrl(null);
    }

} catch (err: any) {
    setError(err.message || "Произошла ошибка при генерации.");
} finally {
    setLoading(false);
}
  };
   return (
    <div className="min-h-screen bg-[#FAF5FF]">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <AppTitle />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Левая колонка */}
            <div className="lg:col-span-5 sm:space-y-10 space-y-8">
              {/* Выбор типа праздника */}
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs">
                      1
                    </span>
                    Выберите праздник
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <OccasionButton
                    label={OccasionType.BIRTHDAY}
                    icon={Cake}
                    selected={occasion === OccasionType.BIRTHDAY}
                    onClick={() => setOccasion(OccasionType.BIRTHDAY)}
                  />
                  <OccasionButton
                    label={OccasionType.NEW_YEAR}
                    icon={Snowflake}
                    selected={occasion === OccasionType.NEW_YEAR}
                    onClick={() => setOccasion(OccasionType.NEW_YEAR)}
                  />
                </div>
              </section>

              <UserDetailsSection
                name={name}
                age={age}
                error={error}
                setName={setName}
                interests={interests}
                setAge={setAge}
                setError={setError}
                setInterests={setInterests}
              />

              <ExtraDetailsSection
                error={error}
                language={language}
                selectedTone={tone}
                isImageEnabled={isImageEnabled}
                setTone={setTone}
                setLanguage={setLanguage}
                setIsImageEnabled={setIsImageEnabled}
              />

              <GenerateButton isLoading={loading} onClick={handleGenerate}>
                <Sparkles className={`w-5 h-5 ${loading ? "animate-spin" : "group-hover:animate-pulse"}`} />
                {loading ? "Сочиняем..." : "Сгенерировать"}
              </GenerateButton>
            </div>

            {/* Правая колонка */}
            <div className="lg:col-span-7 h-full">
              <ResultSection content={generatedText} isLoading={loading} imageUrl={generatedImageUrl} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

