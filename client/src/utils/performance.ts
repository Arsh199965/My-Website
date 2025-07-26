/**
 * Throttled scroll listener utility for performance optimization
 */

export const useThrottledScroll = (callback: () => void) => {
  let ticking = false;

  const throttledCallback = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };

  return throttledCallback;
};

/**
 * Intersection Observer utility with improved performance
 */
export const createOptimizedObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '10px',
    threshold: [0, 0.25, 0.5, 0.75, 1],
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Debounce utility for resize events
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Passive event listener utility for better scroll performance
 */
export const addPassiveEventListener = (
  element: Element | Window,
  event: string,
  handler: EventListener
) => {
  element.addEventListener(event, handler, { passive: true });
  
  return () => {
    element.removeEventListener(event, handler);
  };
};
