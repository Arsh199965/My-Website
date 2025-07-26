"use client";

import { useEffect } from "react";

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== "production") return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const metricName = entry.name;
        const value = Math.round(
          "value" in entry ? (entry as { value: number }).value : entry.duration
        );

        // Log performance metrics (you can send to analytics service)
        console.log(`${metricName}: ${value}ms`);

        // Send to analytics if needed
        // analytics.track(metricName, { value });
      }
    });

    observer.observe({
      entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
