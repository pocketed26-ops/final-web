# Courses Page Setup Guide

This document contains all the necessary code, file paths, and instructions you need to set up the Courses page along with the Timeline component. If you copy and paste these into your project as outlined below, it should work flawlessly!

## Prerequisites

The Timeline component relies on `framer-motion` for its scroll animations. Ensure it's installed in your project. Run this command in your terminal:

```bash
npm install framer-motion
```

---

## 1. The Timeline Component
**File Path:** `components/ui/timeline.tsx`

This component is responsible for the scrolling line animation and structure that renders your modules. Create or update the file above with this code:

```tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface TimelineEntry {
  title: string;
  hexColor: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, timelineRef.current?.scrollHeight || 0]
  );

  // Use ResizeObserver to keep the container height precise
  useEffect(() => {
    if (!timelineRef.current || !containerRef.current) return;

    const observer = new ResizeObserver(() => {
      if (timelineRef.current && containerRef.current) {
        containerRef.current.style.height = `${timelineRef.current.scrollHeight}px`;
      }
    });

    observer.observe(timelineRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="w-full bg-white font-sans px-4 md:px-10 relative"
      ref={containerRef}
    >
      <div
        ref={timelineRef}
        className="relative max-w-7xl mx-auto pb-20 pt-10 md:pt-20"
      >
        {/* Timeline Scroll Line */}
        <div
          ref={lineRef}
          className="absolute md:left-8 left-8 top-0 h-full w-[2px] bg-neutral-200"
        >
          <motion.div
            style={{ height: heightTransform }}
            className="absolute inset-x-0 top-0 w-[3px] bg-primary rounded-full"
          />
        </div>

        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center border-2 border-primary">
                <div className="h-5 w-5 rounded-full bg-primary" />
              </div>
              <h3
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold"
                style={{ color: item.hexColor }}
              >
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-5 md:pl-5 w-full">
              <h3
                className="md:hidden block text-2xl mb-5 text-left font-bold text-neutral-500"
                style={{ color: item.hexColor }}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 2. The Courses Layout Section
**File Path:** `components/layout/sections/courses/page.tsx`

This section contains all the actual data (text, images, colors) and imports the standard Timeline component to render it.

```tsx
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

