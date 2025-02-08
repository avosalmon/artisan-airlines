import { type ClassValue, clsx } from "clsx";
import { intervalToDuration } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanupMobileNavigation() {
  // Remove pointer-events style from body
  document.body.style.removeProperty("pointer-events");

  // Dispatch a custom event that the sidebar can listen to
  window.dispatchEvent(new CustomEvent("mobile-navigation"));
}

export function getDuration(departure: string, arrival: string) {
  const diff = intervalToDuration({
    start: new Date(departure),
    end: new Date(arrival),
  });

  return `${diff.hours}hrs ${diff.minutes ? `${diff.minutes}mins` : ""}`;
}
