"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const SVG_WIDTH = 1200;
const SVG_HEIGHT = 320;
const WAVE_AMPLITUDE = 14;
const EDGE_OVERDRAW = 80;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function createWavePath(fillTop: number, phase: number) {
  const step = 14;
  const startX = -EDGE_OVERDRAW;
  const endX = SVG_WIDTH + EDGE_OVERDRAW;
  let path = `M ${startX} ${SVG_HEIGHT} L ${startX} ${fillTop}`;

  for (let x = startX; x <= endX; x += step) {
    const normalizedX = x / SVG_WIDTH;
    const primary = Math.sin(normalizedX * Math.PI * 6 + phase) * WAVE_AMPLITUDE;
    const secondary = Math.sin(normalizedX * Math.PI * 13 - phase * 1.35) * (WAVE_AMPLITUDE * 0.42);
    const tertiary = Math.sin(normalizedX * Math.PI * 22 + phase * 0.7) * (WAVE_AMPLITUDE * 0.18);
    const y = fillTop + primary + secondary + tertiary;
    path += ` L ${x} ${y.toFixed(2)}`;
  }

  path += ` L ${endX} ${SVG_HEIGHT} Z`;
  return path;
}

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const durationMs = 6000;
    const holdAtFullMs = 320;
    const zoomOutMs = 2800;
    const startedAt = performance.now();
    let completeTimeoutId: number | undefined;
    let hideTimeoutId: number | undefined;
    let rafId = 0;

    const animate = (time: number) => {
      const rawProgress = Math.min((time - startedAt) / durationMs, 1);
      const easedProgress = easeInOutCubic(rawProgress);
      setProgress(Math.round(easedProgress * 100));
      setPhase(rawProgress * Math.PI * 8);

      if (rawProgress < 1) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      setIsComplete(true);
      completeTimeoutId = window.setTimeout(() => {
        setIsZooming(true);
      }, holdAtFullMs);

      hideTimeoutId = window.setTimeout(() => {
        setShowLoader(false);
      }, holdAtFullMs + zoomOutMs);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      if (completeTimeoutId) {
        window.clearTimeout(completeTimeoutId);
      }
      if (hideTimeoutId) {
        window.clearTimeout(hideTimeoutId);
      }
    };
  }, []);

  const fillTop = SVG_HEIGHT - (progress / 100) * SVG_HEIGHT;
  const wavePath = useMemo(() => createWavePath(fillTop, phase), [fillTop, phase]);

  return (
    <div className="site-shell">
      <main className="main-content" aria-hidden={showLoader}>
        <header className="top-nav">
          <div className="nav-shell">
            <a className="nav-brand" href="#" aria-label="PocketEd home">
              <Image src="/nav-logo.png" alt="PocketEd logo" width={86} height={18} priority />
            </a>
            <nav className="nav-menu" aria-label="Main navigation">
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Courses</a>
              <a href="#">Contact</a>
            </nav>
          </div>
        </header>

        <section className="hero-section">
          <div className="hero-copy">
            <h1>
              <span className="hero-primary">Learn Smarter.</span>
              <span className="hero-accent">Achieve More.</span>
            </h1>
            <p>
              All your classes, exams, and video courses in one powerful learning
              app designed for students.
            </p>
            <button type="button" className="hero-cta">
              start now
            </button>
          </div>

          <div className="hero-device" aria-hidden="true">
            <Image src="/mobile.png" alt="PocketEd mobile interface" width={330} height={551} priority />
          </div>
        </section>
      </main>

      {showLoader ? (
        <div
          className={`loader-overlay ${isComplete ? "is-complete" : ""} ${isZooming ? "is-zooming" : ""}`}
          role="progressbar"
          aria-label="Site loading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div className="loader-stage">
            <svg
              className="logo-svg"
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              aria-hidden="true"
            >
              <defs>
                <clipPath id="neoLeafTextClip">
                  <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle" className="logo-text">
                    PocketEd
                  </text>
                </clipPath>
              </defs>

              <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle" className="logo-text logo-base-svg">
                PocketEd
              </text>

              <g clipPath="url(#neoLeafTextClip)">
                <rect
                  x={-EDGE_OVERDRAW}
                  y={fillTop}
                  width={SVG_WIDTH + EDGE_OVERDRAW * 2}
                  height={SVG_HEIGHT - fillTop}
                  className="fill-body"
                />
                <path d={wavePath} className="fill-wave" />
              </g>
            </svg>

            <p className="loading-label">loading... {progress}%</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
