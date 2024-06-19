"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { projects } from "~/server/data";

export default function CardHoverPage() {
  return (
    <div className="container mx-auto px-4">
      <HoverEffect items={projects} />
    </div>
  );
}

export const HoverEffect = ({
  items,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={"grid grid-cols-1 py-10  md:grid-cols-2  lg:grid-cols-3"}>
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="group relative  block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-3xl bg-neutral-200  dark:bg-red-500/[0.8]"
                layoutId="hoverBackground"
                inlist={idx}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={
        "relative z-20 h-full w-full overflow-hidden rounded-2xl border border-transparent  p-4 backdrop-blur-xl group-hover:border-red-500 dark:border-white/[0.2]"
      }
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <h4 className={"mt-4 font-bold tracking-wide"}>{children}</h4>;
};
export const CardDescription = ({
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p className={"mt-8 text-sm leading-relaxed tracking-wide"}>{children}</p>
  );
};
