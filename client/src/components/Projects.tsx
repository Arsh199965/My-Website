"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, ExternalLink, Zap, Brain, Utensils } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [particles, setParticles] = useState<
    Array<{ left: string; top: string; duration: number; delay: number }>
  >([]);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const generatedParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    }));
    setParticles(generatedParticles);
  }, []);

  const projects = [
    {
      title: "Pantry Management Web App",
      description:
        "A full-stack web application that reduces domestic food waste by 40-70%. Features ML-powered expiry date prediction using Random Forest Classifier and TF-IDF recipe recommendations based on available ingredients.",
      technologies: [
        "Python",
        "TypeScript",
        "Next.js",
        "React",
        "Scikit-learn",
        "Flask",
        "PostgreSQL",
        "Tailwind",
      ],
      github: "https://github.com/Arsh199965/FridgePilot",
      live: null,
      icon: Utensils,
      image: "/FridgePilot.png",
      color: "from-green-400 to-emerald-600",
      category: "ML + Web Application",
    },
    {
      title: "Never Forget",
      description:
        "An assistive mobile app for individuals with memory challenges. Features OpenAI Whisper for multi-language transcription, Google Gemini for AI-powered summarization, and an accessibility-first UI with memory chatbot.",
      technologies: [
        "React Native",
        "Node.js",
        "Express",
        "MongoDB",
        "OpenAI Whisper",
        "Google Gemini",
      ],
      github: "https://github.com/arsh199965",
      live: "https://never-forget-xi.vercel.app/",
      icon: Brain,
      image: "/NeverForget.png",
      color: "from-blue-400 to-purple-600",
      category: "AI-Powered Mobile App",
    },
    {
      title: "Handwritten Digit Generator",
      description:
        "A conditional GAN built from scratch in PyTorch to generate specified handwritten digits (0-9). Features real-time generation with interactive Streamlit interface and Binary Cross-Entropy loss optimization.",
      technologies: [
        "Python",
        "PyTorch",
        "Streamlit",
        "cGAN",
        "Adam Optimizer",
      ],
      github: "https://github.com/arsh199965/handwrittendigitgen",
      live: "https://writethedigits.streamlit.app",
      icon: Zap,
      image: "/HandWrittenDigGen.png",
      color: "from-orange-400 to-red-600",
      category: "Deep Learning",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const projectImageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="py-32 bg-black relative overflow-hidden"
    >
      {/* Enhanced background effects */}
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl" />

        {/* Animated particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/10 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.7, 0],
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
      </motion.div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-24"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-4 mb-8"
          >
            <motion.div
              className="h-px bg-emerald-400 w-16"
              initial={{ width: 0 }}
              animate={inView ? { width: 64 } : { width: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.p
              className="text-emerald-400 text-sm font-medium tracking-[0.2em] uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {[
                "＊",
                "ML",
                "Projects",
                "＊",
                "AI",
                "Solutions",
                "＊",
                "Web",
                "Development",
                "＊",
                "Innovation",
                "＊",
              ].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                  className="inline-block mr-1"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
            <motion.div
              className="h-px bg-emerald-400 w-16"
              initial={{ width: 0 }}
              animate={inView ? { width: 64 } : { width: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] tracking-tight"
          >
            {"Selected".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={
                  inView
                    ? {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                      }
                    : {
                        opacity: 0,
                        y: 50,
                        rotateX: -90,
                      }
                }
                transition={{
                  duration: 0.8,
                  delay: 1 + i * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <br />
            <span className="text-emerald-400">
              {"Works".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={
                    inView
                      ? {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                        }
                      : {
                          opacity: 0,
                          y: 50,
                          rotateX: -90,
                        }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 1.3 + i * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h2>
        </motion.div>

        {/* Projects showcase */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-32"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group relative"
            >
              {/* Enhanced project card with stunning hover effects */}
              <motion.div
                className="relative p-12 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-sm transition-all duration-700 group overflow-hidden perspective-1000"
                whileHover={{
                  rotateY: 8,
                  rotateX: 4,
                  z: 50,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    duration: 0.6,
                  },
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Animated border with flowing gradient */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(45deg, transparent, transparent, transparent, transparent)",
                  }}
                  whileHover={{
                    background: [
                      "linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6, #10b981)",
                      "linear-gradient(135deg, #3b82f6, #8b5cf6, #ef4444, #3b82f6)",
                      "linear-gradient(225deg, #8b5cf6, #ef4444, #10b981, #8b5cf6)",
                      "linear-gradient(315deg, #ef4444, #10b981, #3b82f6, #ef4444)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Holographic shimmer effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)",
                  }}
                  whileHover={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />

                {/* Floating particles on hover */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        left: `${20 + i * 10}%`,
                        top: `${20 + (i % 3) * 20}%`,
                      }}
                      whileHover={{
                        y: [0, -20, -40, -20, 0],
                        opacity: [0, 1, 1, 1, 0],
                        scale: [0, 1, 1.2, 1, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Magnetic glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl"
                  style={{
                    background: `linear-gradient(45deg, ${
                      project.color.split(" ")[1]
                    }, ${project.color.split(" ")[3]})`,
                  }}
                  whileHover={{
                    scale: [1, 1.1, 1.05],
                    opacity: [0, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                />

                {/* Inner content with subtle lift */}
                <motion.div
                  className="relative z-10"
                  whileHover={{
                    z: 20,
                    transition: { duration: 0.4 },
                  }}
                >
                  {/* Project header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="mb-6 lg:mb-0">
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          className={`p-3 rounded-xl bg-gradient-to-r ${project.color}`}
                          whileHover={{
                            rotate: 360,
                            scale: 1.1,
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <project.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase">
                          {project.category}
                        </span>
                      </div>
                      <motion.h3
                        className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight"
                        whileHover={{
                          scale: 1.02,
                          textShadow: "0 0 20px rgba(52, 211, 153, 0.5)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.title}
                      </motion.h3>
                    </div>

                    {/* Enhanced Links */}
                    <div className="flex gap-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          scale: 1.1,
                          rotateY: 15,
                          boxShadow: "0 10px 30px rgba(255,255,255,0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium transition-all duration-300 hover:bg-gray-100 relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 translate-x-[-100%] group-hover:translate-x-0"
                          transition={{ duration: 0.3 }}
                        />
                        <Github className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">Code</span>
                      </motion.a>
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{
                            scale: 1.1,
                            rotateY: -15,
                            boxShadow: "0 10px 30px rgba(52, 211, 153, 0.3)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full font-medium transition-all duration-300 hover:border-white/40 hover:bg-white/5 relative overflow-hidden group"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 scale-0 group-hover:scale-100"
                            transition={{ duration: 0.3 }}
                          />
                          <ExternalLink className="w-4 h-4 relative z-10" />
                          <span className="relative z-10">Live Demo</span>
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Project content */}
                  <div className="grid lg:grid-cols-3 gap-12">
                    {/* Description */}
                    <div className="lg:col-span-2 space-y-6">
                      <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div>
                        <p className="text-emerald-400 text-sm font-medium tracking-wider uppercase mb-4">
                          Technologies Used
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 font-light hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced project visual */}
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <motion.div
                        className="aspect-square rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 overflow-hidden group-hover:border-white/20 transition-all duration-500"
                        variants={projectImageVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                      >
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />

                        {/* Image overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-32"
        >
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-12 max-w-3xl mx-auto">
            These projects represent my journey in creating meaningful digital
            solutions that solve real-world problems and enhance user
            experiences.
          </p>

          <motion.a
            href="https://github.com/arsh199965"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 border border-emerald-400/30 text-emerald-400 rounded-full font-medium transition-all duration-300 hover:border-emerald-400/60 hover:bg-emerald-400/5"
          >
            View All Projects on GitHub
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
