import type { FC, ReactNode } from "react";

interface IGenerateButtonProps {
  children: ReactNode;
  isLoading: boolean;
  onClick: () => Promise<void>;
}

export const GenerateButton: FC<IGenerateButtonProps> = ({ children, isLoading, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        w-full group flex items-center justify-center gap-2 py-4 px-8 rounded-full text-white font-bold text-lg shadow-lg shadow-purple-500/30 transition-all duration-300 transform
        ${
          isLoading
            ? "bg-purple-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 hover:scale-[1.02] active:scale-[0.98]"
        }
    `}
    >
      {children}
    </button>
  );
};