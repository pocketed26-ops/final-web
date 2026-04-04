"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const PHONE_SCROLL_START = 1;
const PHONE_SCROLL_DURATION = 6;
const PHONE_SCROLL_END = PHONE_SCROLL_START + PHONE_SCROLL_DURATION;
// These durations are tied to scroll progress (`scrub: 0.75`), so increasing them makes
// feature animations take longer along the scroll-linked timeline.
// Six segments: three right (slide out right), then three left (slide out left).
const FEATURE_SCROLL_SEGMENT = 6;
/** Right column (numerical → CTA → mindset), then left column (mirrored), same duration each. */
const FEATURE_RIGHT_ONE_SCROLL_DURATION = FEATURE_SCROLL_SEGMENT;
const FEATURE_RIGHT_TWO_SCROLL_DURATION = FEATURE_SCROLL_SEGMENT;
const FEATURE_RIGHT_THREE_SCROLL_DURATION = FEATURE_SCROLL_SEGMENT;
const FEATURE_LEFT_ONE_SCROLL_DURATION = FEATURE_SCROLL_SEGMENT;
const FEATURE_LEFT_TWO_SCROLL_DURATION = FEATURE_SCROLL_SEGMENT;
const FEATURE_LEFT_THREE_SCROLL_DURATION = FEATURE_SCROLL_SEGMENT;

const TOTAL_FEATURE_SCROLL_DURATION =
  FEATURE_RIGHT_ONE_SCROLL_DURATION +
  FEATURE_RIGHT_TWO_SCROLL_DURATION +
  FEATURE_RIGHT_THREE_SCROLL_DURATION +
  FEATURE_LEFT_ONE_SCROLL_DURATION +
  FEATURE_LEFT_TWO_SCROLL_DURATION +
  FEATURE_LEFT_THREE_SCROLL_DURATION;

/** Extra timeline after phone + feature settle so scroll progress doesn’t end abruptly. */
const SCROLL_PAD_AFTER_PHONE = () => Math.max(0, 2 - TOTAL_FEATURE_SCROLL_DURATION);

/** Align transform-group x so the *phone mock* (not the whole group bbox) lands in viewport center. */
function offsetXToViewportCenterPhoneScreen(group: HTMLElement, phoneMock: HTMLElement): number {
  gsap.set(group, { x: 0, scale: 1 });
  const rect = phoneMock.getBoundingClientRect();
  const phoneCx = rect.left + rect.width / 2;
  return window.innerWidth / 2 - phoneCx;
}

/** Panels are wider than the phone (icon + copy); tuck by full panel width so no text peeks past the bezel. */
function featureExtraTuckBehindPhone(featureEl: HTMLElement | null | undefined, phoneMock: HTMLElement): number {
  if (!featureEl) {
    return 96;
  }
  const panelW = featureEl.offsetWidth;
  const phoneW = phoneMock.offsetWidth;
  const overlap = panelW - phoneW;
  return Math.max(0, overlap) + 16;
}

/** Right column: shift x negative so the block sits under the phone; slides out to the right. */
function offsetXFeatureBehindPhoneRight(
  phoneMock: HTMLElement,
  phoneMove: HTMLElement,
  featureEl: HTMLElement | null | undefined,
): number {
  const gapRaw = window.getComputedStyle(phoneMove).columnGap || window.getComputedStyle(phoneMove).gap;
  const gap = Number.parseFloat(gapRaw) || 12;
  return -(phoneMock.offsetWidth + gap + featureExtraTuckBehindPhone(featureEl, phoneMock));
}

