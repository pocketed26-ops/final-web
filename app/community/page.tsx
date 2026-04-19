"use client";

import Navbar from "../../components/Navbar";
import CircularGallery from "../CircularGallery";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CommunityPage() {
  const gallerySectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      if (gallerySectionRef.current) {
        gsap.from(gallerySectionRef.current.children, {
          scrollTrigger: {
            trigger: gallerySectionRef.current,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
          y: 100,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar className="w-full bg-white border-b border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] sticky top-0 shrink-0 z-50" />

      <main className="flex-1 w-full bg-white flex flex-col items-center">
        <section ref={gallerySectionRef} className="pt-24 md:pt-32 pb-20 w-full max-w-full flex flex-col items-center bg-white relative z-20">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-black mb-4 text-center">
            How We Teach Financial Literacy
          </h2>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-[#5a5a5a] max-w-[600px] mb-12 px-6 text-center">
            Interactive lessons, real-world examples, and engaging activities that make money skills simple and practical.
          </p>
          <div className="w-full" style={{ height: '600px', position: 'relative' }}>
            <CircularGallery bend={1} textColor="#ffffff" borderRadius={0.05} scrollEase={0.05} scrollSpeed={2} />
          </div>
        </section>
      </main>

      <footer className="w-full py-8 text-center text-gray-500 text-sm border-t border-gray-200 mt-auto bg-white">
        &copy; {new Date().getFullYear()} PocketEd. All rights reserved.
      </footer>
    </div>
  );
}
