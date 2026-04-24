'use client';
// ============================================================================
//  PocketEd Homepage — adapted for Next.js
// ============================================================================

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactModal from './ContactModal';
import Navbar from './Navbar';
import { useState } from 'react';

// ---------- shared prop types ----------

type CSSProperties = React.CSSProperties;
type ReactNode = React.ReactNode;

type LogoVariant = 'default' | 'onBlue';
type ButtonVariant = 'primary' | 'secondary' | 'onYellow' | 'ghost';
type PillVariant = 'yellow' | 'whiteOnBlue' | 'blueFill' | 'blueOutline';
type SectionBg = 'white' | 'blue' | 'yellow';
type IconVariant = 'blueOnWhite' | 'whiteOnBlue' | 'yellowOnBlue' | 'yellowOnWhite' | 'outlineBlue';

type CharacterName =
  | 'mr_arms_raised' | 'mr_celebrating' | 'mr_cheering' | 'mr_neutral'
  | 'mr_running' | 'mr_side' | 'mr_sitting' | 'mr_thinking'
  | 'mrs_celebrating' | 'mrs_confident' | 'mrs_thinking'
  | 'mrs_waving' | 'mrs_worried';

// ============================================================================

// ===== components/Logo.jsx =====
// PocketEd logo lockup - SVG recreation of the mark + wordmark
// Always used together except at favicon scale.

function LogoMark({ size = 32 }: { size?: number }) {
  // Bookmark-style mark: blue body + yellow triangle corner
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Blue bookmark silhouette */}
      <path d="M7 3 H33 V37 L20 28 L7 37 Z" fill="#014AAC" />
      {/* Yellow triangle top-right corner */}
      <path d="M20 3 H33 V20 Z" fill="#FFD21F" />
      {/* Inner white notch for dimensional feel */}
      <path d="M20 28 L20 3 L7 3 Z" fill="#ffffff" fillOpacity="0.0" />
    </svg>
  );
}

function LogoLockup({ size = 32, variant = 'default' }: { size?: number; variant?: LogoVariant }) {
  // variant: 'default' (blue Pocket + yellow Ed on white/yellow bg)
  //         'onBlue' (white Pocket + yellow Ed on blue bg)
  const pocketColor = variant === 'onBlue' ? '#ffffff' : '#014AAC';
  const edColor = '#FFD21F';
  const fontSize = size * 0.95;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.32 }}>
      <LogoMark size={size * 1.05} />
      <span
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: `${fontSize}px`,
          letterSpacing: '-0.01em',
          lineHeight: 1,
        }}
      >
        <span style={{ color: pocketColor }}>Pocket</span>
        <span style={{ color: edColor }}>Ed</span>
      </span>
    </div>
  );
}

// ===== components/Character.jsx =====
// Character lockup — 13 cropped character PNGs with soft drop shadow.
// Optional SpeechBubble + CaptionLine helpers for moments of voice.

const CHAR_SRC = {
  mr_arms_raised: '/character/CHARACTER_mr_arms_raised.png',
  mr_celebrating: '/character/CHARACTER_mr_celebrating.png',
  mr_cheering: '/character/CHARACTER_mr_cheering.png',
  mr_neutral: '/character/CHARACTER_mr_neutral.png',
  mr_running: '/character/CHARACTER_mr_running.png',
  mr_side: '/character/CHARACTER_mr_side.png',
  mr_sitting: '/character/CHARACTER_mr_sitting.png',
  mr_thinking: '/character/CHARACTER_mr_thinking.png',
  mrs_celebrating: '/character/CHARACTER_mrs_celebrating.png',
  mrs_confident: '/character/CHARACTER_mrs_confident.png',
  mrs_thinking: '/character/CHARACTER_mrs_thinking.png',
  mrs_waving: '/character/CHARACTER_mrs_waving.png',
  mrs_worried: '/character/CHARACTER_mrs_worried.png',
};

function Character({ name, height = 120, flip = false, style, shadow = true }: { name: CharacterName; height?: number; flip?: boolean; style?: CSSProperties; shadow?: boolean }) {
  return (
    <img
      src={CHAR_SRC[name]}
      alt=""
      aria-hidden="true"
      style={{
        height,
        width: 'auto',
        display: 'block',
        transform: flip ? 'scaleX(-1)' : 'none',
        filter: shadow ? 'drop-shadow(0 10px 14px rgba(1,74,172,0.12))' : 'none',
        userSelect: 'none',
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}

function SpeechBubble({ children, tailSide = 'left', style, dark = false }: { children: ReactNode; tailSide?: 'left' | 'right'; style?: CSSProperties; dark?: boolean }) {
  const bg = dark ? '#014AAC' : '#ffffff';
  const fg = dark ? '#ffffff' : '#014AAC';
  const bStr = dark ? 'none' : '1px solid rgba(1,74,172,0.14)';
  const shadow = dark ? 'none' : '0 6px 18px -8px rgba(1,74,172,0.18)';
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        background: bg,
        color: fg,
        border: bStr,
        boxShadow: shadow,
        borderRadius: 16,
        padding: '10px 16px',
        fontFamily: 'Poppins, sans-serif',
        fontSize: 14,
        lineHeight: 1.4,
        fontWeight: 500,
        maxWidth: 260,
        ...style,
      }}
    >
      {children}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: -7,
          [tailSide]: 24,
          width: 14,
          height: 14,
          background: bg,
          borderRight: bStr === 'none' ? 'none' : '1px solid rgba(1,74,172,0.14)',
          borderBottom: bStr === 'none' ? 'none' : '1px solid rgba(1,74,172,0.14)',
          transform: 'rotate(45deg)',
        }}
      />
    </div>
  );
}

function CaptionLine({ children, align = 'left', style }: { children: ReactNode; align?: 'left' | 'center' | 'right'; style?: CSSProperties }) {
  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      fontSize: 13,
      lineHeight: 1.4,
      color: '#014AAC',
      opacity: 0.72,
      fontWeight: 500,
      textAlign: align,
      maxWidth: 220,
      ...style,
    }}>{children}</div>
  );
}

// ===== components/Icons.jsx =====
// PocketEd icon system.
// Solid (filled) glyphs — for primary UI, buttons, stat callouts, section feature icons.
// Line (outlined) glyphs — for secondary use (inline body, footer).
// Never mix styles in the same component.
// All glyphs sit inside circular containers: white/blue/yellow per rules.

// ========== SOLID GLYPHS (24x24 viewBox, fill current color) ==========

