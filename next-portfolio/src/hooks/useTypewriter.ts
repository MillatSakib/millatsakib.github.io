"use client";

import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

export function useTypewriter({
  words,
  typingSpeed = 85,
  deletingSpeed = 55,
  pauseMs = 1800,
}: UseTypewriterOptions): string {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) {
      return;
    }

    const currentWord = words[wordIndex % words.length];
    const isWordComplete = !isDeleting && displayText === currentWord;
    const delay = isWordComplete
      ? pauseMs
      : isDeleting
        ? deletingSpeed
        : typingSpeed;

    const timeoutId = window.setTimeout(() => {
      if (isWordComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        const nextText = currentWord.slice(0, displayText.length - 1);
        setDisplayText(nextText);

        if (nextText.length === 0) {
          setIsDeleting(false);
          setWordIndex((previous) => (previous + 1) % words.length);
        }

        return;
      }

      setDisplayText(currentWord.slice(0, displayText.length + 1));
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [deletingSpeed, displayText, isDeleting, pauseMs, typingSpeed, wordIndex, words]);

  return displayText;
}
