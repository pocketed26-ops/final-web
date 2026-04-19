"use client";

import React, { useLayoutEffect, useRef } from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import gsap from "gsap";

export function Courses() {
    const headerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            if (headerRef.current) {
                gsap.from(headerRef.current.children, {
                    y: 30,
                    autoAlpha: 0,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out",
                    delay: 0.2
                });
            }
        });
        return () => ctx.revert();
    }, []);

    const data = [
        {
            title: "MODULE 1",
            hexColor: "#004aad",
            content: (
                <div className="space-y-2">
                    <p className="text-sm text-black">
                        <b className="text-xl">Money: More Than Coins</b><br />
                        Mr. PocketEd discovers money is not just cash. He learns where it comes from, its forms, and how it powers the world.
                    </p>
                    <ul className="list-disc list-inside text-sm text-black">
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
                <div className="space-y-2">
                    <p className="text-sm text-black">
                        <b className="text-xl">Piggy Bank to Power Bank</b><br />
                        Mrs. PocketEd opens her first digital wallet, explores saving habits, and moves to smart saving apps.
                    </p>
                    <ul className="list-disc list-inside text-sm text-black">
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
                <div className="space-y-2">
                    <p className="text-sm text-black">
                        <b className="text-xl">The Magic of Small Steps</b><br />
                        They start a 7-day budgeting challenge, planning their snacks, school expenses, and Diwali gifting!
                    </p>
                    <ul className="list-disc list-inside text-sm text-black">
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
                <div className="space-y-2">
                    <p className="text-sm text-black">
                        <b className="text-xl">The Money Parking Lot</b><br />
                        Mr. PocketEd learns about savings accounts, UPI, ATMs, and online banking safety.
                    </p>
                    <ul className="list-disc list-inside text-sm text-black">
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
                <div className="space-y-2">
                    <p className="text-sm text-black">
                        <b className="text-xl">Marketplace: The Kurukshetra</b><br />
                        Mr. PocketEd enters the market with ₹100, comparing needs vs. wants to understand true value.
                    </p>
                    <ul className="list-disc list-inside text-sm text-black">
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
        <div className="w-full">
            <div ref={headerRef} className="pt-24 md:pt-32 pb-16 w-full max-w-4xl mx-auto px-6 text-center">
                <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-tight text-black mb-6 leading-[1.1] will-change-[opacity,transform]">
                    Master Your Money with <span className="text-[var(--primary-blue)]">PocketEd</span>
                </h1>
                <p className="text-[clamp(1.1rem,2vw,1.4rem)] text-[#5a5a5a] max-w-[700px] mx-auto leading-relaxed will-change-[opacity,transform]">
                    Step-by-step interactive modules designed to turn complex financial concepts into practical, real-world skills.
                </p>
            </div>
            <div className="relative w-full overflow-clip">
                <Timeline data={data} />
            </div>
        </div>
    );
}