const GlyphBook = (
  <path d="M4 4h7a4 4 0 0 1 1 .2V20a4 4 0 0 0-1-.2H4V4zm16 0h-7a4 4 0 0 0-1 .2V20a4 4 0 0 1 1-.2h7V4z" fill="currentColor" />
);
const GlyphBulb = (
  <g fill="currentColor">
    <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
    <rect x="9" y="18" width="6" height="2" rx="1" />
    <rect x="10" y="21" width="4" height="1.5" rx="0.75" />
  </g>
);
const GlyphWallet = (
  <g fill="currentColor">
    <path d="M3 7a2 2 0 0 1 2-2h12v4H5a2 2 0 0 1-2-2z" />
    <path d="M3 9h15a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9zm14 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
  </g>
);
const GlyphBadge = (
  <g fill="currentColor">
    <circle cx="12" cy="9" r="6" />
    <path d="M8 13l-2 8 6-3 6 3-2-8" opacity="0.85" />
    <path d="M10 9l1.5 1.5L15 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </g>
);
const GlyphCap = (
  <g fill="currentColor">
    <path d="M1 9l11-5 11 5-11 5L1 9z" />
    <path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4l-6 2.7L6 11z" />
    <path d="M21 10v5" stroke="currentColor" strokeWidth="1.3" />
  </g>
);
const GlyphRocket = (
  <g fill="currentColor">
    <path d="M14 3c4 0 7 3 7 7l-5 5v4l-3-2-3 2v-4L5 10c0-4 3-7 7-7h2z" />
    <circle cx="13" cy="9" r="1.6" fill="#fff" />
    <path d="M7 18c-1 1-1.5 3-1.5 3s2-.5 3-1.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </g>
);
const GlyphGlobe = (
  <g fill="currentColor">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke="#fff" strokeWidth="1.3" fill="none" />
  </g>
);
const GlyphClipboard = (
  <g fill="currentColor">
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <rect x="9" y="2.5" width="6" height="3" rx="1" fill="#fff" />
    <path d="M8 11h8M8 14h8M8 17h5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
  </g>
);
const GlyphChart = (
  <g fill="currentColor">
    <rect x="4" y="13" width="3" height="7" />
    <rect x="9" y="9" width="3" height="11" />
    <rect x="14" y="5" width="3" height="15" />
    <path d="M3 6l5 3 4-3 6-3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
  </g>
);
const GlyphGears = (
  <g fill="currentColor">
    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 2.2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6z" />
    <path d="M11 2h2l.4 2 1.8.8 1.8-1 1.4 1.4-1 1.8.8 1.8 2 .4v2l-2 .4-.8 1.8 1 1.8-1.4 1.4-1.8-1-1.8.8-.4 2h-2l-.4-2-1.8-.8-1.8 1L5.2 15.2l1-1.8L5.4 11.6l-2-.4v-2l2-.4.8-1.8-1-1.8L6.6 3.8l1.8 1 1.8-.8L11 2z" opacity="0.9" />
  </g>
);
const GlyphBell = (
  <g fill="currentColor">
    <path d="M6 16c0-1 1-1.5 1-3V9a5 5 0 0 1 10 0v4c0 1.5 1 2 1 3H6z" />
    <path d="M10 18a2 2 0 0 0 4 0" />
  </g>
);
const GlyphShield = (
  <g fill="currentColor">
    <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z" />
    <path d="M8.5 12l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);
const GlyphTarget = (
  <g fill="currentColor">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5.5" fill="#fff" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
  </g>
);
const GlyphPlay = <path d="M6 4l14 8-14 8V4z" fill="currentColor" />;
const GlyphUsers = (
  <g fill="currentColor">
    <circle cx="9" cy="8" r="3.5" />
    <circle cx="17" cy="9" r="2.8" />
    <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6H2z" />
    <path d="M15 15.3c3 .4 5 2.5 5 4.7h-5v-4.7z" />
  </g>
);
const GlyphCheckCircle = (
  <g fill="currentColor">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);
const GlyphArrow = <path d="M5 12h13m-5-5l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
const GlyphDownload = (
  <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v12" />
    <path d="M7 10l5 5 5-5" />
    <path d="M4 19h16" />
  </g>
);
const GlyphHand = (
  <g fill="currentColor">
    <path d="M4 14c0-4 3-7 7-7h2c4 0 7 3 7 7l-2 5H6l-2-5z" />
    <circle cx="12" cy="10" r="2" fill="#fff" />
    <path d="M11 10 v-2 M13 10 v-2" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
  </g>
);

// ========== LINE GLYPHS (secondary) ==========

const LineArrow = (
  <path d="M5 12h13m-5-5l5 5-5 5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
);
const LineMail = (
  <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M3 7l9 7 9-7" />
  </g>
);
const LinePin = (
  <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5-6 8-10 8-13a8 8 0 0 0-16 0c0 3 3 7 8 13z" />
    <circle cx="12" cy="9" r="2.5" />
  </g>
);
const LineLinkedin = (
  <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 1 1 4 0v4M12 10v7" />
  </g>
);

// ========== CONTAINER ==========

function IconCircle({ glyph, size = 56, variant = 'blueOnWhite' }: { glyph: ReactNode; size?: number; variant?: IconVariant }) {
  // variants:
  //  blueOnWhite  -> blue circle, white glyph  (on white bg)
  //  whiteOnBlue  -> white circle, blue glyph  (on blue bg)
  //  yellowOnBlue -> yellow circle, blue glyph (accent)
  //  yellowOnWhite-> yellow circle, blue glyph (accent)
  //  outlineBlue  -> white circle, blue outline, blue glyph (line-style)
  let bg, fg, ring;
  switch (variant) {
    case 'whiteOnBlue': bg = '#ffffff'; fg = '#014AAC'; break;
    case 'yellowOnBlue': bg = '#FFD21F'; fg = '#014AAC'; break;
    case 'yellowOnWhite': bg = '#FFD21F'; fg = '#014AAC'; break;
    case 'outlineBlue': bg = '#ffffff'; fg = '#014AAC'; ring = '#014AAC'; break;
    case 'blueOnWhite':
    default: bg = '#014AAC'; fg = '#ffffff'; break;
  }
  const glyphSize = Math.round(size * 0.52);
  return (
    <div
      className="icon-circle"
      style={{
        width: size,
        height: size,
        borderRadius: '999px',
        background: bg,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: ring ? `1.5px solid ${ring}` : 'none',
        flexShrink: 0,
      }}
    >
      <svg width={glyphSize} height={glyphSize} viewBox="0 0 24 24" style={{ color: fg }} xmlns="http://www.w3.org/2000/svg">
        {glyph}
      </svg>
    </div>
  );
}

// ===== components/Primitives.jsx =====
// Reusable primitives: buttons, section wrapper, pills.

function Button({ variant = 'primary', children, icon, onClick, style }: { variant?: ButtonVariant; children: ReactNode; icon?: ReactNode; onClick?: () => void; style?: CSSProperties }) {
  // variant: 'primary' (blue/white), 'secondary' (white/blue border/blue text),
  //          'onYellow' (blue/white — sits on yellow CTA band), 'ghost' (transparent white text)
  let bg, fg, border;
  switch (variant) {
    case 'secondary': bg = '#ffffff'; fg = '#014AAC'; border = '1.5px solid #014AAC'; break;
    case 'onYellow': bg = '#014AAC'; fg = '#ffffff'; border = '1.5px solid #014AAC'; break;
    case 'ghost': bg = 'transparent'; fg = '#014AAC'; border = '1.5px solid transparent'; break;
    case 'primary':
    default: bg = '#014AAC'; fg = '#ffffff'; border = '1.5px solid #014AAC'; break;
  }
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '14px 26px',
        borderRadius: 999,
        background: bg,
        color: fg,
        border,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 1,
        cursor: 'pointer',
        transition: 'transform 160ms ease, box-shadow 160ms ease',
        whiteSpace: 'nowrap',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = variant === 'primary' || variant === 'onYellow'
          ? '0 8px 20px rgba(1,74,172,0.22)'
          : '0 6px 16px rgba(1,74,172,0.10)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
    </button>
  );
}

