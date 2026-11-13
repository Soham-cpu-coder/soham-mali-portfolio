"use client";

import { useState, useEffect } from "react";

interface TypewriterOptions {
  words: readonly string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function useTypewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: TypewriterOptions) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const currentWord = words[wordIndex % words.length];

    if (!isDeleting && text === currentWord) {
      const timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timer);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timer = setTimeout(
      () => {
        setText((current) =>
          isDeleting
            ? currentWord.slice(0, current.length - 1)
            : currentWord.slice(0, current.length + 1)
        );
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}
