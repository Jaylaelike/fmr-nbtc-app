import React from "react";
interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Starting gradient color.
   */
  fromColor?: string;
  /**
   * Middle gradient color.
   */
  viaColor?: string;
  /**
   * Ending gradient color.
   */
  toColor?: string;

  imageUrl?: string;
  title?: string;
}

export default function GlowingCard({
  fromColor = "#4158D0",
  viaColor = "#C850C0",
  toColor = "#FFCC70",
  imageUrl = "https://res.cloudinary.com/satjay/image/upload/v1722150101/kzlinqnvvjmhmlbbtrzg.png",
  title = "NBTC",
}: GlowCardProps) {
  return (
    <div
      className="hover:shadow-glow rounded-md bg-gradient-to-r p-0.5 hover:backdrop-blur-3xl "
      style={{
        transition: " box-shadow 0.5s ease",
        backgroundImage: `linear-gradient(to right, ${fromColor}, ${viaColor}, ${toColor})`,
      }}
    >
      <div
        className="blur-20 inset-0 h-full w-full rounded-md bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70]"
        style={{ transition: "filter 0.5s ease" }}
      />
      <div className="flex flex-col gap-2 rounded-md bg-red-400 p-4">
        <div className="mb-2 text-xl font-bold text-gray-50">{title}</div>

        {/* <div className="flex-1 text-sm font-medium text-gray-100 text-opacity-90">
          A glowing card is a card that glows.
        </div> */}

        {/*show  image url: {imageUrl} */}

        <div className="grid justify-items-center">
          <div
            className="h-40 w-full rounded-md bg-cover bg-center"
            style={{
              backgroundImage: `url(${imageUrl})`,
              width: "200px",
              height: "200px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