function Pill({ children, variant = 'yellow', style }: { children: ReactNode; variant?: PillVariant; style?: CSSProperties }) {
  // variants for value/credential pill rows
  //  yellow       -> yellow fill, blue text (on blue bg)
  //  whiteOnBlue  -> white fill, blue text (on blue bg)
  //  blueFill     -> blue fill, white text (on white bg)
  //  blueOutline  -> white fill, blue border, blue text (on white bg)
  let bg, fg, border;
  switch (variant) {
    case 'whiteOnBlue': bg = '#ffffff'; fg = '#014AAC'; border = 'none'; break;
    case 'blueFill': bg = '#014AAC'; fg = '#ffffff'; border = 'none'; break;
    case 'blueOutline': bg = '#ffffff'; fg = '#014AAC'; border = '1.5px solid #014AAC'; break;
    case 'yellow':
    default: bg = '#FFD21F'; fg = '#014AAC'; border = 'none'; break;
  }
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '10px 20px',
        borderRadius: 999,
        background: bg,
        color: fg,
        border,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
        fontSize: 15,
        lineHeight: 1,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function Section({ children, bg = 'white', style, id, label }: { children: ReactNode; bg?: SectionBg; style?: CSSProperties; id?: string; label?: string }) {
  // bg: 'white' | 'blue' | 'yellow'
  let background;
  if (bg === 'blue') {
    background = 'linear-gradient(180deg, #014AAC 0%, #013F96 100%)'; // subtle same-hue wash
  } else if (bg === 'yellow') {
    background = '#FFD21F'; // flat — no gradient on yellow ever
  } else {
    background = '#ffffff';
  }
  return (
    <section
      id={id}
      data-screen-label={label}
      style={{
        width: '100%',
        background,
        padding: '120px 0',
        ...style,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 80px' }}>
        {children}
      </div>
    </section>
  );
}

function SectionLabel({ children, onBlue = false }: { children: ReactNode; onBlue?: boolean }) {
  return (
    <div
      style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: onBlue ? '#FFD21F' : '#014AAC',
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  );
}

// ===== components/HeroSections.jsx =====
// Sticky nav + Hero + Credentials strip — all sit in first viewport.



function Hero({ onContactClick }: { onContactClick: () => void }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <section
      data-screen-label="01 Hero"
      style={{
        width: '100%',
        background: '#ffffff',
        position: 'relative',
        paddingTop: 96,
        paddingBottom: 88,
        overflow: 'hidden',
      }}
    >
      {/* Soft exit wash — white fading to faintest blue, bleeds into Problem section */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 220,
          background: 'linear-gradient(180deg, rgba(1,74,172,0) 0%, rgba(1,74,172,0.045) 100%)',
          pointerEvents: 'none',
        }}
      />
      {/* Concentric-circle ambient pattern in hero right column */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: -120,
          top: 40,
          width: 620,
          height: 620,
          background: 'radial-gradient(circle at center, transparent 0, transparent 96px, rgba(1,74,172,0.05) 97px, rgba(1,74,172,0.05) 98px, transparent 99px, transparent 176px, rgba(1,74,172,0.045) 177px, rgba(1,74,172,0.045) 178px, transparent 179px, transparent 256px, rgba(1,74,172,0.04) 257px, rgba(1,74,172,0.04) 258px, transparent 259px, transparent 336px, rgba(1,74,172,0.035) 337px, rgba(1,74,172,0.035) 338px, transparent 339px)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="responsive-grid"
        style={{
          position: 'relative',
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 80px',
          display: 'grid',
          gridTemplateColumns: '60fr 40fr',
          gap: 64,
          alignItems: 'center',
        }}
      >
        {/* Left column */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 14px 8px 10px',
              borderRadius: 999,
              border: '1px solid rgba(1,74,172,0.18)',
              background: '#ffffff',
              marginBottom: 28,
            }}
          >
            <span style={{
              width: 22, height: 22, borderRadius: 999, background: '#FFD21F',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#014AAC'
            }}>★</span>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#014AAC', fontWeight: 500 }}>
              For Indian schools · Grades 6 – 8
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#014AAC',
              letterSpacing: '-0.015em',
              margin: 0,
              textWrap: 'pretty',
            }}
          >
            <span className="hero-highlight">
              <svg className="hero-brush-svg" viewBox="0 0 500 82" preserveAspectRatio="none" aria-hidden="true">
                {/* Main brush body */}
                <path d="M5,40 C3,32 2,23 9,17 C16,11 28,15 46,12 C64,9 80,4 106,6 C132,8 148,3 176,4 C204,5 222,1 250,2 C278,3 296,0 326,1 C356,2 374,-1 400,2 C422,5 440,9 458,13 C472,17 482,23 488,30 C492,35 491,43 487,49 C481,56 466,59 448,57 C426,55 410,61 382,59 C354,57 336,63 306,61 C276,59 258,65 228,63 C198,61 180,67 154,65 C128,63 110,68 86,66 C62,64 46,60 30,56 C16,52 5,47 5,40Z" fill="rgba(255,210,31,0.88)" />
                {/* Upper bristle strokes */}
                <path d="M32,11 C48,7 66,5 86,7 M128,4 C150,1 174,2 196,4 M238,1 C262,-1 286,0 308,2 M348,0 C374,1 396,3 416,6 M448,10 C460,12 472,15 480,18" stroke="rgba(255,210,31,0.55)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                {/* Lower bristle strokes */}
                <path d="M30,59 C48,63 68,66 90,65 M132,66 C156,69 180,68 202,66 M244,65 C270,68 294,67 316,65 M356,63 C380,66 402,65 422,62 M448,58 C460,55 472,52 480,49" stroke="rgba(255,210,31,0.45)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
              Financial literacy
            </span> made simple, playful, and practical.
            <br />
            <span style={{ color: '#014AAC' }}>For Indian schools.</span>
          </h1>

          <p
            className="hero-subtext"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 18,
              lineHeight: 1.55,
              color: '#014AAC',
              opacity: 0.82,
              marginTop: 24,
              marginBottom: isExpanded ? 40 : 12,
              maxWidth: 560,
              fontWeight: 400,
            }}
          >
            A full-year classroom programme for Grades 6 – 8
            {!isExpanded ? '...' : ', mapped to NEP 2020 and the national financial education framework — board-agnostic, teacher-led, and ready to run from the first bell.'}
          </p>

          {!isExpanded && (
            <button
              className="read-more-btn"
              onClick={() => setIsExpanded(true)}
            >
              Read more
            </button>
          )}

          <div className="cta-button-group" style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" icon={<svg width="14" height="14" viewBox="0 0 24 24">{GlyphArrow}</svg>} onClick={onContactClick}>
              Book a School Demo
            </Button>
            <Button variant="secondary" icon={<svg width="14" height="14" viewBox="0 0 24 24">{GlyphDownload}</svg>}>
              Download Programme Overview
            </Button>
          </div>
        </div>

        {/* Right column — laptop + phone composition */}
        <div style={{ position: 'relative' }}>
          <HeroVisual />
          {/* Mrs. PocketEd waving below mockup with speech bubble */}
          <div className="hero-char-row" style={{
            position: 'relative',
            marginTop: 28,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            gap: 16,
            paddingLeft: 8,
            zIndex: 3,
          }}>
            <Character name="mrs_waving" height={140} />
            <SpeechBubble tailSide="left" style={{ marginBottom: 24 }}>
              Hi, I'm Mrs. <span style={{ color: '#014AAC' }}>Pocket</span><span style={{ color: '#FFD21F' }}>Ed</span>.<br />Let me show you around.
            </SpeechBubble>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual-wrap" style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1.02', maxWidth: 460, marginLeft: 'auto' }}>
      {/* Soft diffused yellow blob behind mockup */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        left: '-18%', top: '4%',
        width: '108%', height: '86%',
        background: 'radial-gradient(ellipse at 40% 50%, rgba(255,210,31,0.38) 0%, rgba(255,210,31,0.18) 40%, rgba(255,210,31,0) 70%)',
        transform: 'rotate(-8deg)',
        filter: 'blur(8px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Tiny floating coin badge — top-left edge */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        left: '-12%', top: '14%',
        width: 44, height: 44, borderRadius: 999,
        background: '#FFD21F',
        boxShadow: '0 10px 24px -8px rgba(1,74,172,0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2,
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" style={{ color: '#014AAC' }}>{GlyphWallet}</svg>
      </div>

      {/* Tiny floating spark chart — top-right edge */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        right: '-6%', top: '-2%',
        width: 64, height: 44,
        background: '#ffffff',
        borderRadius: 12,
        border: '1px solid rgba(1,74,172,0.12)',
        boxShadow: '0 10px 24px -10px rgba(1,74,172,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2,
      }}>
        <svg width="44" height="22" viewBox="0 0 44 22" fill="none">
          <path d="M2 18 L10 12 L16 14 L24 6 L32 9 L42 3" stroke="#014AAC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="42" cy="3" r="2.2" fill="#FFD21F" />
        </svg>
      </div>

      {/* Laptop */}
      <div style={{
        position: 'absolute',
        inset: '8% 0 18% 0',
        background: '#ffffff',
        borderRadius: 16,
        border: '1.5px solid rgba(1,74,172,0.10)',
        boxShadow: '0 40px 80px -40px rgba(1,74,172,0.25), 0 12px 24px -8px rgba(1,74,172,0.06)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
      }}>
        {/* Laptop chrome */}
        <div style={{ height: 22, background: '#F3F6FB', borderBottom: '1px solid rgba(1,74,172,0.08)', display: 'flex', alignItems: 'center', gap: 5, paddingLeft: 10 }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: '#014AAC', opacity: 0.18 }} />
          <span style={{ width: 7, height: 7, borderRadius: 999, background: '#014AAC', opacity: 0.18 }} />
          <span style={{ width: 7, height: 7, borderRadius: 999, background: '#014AAC', opacity: 0.18 }} />
        </div>
        {/* App body */}
        <div style={{ flex: 1, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <LogoMark size={22} />
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: '#014AAC' }}>Programme · Grade 7</span>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
          }}>
            <StatTile label="Sessions run" value="24/32" tone="blue" />
            <StatTile label="Avg. engagement" value="91%" tone="yellow" />
          </div>
          <div style={{
            flex: 1, background: '#F3F6FB', borderRadius: 10, padding: 14, display: 'flex', flexDirection: 'column', gap: 10
          }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: '#014AAC', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              This week
            </div>
            <LessonRow title="Session 14 · Saving vs. Spending" badge="Mon" />
            <LessonRow title="Session 15 · Meet Kuber Chacha" badge="Wed" accent />
            <LessonRow title="Session 16 · Budget a Festival" badge="Fri" />
          </div>
        </div>
        {/* Laptop base */}
      </div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-4%',
        right: '-4%',
        height: 10,
        background: '#E9EEF5',
        borderRadius: '0 0 8px 8px',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '42%',
        width: '16%',
        height: 4,
        background: '#D4DCE8',
        borderRadius: '0 0 6px 6px',
      }} />

      {/* Phone overlapping bottom-right */}
      <div style={{
        position: 'absolute',
        right: '-12%',
        bottom: 0,
        width: '34%',
        aspectRatio: '9 / 18',
        background: '#ffffff',
        borderRadius: 22,
        border: '3px solid #014AAC',
        boxShadow: '0 24px 48px -20px rgba(1,74,172,0.35)',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
      }}>
        <div style={{
          width: 32, height: 4, background: '#014AAC', opacity: 0.25, borderRadius: 99, marginTop: 3,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <LogoMark size={28} />
          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, color: '#014AAC', fontWeight: 600 }}>
            <span>Pocket</span><span style={{ color: '#FFD21F' }}>Ed</span>
          </div>
          <div style={{
            width: 52, height: 52, borderRadius: 999, background: '#FFD21F',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" style={{ color: '#014AAC' }}>{GlyphPlay}</svg>
          </div>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 9, color: '#014AAC', textAlign: 'center', lineHeight: 1.3, padding: '0 4px' }}>
            Today's<br />lesson
          </div>
        </div>
        <div style={{ width: '40%', height: 3, background: '#014AAC', opacity: 0.2, borderRadius: 99, marginBottom: 3 }} />
      </div>
    </div>
  );
}

