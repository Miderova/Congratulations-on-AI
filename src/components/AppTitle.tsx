import type { FC } from "react";

export const AppTitle: FC = () => {
  return (
    <div className="mb-10 sm:mb-16">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
        Создайте <span className="text-purple-600">уникальное</span>
        <br className="hidden sm:block" /> поздравление
      </h2>
      <p className="text-gray-500 text-lg max-w-2xl">
        Выберите праздник, введите имя и магия начнется! Наш ИИ создаст
        персональное пожелание за секунды.
      </p>
    </div>
  );
};

// import type { FC } from "react";

// export const Header: FC = () => {
//   return (

//   );
// };
