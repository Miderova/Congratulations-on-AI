import { Check, Copy, ImageIcon, Sparkles } from "lucide-react";
import { useState, type FC, useEffect } from "react";

interface IResultSectionProps {
  content: string;
  isLoading: boolean;
  imageUrl: string | null;
}

export const ResultSection: FC<IResultSectionProps> = ({ content, isLoading, imageUrl }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const handleCopy = async (): Promise<void> => {
    if (!content) return;

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  // Сбрасываем загрузку индикатора каждый раз, когда приходит новая картинка
  useEffect(() => {
    if (imageUrl) {
      setImageLoading(true);
    }
  }, [imageUrl]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-purple-100/50 h-full min-h-[400px] flex flex-col relative overflow-hidden border border-purple-50">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-900">Ваше поздравление</h3>
        {content && !isLoading && (
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-purple-600 transition-colors p-2 rounded-full hover:bg-purple-50"
            title="Копировать"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        )}
      </div>

      <div className="flex-grow flex flex-col">
        {isLoading ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4 animate-pulse">
            <div className="p-4 bg-purple-50 rounded-full">
              <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
            <p className="text-gray-400 text-sm">ИИ придумывает магию...</p>
          </div>
        ) : content || imageUrl ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            {imageUrl && (
              <div className="rounded-2xl overflow-hidden shadow-md border border-purple-100 relative min-h-[250px] bg-purple-50/30 flex items-center justify-center">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-purple-50/50">
                    <Sparkles className="w-6 h-6 text-purple-400 animate-spin" />
                  </div>
                )}
                <img 
                  src={imageUrl} 
                  alt="Greeting Card" 
                  onLoad={() => setImageLoading(false)}
                  className={`w-full h-auto max-h-[350px] object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`} 
                />
              </div>
            )}
            <div className="prose prose-purple max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{content}</p>
            </div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-100 rounded-2xl">
            <div className="text-gray-300 mb-2">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
            </div>
            <p className="text-gray-400 text-sm">
              Здесь появится ваше поздравление. Просто выберите параметры и нажмите "Сгенерировать".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
