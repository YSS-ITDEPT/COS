"use client";

import { useEffect } from "react";

export function TrafficTracker() {
  useEffect(() => {
    try {
      const payload = {
        page_url: window.location.href,
        referrer: document.referrer || "",
        cookies_enabled: navigator.cookieEnabled ? 1 : 0,
        screen_width: window.screen?.width || null,
        screen_height: window.screen?.height || null,
        language: navigator.language || "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
        address: "",
        lat: null,
        lon: null,
      };

      fetch("/api/track.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true, // important for unload/navigation
      }).catch(() => {});
    } catch {}
  }, []);

  return null; // no UI
}
