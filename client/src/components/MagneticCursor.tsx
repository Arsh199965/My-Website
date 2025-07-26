"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MagneticCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleTextMouseEnter = () => setIsHoveringText(true);
    const handleTextMouseLeave = () => setIsHoveringText(false);

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, [role='button'], .cursor-pointer"
    );

    // Add event listeners to text elements - more comprehensive selection
    const textElements = document.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, span, label, div[class*='text-'], li, td, th"
    );

    // Function to check if element has text content
    const hasTextContent = (element: Element) => {
      const text = element.textContent?.trim();
      return text && text.length > 0;
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    textElements.forEach((el) => {
      // Only add text hover effect if element has actual text content
      if (hasTextContent(el)) {
        el.addEventListener("mouseenter", handleTextMouseEnter);
        el.addEventListener("mouseleave", handleTextMouseLeave);
      }
    });

    // Also listen for dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;

            // Check for interactive elements
            if (
              element.matches(
                "a, button, input, textarea, [role='button'], .cursor-pointer"
              )
            ) {
              element.addEventListener("mouseenter", handleMouseEnter);
              element.addEventListener("mouseleave", handleMouseLeave);
            }

            // Check for text elements
            if (
              element.matches(
                "h1, h2, h3, h4, h5, h6, p, span, label, div[class*='text-'], li, td, th"
              ) &&
              hasTextContent(element)
            ) {
              element.addEventListener("mouseenter", handleTextMouseEnter);
              element.addEventListener("mouseleave", handleTextMouseLeave);
            }

            // Check children too
            const childInteractives = element.querySelectorAll(
              "a, button, input, textarea, [role='button'], .cursor-pointer"
            );
            const childTexts = element.querySelectorAll(
              "h1, h2, h3, h4, h5, h6, p, span, label, div[class*='text-'], li, td, th"
            );

            childInteractives.forEach((child) => {
              child.addEventListener("mouseenter", handleMouseEnter);
              child.addEventListener("mouseleave", handleMouseLeave);
            });

            childTexts.forEach((child) => {
              if (hasTextContent(child)) {
                child.addEventListener("mouseenter", handleTextMouseEnter);
                child.addEventListener("mouseleave", handleTextMouseLeave);
              }
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      observer.disconnect();
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      textElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleTextMouseEnter);
        el.removeEventListener("mouseleave", handleTextMouseLeave);
      });
    };
  }, [isMounted]);

  // Don't render cursor during SSR
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-emerald-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.8 : isHoveringText ? 2.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.2,
        }}
      />

      {/* Cursor trail - now with more lag for fluid trailing effect */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border border-emerald-400/30 rounded-full pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : isHoveringText ? 2 : 1,
          opacity: isHoveringText ? 0.8 : 0.6,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.3,
        }}
      />
    </>
  );
};

export default MagneticCursor;
