"use client";

import React, { useState, forwardRef, useEffect, CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactModal from "./ContactModal";

const Navbar = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className = "", ...props }, ref) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsContactModalOpen(true);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let observer: MutationObserver;

    if (typeof window !== 'undefined') {
      if (!(window as any).__has_popped_up_this_load) {
        (window as any).__has_popped_up_this_load = true;

        const triggerPopup = () => {
          timer = setTimeout(() => {
            setIsContactModalOpen(true);
          }, 1500);
        };

        if (window.location.pathname === '/' && !document.documentElement.classList.contains('has-visited')) {
          observer = new MutationObserver(() => {
            if (document.documentElement.classList.contains('has-visited')) {
              observer.disconnect();
              triggerPopup();
            }
          });
          observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        } else {
          triggerPopup();
        }
      }
    }

    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timer) clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, []);

  const linkStyle: CSSProperties = {
    color: '#014AAC',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 15,
    fontWeight: 500,
    textDecoration: 'none',
    padding: '8px 4px',
    cursor: 'pointer',
  };

  return (
    <>
      <nav
        ref={ref}
        {...props}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          background: '#ffffff',
          borderBottom: scrolled ? '1px solid rgba(1,74,172,0.10)' : '1px solid transparent',
          transition: 'border-color 200ms ease',
        }}
        className={`w-full relative z-50 shrink-0 will-change-[opacity,transform] ${className}`}
      >
        {/* Desktop Navigation */}
        <div
          className="nav-desktop hidden md:flex"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '18px 80px',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 40,
          }}
        >
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image src="/nav-logo.png" alt="PocketEd logo" width={160} height={36} priority style={{ width: 'auto', height: '36px' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#014AAC', marginLeft: 4, lineHeight: 1, marginTop: -4 }}>TM</span>
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 36, marginLeft: 'auto', marginRight: 32 }}>
            <Link style={linkStyle} href="/">Home</Link>
            <Link style={linkStyle} href="/courses">Courses</Link>
            <Link style={linkStyle} href="/blog">Blog</Link>
            <Link style={linkStyle} href="/community">Community</Link>
            <button onClick={openContactModal} style={{ ...linkStyle, background: 'none', border: 'none' }}>Contact</button>
          </div>

          <button
            onClick={openContactModal}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 26px',
              borderRadius: 999,
              background: '#014AAC',
              color: '#ffffff',
              border: '1.5px solid #014AAC',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              fontSize: 16,
              lineHeight: 1,
              cursor: 'pointer',
              transition: 'transform 160ms ease, box-shadow 160ms ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(1,74,172,0.22)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Book a School Demo
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="nav-mobile md:hidden" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', position: 'relative', zIndex: 50, padding: '16px 24px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image src="/nav-logo.png" alt="PocketEd logo" width={140} height={32} priority style={{ width: 'auto', height: '32px' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#014AAC', marginLeft: 3, lineHeight: 1, marginTop: -3 }}>TM</span>
          </Link>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ padding: 8, color: '#014AAC', background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Toggle mobile menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2.5" />
              <circle cx="12" cy="12" r="2.5" />
              <circle cx="19" cy="12" r="2.5" />
            </svg>
          </button>

          {isMobileMenuOpen && (
            <div style={{ 
              position: 'absolute', 
              top: '100%', 
              right: 16, 
              marginTop: 8, 
              background: '#ffffff', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)', 
              borderRadius: 16, 
              padding: 20, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 16, 
              zIndex: 50, 
              textAlign: 'left', 
              minWidth: 180, 
              border: '1px solid #f3f4f6' 
            }}>
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#014AAC', fontWeight: 700, fontSize: 18, textDecoration: 'none' }}>Home</Link>
              <Link href="/courses" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#014AAC', fontWeight: 700, fontSize: 18, textDecoration: 'none' }}>Courses</Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#014AAC', fontWeight: 700, fontSize: 18, textDecoration: 'none' }}>Blog</Link>
              <Link href="/community" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#014AAC', fontWeight: 700, fontSize: 18, textDecoration: 'none' }}>Community</Link>
              <button onClick={openContactModal} style={{ textAlign: 'left', color: '#014AAC', fontWeight: 700, fontSize: 18, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Contact</button>
            </div>
          )}
        </div>
      </nav>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
