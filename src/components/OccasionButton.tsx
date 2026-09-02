import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

interface IOccasionButtonProps {
  label: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

export const OccasionButton: FC<IOccasionButtonProps> = ({
  label,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={`
        relative w-full h-32 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-200
        ${selected
        ? "border-purple-500 bg-purple-50 text-purple-700 shadow-sm"
        : "border-gray-200 bg-gray-50 text-gray-500 hover:border-purple-200 hover:bg-purple-50/50"
      }
      `}>
      <div className={`p-3 rounded-full ${selected ? "bg-purple-200" : "bg-white"}`}>
        <Icon className={`w-6 h-6 ${selected ? "text-purple-700" : "text-gray-400"}`} />
      </div>
      <span className="font-semibold text-sm sm:text-base">{label}</span>

      {selected && <div className="absolute inset-0 border-2 border-purple-500 rounded-2xl pointer-events-none" />}
    </button>
  );
};

// import type { FC } from "react";

// export const Header: FC = () => {
//   return (

//   );
// };
