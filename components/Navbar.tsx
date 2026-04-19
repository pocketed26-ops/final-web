"use client";

import React, { useState, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className = "", ...props }, ref) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      ref={ref}
      {...props}
      className={`w-full relative z-50 shrink-0 will-change-[opacity,transform] ${className}`}
    >
      {/* Desktop Navigation */}
      <div
        className="top-nav max-md:!hidden relative px-[clamp(1rem,3.2vw,2.6rem)] pt-[clamp(0.35rem,1vw,0.65rem)]"
      >
        <div className="nav-shell">
          <Link className="nav-brand !items-start" href="/" aria-label="PocketEd home">
            <Image src="/nav-logo.png" alt="PocketEd logo" width={86} height={18} priority />
            <span className="text-[9px] font-bold text-[var(--primary-blue)] ml-0.5 leading-none mt-[-1px]">TM</span>
          </Link>
          <nav className="nav-menu" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/#courses">Courses</Link>
            <Link href="/blog">Blogs</Link>
            <Link href="/community">Community</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-center items-center w-full relative z-50 px-[1rem] pt-[2rem] pb-[1.5rem]">
        <Link href="/" aria-label="PocketEd home">
          <Image
            src="/pocketed_complete_logo.png"
            alt="PocketEd complete logo"
            width={220}
            height={70}
            className="h-auto w-[clamp(160px,50vw,220px)] object-contain"
            priority
          />
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="absolute right-4 p-2 text-gray-800 hover:text-[var(--primary-blue)] transition-colors"
          aria-label="Toggle mobile menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="2.5" />
            <circle cx="12" cy="12" r="2.5" />
            <circle cx="19" cy="12" r="2.5" />
          </svg>
        </button>
        {isMobileMenuOpen && (
          <div className="absolute top-[85%] right-4 mt-2 bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4 z-50 text-left min-w-[180px] border border-gray-100">
            <Link href="/" className="text-gray-800 font-bold text-lg hover:text-[var(--primary-blue)] transition-colors">Home</Link>
            <Link href="/#courses" className="text-gray-800 font-bold text-lg hover:text-[var(--primary-blue)] transition-colors">Courses</Link>
            <Link href="/blog" className="text-gray-800 font-bold text-lg hover:text-[var(--primary-blue)] transition-colors">Blogs</Link>
            <Link href="/community" className="text-gray-800 font-bold text-lg hover:text-[var(--primary-blue)] transition-colors">Community</Link>
            <Link href="/#contact" className="text-gray-800 font-bold text-lg hover:text-[var(--primary-blue)] transition-colors">Contact</Link>
          </div>
        )}
      </div>
    </header>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
