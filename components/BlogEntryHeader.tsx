"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function BlogEntryHeader() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const children = containerRef.current?.children;
      if (children) {
        gsap.from(children, {
          y: 30,
          autoAlpha: 0,
          duration: 1.4,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.2
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="mb-16 text-center max-w-3xl mx-auto space-y-4">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 will-change-[opacity,transform]">
        Articles by <span className="text-[var(--primary-blue)]">Siddharth Gadhia</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 will-change-[opacity,transform]">
        Thoughts, learnings, and insights surrounding financial literacy, education, and beyond on Substack.
      </p>
    </div>
  );
}
