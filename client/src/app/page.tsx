"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import MagneticCursor from "@/components/MagneticCursor";

export default function Home() {
  return (
    <div className="bg-white text-white" style={{ position: "relative" }}>
      <PerformanceMonitor />
      <MagneticCursor />
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
