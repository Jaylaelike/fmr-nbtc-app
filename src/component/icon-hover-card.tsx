import { PiUserCircleGearDuotone } from "react-icons/pi";

interface PropsTypes {
    description: string;
}

function iconHoverCard() {
  return (
    <div>
      <div className="container mx-auto px-4">
        <PiUserCircleGearDuotone className="h-40 w-full" />
      </div>
    </div>
  );
}

export default iconHoverCard;
