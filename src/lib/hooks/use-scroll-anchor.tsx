import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollAnchor = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Memoized scrollToBottom to avoid unnecessary re-creation
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollElement = scrollRef.current;
      if (!scrollElement) return;

      const offset = 25;
      const isAtBottom =
        scrollElement.scrollTop + scrollElement.clientHeight >=
        scrollElement.scrollHeight - offset;

      setIsAtBottom(isAtBottom);
    };

    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const visibilityElement = visibilityRef.current;
    if (!visibilityElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        root: scrollRef.current,
        rootMargin: "0px 0px -150px 0px",
      }
    );

    observer.observe(visibilityElement);
    return () => {
      if (visibilityElement) observer.unobserve(visibilityElement);
    };
  }, []);

  useEffect(() => {
    if (isAtBottom && !isVisible) {
      scrollToBottom();
    }
  }, [isAtBottom, isVisible, scrollToBottom]);

  return {
    messagesRef,
    scrollRef,
    visibilityRef,
    scrollToBottom,
    isAtBottom,
    isVisible,
  };
};
