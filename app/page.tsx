"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import CircularGallery from './CircularGallery';
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

const ZOOM_SCROLL_DURATION = 5;
const VIDEO_SCROLL_DURATION = 20;

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

const GAMES = [
  {
    id: 1,
    title: "Interactive Section",
    image: "/pocketed-interactive-section.png",
    htmlSrc: "/games/pocketed-interactive-section-game1.html",
  },
  {
    id: 2,
    title: "Future Self Letter",
    image: "/pocketed-future-self-letter.png",
    htmlSrc: "/games/pocketed-future-self-letter-game2.html",
  },
  {
    id: 3,
    title: "Money Race",
    image: "/pocketed-money-race.png",
    htmlSrc: "/games/pocketed-money-race-game3.html",
  },
  {
    id: 4,
    title: "Money Moves",
    image: "/money_move.png",
    htmlSrc: "/games/money-moves-game-4.html",
  },
  {
    id: 5,
    title: "Jeopardy",
    image: "/pocketed-jeopardy.png",
    htmlSrc: "/games/pocketed-jeopardy-game5.html",
  },
];

const INFINITE_GAMES = Array.from({ length: 40 }).flatMap((_, i) => GAMES.map(g => ({...g, uniqueId: `${g.id}-${i}`})));

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const visionMissionOneRef = useRef<HTMLDivElement>(null);
  const visionMissionTwoRef = useRef<HTMLDivElement>(null);
  const gamesScrollRef = useRef<HTMLDivElement>(null);
  const gamesSectionRef = useRef<HTMLElement>(null);
  const gallerySectionRef = useRef<HTMLElement>(null);
  const endingSectionRef = useRef<HTMLElement>(null);
  const endingVideoRef = useRef<HTMLVideoElement>(null);

  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [playingGame, setPlayingGame] = useState<typeof GAMES[0] | null>(null);

  useEffect(() => {
    if (!showLoader && gamesScrollRef.current) {
      setTimeout(() => {
        if (gamesScrollRef.current) {
          gamesScrollRef.current.scrollLeft = (gamesScrollRef.current.scrollWidth - gamesScrollRef.current.clientWidth) / 2;
        }
      }, 50);
    }
  }, [showLoader]);

  const handleGamesScroll = () => {
    if (!gamesScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = gamesScrollRef.current;
    if (scrollLeft <= 50) {
      gamesScrollRef.current.scrollLeft = scrollWidth / 2;
    } else if (scrollLeft + clientWidth >= scrollWidth - 50) {
      gamesScrollRef.current.scrollLeft = (scrollWidth / 2) - clientWidth;
    }
  };

  const scrollGames = (direction: 'left' | 'right') => {
    if (gamesScrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 370;
      gamesScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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

          const tFeaturesEndDesktop = PHONE_SCROLL_END + TOTAL_FEATURE_SCROLL_DURATION;

          tl.to(
            phone,
            {
              scale: 140,
              transformOrigin: "24% 68%",
              ease: "power2.inOut",
              duration: ZOOM_SCROLL_DURATION,
            },
            tFeaturesEndDesktop
          );

          const tZoomEndDesktop = tFeaturesEndDesktop + ZOOM_SCROLL_DURATION;

          tl.to(
            videoRef.current,
            { autoAlpha: 1, ease: "power1.inOut", duration: ZOOM_SCROLL_DURATION * 0.6 },
            tFeaturesEndDesktop + ZOOM_SCROLL_DURATION * 0.4
          );

          const tMissionInDesk = tZoomEndDesktop + VIDEO_SCROLL_DURATION * 0.15;
          const tMissionOutDesk = tZoomEndDesktop + VIDEO_SCROLL_DURATION * 0.45;
          const tVisionInDesk = tZoomEndDesktop + VIDEO_SCROLL_DURATION * 0.55;

          tl.to(
            visionMissionOneRef.current,
            { autoAlpha: 1, ease: "power2.out", duration: 3 },
            tMissionInDesk
          );

          tl.to(
            visionMissionOneRef.current,
            { autoAlpha: 0, ease: "power2.in", duration: 2 },
            tMissionOutDesk
          );

          tl.to(
            visionMissionTwoRef.current,
            { autoAlpha: 1, ease: "power2.out", duration: 3 },
            tVisionInDesk
          );

          tl.to(
            {},
            {
              duration: VIDEO_SCROLL_DURATION,
              ease: "none",
              onUpdate: function () {
                const vid = videoRef.current;
                if (vid && vid.readyState >= 1) {
                  vid.currentTime = this.progress() * vid.duration;
                }
              },
            },
            tZoomEndDesktop
          );

          // Hold the "Our Vision" screen for a bit before unpinning to scroll the white section up
          tl.to({}, { duration: 1 });
        });

        mm.add("(max-width: 767px)", () => {
          const featuresToAnimate = [
            featureLeftOneRef.current,
            featureLeftTwoRef.current,
            featureLeftThreeRef.current,
            featureRightOneRef.current,
            featureRightTwoRef.current,
            featureRightThreeRef.current,
          ];

          featuresToAnimate.forEach((feature) => {
            if (feature) {
              gsap.set(feature, { x: -100, autoAlpha: 0 });
              ScrollTrigger.create({
                trigger: feature,
                start: "top 90%",
                end: "bottom 10%",
                onEnter: () => gsap.to(feature, { x: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", overwrite: "auto" }),
                onLeave: () => gsap.to(feature, { x: -100, autoAlpha: 0, duration: 1.0, ease: "power2.in", overwrite: "auto" }),
                onEnterBack: () => gsap.to(feature, { x: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", overwrite: "auto" }),
                onLeaveBack: () => gsap.to(feature, { x: -100, autoAlpha: 0, duration: 1.0, ease: "power2.in", overwrite: "auto" }),
              });
            }
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinInner,
              pin: pinInner,
              pinType: "fixed",
              start: "bottom bottom",
              end: "+=4000",
              scrub: 2,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to({}, { duration: ZOOM_SCROLL_DURATION });

          const tZoomEndMobile = ZOOM_SCROLL_DURATION;

          gsap.set(videoRef.current, { scale: 0.4, borderRadius: "50px" });

          tl.to(
            videoRef.current,
            { scale: 1, autoAlpha: 1, borderRadius: "0px", ease: "power2.inOut", duration: ZOOM_SCROLL_DURATION * 0.6 },
            tZoomEndMobile * 0.4
          );

          const tMissionInMob = tZoomEndMobile + VIDEO_SCROLL_DURATION * 0.15;
          const tMissionOutMob = tZoomEndMobile + VIDEO_SCROLL_DURATION * 0.45;
          const tVisionInMob = tZoomEndMobile + VIDEO_SCROLL_DURATION * 0.55;

          tl.to(
            visionMissionOneRef.current,
            { autoAlpha: 1, ease: "power2.out", duration: 3 },
            tMissionInMob
          );

          tl.to(
            visionMissionOneRef.current,
            { autoAlpha: 0, ease: "power2.in", duration: 2 },
            tMissionOutMob
          );

          tl.to(
            visionMissionTwoRef.current,
            { autoAlpha: 1, ease: "power2.out", duration: 3 },
            tVisionInMob
          );

          let isSeeking = false;
          tl.to(
            {},
            {
              duration: VIDEO_SCROLL_DURATION,
              ease: "none",
              onUpdate: function () {
                const vid = videoRef.current;
                if (vid && vid.readyState >= 1) {
                  if (!isSeeking) {
                    isSeeking = true;
                    vid.currentTime = this.progress() * vid.duration;
                    vid.addEventListener("seeked", function onSeeked() {
                      isSeeking = false;
                      vid.removeEventListener("seeked", onSeeked);
                    });
                  }
                }
              },
            },
            tZoomEndMobile
          );

          tl.to({}, { duration: 1 });
        });
        if (gamesSectionRef.current) {
          gsap.from(gamesSectionRef.current.children, {
            scrollTrigger: {
              trigger: gamesSectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            y: 50,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
          });
        }

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

        if (endingSectionRef.current && endingVideoRef.current) {
          const video = endingVideoRef.current;
          const videoContainer = endingSectionRef.current.querySelector('.ending-video-container');
          const contactPanel = endingSectionRef.current.querySelector('.ending-contact-panel');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: endingSectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
              onLeaveBack: () => {
                video.pause();
              }
            }
          });

          tl.from(videoContainer, {
            y: 250,
            autoAlpha: 0,
            duration: 1.5,
            ease: "power3.out",
            onComplete: () => {
              video.play().catch(() => {});
            }
          });

          if (contactPanel) {
            tl.from(contactPanel, {
              x: 100,
              autoAlpha: 0,
              duration: 1.2,
              ease: "power3.out"
            }, "+=0.5"); // Triggers roughly 2 seconds (1.5s + 0.5s) after scroll start
          }
        }
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
          className="relative h-[min(1400vh,10000px)] w-full max-md:h-auto"
        >
          <div
            ref={pinInnerRef}
            className="pin-scene relative z-0 flex flex-col bg-[var(--background)]"
          >
            <video
              ref={videoRef}
              src="/new_updated_explaination_video.mp4"
              className="pointer-events-none absolute inset-0 z-[100] h-full w-full object-cover opacity-0 max-md:top-auto max-md:bottom-0 max-md:h-[100vh]"
              playsInline
              muted
              loop
            />
            <div
              className="pointer-events-none absolute inset-0 z-[110] flex h-full w-full items-center justify-center sm:justify-end px-[5%] sm:pr-[8%] md:pr-[12%] max-md:top-auto max-md:bottom-0 max-md:h-[100vh]"
            >
              <div className="relative w-full max-w-[480px]">
                <div className="absolute left-0 bottom-[60%] w-full -translate-y-1/2 grid max-md:bottom-[50%]">
                  <div ref={visionMissionOneRef} className="col-start-1 row-start-1 w-full text-white opacity-0">
                    <h2 className="mb-3 text-[clamp(2rem,6vw,3.5rem)] font-bold tracking-tight">The Mission.</h2>
                    <p className="text-[clamp(0.95rem,1.8vw,1.15rem)] leading-relaxed text-[#f4f4f4]">
                      With only 27% of Indian adults being financially literate, a critical gap exists. Our mission is to empower the next generation with the knowledge and confidence to navigate the world of finance.
                    </p>
                  </div>
                  <div ref={visionMissionTwoRef} className="col-start-1 row-start-1 w-full text-white opacity-0">
                    <h2 className="mb-3 text-[clamp(2rem,6vw,3.5rem)] font-bold tracking-tight">Our Vision</h2>
                    <p className="text-[clamp(0.95rem,1.8vw,1.15rem)] leading-relaxed text-[#f4f4f4]">
                      To create a financially savvy generation that can build a secure future for themselves and contribute to India’s economic growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <header
              ref={navRef}
              className="top-nav max-md:!hidden relative z-10 shrink-0 px-[clamp(1rem,3.2vw,2.6rem)] pt-[clamp(0.35rem,1vw,0.65rem)] will-change-[opacity,transform]"
            >
              <div className="nav-shell">
                <a className="nav-brand !items-start" href="#" aria-label="PocketEd home">
                  <Image src="/nav-logo.png" alt="PocketEd logo" width={86} height={18} priority />
                  <span className="text-[9px] font-bold text-[var(--primary-blue)] ml-0.5 leading-none mt-[-1px]">TM</span>
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
                className="relative z-20 justify-self-center text-left max-md:flex max-md:flex-col max-md:items-center max-md:text-center will-change-[opacity,transform] md:justify-self-start md:pt-[clamp(0.75rem,2.5vw,2.5rem)]"
              >
                <div className="md:hidden mt-8 mb-6 flex justify-center w-full">
                  <Image src="/pocketed_complete_logo.png" alt="PocketEd complete logo" width={220} height={70} className="h-auto w-[clamp(160px,50vw,220px)] object-contain" priority />
                </div>
                <h1 className="m-0 flex flex-col max-md:items-center text-[clamp(2.2rem,10.8vw,5.45rem)] font-bold leading-[0.98] tracking-[-0.03em] md:text-[clamp(2.45rem,7.2vw,5.45rem)]">
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
                className="relative z-10 flex w-full max-md:max-w-[420px] items-center justify-center justify-self-center overflow-visible p-[clamp(0.75rem,2.5vw,2.5rem)] max-md:mx-auto max-md:flex max-md:justify-center md:w-auto md:justify-self-end"
                aria-hidden="true"
              >
                <div
                  ref={phoneMoveRef}
                  className="relative isolate inline-flex flex-col items-center will-change-transform max-md:w-full max-md:flex max-md:justify-center max-md:items-center max-md:mx-auto md:flex-row md:items-start md:gap-[clamp(0.6rem,1.6vw,1.15rem)]"
                >
                  <div className="flex flex-col max-md:mt-8 max-md:gap-6 max-md:w-full max-md:max-w-full max-md:px-4 max-md:order-2 md:absolute md:right-full md:mr-[clamp(0.6rem,1.6vw,1.15rem)] md:top-0 md:gap-[4.5rem] md:w-[22rem] md:items-end">
                    <div
                      ref={featureLeftOneRef}
                      className="feature-left-one-panel pointer-events-none relative z-0 flex max-md:flex-row max-md:items-center max-md:text-left max-md:gap-4 max-w-[20rem] w-auto shrink-0 md:pointer-events-auto md:flex-row md:items-center md:gap-3 md:text-right"
                    >
                      <div className="flex min-w-0 flex-col gap-1 md:order-1 max-md:order-2">
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
                      className="feature-left-two-panel pointer-events-none relative z-0 max-md:mr-0 mr-[25px] flex max-md:flex-row max-md:items-center max-md:text-left max-md:gap-4 max-w-[20rem] w-auto shrink-0 md:pointer-events-auto md:flex-row md:items-center md:gap-3 md:text-right"
                    >
                      <div className="flex min-w-0 flex-col gap-1 md:order-1 max-md:order-2">
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
                      className="feature-left-three-panel pointer-events-none relative z-0 flex max-md:flex-row max-md:items-center max-md:text-left max-md:gap-4 max-w-[20rem] w-auto shrink-0 md:pointer-events-auto md:flex-row md:items-center md:gap-3 md:text-right"
                    >
                      <div className="flex min-w-0 flex-col gap-1 md:order-1 max-md:order-2">
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

                  <div ref={phoneMockRef} className="phone-mock relative z-20 shrink-0 max-md:mx-auto max-md:flex max-md:justify-center max-md:w-full max-md:order-1 max-md:mb-6">
                    <Image
                      src="/mobile.png"
                      alt="PocketEd mobile interface"
                      width={1000}
                      height={1035}
                      className="h-auto w-[clamp(200px,46vw,222px)] max-w-none md:w-[clamp(214px,22vw,236px)] max-md:w-[85%] max-md:max-w-[280px] max-md:mx-auto object-contain"
                      priority
                    />
                  </div>

                  <div className="flex flex-col max-md:mt-0 max-md:gap-6 max-md:w-full max-md:max-w-full max-md:px-4 max-md:order-3 md:gap-[6rem] md:absolute md:left-full md:ml-[clamp(0.6rem,1.6vw,1.15rem)] md:top-0 md:pt-[clamp(1rem,3vh,2rem)] md:w-[22rem] md:items-start">
                    <div
                      ref={featureRightOneRef}
                      className="feature-right-one-panel pointer-events-none relative z-0 flex max-md:flex-row max-md:items-center max-md:gap-4 max-w-[20rem] w-auto shrink-0 text-left md:pointer-events-auto md:flex-row md:items-center md:gap-3"
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
                      className="feature-right-two-panel pointer-events-none max-md:ml-0 ml-[25px] relative z-0 flex max-md:flex-row max-md:items-center max-md:gap-4 max-w-[20rem] w-auto shrink-0 text-left md:pointer-events-auto md:flex-row md:items-center md:gap-3"
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
                      className="feature-right-three-panel pointer-events-none relative z-0 flex max-md:flex-row max-md:items-center max-md:gap-4 max-w-[20rem] w-auto shrink-0 text-left md:pointer-events-auto md:flex-row md:items-center md:gap-3"
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
        
        {/* Complete White Screen Section below the pinned video */}
        <section ref={gamesSectionRef} className="w-full bg-[#f9fafb] relative z-20 flex flex-col items-center pt-[15vh] pb-32 px-6 text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-black mb-4">
            Play. Compete. Master Money. 🎮
          </h2>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-[#5a5a5a] max-w-[600px] mb-12">
            Turn financial concepts into interactive challenges and learn by playing, not just reading.
          </p>

          {/* Games Carousel */}
          <div className="w-full max-w-6xl relative flex items-center justify-center">
            <button 
              onClick={() => scrollGames('left')}
              className="hidden md:flex absolute -left-12 z-10 p-3 bg-white hover:bg-gray-50 rounded-full shadow-md text-gray-700 transition-colors"
              aria-label="Previous games"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>

            <div 
              ref={gamesScrollRef}
              onScroll={handleGamesScroll}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-4 w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {INFINITE_GAMES.map((game) => (
                <div 
                  key={game.uniqueId} 
                  className="flex-none w-[280px] md:w-[320px] lg:w-[340px] snap-center bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-48 w-full">
                    <Image src={game.image} alt={game.title} fill className="object-cover" />
                  </div>
                  <div className="flex items-center justify-between p-5 bg-white">
                    <h3 className="font-bold text-lg text-gray-900 tracking-tight">{game.title}</h3>
                    <button 
                      onClick={() => setPlayingGame(game)}
                      className="px-5 py-2 bg-[#e5faed] text-[#1aa053] font-bold rounded-full hover:bg-[#d1f5df] transition-colors text-sm tracking-wide"
                    >
                      PLAY
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => scrollGames('right')}
              className="hidden md:flex absolute -right-12 z-10 p-3 bg-white hover:bg-gray-50 rounded-full shadow-md text-gray-700 transition-colors"
              aria-label="Next games"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </section>
        
        <section ref={gallerySectionRef} className="pt-32 pb-20 w-full max-w-full flex flex-col items-center bg-white relative z-20">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-black mb-4 text-center">
            How We Teach Financial Literacy
          </h2>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-[#5a5a5a] max-w-[600px] mb-12 px-6 text-center">
            Interactive lessons, real-world examples, and engaging activities that make money skills simple and practical.
          </p>
          <div style={{ height: '600px', position: 'relative', width: '100%' }}>
            <CircularGallery bend={1} textColor="#ffffff" borderRadius={0.05} scrollEase={0.05} scrollSpeed={2} />
          </div>
        </section>

        <section ref={endingSectionRef} className="w-full py-24 relative z-20 bg-white overflow-hidden">
          <div className="w-full flex flex-col xl:flex-row items-center justify-start px-6 gap-8">
            {/* Left side: Animation Video */}
            <div className="ending-video-container w-full md:w-auto flex-shrink-0 flex justify-center md:justify-start overflow-hidden">
              <video 
                ref={endingVideoRef}
                src="/ending_animation.mp4" 
                loop 
                muted 
                playsInline 
                className="w-[850px] max-w-full mix-blend-multiply [clip-path:inset(2px)] border-none outline-none"
              />
            </div>

            {/* Right side: Contact & Download */}
            <div className="ending-contact-panel flex-1 flex flex-col items-center text-center px-4 xl:pl-8 py-8 md:py-12">
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8 w-full">
                <Image src="/pocketed_icon.png" alt="PocketEd" width={60} height={60} className="w-10 h-10 md:w-[60px] md:h-[60px] object-contain" />
                <span className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--primary-blue)]">
                  Pocket<span className="text-[var(--primary-yellow)]">Ed</span>
                </span>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-6 md:mb-8">
                Contact Us Now
              </h2>
              
              <div className="relative mb-8 md:mb-14">
                <div className="bg-[#b2c8fb] text-black font-semibold rounded-full px-6 py-3 md:px-10 md:py-5 text-base md:text-xl shadow-sm whitespace-nowrap z-10 relative">
                  pocketed@gmail.com
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-5 items-center justify-center w-full">
                <button className="flex items-center gap-3 md:gap-4 bg-white border border-gray-200 rounded-2xl px-5 py-2.5 md:px-6 md:py-3 hover:bg-gray-50 transition-colors shadow-sm min-w-[200px] md:min-w-[220px]">
                  <Image src="/google-icon.png" alt="Google Play" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 object-contain" />
                  <div className="flex flex-col items-start px-1">
                    <span className="text-[9px] md:text-[11px] text-gray-500 font-medium leading-[1] mb-1">GET IT ON</span>
                    <span className="text-[14px] md:text-[17px] font-extrabold text-black leading-[1]">Google Play</span>
                  </div>
                </button>
                <button className="flex items-center gap-3 md:gap-4 bg-white border border-gray-200 rounded-2xl px-5 py-2.5 md:px-6 md:py-3 hover:bg-gray-50 transition-colors shadow-sm min-w-[200px] md:min-w-[220px]">
                  <Image src="/apple-icon.png" alt="App Store" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 object-contain" />
                  <div className="flex flex-col items-start px-1">
                    <span className="text-[9px] md:text-[11px] text-gray-500 font-medium leading-[1] mb-1">Download on the</span>
                    <span className="text-[14px] md:text-[17px] font-extrabold text-black leading-[1]">App Store</span>
                  </div>
                </button>
              </div>
            </div>
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
                <clipPath id="waveClip">
                  <rect
                    x={-EDGE_OVERDRAW}
                    y={fillTop}
                    width={SVG_WIDTH + EDGE_OVERDRAW * 2}
                    height={SVG_HEIGHT - fillTop}
                  />
                  <path d={wavePath} />
                </clipPath>
              </defs>

              <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle" className="logo-text logo-base-svg">
                PocketEd
              </text>

              <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle" className="logo-text" clipPath="url(#waveClip)">
                <tspan fill="#014aac">Pocket</tspan>
                <tspan fill="#ffd21f">Ed</tspan>
              </text>
            </svg>

            {/* <p className="loading-label">loading... {progress}%</p> */}
          </div>
        </div>
      ) : null}
      
      {/* Game Player Modal */}
      {playingGame && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8">
          <div className="bg-white w-full h-full max-w-7xl max-h-[95vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-xl font-bold flex items-center gap-2 text-black">
                <span className="text-purple-600">🎮</span> Now Playing
              </h2>
              <button 
                onClick={() => setPlayingGame(null)} 
                className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close game"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 w-full relative bg-gray-50">
              <iframe 
                src={playingGame.htmlSrc} 
                className="absolute inset-0 w-full h-full border-0"
                allow="autoplay; fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