function StatTile({ label, value, tone }: { label: string; value: string; tone: 'blue' | 'yellow' }) {
  const isYellow = tone === 'yellow';
  return (
    <div style={{
      background: isYellow ? '#FFD21F' : '#014AAC',
      color: isYellow ? '#014AAC' : '#ffffff',
      borderRadius: 8,
      padding: '10px 12px',
      fontFamily: 'Poppins, sans-serif',
    }}>
      <div style={{ fontSize: 9, fontWeight: 500, opacity: isYellow ? 0.8 : 0.8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700, marginTop: 2, lineHeight: 1 }}>{value}</div>
    </div>
  );
}

function LessonRow({ title, badge, accent }: { title: string; badge: string; accent?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: '#ffffff', borderRadius: 7, padding: '8px 10px',
      border: accent ? '1px solid #FFD21F' : '1px solid rgba(1,74,172,0.08)',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 999,
        background: accent ? '#FFD21F' : '#014AAC',
        color: accent ? '#014AAC' : '#ffffff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Poppins, sans-serif', fontSize: 8, fontWeight: 600,
      }}>{badge}</div>
      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, color: '#014AAC', fontWeight: 500 }}>{title}</div>
    </div>
  );
}

function CredentialsStrip() {
  const credentials = [
    'NEP 2020',
    'NSFE 2020–25',
    'RBI School Financial\nLiteracy Framework',
    'NCF-SE 2023',
  ];
  return (
    <div
      data-screen-label="02 Credentials"
      style={{
        width: '100%',
        background: '#ffffff',
        borderTop: '1px solid rgba(1,74,172,0.08)',
        borderBottom: '1px solid rgba(1,74,172,0.08)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '22px 80px',
          display: 'flex',
          alignItems: 'center',
          gap: 36,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
        className="no-scrollbar"
      >
        <div style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#014AAC',
          opacity: 0.7,
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}>
          Aligned with
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 40,
          flexShrink: 0,
        }}>
          {credentials.map((c, i) => (
            <React.Fragment key={i}>
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                color: '#014AAC',
                lineHeight: 1.3,
                whiteSpace: 'pre-line',
                textAlign: 'center',
                flexShrink: 0,
              }}>{c}</div>
              {i < credentials.length - 1 && (
                <span style={{ width: 1, height: 28, background: 'rgba(1,74,172,0.14)', flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 12,
          color: '#014AAC',
          opacity: 0.65,
          flexShrink: 0,
          textAlign: 'right',
          lineHeight: 1.4,
        }}>
          MCA incorporated<br />DPIIT recognised
        </div>
      </div>
    </div>
  );
}

// ===== components/MidSections.jsx =====
// Problem + Programme + How It Works sections

function ProblemSection() {
  const points = [
    { glyph: GlyphBook, title: 'Not in the curriculum', body: 'Most boards don\'t teach money. Students graduate without the basics.', offsetY: -14 },
    { glyph: GlyphClipboard, title: 'No ready-to-run material', body: 'Teachers piece together PDFs and YouTube. Quality and depth vary wildly.', offsetY: 0 },
    { glyph: GlyphUsers, title: 'Lessons don\'t stick', body: 'Without stories, activities, and context, concepts are forgotten by next term.', offsetY: 14 },
  ];
  return (
    <Section label="03 Problem" id="problem" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Diffused blue blob behind the icon row */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        left: '18%', right: '18%',
        bottom: '8%', height: 380,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(1,74,172,0.09) 0%, rgba(1,74,172,0.04) 45%, rgba(1,74,172,0) 75%)',
        filter: 'blur(4px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="responsive-grid" style={{
          display: 'grid', gridTemplateColumns: '160px 1fr', gap: 40,
          alignItems: 'center', marginBottom: 72, maxWidth: 1080,
        }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Character name="mrs_thinking" height={140} />
          </div>
          <div>
            <SectionLabel>The Problem</SectionLabel>
            <h2 style={h2Style}>Indian schools have no structured way to teach money.</h2>
            <p style={bodyLargeStyle}>
              Students learn algebra, chemistry, and civics — but leave school unable to read a
              payslip, plan a budget, or tell a need from a want. The gap isn't curiosity; it's curriculum.
            </p>
          </div>
        </div>
        <div className="mobile-square-carousel" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, alignItems: 'flex-start' }}>
          {points.map((p, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 20, transform: `translateY(${p.offsetY}px)` }}>
              <IconCircle glyph={p.glyph} size={64} variant="blueOnWhite" />
              <h3 style={{ ...h3Style, margin: 0 }}>{p.title}</h3>
              <p style={{ ...bodyStyle, margin: 0, maxWidth: 320 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProgrammeSection() {
  const grades: { grade: string; name: string; glyph: ReactNode; tagline: string; body: string; tint: string; iconTone: 'blue' | 'yellow' }[] = [
    {
      grade: '6', name: 'Money Smarties', glyph: GlyphBulb,
      tagline: 'Needs, wants, and the first rupee.',
      body: 'Foundational money sense through stories, coin-games, and shopkeeping role-plays.',
      tint: 'linear-gradient(180deg, rgba(255,210,31,0.18) 0%, rgba(255,210,31,0) 100%)',
      iconTone: 'yellow',
    },
    {
      grade: '7', name: 'Finance Explorers', glyph: GlyphTarget,
      tagline: 'Saving, spending, and goal-setting.',
      body: 'Budgeting festivals, comparing prices, and understanding interest as a real-world tool.',
      tint: 'linear-gradient(180deg, rgba(1,74,172,0.09) 0%, rgba(1,74,172,0) 100%)',
      iconTone: 'blue',
    },
    {
      grade: '8', name: 'Rupee Rockstars', glyph: GlyphRocket,
      tagline: 'Investing, risk, and the bigger picture.',
      body: 'Banks, markets, inflation, and digital money — framed through India\'s own economic story.',
      tint: 'linear-gradient(135deg, rgba(255,210,31,0.14) 0%, rgba(1,74,172,0.08) 100%)',
      iconTone: 'blue',
    },
  ];
  return (
    <Section id="programme" label="04 Programme">
      <div className="responsive-grid" style={{
        display: 'grid', gridTemplateColumns: '180px 1fr', gap: 44,
        alignItems: 'center', marginBottom: 72, maxWidth: 1120,
      }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Character name="mr_sitting" height={150} />
        </div>
        <div>
          <SectionLabel>The Programme</SectionLabel>
          <h2 style={h2Style}>A full-year programme, built for schools.</h2>
          <p style={bodyLargeStyle}>
            Three year-long tracks — one per grade — delivered in 30–45 minute sessions your
            teachers run themselves. Everything is mapped, scripted, and printable.
          </p>
        </div>
      </div>
      <div className="mobile-square-carousel" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {grades.map((g, i) => <GradeCard key={i} {...g} />)}
      </div>
    </Section>
  );
}

function GradeCard({ grade, name, glyph, tagline, body, tint, iconTone }: { grade: string; name: string; glyph: ReactNode; tagline: string; body: string; tint: string; iconTone: 'blue' | 'yellow' }) {
  const [hover, setHover] = React.useState(false);
  const iconVariant = iconTone === 'yellow' ? 'yellowOnWhite' : 'blueOnWhite';
  const glowColor = iconTone === 'yellow' ? 'rgba(255,210,31,0.55)' : 'rgba(1,74,172,0.22)';
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: '#ffffff',
        borderRadius: 22,
        padding: 32,
        border: '1px solid rgba(1,74,172,0.07)',
        boxShadow: hover
          ? '0 24px 48px -20px rgba(1,74,172,0.18), 0 4px 14px rgba(1,74,172,0.05)'
          : '0 14px 32px -18px rgba(1,74,172,0.14), 0 2px 6px rgba(1,74,172,0.03)',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 220ms ease, box-shadow 220ms ease',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        overflow: 'hidden',
      }}
    >
      {/* Soft pastel top-third tint */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: '0 0 auto 0',
        height: '38%',
        background: tint,
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{
          padding: 6, borderRadius: 999,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}>
          <IconCircle glyph={glyph} size={60} variant={iconVariant} />
        </div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 999,
          background: '#FFD21F', color: '#014AAC',
          fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
        }}>
          Grade {grade}
        </span>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 500,
          letterSpacing: '0.08em', textTransform: 'uppercase', color: '#014AAC',
          opacity: 0.6, marginBottom: 8,
        }}>
          Track · Year-long
        </div>
        <h3 style={{ ...h3Style, margin: 0 }}>{name}</h3>
        <p style={{
          fontFamily: 'Poppins, sans-serif', fontSize: 16, color: '#014AAC',
          fontWeight: 500, margin: '6px 0 0 0', lineHeight: 1.5,
        }}>{tagline}</p>
      </div>
      <p style={{ ...bodyStyle, margin: 0, position: 'relative', zIndex: 1 }}>{body}</p>
      <div style={{
        marginTop: 'auto', paddingTop: 20,
        borderTop: '1px solid rgba(1,74,172,0.10)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', gap: 14 }}>
          <MiniStat label="Sessions" value="32" />
          <MiniStat label="Months" value="8" />
          <MiniStat label="Per session" value="30–45m" />
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ fontSize: 11, color: '#014AAC', opacity: 0.6, fontWeight: 500, letterSpacing: '0.04em' }}>{label}</div>
      <div style={{ fontSize: 15, color: '#014AAC', fontWeight: 600, marginTop: 2 }}>{value}</div>
    </div>
  );
}