/** Left column: shift x positive so the block sits under the phone; slides out to the left. */
function offsetXFeatureBehindPhoneLeft(
  phoneMock: HTMLElement,
  phoneMove: HTMLElement,
  featureEl: HTMLElement | null | undefined,
): number {
  const gapRaw = window.getComputedStyle(phoneMove).columnGap || window.getComputedStyle(phoneMove).gap;
  const gap = Number.parseFloat(gapRaw) || 12;
  return phoneMock.offsetWidth + gap + featureExtraTuckBehindPhone(featureEl, phoneMock);
}

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
  const scrollStageRef = useRef<HTMLElement>(null);
  const pinInnerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const phoneMoveRef = useRef<HTMLDivElement>(null);
  const phoneMockRef = useRef<HTMLDivElement>(null);
  const featureRightOneRef = useRef<HTMLDivElement>(null);
  const featureRightTwoRef = useRef<HTMLDivElement>(null);
  const featureRightThreeRef = useRef<HTMLDivElement>(null);
  const featureLeftOneRef = useRef<HTMLDivElement>(null);
  const featureLeftTwoRef = useRef<HTMLDivElement>(null);
  const featureLeftThreeRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const durationMs = 6000;
    const holdAtFullMs = 320;
    const zoomOutMs = 900;
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

  useLayoutEffect(() => {
    if (showLoader) {
      return;
    }

    let ctx: gsap.Context | undefined;
    let removeResize: (() => void) | undefined;
    let refreshRafId = 0;

    const setup = () => {
      const stage = scrollStageRef.current;
      const pinInner = pinInnerRef.current;
      const nav = navRef.current;
      const heroCopy = heroCopyRef.current;
      const phone = phoneMoveRef.current;
      const phoneMock = phoneMockRef.current;
      const featureRightOne = featureRightOneRef.current;
      const featureRightTwo = featureRightTwoRef.current;
      const featureRightThree = featureRightThreeRef.current;
      const featureLeftOne = featureLeftOneRef.current;
      const featureLeftTwo = featureLeftTwoRef.current;
      const featureLeftThree = featureLeftThreeRef.current;
      if (!stage || !pinInner || !nav || !heroCopy || !phone || !phoneMock) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);

      gsap.set(phone, { x: 0, y: 0, scale: 1, transformOrigin: "50% 50%" });
      gsap.set(nav, { autoAlpha: 1, scale: 1 });
      gsap.set(heroCopy, { autoAlpha: 1, scale: 1 });
      ctx = gsap.context(() => {
        gsap.from(nav, { autoAlpha: 0, y: -20, duration: 1.2, ease: "power3.out" });
        gsap.from(heroCopy, { autoAlpha: 0, y: 30, duration: 1.4, ease: "power3.out", delay: 0.2 });
        gsap.from(phone, { autoAlpha: 0, y: 40, duration: 1.6, ease: "power3.out", delay: 0.4 });

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          if (featureRightOne) {
            gsap.set(featureRightOne, {
              x: () => {
                const mock = phoneMockRef.current;
                const move = phoneMoveRef.current;
                return mock && move ? offsetXFeatureBehindPhoneRight(mock, move, featureRightOne) : -280;
              },
              autoAlpha: 0,
              transformOrigin: "0% 50%",
            });
          }

          if (featureRightTwo) {
            gsap.set(featureRightTwo, {
              x: () => {
                const mock = phoneMockRef.current;
                const move = phoneMoveRef.current;
                return mock && move ? offsetXFeatureBehindPhoneRight(mock, move, featureRightTwo) : -280;
              },
              autoAlpha: 0,
              transformOrigin: "0% 50%",
            });
          }

          if (featureRightThree) {
            gsap.set(featureRightThree, {
              x: () => {
                const mock = phoneMockRef.current;
                const move = phoneMoveRef.current;
                return mock && move ? offsetXFeatureBehindPhoneRight(mock, move, featureRightThree) : -280;
              },
              autoAlpha: 0,
              transformOrigin: "0% 50%",
            });
          }

          if (featureLeftOne) {
            gsap.set(featureLeftOne, {
              x: () => {
                const mock = phoneMockRef.current;
                const move = phoneMoveRef.current;
                return mock && move ? offsetXFeatureBehindPhoneLeft(mock, move, featureLeftOne) : 280;
              },
              autoAlpha: 0,
              transformOrigin: "100% 50%",
            });
          }

          if (featureLeftTwo) {
            gsap.set(featureLeftTwo, {
              x: () => {
                const mock = phoneMockRef.current;
                const move = phoneMoveRef.current;
                return mock && move ? offsetXFeatureBehindPhoneLeft(mock, move, featureLeftTwo) : 280;
              },
              autoAlpha: 0,
              transformOrigin: "100% 50%",
            });
          }

          if (featureLeftThree) {
            gsap.set(featureLeftThree, {
              x: () => {
                const mock = phoneMockRef.current;
                const move = phoneMoveRef.current;
                return mock && move ? offsetXFeatureBehindPhoneLeft(mock, move, featureLeftThree) : 280;
              },
              autoAlpha: 0,
              transformOrigin: "100% 50%",
            });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              pin: pinInner,
              pinType: "fixed",
              start: "top top",
              end: "bottom bottom",
              scrub: 2,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate(self) {
                const done = self.progress >= 0.985;
                nav.toggleAttribute("inert", done);
                heroCopy.toggleAttribute("inert", done);
                if (done) {
                  nav.style.visibility = "hidden";
                  heroCopy.style.visibility = "hidden";
                } else {
                  nav.style.removeProperty("visibility");
                  heroCopy.style.removeProperty("visibility");
                }
              },
            },
          });

          tl.to(nav, { autoAlpha: 0, ease: "none", duration: PHONE_SCROLL_DURATION }, PHONE_SCROLL_START)
            .to(heroCopy, { autoAlpha: 0, ease: "none", duration: PHONE_SCROLL_DURATION }, PHONE_SCROLL_START)
            .fromTo(
              phone,
              { x: 0, scale: 1 },
              {
                x: () => {
                  const group = phoneMoveRef.current;
                  const mock = phoneMockRef.current;
                  return group && mock ? offsetXToViewportCenterPhoneScreen(group, mock) : 0;
                },
                scale: 1.26,
                transformOrigin: "50% 50%",
                ease: "none",
                duration: PHONE_SCROLL_DURATION,
              },
              PHONE_SCROLL_START,
            );

          const tRight1 = PHONE_SCROLL_END;
          const tRight2 = tRight1 + FEATURE_RIGHT_ONE_SCROLL_DURATION;
          const tRight3 = tRight2 + FEATURE_RIGHT_TWO_SCROLL_DURATION;
          const tLeft1 = tRight3 + FEATURE_RIGHT_THREE_SCROLL_DURATION;
          const tLeft2 = tLeft1 + FEATURE_LEFT_ONE_SCROLL_DURATION;
          const tLeft3 = tLeft2 + FEATURE_LEFT_TWO_SCROLL_DURATION;

          if (featureRightOne) {
            tl.fromTo(
              featureRightOne,
              {
                x: () => {
                  const mock = phoneMockRef.current;
                  const move = phoneMoveRef.current;
                  return mock && move ? offsetXFeatureBehindPhoneRight(mock, move, featureRightOne) : -280;
                },
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                ease: "none",
                duration: FEATURE_RIGHT_ONE_SCROLL_DURATION,
              },
              tRight1,
            );
          }

          if (featureRightTwo) {
            tl.fromTo(
              featureRightTwo,
              {
                x: () => {
                  const mock = phoneMockRef.current;
                  const move = phoneMoveRef.current;
                  return mock && move ? offsetXFeatureBehindPhoneRight(mock, move, featureRightTwo) : -280;
                },
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                ease: "none",
                duration: FEATURE_RIGHT_TWO_SCROLL_DURATION,
              },
              tRight2,
            );
          }

          if (featureRightThree) {
            tl.fromTo(
              featureRightThree,
              {
                x: () => {
                  const mock = phoneMockRef.current;
                  const move = phoneMoveRef.current;
                  return mock && move ? offsetXFeatureBehindPhoneRight(mock, move, featureRightThree) : -280;
                },
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                ease: "none",
                duration: FEATURE_RIGHT_THREE_SCROLL_DURATION,
              },
              tRight3,
            );
          }

          if (featureLeftOne) {
            tl.fromTo(
              featureLeftOne,
              {
                x: () => {
                  const mock = phoneMockRef.current;
                  const move = phoneMoveRef.current;
                  return mock && move ? offsetXFeatureBehindPhoneLeft(mock, move, featureLeftOne) : 280;
                },
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                ease: "none",
                duration: FEATURE_LEFT_ONE_SCROLL_DURATION,
              },
              tLeft1,
            );
          }

          if (featureLeftTwo) {
            tl.fromTo(
              featureLeftTwo,
              {
                x: () => {
                  const mock = phoneMockRef.current;
                  const move = phoneMoveRef.current;
                  return mock && move ? offsetXFeatureBehindPhoneLeft(mock, move, featureLeftTwo) : 280;
                },
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                ease: "none",
                duration: FEATURE_LEFT_TWO_SCROLL_DURATION,
              },
              tLeft2,
            );
          }

          if (featureLeftThree) {
            tl.fromTo(
              featureLeftThree,
              {
                x: () => {
                  const mock = phoneMockRef.current;
                  const move = phoneMoveRef.current;
                  return mock && move ? offsetXFeatureBehindPhoneLeft(mock, move, featureLeftThree) : 280;
                },
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                ease: "none",
                duration: FEATURE_LEFT_THREE_SCROLL_DURATION,
              },
              tLeft3,
            );
          }

          tl.to(
            {},
            { duration: SCROLL_PAD_AFTER_PHONE(), ease: "none" },
            PHONE_SCROLL_END + TOTAL_FEATURE_SCROLL_DURATION,
          );
        });

        mm.add("(max-width: 767px)", () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              pin: pinInner,
              pinType: "fixed",
              start: "top top",
              end: "bottom bottom",
              scrub: 2,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate(self) {
                const done = self.progress >= 0.985;
                nav.toggleAttribute("inert", done);
                heroCopy.toggleAttribute("inert", done);
                if (done) {
                  nav.style.visibility = "hidden";
                  heroCopy.style.visibility = "hidden";
                } else {
                  nav.style.removeProperty("visibility");
                  heroCopy.style.removeProperty("visibility");
                }
              },
            },
          });

          tl.to(nav, { autoAlpha: 0, ease: "none", duration: PHONE_SCROLL_DURATION }, PHONE_SCROLL_START)
            .to(heroCopy, { autoAlpha: 0, ease: "none", duration: PHONE_SCROLL_DURATION }, PHONE_SCROLL_START)
            .fromTo(
              phone,
              { scale: 1, y: 0 },
              {
                scale: 1.18,
                y: -4,
                transformOrigin: "50% 55%",
                ease: "none",
                duration: PHONE_SCROLL_DURATION,
              },
              PHONE_SCROLL_START,
            )
            .to({}, { duration: SCROLL_PAD_AFTER_PHONE(), ease: "none" }, PHONE_SCROLL_END);
        });
      }, stage);

      const onResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);
      removeResize = () => window.removeEventListener("resize", onResize);

      refreshRafId = requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
      });
    };

    setup();

    return () => {
      cancelAnimationFrame(refreshRafId);
      removeResize?.();
      ctx?.revert();
    };
  }, [showLoader]);

  const fillTop = SVG_HEIGHT - (progress / 100) * SVG_HEIGHT;
  const wavePath = useMemo(() => createWavePath(fillTop, phase), [fillTop, phase]);

  return (
    <div className="site-shell">
      <main className="main-content" aria-hidden={showLoader}>
        <section
          ref={scrollStageRef}
          className="relative h-[min(800vh,6000px)] w-full"
        >
          <div
            ref={pinInnerRef}
            className="pin-scene relative z-0 flex flex-col bg-[var(--background)]"
          >
            <header
              ref={navRef}
              className="top-nav relative z-10 shrink-0 px-[clamp(1rem,3.2vw,2.6rem)] pt-[clamp(0.35rem,1vw,0.65rem)] will-change-[opacity,transform]"
            >
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

            <section className="hero-section relative z-10 mx-auto grid min-h-0 w-full max-w-[1240px] grid-cols-1 place-content-start items-start justify-items-center gap-y-8 px-[clamp(1rem,3.2vw,2.6rem)] pt-0 pb-[clamp(3rem,10vh,6.5rem)] text-center md:grid-cols-[minmax(0,1fr)_minmax(0,560px)] md:items-start md:gap-x-[clamp(2rem,5vw,5.5rem)] md:gap-y-0 md:place-content-start md:text-left md:justify-items-stretch">
              <div
                ref={heroCopyRef}
                className="relative z-20 justify-self-center text-left will-change-[opacity,transform] md:justify-self-start md:pt-[clamp(0.75rem,2.5vw,2.5rem)]"
              >
                <h1 className="m-0 flex flex-col text-[clamp(2.2rem,10.8vw,5.45rem)] font-bold leading-[0.98] tracking-[-0.03em] md:text-[clamp(2.45rem,7.2vw,5.45rem)]">
                  <span className="text-[var(--primary-blue)]">Learn Smarter.</span>
                  <span className="mt-[0.2rem] text-[var(--primary-yellow)]">Achieve More.</span>
                </h1>
                <p className="mx-auto mt-[0.85rem] max-w-[35rem] text-[clamp(0.95rem,1.7vw,1.5rem)] leading-[1.34] text-[#242424] md:mx-0 max-[640px]:text-[0.98rem] max-[640px]:leading-[1.42]">
                  All your classes, exams, and video courses in one powerful learning
                  app designed for students.
                </p>
                <button
                  type="button"
                  className="mt-[1rem] inline-flex h-[48px] min-w-[220px] items-center justify-center rounded-[14px] border-[3px] border-[var(--primary-blue)] bg-white px-6 text-[1.65rem] font-semibold lowercase leading-none text-[var(--primary-blue)] shadow-[0_2px_8px_rgba(1,74,172,0.07)] max-[880px]:h-[44px] max-[880px]:min-w-[200px] max-[880px]:text-[1.45rem] max-[640px]:h-[42px] max-[640px]:min-w-[180px] max-[640px]:px-5 max-[640px]:text-[1.3rem]"
                >
                  start now
                </button>
              </div>

              <div
                className="relative z-10 flex w-full max-md:max-w-[420px] items-center justify-center justify-self-center overflow-visible p-[clamp(0.75rem,2.5vw,2.5rem)] md:w-auto md:justify-self-end"
                aria-hidden="true"
              >
                <div
                  ref={phoneMoveRef}
                  className="relative isolate inline-flex flex-col items-center will-change-transform md:flex-row md:items-start md:gap-[clamp(0.6rem,1.6vw,1.15rem)]"
                >
                  <div className="hidden flex-col gap-[4.5rem] md:absolute md:right-full md:mr-[clamp(0.6rem,1.6vw,1.15rem)] md:top-0 md:flex md:pt-[clamp(1rem,3vh,2rem)] md:w-[22rem] md:items-end">
                    <div
                      ref={featureLeftOneRef}
                      className="feature-left-one-panel pointer-events-none relative z-0 flex max-w-[20rem] w-auto shrink-0 md:pointer-events-auto md:flex-row md:items-center md:gap-3 md:text-right"
                    >
                      <div className="flex min-w-0 flex-col gap-1 md:order-1">
                        <h2 className="m-0 text-[11px] font-bold uppercase leading-tight tracking-[0.04em] text-[#141414]">
                          Smart habits
                        </h2>
                        <p className="m-0 text-[10px] leading-snug text-[#5a5a5a]">
                          Track spending and saving, set up financial routines, understand spending triggers.
                        </p>
                      </div>
                      <div className="shrink-0 md:order-2">
                        <Image
                          src="/feature4.png"
                          alt=""
                          width={80}
                          height={80}
                          className="h-24  w-24 object-contain"
                          aria-hidden
                        />
                      </div>
                    </div>

                    <div
                      ref={featureLeftTwoRef}
                      className="feature-left-two-panel pointer-events-none relative z-0 mr-[25px] flex max-w-[20rem] w-auto shrink-0 md:pointer-events-auto md:flex-row md:items-center md:gap-3 md:text-right"
                    >
                      <div className="flex min-w-0 flex-col gap-1 md:order-1">
                        <h2 className="m-0 text-[11px] font-bold uppercase leading-tight tracking-[0.04em] text-[#141414]">
                          Financial foundations
                        </h2>
                        <p className="m-0 text-[10px] leading-snug text-[#5a5a5a]">
                          Learn money management basics—savings, investments, credit—and build financial literacy.
                        </p>
                      </div>
                      <div className="shrink-0 md:order-2">
                        <Image
                          src="/feature5.png"
                          alt=""
                          width={80}
                          height={80}
                          className="h-24 w-24 object-contain"
                          aria-hidden
                        />
                      </div>
                    </div>

                    <div
                      ref={featureLeftThreeRef}
                      className="feature-left-three-panel pointer-events-none relative z-0 flex max-w-[20rem] w-auto shrink-0 md:pointer-events-auto md:flex-row md:items-center md:gap-3 md:text-right"
                    >
                      <div className="flex min-w-0 flex-col gap-1 md:order-1">
                        <h2 className="m-0 text-[11px] font-bold uppercase leading-tight tracking-[0.04em] text-[#141414]">
                          Critical thinking
                        </h2>
                        <p className="m-0 text-[10px] leading-snug text-[#5a5a5a]">
                          Compare financial products, avoid scams, evaluate needs vs. wants, and plan for goals.
                        </p>
                      </div>
                      <div className="shrink-0 md:order-2">
                        <Image
                          src="/feature6.png"
                          alt=""
                          width={80}
                          height={80}
                          className="h-26 w-26 object-contain"
                          aria-hidden
                        />
                      </div>
                    </div>
                  </div>

                  <div ref={phoneMockRef} className="phone-mock relative z-20 shrink-0">
                    <Image
                      src="/mobile.png"
                      alt="PocketEd mobile interface"
                      width={1000}
                      height={1035}
                      className="h-auto w-[clamp(200px,46vw,222px)] max-w-none md:w-[clamp(214px,22vw,236px)]"
                      priority
                    />
                  </div>

                  <div className="hidden flex-col gap-[6rem] md:absolute md:left-full md:ml-[clamp(0.6rem,1.6vw,1.15rem)] md:top-0 md:flex md:pt-[clamp(1rem,3vh,2rem)] md:w-[22rem] md:items-start">
                    <div
                      ref={featureRightOneRef}
                      className="feature-right-one-panel  pointer-events-none relative z-0 flex max-w-[20rem] w-auto shrink-0 text-left md:pointer-events-auto md:flex-row md:items-center md:gap-3"
                    >
                      <div className="shrink-0">
                        <Image
                          src="/feature1.png"
                          alt=""
                          width={80}
                          height={80}
                          className="h-20 w-20 object-contain"
                          aria-hidden
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="m-0 text-[11px] font-bold uppercase leading-tight tracking-[0.04em] text-[#141414]">
                          Numerical
                        </h2>
                        <p className="m-0 text-[10px] leading-snug text-[#5a5a5a]">
                          Understand interest rates and loans, budget using real numbers, plan expenses with
                          accuracy, and use ratios and percentages.
                        </p>
                      </div>
                    </div>

                    <div
                      ref={featureRightTwoRef}
                      className="feature-right-two-panel pointer-events-none ml-[25px] relative z-0 flex max-w-[20rem] w-auto shrink-0 text-left md:pointer-events-auto md:flex-row md:items-center md:gap-3"
                    >
                      <div className="shrink-0">
                        <Image
                          src="/feature2.png"
                          alt=""
                          width={80}
                          height={80}
                          className="h-20 w-20 object-contain"
                          aria-hidden
                        />
                      </div>
                      <div className="flex min-w-0 flex-col gap-1">
                        <h2 className="m-0 text-[11px] font-bold uppercase leading-tight tracking-[0.04em] text-[#141414]">
                          Clear CTA
                        </h2>
                        <p className="m-0 text-[10px] leading-snug text-[#5a5a5a]">
                          Get a clear next step with guided actions—start lessons, track progress, and keep
                          moving forward.
                        </p>
                      </div>
                    </div>

                    <div
                      ref={featureRightThreeRef}
                      className="feature-right-three-panel pointer-events-none relative z-0 flex max-w-[20rem] w-auto shrink-0 text-left md:pointer-events-auto md:flex-row md:items-center md:gap-3"
                    >
                      <div className="shrink-0">
                        <Image
                          src="/feature3.png"
                          alt=""
                          width={80}
                          height={80}
                          className="h-20 w-20 object-contain"
                          aria-hidden
                        />
                      </div>
                      <div className="flex min-w-0 flex-col gap-1">
                        <h2 className="m-0 text-[11px] font-bold uppercase leading-tight tracking-[0.04em] text-[#141414]">
                          Entrepreneurial mindset
                        </h2>
                        <p className="m-0 text-[10px] leading-snug text-[#5a5a5a]">
                          Spot business opportunities, understand risk vs. reward, innovate for income, and
                          manage side projects.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
