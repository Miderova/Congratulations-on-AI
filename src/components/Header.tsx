import { WandSparkles } from "lucide-react";

import type { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-2 text-gray-800">
        <div className="bg-purple-100 p-2 rounded-lg">
          <WandSparkles className="w-6 h-6 text-purple-600" />
        </div>
        <h1 className="text-xl font-bold">Генератор Поздравлений</h1>
      </div>
    </header>
  );
};
