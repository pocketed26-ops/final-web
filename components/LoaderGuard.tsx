"use client";

import { useLayoutEffect } from "react";

/**
 * This component runs a single synchronous check on every client-side
 * navigation. It stamps `has-visited` on <html> BEFORE the browser paints,
 * which makes the CSS rule `html.has-visited .loader-overlay { display:none }`
 * kill the loader before it ever becomes visible.
 *
 * It renders nothing — it's purely a side-effect guard.
 */
export default function LoaderGuard() {
  useLayoutEffect(() => {
    // @ts-ignore
    if (window.__POCKETED_HAS_VISITED) {
      document.documentElement.classList.add("has-visited");
    }
  });
  // No dependency array: runs on every render/navigation

  return null;
}