function HowItWorksSection() {
  const steps = [
    { n: 1, title: 'Intro / Recap', body: 'Anchor the last session. Set today\'s question.', glyph: GlyphBook, tone: 'blue' },
    { n: 2, title: <>Mr. & Mrs. <span style={{ color: '#014AAC' }}>Pocket</span><span style={{ color: '#FFD21F' }}>Ed</span></>, body: '4-min animated video introduces the concept.', glyph: GlyphPlay, tone: 'yellow' },
    { n: 3, title: 'Teacher Solve', body: 'Teacher walks through examples, live Q&A.', glyph: GlyphBulb, tone: 'blue' },
    { n: 4, title: 'Visual Guru', body: 'Mythology guru reframes the idea in a story.', glyph: GlyphUsers, tone: 'yellow' },
    { n: 5, title: 'Conclusion + Activity', body: 'Apply it — group worksheet or role-play.', glyph: GlyphClipboard, tone: 'blue' },
    { n: 6, title: 'Visual Conclusion', body: 'Closing card students take home or pin up.', glyph: GlyphCheckCircle, tone: 'yellow' },
  ];
  return (
    <Section id="how-it-works" label="05 How It Works">
      <div style={{ maxWidth: 860, marginBottom: 72 }}>
        <SectionLabel>How It Works</SectionLabel>
        <h2 style={h2Style}>A 6-step session structure teachers can run confidently.</h2>
        <p style={bodyLargeStyle}>
          Every session follows the same rhythm, so teachers prepare once and run it all year.
          Students know what's coming — predictability is what makes learning stick.
        </p>
      </div>
      <div>
        {/* Desktop & Tablet: Horizontal Flow */}
        <div className="hidden lg:grid relative" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
          {/* connecting line */}
          <style>{`
            @keyframes dashRun {
              from { background-position: 0 0; }
              to { background-position: 24px 0; }
            }
            @keyframes dashRunVertical {
              from { background-position: 0 0; }
              to { background-position: 0 24px; }
            }
          `}</style>
          <div
            className="workflow-line"
            style={{
              position: 'absolute',
              top: 36, // center of 72-px icon
              left: '8%', right: '8%',
              height: 2,
              background: 'repeating-linear-gradient(90deg, rgba(1,74,172,0.25) 0, rgba(1,74,172,0.25) 6px, transparent 6px, transparent 12px)',
              animation: 'dashRun 1s linear infinite',
              zIndex: 0,
            }}
          />
          {steps.map((s, i) => (
            <div key={i} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
              <div style={{ position: 'relative' }}>
                <IconCircle glyph={s.glyph} size={72} variant={s.tone === 'yellow' ? 'yellowOnWhite' : 'blueOnWhite'} />
                <div style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 26, height: 26, borderRadius: 999,
                  background: '#ffffff', border: '1.5px solid #014AAC',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700, color: '#014AAC',
                }}>{s.n}</div>
              </div>
              <div>
                <h3 style={{ ...h3Style, fontSize: 18, margin: 0, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ ...bodyStyle, fontSize: 14, margin: '8px 0 0 0', lineHeight: 1.5 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Alternating Vertical Timeline */}
        <div className="lg:hidden relative py-4 w-full flex flex-col items-center overflow-visible">
          {/* Center Line — animated running dashes */}
          <div
            className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 z-0"
            style={{
              width: 2,
              background: 'repeating-linear-gradient(180deg, rgba(1,74,172,0.3) 0, rgba(1,74,172,0.3) 6px, transparent 6px, transparent 12px)',
              animation: 'dashRunVertical 1s linear infinite',
            }}
          />

          {steps.map((s, i) => {
            const isLeft = i % 2 === 0;
            const brandColor = s.tone === 'yellow' ? '#FFD21F' : '#014AAC';
            const iconColor = s.tone === 'yellow' ? '#014AAC' : '#ffffff';

            return (
              <div key={i} className={`relative z-10 flex w-full justify-center items-center mb-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>

                {/* Card (Left or Right) */}
                <div className={`flex flex-1 ${isLeft ? 'justify-end pr-[22px]' : 'justify-start pl-[22px]'}`}>
                  <div className={`flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} rounded-xl overflow-hidden shadow-sm border border-[rgba(1,74,172,0.08)]`} style={{ background: '#ffffff', minWidth: 150, maxWidth: 180, minHeight: 70 }}>
                    {/* Text Half */}
                    <div className="px-3 py-2 flex flex-col justify-center text-center flex-1" style={{ background: '#f8fafc' }}>
                      <h3 className="font-bold text-[13px] leading-[1.2] text-[#014AAC]">{s.title}</h3>
                      <p className="text-[11px] leading-[1.3] text-[#014AAC] opacity-80 mt-1">{s.body}</p>
                    </div>
                    {/* Icon Half */}
                    <div className="w-[48px] flex-shrink-0 flex items-center justify-center" style={{ background: brandColor, color: iconColor }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill={s.glyph.props?.stroke ? 'none' : 'currentColor'} stroke={s.glyph.props?.stroke || 'none'} strokeWidth={s.glyph.props?.strokeWidth || 0} strokeLinecap={s.glyph.props?.strokeLinecap} strokeLinejoin={s.glyph.props?.strokeLinejoin}>
                        {s.glyph}
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Center Node */}
                <div className="w-8 flex-shrink-0 flex justify-center relative">
                  {/* Connection line to card — animated dashes */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 w-[22px] ${isLeft ? 'right-full' : 'left-full'}`}
                    style={{
                      height: 2,
                      background: 'repeating-linear-gradient(90deg, rgba(1,74,172,0.3) 0, rgba(1,74,172,0.3) 4px, transparent 4px, transparent 8px)',
                      animation: 'dashRun 0.8s linear infinite',
                    }}
                  />
                  {/* Node */}
                  <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] z-10" style={{ background: brandColor, color: iconColor, border: '2px solid #ffffff', boxShadow: '0 0 0 1.5px rgba(1,74,172,0.35)' }}>
                    {s.n}
                  </div>
                </div>

                {/* Empty Spacer for the other side */}
                <div className="flex-1" />
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// Shared text styles (on white)
const h2Style: CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: 40,
  fontWeight: 600,
  lineHeight: 1.15,
  color: '#014AAC',
  letterSpacing: '-0.01em',
  margin: '0 0 20px 0',
  textWrap: 'pretty',
};
const h3Style: CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: 22,
  fontWeight: 500,
  lineHeight: 1.3,
  color: '#014AAC',
  margin: 0,
};
const bodyLargeStyle: CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: 18,
  lineHeight: 1.55,
  color: '#014AAC',
  opacity: 0.82,
  margin: 0,
  fontWeight: 400,
};
const bodyStyle: CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: 16,
  lineHeight: 1.6,
  color: '#014AAC',
  opacity: 0.78,
  fontWeight: 400,
};

// ===== components/NewSections.jsx =====
// Curriculum Credibility (between Programme and HowItWorks)
// Teacher & School Support (between HowItWorks and Gurus)

function CurriculumCredibilitySection() {
  const points = [
    {
      glyph: GlyphCheckCircle,
      title: 'NEP 2020 aligned',
      body: 'Financial literacy is a stated outcome under NEP\u2019s life-skills framework. We map to it session by session.',
    },
    {
      glyph: GlyphClipboard,
      title: 'NSFE 2020–25 mapped',
      body: 'The National Strategy for Financial Education sets the curriculum priorities. We cover all of them.',
    },
    {
      glyph: GlyphShield,
      title: 'RBI School Financial Literacy Framework',
      body: 'Grade 6–8 content matches the RBI\u2019s recommended scope for middle school.',
    },
    {
      glyph: GlyphBadge,
      title: 'NCF-SE 2023 compatible',
      body: 'Fits inside the new National Curriculum Framework — any board: CBSE, ICSE, SSC, IB, State.',
    },
  ];
  return (
    <Section id="credibility" label="04b Curriculum Credibility">
      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '40fr 60fr', gap: 80, alignItems: 'center' }}>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: 380 }}>
          <div aria-hidden="true" style={{
            position: 'absolute', left: '8%', right: '8%', bottom: 14, height: 16,
            background: 'radial-gradient(ellipse at center, rgba(1,74,172,0.16) 0%, rgba(1,74,172,0) 70%)',
            filter: 'blur(3px)',
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute', left: '-4%', right: '-4%', top: '2%', bottom: '18%',
            background: 'radial-gradient(ellipse at 50% 45%, rgba(255,210,31,0.18) 0%, rgba(255,210,31,0.06) 40%, rgba(255,210,31,0) 70%)',
            pointerEvents: 'none',
            filter: 'blur(4px)',
          }} />
          <Character name="mrs_confident" height={300} style={{ position: 'relative' }} />
        </div>
        <div>
          <SectionLabel>Curriculum Credibility</SectionLabel>
          <h2 style={h2Style}>Built to meet every framework that matters.</h2>
          <p style={{ ...bodyLargeStyle, marginBottom: 44, maxWidth: 580 }}>
            The curriculum is mapped session-by-session to India's national education
            and financial literacy frameworks.
          </p>
          <div className="cred-points-list" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {points.map((p, i) => (
              <div key={i} className="cred-point" style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 18, alignItems: 'flex-start' }}>
                <IconCircle glyph={p.glyph} size={44} variant="blueOnWhite" />
                <div>
                  <div style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 17,
                    fontWeight: 600,
                    color: '#014AAC',
                    lineHeight: 1.35,
                    marginBottom: 4,
                  }}>{p.title}</div>
                  <div style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: '#014AAC',
                    opacity: 0.78,
                  }}>{p.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function TeacherSupportSection() {
  const cards = [
    {
      glyph: GlyphCap,
      title: 'Teacher training included',
      body: 'A 2-hour onboarding plus session playbooks for every lesson. No prior finance background required.',
    },
    {
      glyph: GlyphBook,
      title: 'Full teacher manual',
      body: 'Scripted lessons, activity sheets, assessment rubrics. Everything printable and ready to use.',
    },
    {
      glyph: GlyphBell,
      title: 'Ongoing support',
      body: 'WhatsApp helpline for teachers, monthly content refreshes, a student-progress dashboard.',
    },
  ];
  return (
    <Section id="teacher-support" label="05b Teacher & School Support">
      <div className="responsive-grid" style={{ maxWidth: 820, marginBottom: 40 }}>
        <SectionLabel>Teacher & School Support</SectionLabel>
        <h2 style={h2Style}>Your teachers aren't alone in this.</h2>
        <p style={{ ...bodyLargeStyle, maxWidth: 680 }}>
          We hand schools everything needed to run the programme with confidence — from day one.
        </p>
      </div>
      {/* Character duo — visual bridge between headline and cards */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 0,
        marginBottom: 48,
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute',
          left: '50%', transform: 'translateX(-50%)',
          bottom: 6,
          width: 320, height: 18,
          background: 'radial-gradient(ellipse at center, rgba(1,74,172,0.14) 0%, rgba(1,74,172,0) 70%)',
          filter: 'blur(3px)',
          zIndex: 0,
        }} />
        <Character name="mr_neutral" height={140} style={{ position: 'relative', zIndex: 1, marginRight: -14 }} />
        <Character name="mrs_confident" height={130} style={{ position: 'relative', zIndex: 2 }} />
      </div>
      <div className="mobile-square-carousel" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {cards.map((c, i) => (
          <div key={i} style={{
            background: '#ffffff',
            borderRadius: 20,
            padding: 32,
            border: '1px solid rgba(1,74,172,0.08)',
            boxShadow: '0 14px 32px -20px rgba(1,74,172,0.14), 0 2px 6px rgba(1,74,172,0.03)',
            display: 'flex', flexDirection: 'column', gap: 18,
          }}>
            <IconCircle glyph={c.glyph} size={56} variant="blueOnWhite" />
            <div style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 20,
              fontWeight: 600,
              color: '#014AAC',
              lineHeight: 1.3,
            }}>{c.title}</div>
            <div style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 15.5,
              lineHeight: 1.6,
              color: '#014AAC',
              opacity: 0.78,
            }}>{c.body}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ===== components/LateSections.jsx =====
// Gurus (blue) + Proof + CTA (yellow) + Footer (blue)

function GurusSection() {
  const gurus = [
    { name: 'Kuber Chacha', title: 'Keeper of prosperity', variant: 'yellow', imgSrc: '/character/kuber_chacha.png' },
    { name: 'Lakshmi Didi', title: 'Guide to wealth', variant: 'whiteOnBlue', imgSrc: '/character/laxmi_didi.png' },
    { name: 'Ganesh Guru', title: 'Remover of obstacles', variant: 'yellow', imgSrc: '/character/ganesh_guru.png' },
    { name: 'Saraswati Tai', title: 'Voice of wisdom', variant: 'whiteOnBlue', imgSrc: '/character/saraswati_tai.png' },
  ];
  const [activeGuru, setActiveGuru] = React.useState(0);
  const [isTextExpanded, setIsTextExpanded] = React.useState(false);
  const guru = gurus[activeGuru];

  return (
    <section
      data-screen-label="06 Mythology Gurus"
      id="gurus"
      style={{
        position: 'relative',
        width: '100%',
        background: 'linear-gradient(180deg, #014AAC 0%, #013F96 100%)',
        padding: '120px 0',
        overflow: 'hidden',
      }}
    >
      {/* Soft entry fade from white */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 120,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)',
        pointerEvents: 'none',
      }} />
      {/* Soft exit fade into Proof section */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
        background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 100%)',
        pointerEvents: 'none',
      }} />
      {/* Ambient concentric-circle pattern */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        left: '-10%', top: '10%',
        width: 760, height: 760,
        background: 'radial-gradient(circle at center, transparent 0, transparent 120px, rgba(255,255,255,0.06) 121px, rgba(255,255,255,0.06) 122px, transparent 123px, transparent 220px, rgba(255,255,255,0.055) 221px, rgba(255,255,255,0.055) 222px, transparent 223px, transparent 320px, rgba(255,255,255,0.05) 321px, rgba(255,255,255,0.05) 322px, transparent 323px, transparent 420px, rgba(255,255,255,0.045) 421px, rgba(255,255,255,0.045) 422px, transparent 423px)',
        pointerEvents: 'none',
      }} />
      {/* Soft yellow organic glow behind guru placeholder */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        left: '8%', top: '18%',
        width: 520, height: 520, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,210,31,0.15) 0%, rgba(255,210,31,0.05) 45%, rgba(255,210,31,0) 70%)',
        filter: 'blur(4px)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 80px', zIndex: 1 }}>
        <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '40fr 60fr', gap: 80, alignItems: 'center' }}>
          {/* Left — guru image */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1.05' }}>
            {/* Outer soft circle */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px dashed rgba(255,255,255,0.35)',
            }} />
            {/* Inner frame */}
            <div style={{
              position: 'absolute', inset: '8%', borderRadius: '50%',
              background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0 8px, transparent 8px 16px)',
              border: '1.5px dashed rgba(255,255,255,0.5)',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <Image src={guru.imgSrc} alt={guru.name} width={400} height={400} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {/* Guru Name Badge overlapping */}
            <div style={{
              position: 'absolute', bottom: '6%', left: '50%', transform: 'translateX(-50%)',
              background: '#ffffff', padding: '10px 24px', borderRadius: 999,
              boxShadow: '0 10px 24px rgba(1,74,172,0.2)',
              textAlign: 'center', whiteSpace: 'nowrap',
            }}>
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 16,
                fontWeight: 600,
                color: '#014AAC',
                lineHeight: 1.2,
              }}>
                {guru.name}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, color: '#014AAC', fontWeight: 500, fontFamily: 'Poppins, sans-serif' }}>{guru.title}</div>
            </div>
            {/* Accent dot */}
            <div style={{
              position: 'absolute', top: '-4%', right: '-2%',
              width: 60, height: 60, borderRadius: 999,
              background: '#FFD21F',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" style={{ color: '#014AAC' }}>{GlyphBulb}</svg>
            </div>
          </div>

          {/* Right — copy */}
          <div>
            <div style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFD21F',
              marginBottom: 20,
            }}>
              Mythology Gurus
            </div>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 40, fontWeight: 600,
              lineHeight: 1.15, color: '#ffffff', letterSpacing: '-0.01em',
              margin: '0 0 24px 0', textWrap: 'pretty',
            }}>
              Mythology-inspired gurus.<br />Classroom-grade content.
            </h2>
            <p style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 18, lineHeight: 1.6,
              color: '#ffffff', opacity: 0.92, margin: '0 0 18px 0', maxWidth: 560,
            }}>
              Children already know Kuber, Lakshmi, and Ganesh. We borrow the stories they
              love to carry the ideas they need — compound interest as a seed that grows,
              saving as a granary that keeps a village fed.
            </p>
            {isTextExpanded && (
              <>
                <p style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 18, lineHeight: 1.6,
                  color: '#ffffff', opacity: 0.92, margin: '0 0 18px 0', maxWidth: 560,
                }}>
                  Every concept is vetted by teachers and aligned to the national framework.
                  The warmth is cultural; the rigour is institutional.
                </p>
                <p style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 18, lineHeight: 1.6,
                  color: '#ffffff', opacity: 0.92, margin: '0 0 18px 0', maxWidth: 560,
                }}>
                  Four gurus. One shared classroom. Four angles on the same question: what does
                  it mean to be smart with money in India today?
                </p>
              </>
            )}
            {!isTextExpanded && (
              <button
                className="read-more-btn"
                onClick={() => setIsTextExpanded(true)}
                style={{ color: '#FFD21F', marginBottom: 18 }}
              >
                Read more
              </button>
            )}
            <div className="mobile-pills-row" style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, margin: '0 -20px', paddingLeft: 20, paddingRight: 20 }}>
              {gurus.map((g, i) => (
                <div key={i} onClick={() => setActiveGuru(i)} style={{ cursor: 'pointer', opacity: activeGuru === i ? 1 : 0.5, transition: 'opacity 200ms ease', filter: activeGuru === i ? 'none' : 'grayscale(1)', flexShrink: 0 }}>
                  <Pill variant={g.variant as PillVariant}>{g.name}</Pill>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function CTABand({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section
      data-screen-label="08 CTA"
      style={{
        width: '100%',
        background: '#FFD21F', // flat — no gradient on yellow ever
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 1280, margin: '0 auto', padding: '0 80px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: '#014AAC',
          marginBottom: 20, opacity: 0.85,
        }}>
          Ready to begin
        </div>
        <h2 style={{
          fontFamily: 'Poppins, sans-serif', fontSize: 48, fontWeight: 600,
          lineHeight: 1.15, color: '#014AAC', letterSpacing: '-0.01em',
          margin: '0 0 20px 0', maxWidth: 860, textWrap: 'pretty',
        }}>
          Bring <span style={{ color: '#014AAC' }}>Pocket</span><span style={{ WebkitTextStroke: '1.5px #014AAC', color: 'transparent' }}>Ed</span> to your school.
        </h2>
        <p style={{
          fontFamily: 'Poppins, sans-serif', fontSize: 18, lineHeight: 1.55,
          color: '#014AAC', opacity: 0.85, margin: '0 0 40px 0', maxWidth: 620,
        }}>
          A 30-minute walkthrough with your academic committee. No commitment — just
          the full programme, one teacher's manual, and three sample lessons to try.
        </p>
        <Button
          variant="primary"
          icon={<svg width="16" height="16" viewBox="0 0 24 24">{GlyphArrow}</svg>}
          style={{ fontSize: 17, padding: '18px 32px' }}
          onClick={onContactClick}
        >
          Book a 30-minute walkthrough
        </Button>
        <div style={{
          marginTop: 20,
          fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#014AAC', opacity: 0.78,
        }}>
          Or email <strong style={{ fontWeight: 600 }}>Siddharthgadhia@pocketed.in</strong>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const columns = [
    {
      title: 'Programme',
      links: [
        { label: 'Grade 6 · Money Smarties', href: '/courses' },
        { label: 'Grade 7 · Finance Explorers', href: '/courses' },
        { label: 'Grade 8 · Rupee Rockstars', href: '/courses' },
        { label: 'Session structure', href: '#how-it-works' },
        { label: 'Mythology gurus', href: '#gurus' },
      ],
    },
    {
      title: 'Explore',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Courses', href: '/courses' },
        { label: 'Blog', href: '/blog' },
        { label: 'Community', href: '/community' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Our story', href: '#' },
        { label: 'Team', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Sample lessons', href: '#' },
        { label: 'Parent guide', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
  ];
  return (
    <footer
      data-screen-label="09 Footer"
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, #014AAC 0%, #013788 100%)', // subtle same-hue wash
        color: '#ffffff',
        padding: '96px 0 40px 0',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 80px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: 56 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Image src="/icon-512.png" alt="PocketEd" width={40} height={40} />
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: 28,
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}>
                <span style={{ color: '#ffffff' }}>Pocket</span>
                <span style={{ color: '#FFD21F' }}>Ed</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#ffffff', marginLeft: 4, verticalAlign: 'top', position: 'relative', top: -4 }}>TM</span>
              </div>
            </div>
            <p style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 16, lineHeight: 1.6,
              color: '#ffffff', opacity: 0.88, margin: '28px 0 0 0', maxWidth: 320,
            }}>
              Financial literacy made simple, playful, and practical.
            </p>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <FooterMeta glyph={LinePin}>
                Mumbai, Maharashtra
              </FooterMeta>
              <FooterMeta glyph={LineMail}>Siddharthgadhia@pocketed.in</FooterMeta>
            </div>
          </div>
          {columns.map((col, i) => (
            <div key={i}>
              <div style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFD21F',
                marginBottom: 20,
              }}>
                {col.title}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map((l, j) => (
                  <li key={j}>
                    <Link href={l.href} style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#ffffff',
                      textDecoration: 'none', opacity: 0.85,
                    }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 80,
          paddingTop: 28,
          borderTop: '1px solid rgba(255,255,255,0.18)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#ffffff', opacity: 0.7,
          }}>
            MCA incorporated · DPIIT recognised · © 2026 PocketEd Education Pvt. Ltd.
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <a href="#" style={footerLinkMini}>Privacy</a>
            <a href="#" style={footerLinkMini}>Terms</a>
            <a href="#" style={footerLinkMini}>Data Policy</a>
            <a href="#" aria-label="LinkedIn" style={{
              width: 34, height: 34, borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.3)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginLeft: 8,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ color: '#ffffff' }}>{LineLinkedin}</svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterMeta({ glyph, children }: { glyph: ReactNode; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" style={{ color: '#FFD21F', flexShrink: 0, marginTop: 2 }}>{glyph}</svg>
      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#ffffff', opacity: 0.88, lineHeight: 1.5 }}>
        {children}
      </span>
    </div>
  );
}

const footerLinkMini: CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: 13,
  color: '#ffffff',
  opacity: 0.75,
  textDecoration: 'none',
};


export default function PocketEdHomepage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="responsive-landing" style={{ background: '#ffffff', overflow: 'hidden' }}>
      <Navbar />
      <Hero onContactClick={() => setIsContactModalOpen(true)} />
      <CredentialsStrip />
      <ProblemSection />
      <ProgrammeSection />
      <CurriculumCredibilitySection />
      <HowItWorksSection />
      <TeacherSupportSection />
      <GurusSection />

      <CTABand onContactClick={() => setIsContactModalOpen(true)} />
      <Footer />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