export function Courses() {
  const data = [
    {
      title: "MODULE 1",
      hexColor: "#004aad",
      content: (
        <div key="module-1" className="space-y-2">
          <p className="text-sm text-neutral-800 dark:text-neutral-200">
            <b className="text-xl">Money: More Than Coins</b><br />
            Mr. PocketEd discovers money is not just cash. He learns where it comes from, its forms, and how it powers the world.
          </p>
          <ul className="list-disc list-inside text-sm text-neutral-700 dark:text-neutral-300">
            <li>History of money & the barter system</li>
            <li>Understanding currency notes and coins</li>
            <li>Digital money: Cards, UPI, and wallets</li>
          </ul>
          <div className="pt-2 md:max-w-[80%] lg:max-w-[70%]">
            <Image
              src="https://i.postimg.cc/bJW7sYT5/b053dcd9-654b-4a25-8c69-d5e32a6aa2db.jpg"
              alt="MODULE 1"
              width={400}
              height={200}
              className="rounded-lg shadow-md w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      ),
    },
    {
      title: "MODULE 2",
      hexColor: "#8b5cf6",
      content: (
        <div key="module-2" className="space-y-2">
          <p className="text-sm text-neutral-800 dark:text-neutral-200">
            <b className="text-xl">Piggy Bank to Power Bank</b><br />
            Mrs. PocketEd opens her first digital wallet, explores saving habits, and moves to smart saving apps.
          </p>
          <ul className="list-disc list-inside text-sm text-neutral-700 dark:text-neutral-300">
            <li>The power of saving early</li>
            <li>Different types of bank accounts</li>
            <li>Introduction to saving apps and tools</li>
          </ul>
          <div className="pt-2 md:max-w-[80%] lg:max-w-[70%]">
            <Image
              src="https://i.postimg.cc/rsGfMqYx/0a07074c-cf65-4fdd-a430-b25c49b393af.jpg"
              alt="MODULE 2"
              width={400}
              height={200}
              className="rounded-lg shadow-md w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      ),
    },
    {
      title: "MODULE 3",
      hexColor: "#ffd700",
      content: (
        <div key="module-3" className="space-y-2">
          <p className="text-sm text-neutral-800 dark:text-neutral-200">
            <b className="text-xl">The Magic of Small Steps</b><br />
            They start a 7-day budgeting challenge, planning their snacks, school expenses, and Diwali gifting!
          </p>
          <ul className="list-disc list-inside text-sm text-neutral-700 dark:text-neutral-300">
            <li>Creating a personal budget</li>
            <li>Tracking income and expenses</li>
            <li>Setting and achieving financial goals</li>
          </ul>
          <div className="pt-2 md:max-w-[80%] lg:max-w-[70%]">
            <Image
              src="https://i.postimg.cc/XqDpZChb/25c18107-27d6-412a-aa34-0b5f576ea18d.jpg"
              alt="MODULE 3"
              width={400}
              height={200}
              className="rounded-lg shadow-md w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      ),
    },
    {
      title: "MODULE 4",
      hexColor: "#111827",
      content: (
        <div key="module-4" className="space-y-2">
          <p className="text-sm text-neutral-800 dark:text-neutral-200">
            <b className="text-xl">The Money Parking Lot</b><br />
            Mr. PocketEd learns about savings accounts, UPI, ATMs, and online banking safety.
          </p>
          <ul className="list-disc list-inside text-sm text-neutral-700 dark:text-neutral-300">
            <li>How banks work</li>
            <li>Staying safe from online scams</li>
            <li>The role of the RBI</li>
          </ul>
          <div className="pt-2 md:max-w-[80%] lg:max-w-[70%]">
            <Image
              src="https://i.postimg.cc/SKj1CFJb/0f44c496-0465-4794-bb36-d6334a289263.jpg"
              alt="MODULE 4"
              width={400}
              height={200}
              className="rounded-lg shadow-md w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      ),
    },
    {
      title: "MODULE 5",
      hexColor: "#ec4899",
      content: (
        <div key="module-5" className="space-y-2">
          <p className="text-sm text-neutral-800 dark:text-neutral-200">
            <b className="text-xl">Marketplace: The Kurukshetra</b><br />
            Mr. PocketEd enters the market with ₹100, comparing needs vs. wants to understand true value.
          </p>
          <ul className="list-disc list-inside text-sm text-neutral-700 dark:text-neutral-300">
            <li>Needs vs. Wants</li>
            <li>Smart shopping and consumer rights</li>
            <li>Introduction to investing concepts</li>
          </ul>
          <div className="pt-2 md:max-w-[80%] lg:max-w-[70%]">
            <Image
              src="https://i.postimg.cc/Z5Xs8s39/86420464-45f1-4664-b5b9-c5aeccc06026.jpg"
              alt="MODULE 5"
              width={400}
              height={200}
              className="rounded-lg shadow-md w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="pt-24 pb-8 text-center">
        <div className="text-center mb-2">
          <span className="inline-block px-3 py-1 bg-accent rounded-full text-primary-accent font-semibold tracking-wider text-sm">
            <span className="bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
              Courses
            </span>
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Our Courses</h2>
      </div>
      <div className="relative w-full overflow-clip">
        <Timeline data={data} />
      </div>
    </main>
  );
}
```

---

## 3. The Main App Route
**File Path:** `app/courses/page.tsx`

This file handles rendering your courses page when users visit `http://localhost:3000/courses`. It wraps the section in a standard `<main>` tag.

```tsx
import { Courses } from "@/components/layout/sections/courses/page";

export default function CoursesPage() {
    return (
        <main className="min-h-screen w-full">
            <Courses />
        </main>
    )
}
```

---

## Instructions to Run

1. Open your terminal in the root directory (`c:\Github\final-web`).
2. If you haven't already, install Framer Motion as outlined in Prerequisites.
3. Make sure all the code blocks have been placed exactly in the file paths specified above.
4. Run your development server:
   ```bash
   npm run dev
   ```
5. Navigate to `http://localhost:3000/courses` in your browser. The page should run smoothly with the scrolling animations visible!
