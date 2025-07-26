"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, memo } from "react";
import useIsMobile from "../utils/useIsMobile";

const About = memo(() => {
  const isMobile = useIsMobile();

  const [ref, inView] = useInView({
    triggerOnce: false, // Changed to false so animations replay when coming back into view
    threshold: 0.1,
  });
  const [cardsref, cardsInView] = useInView({
    triggerOnce: isMobile, // Trigger once on mobile, multiple times on desktop
    threshold: isMobile? 0.01: 0.1,
  });
  // State for particle positions to avoid hydration mismatch
  const [particlePositions, setParticlePositions] = useState<number[][]>([]);

  // Initialize particle positions on client side only
  useEffect(() => {
    const positions = Array.from({ length: 4 }, () =>
      Array.from({ length: 3 }, () => Math.random() * 100)
    );
    setParticlePositions(positions);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="about" className="py-32 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Small label */}
          <motion.p
            variants={itemVariants}
            className="text-emerald-400 text-sm font-medium tracking-[0.2em] uppercase mb-6"
          >
            About Me
          </motion.p>

          {/* Main headline */}
          <motion.h2
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] tracking-tight mb-12"
          >
            Building intelligent solutions
            <br />
            and seamless <span className="text-emerald-400">digital</span>
            <br />
            experiences.
          </motion.h2>

          {/* Description */}
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto mb-20"
          >
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              Currently pursuing B.Tech in AI & Machine Learning at GGSIPU, I
              specialize in
              <span className="text-emerald-400">
                {" "}
                machine learning
              </span> and{" "}
              <span className="text-emerald-400">full-stack development</span>.
              I build intelligent applications that solve real-world problems,
              combining data science expertise with modern web technologies.
            </p>
          </motion.div>
        </motion.div>

        {/* Approach section inspired by the reference site */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-3"
        >
          <motion.div variants={itemVariants} className="text-center mb-2">
            <p className="text-emerald-400 text-sm font-medium tracking-[0.2em] uppercase ">
              Approach
            </p>
          </motion.div>
        </motion.div>

        {/* Narrative quote section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-32"
        >
          <motion.h3
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-20 max-w-6xl mx-auto"
          >
            It&apos;s not just about algorithms. It&apos;s about{" "}
            <motion.span
              className="text-emerald-400 inline-block"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              impact
            </motion.span>{" "}
            and creating intelligent solutions
            <br />
            that make a difference in people&apos;s lives.
          </motion.h3>
        </motion.div>

        {/* Enhanced Stats section with staggered layout like the image */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Background grid effect */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 gap-8 h-full">
              {[...Array(32)].map((_, i) => (
                <motion.div
                  key={i}
                  className="border-l border-white/10"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: inView ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: i * 0.02 }}
                />
              ))}
            </div>
          </div>

          {/* Staggered stats cards inspired by the image */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                number: "10+",
                label: "ML Projects Built",
                description: "From data preprocessing to model deployment",
                delay: 0,
                position: "translate-y-0",
              },
              {
                number: "15+",
                label: "Technologies Mastered",
                description: "Across ML, AI, and Full-Stack Development",
                delay: 0.1,
                position: "translate-y-8",
              },
              {
                number: "4+",
                label: "Years of Programming",
                description: "Continuous learning and building",
                delay: 0.2,
                position: "translate-y-16",
              },
              {
                number: "∞",
                label: "Passion for Innovation",
                description: "Always pushing boundaries",
                delay: 0.3,
                position: "translate-y-4",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                ref={cardsref}
                initial={{
                  opacity: 0,
                  y: 0,
                  x: index % 2 === 0 ? -50 : 50,
                }}
                animate={
                  cardsInView
                    ? {
                        opacity: 1,
                        y: 0,
                        x: 0,
                      }
                    : {}
                }
                transition={{
                  duration: 0.8,
                  delay: stat.delay,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className={`relative group ${stat.position}`}
              >
                {/* Card with glassmorphism effect */}
                <div className="relative p-8 lg:p-10 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:bg-white/[0.05] group-hover:border-emerald-400/20">
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(52, 211, 153, 0.05) 0%, 
                        rgba(16, 185, 129, 0.05) 50%, 
                        rgba(5, 150, 105, 0.05) 100%)`,
                    }}
                  />

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    {particlePositions[index] &&
                      particlePositions[index].map((xPosition, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
                          initial={{
                            x: xPosition + "%",
                            y: "100%",
                            opacity: 0,
                          }}
                          animate={{
                            y: "-10px",
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.5 + stat.delay,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                  </div>

                  {/* Number with counter animation */}
                  <motion.div
                    className="relative text-6xl md:text-7xl lg:text-8xl font-light text-emerald-400 mb-4 leading-none"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={cardsInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: stat.delay + 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <motion.span
                      whileHover={{
                        textShadow: "0 0 20px rgba(52, 211, 153, 0.5)",
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.number}
                    </motion.span>
                  </motion.div>

                  {/* Label */}
                  <motion.div
                    className="relative text-white font-medium text-xl lg:text-2xl mb-3 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: stat.delay + 0.4 }}
                  >
                    {stat.label}
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    className="relative text-gray-400 font-light text-sm lg:text-base leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: stat.delay + 0.6 }}
                  >
                    {stat.description}
                  </motion.div>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: "0 0 50px rgba(52, 211, 153, 0.1)",
                    }}
                  />
                </div>

                {/* Connection lines between cards */}
                {index < 3 && (
                  <motion.div
                    className="absolute top-1/2 -right-4 lg:-right-6 w-8 lg:w-12 h-px bg-gradient-to-r from-emerald-400/50 to-transparent hidden lg:block"
                    initial={{ scaleX: 0 }}
                    animate={cardsInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: stat.delay + 0.8 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom decorative element */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="h-px bg-emerald-400/50 w-16"></div>
              <motion.span
                className="text-emerald-400 text-sm font-medium tracking-[0.2em] uppercase"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(52, 211, 153, 0.5)",
                    "0 0 10px rgba(52, 211, 153, 0.5)",
                    "0 0 0px rgba(52, 211, 153, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Driven by Data, Powered by Passion
              </motion.span>
              <div className="h-px bg-emerald-400/50 w-16"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
