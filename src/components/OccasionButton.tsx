import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

interface IoccasionButtonProps {
  label: string;
  icon: LucideIcon;
  selected: boolean;
  Onclick: () => void;
}

export const OccasionButton: FC<IoccasionButtonProps> = ({
  label,
  icon: Icon,
  selected,
  Onclick,
}) => {
  return (
    <button onClick={Onclick}>
      <Icon />
      {label}
    </button>
  );
};

// import type { FC } from "react";

// export const Header: FC = () => {
//   return (

//   );
// };
