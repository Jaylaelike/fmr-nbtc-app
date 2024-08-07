import React from "react";

import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

import Link from "next/link";
import { PiUserCircleGearDuotone } from "react-icons/pi";
import { SiMaplibre } from "react-icons/si";
import { FaHistory } from "react-icons/fa";
import GlowingCard from "~/components/animata/card/glowing-card";

function HomePages() {
  return (
    <>
      <div className="container space-y-12 px-4 pt-5 md:px-6">
        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          <Link
            href={"/map"}
            key={1}
            className="group relative  block h-full w-full p-2"
            // onMouseEnter={() => setHoveredIndex(idx)}
            // onMouseLeave={() => setHoveredIndex(null)}
          >
            <GlowingCard
              title="Maps"
              fromColor="#4158D0"
              toColor="#FFCC70"
              viaColor="#C850C0"
              imageUrl="https://res.cloudinary.com/satjay/image/upload/v1722150101/kzlinqnvvjmhmlbbtrzg.png"
            />
          </Link>

          <Link
            href={"/user"}
            key={1}
            className="group relative  block h-full w-full p-2"
            // onMouseEnter={() => setHoveredIndex(idx)}
            // onMouseLeave={() => setHoveredIndex(null)}
          >
            <GlowingCard
              title="User Management"
              fromColor="#4158D0"
              toColor="#FFCC70"
              viaColor="#C850C0"
              imageUrl="https://res.cloudinary.com/satjay/image/upload/v1722151223/peqyrv8rupfntznxs2aq.png"
            />
          </Link>

          <Link
            href={"/form"}
            key={1}
            className="group relative  block h-full w-full p-2"
            // onMouseEnter={() => setHoveredIndex(idx)}
            // onMouseLeave={() => setHoveredIndex(null)}
          >
            <GlowingCard
              title="Logging"
              fromColor="#4158D0"
              toColor="#FFCC70"
              viaColor="#C850C0"
              imageUrl="https://res.cloudinary.com/satjay/image/upload/v1722151480/vwl4tjlwtvlszo0voccz.png"
            />
          </Link>

          <Link
            href={"/form"}
            key={1}
            className="group relative  block h-full w-full p-2"
            // onMouseEnter={() => setHoveredIndex(idx)}
            // onMouseLeave={() => setHoveredIndex(null)}
          >
            <GlowingCard
              title="Logging"
              fromColor="#4158D0"
              toColor="#FFCC70"
              viaColor="#C850C0"
              imageUrl="https://res.cloudinary.com/satjay/image/upload/v1722151480/vwl4tjlwtvlszo0voccz.png"
            />
          </Link>

          <Link
            href={"/form"}
            key={1}
            className="group relative  block h-full w-full p-2"
            // onMouseEnter={() => setHoveredIndex(idx)}
            // onMouseLeave={() => setHoveredIndex(null)}
          >
            <GlowingCard
              title="Logging"
              fromColor="#4158D0"
              toColor="#FFCC70"
              viaColor="#C850C0"
              imageUrl="https://res.cloudinary.com/satjay/image/upload/v1722151480/vwl4tjlwtvlszo0voccz.png"
            />
          </Link>

          <Link
            href={"/form"}
            key={1}
            className="group relative  block h-full w-full p-2"
            // onMouseEnter={() => setHoveredIndex(idx)}
            // onMouseLeave={() => setHoveredIndex(null)}
          >
            <GlowingCard
              title="Logging"
              fromColor="#4158D0"
              toColor="#FFCC70"
              viaColor="#C850C0"
              imageUrl="https://res.cloudinary.com/satjay/image/upload/v1722151480/vwl4tjlwtvlszo0voccz.png"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePages;
