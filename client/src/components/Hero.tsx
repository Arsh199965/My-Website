"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ left: string; top: string; duration: number; delay: number }>
  >([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    // Generate particles only on client side to avoid hydration mismatch
    const generatedParticles = [...Array(40)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(generatedParticles);

    // Trigger load animation
    const timer = setTimeout(() => setIsLoaded(true), 100);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      clearTimeout(timer);
    };
  }, []);

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/arsh199965",
      label: "View my code",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/arsh-ahmad-2bb070244",
      label: "Connect professionally",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:arsh199965@gmail.com",
      label: "Get in touch",
    },
  ];

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Enhanced floating particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/20 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Enhanced dynamic gradient blobs */}
        <motion.div
          className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            x: [mousePosition.x * 0.02, mousePosition.x * 0.05],
            y: [mousePosition.y * 0.02, mousePosition.y * 0.05],
            scale: [1, 1.2, 1],
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 30,
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            left: "20%",
            top: "20%",
          }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [mousePosition.x * -0.02, mousePosition.x * -0.05],
            y: [mousePosition.y * -0.02, mousePosition.y * -0.05],
            scale: [1, 1.3, 1],
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 30,
            scale: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            },
          }}
          style={{
            right: "20%",
            bottom: "20%",
          }}
        />

        {/* Additional gradient layers */}
        <motion.div
          className="absolute w-64 h-64 bg-purple-500/5 rounded-full blur-2xl"
          animate={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y * 0.01,
            rotate: [0, 360],
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            x: { type: "spring", stiffness: 100 },
            y: { type: "spring", stiffness: 100 },
          }}
          style={{
            left: "60%",
            top: "60%",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-screen py-20">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Enhanced greeting with stagger animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="h-px bg-emerald-400 w-16"
                  initial={{ width: 0 }}
                  animate={{ width: isLoaded ? 64 : 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <motion.p
                  className="text-emerald-400 text-sm font-medium tracking-[0.2em] uppercase"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  {[
                    "＊",
                    "Hello",
                    "World",
                    "＊",
                    "Welcome",
                    "＊",
                    "नमस्ते",
                    "＊",
                    "مرحبا",
                    "＊",
                  ].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isLoaded ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                      className="inline-block mr-1"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.p>
                <motion.div
                  className="h-px bg-emerald-400 w-16"
                  initial={{ width: 0 }}
                  animate={{ width: isLoaded ? 64 : 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </div>
            </motion.div>

            {/* Enhanced name and title with character-by-character animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="space-y-6"
            >
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-light leading-[0.85] tracking-tight">
                <motion.span
                  className="text-white inline-block"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{
                    rotateY: isLoaded ? 0 : 90,
                    opacity: isLoaded ? 1 : 0,
                  }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {"Arsh".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: isLoaded ? 1 : 0,
                        y: isLoaded ? 0 : 20,
                      }}
                      transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
                <br />
                <motion.span
                  className="text-emerald-400 inline-block"
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{
                    rotateY: isLoaded ? 0 : -90,
                    opacity: isLoaded ? 1 : 0,
                  }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  {"Ahmad".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: isLoaded ? 1 : 0,
                        y: isLoaded ? 0 : 20,
                      }}
                      transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </h1>

              <div className="space-y-4">
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                  className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light leading-relaxed"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.6, delay: 2 }}
                  >
                    Aspiring ML Engineer &
                  </motion.span>
                  <br />
                  <motion.span
                    className="text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.6, delay: 2.2 }}
                  >
                    Web Developer
                  </motion.span>
                </motion.p>
              </div>
            </motion.div>

            {/* Enhanced description with typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              className="max-w-2xl space-y-6"
            >
              <motion.p
                className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 1, delay: 2.6 }}
              >
                I specialize in the complete machine learning lifecycle - from
                data cleaning and preprocessing to model training and
                deployment. I work with generative AI technologies and build web
                applications to solve real-world problems.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 text-sm text-gray-500 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 2.8 }}
              >
                {[
                  "Python & PyTorch",
                  "Scikit-learn & Pandas",
                  "LangChain & Gen AI",
                  "Next.js & React",
                  "TypeScript",
                ].map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: isLoaded ? 1 : 0,
                      scale: isLoaded ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.5, delay: 3 + i * 0.1 }}
                    className="relative"
                  >
                    {skill}
                    {i < 4 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLoaded ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 3.1 + i * 0.1 }}
                        className="ml-4"
                      >
                        •
                      </motion.span>
                    )}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced CTA Buttons with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 3.5 }}
              className="flex flex-wrap gap-6"
            >
              <motion.a
                href="#projects"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(52, 211, 153, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
                transition={{ duration: 0.6, delay: 3.7 }}
                className="group relative px-8 py-4 bg-emerald-400 text-black rounded-full font-medium transition-all duration-300 hover:bg-emerald-300 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-emerald-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">View My Work</span>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 3.9 }}
                className="group relative px-8 py-4 border border-white/20 text-white rounded-full font-medium transition-all duration-300 hover:border-white/40 hover:bg-white/5 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Get In Touch</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Enhanced social links sidebar */}
          <div className="lg:col-span-4 flex lg:flex-col justify-center lg:justify-end gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 4 }}
              className="space-y-8"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{ opacity: 0, x: 20, rotateY: 45 }}
                  animate={{
                    opacity: isLoaded ? 1 : 0,
                    x: isLoaded ? 0 : 20,
                    rotateY: isLoaded ? 0 : 45,
                  }}
                  transition={{ duration: 0.6, delay: 4.2 + index * 0.15 }}
                  whileHover={{
                    scale: 1.05,
                    x: -10,
                    rotateY: 5,
                    boxShadow: "0 10px 30px rgba(52, 211, 153, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] hover:border-white/20 overflow-hidden"
                >
                  {/* Hover effect background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5"
                    initial={{ scale: 0, rotate: 45 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className="relative w-12 h-12 bg-emerald-400/10 border border-emerald-400/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-400/20 group-hover:border-emerald-400/40 transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <link.icon className="w-5 h-5 text-emerald-400" />
                  </motion.div>
                  <div className="hidden lg:block relative">
                    <motion.p
                      className="text-white font-medium text-sm"
                      initial={{ y: 0 }}
                      whileHover={{ y: -2 }}
                    >
                      {link.name}
                    </motion.p>
                    <motion.p
                      className="text-gray-400 text-xs"
                      initial={{ y: 0 }}
                      whileHover={{ y: 2 }}
                    >
                      {link.label}
                    </motion.p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center gap-2 text-gray-400 cursor-pointer group"
          >
            <motion.span
              className="text-xs font-light tracking-wider uppercase group-hover:text-emerald-400 transition-colors duration-300"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Scroll to explore
            </motion.span>
            <motion.div
              animate={{
                y: [0, 5, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              }}
              className="p-2 rounded-full border border-gray-400/20 group-hover:border-emerald-400/40 transition-colors duration-300"
            >
              <ArrowDown className="w-4 h-4 group-hover:text-emerald-400 transition-colors duration-300" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
