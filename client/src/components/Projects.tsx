"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Github,
  ExternalLink,
  Zap,
  Brain,
  Utensils,
  Code2,
  Database,
  Cpu,
} from "lucide-react";
import { useRef, useEffect, useState, useMemo, memo } from "react";

const Projects = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [particles, setParticles] = useState<
    Array<{ left: string; top: string; id: number }>
  >([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const generatedParticles = [...Array(20)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      id: i,
    }));
    setParticles(generatedParticles);
  }, []);

  // Transform values for different sections
  const titleY = useTransform(smoothProgress, [0, 0.15], [100, 0]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.15], [0, 1]);
  const progressWidth = useTransform(
    smoothProgress,
    [0.15, 0.9],
    ["0%", "100%"]
  );

  const projects = useMemo(
    () => [
      {
        id: 0,
        title: "FridgePilot",
        subtitle: "Smart Pantry Management",
        description:
          "Reducing food waste by 70% through AI-powered expiry prediction and smart recipe recommendations",
        fullDescription:
          "A revolutionary full-stack application that transforms how households manage food inventory. Using Random Forest Classifier for ML-powered expiry predictions and TF-IDF algorithms for intelligent recipe suggestions based on available ingredients.",
        technologies: [
          "Python",
          "TypeScript",
          "Next.js",
          "Scikit-learn",
          "Flask",
          "PostgreSQL",
        ],
        github: "https://github.com/Arsh199965/FridgePilot",
        live: null,
        icon: Utensils,
        image: "/FridgePilot.png",
        color: "emerald",
        gradient: "from-emerald-400 to-green-600",
        stats: [
          { label: "Food Waste Reduction", value: "70%" },
          { label: "ML Accuracy", value: "94%" },
          { label: "Recipe Database", value: "10K+" },
        ],
        features: [
          "ML-Powered Predictions",
          "Smart Notifications",
          "Recipe Engine",
          "Inventory Tracking",
        ],
        primaryTech: { icon: Database, name: "Machine Learning" },
      },
      {
        id: 1,
        title: "Never Forget",
        subtitle: "AI Memory Assistant",
        description:
          "Empowering individuals with memory challenges through voice transcription and AI summarization",
        fullDescription:
          "An assistive mobile application featuring OpenAI Whisper for multi-language transcription, Google Gemini for intelligent summarization, and an accessibility-first design with integrated memory chatbot.",
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
        color: "blue",
        gradient: "from-blue-400 to-purple-600",
        stats: [
          { label: "Languages Supported", value: "50+" },
          { label: "Transcription Accuracy", value: "97%" },
          { label: "User Retention", value: "89%" },
        ],
        features: [
          "Voice Recognition",
          "AI Summarization",
          "Multi-language Support",
          "Memory Chatbot",
        ],
        primaryTech: { icon: Cpu, name: "AI Integration" },
      },
      {
        id: 2,
        title: "Digit Generator",
        subtitle: "Handwritten AI Art",
        description:
          "Creating custom handwritten digits on demand using conditional GAN architecture",
        fullDescription:
          "A conditional Generative Adversarial Network built from scratch in PyTorch to generate specified handwritten digits (0-9). Features real-time generation with interactive Streamlit interface.",
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
        color: "orange",
        gradient: "from-orange-400 to-red-600",
        stats: [
          { label: "Generation Speed", value: "<1s" },
          { label: "Model Accuracy", value: "96%" },
          { label: "Unique Variations", value: "∞" },
        ],
        features: [
          "Real-time Generation",
          "Interactive UI",
          "Custom Styling",
          "Export Options",
        ],
        primaryTech: { icon: Code2, name: "Deep Learning" },
      },
    ],
    []
  );

  // Project-specific transforms with better spacing
  const project0Transforms = {
    y: useTransform(smoothProgress, [0.15, 0.2, 0.38, 0.43], [100, 0, 0, -100]),
    opacity: useTransform(
      smoothProgress,
      [0.15, 0.2, 0.38, 0.43],
      [0, 1, 1, 0]
    ),
    scale: useTransform(
      smoothProgress,
      [0.2, 0.25, 0.33, 0.38],
      [0.9, 1, 1, 0.9]
    ),
  };

  const project1Transforms = {
    y: useTransform(smoothProgress, [0.37, 0.42, 0.6, 0.65], [100, 0, 0, -100]),
    opacity: useTransform(
      smoothProgress,
      [0.37, 0.42, 0.6, 0.65],
      [0, 1, 1, 0]
    ),
    scale: useTransform(
      smoothProgress,
      [0.42, 0.47, 0.55, 0.6],
      [0.9, 1, 1, 0.9]
    ),
  };

  const project2Transforms = {
    y: useTransform(
      smoothProgress,
      [0.59, 0.64, 0.82, 0.87],
      [100, 0, 0, -100]
    ),
    opacity: useTransform(
      smoothProgress,
      [0.59, 0.64, 0.82, 0.87],
      [0, 1, 1, 0]
    ),
    scale: useTransform(
      smoothProgress,
      [0.64, 0.69, 0.77, 0.82],
      [0.9, 1, 1, 0.9]
    ),
  };

  const projectTransforms = [
    project0Transforms,
    project1Transforms,
    project2Transforms,
  ];

  // Track active project based on scroll
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (latest > 0.2 && latest < 0.42) setActiveProject(0);
      else if (latest >= 0.42 && latest < 0.64) setActiveProject(1);
      else if (latest >= 0.64 && latest < 0.86) setActiveProject(2);
    });
    return unsubscribe;
  }, [smoothProgress]);

  return (
    <div className="relative" id="projects">
      {/* Sticky Navigation Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/50 backdrop-blur-sm z-50 hover:h-2 transition-all duration-300">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-400 via-blue-500 to-orange-500 transition-all duration-300"
          style={{ width: progressWidth }}
        />
      </div>

      <motion.section
        ref={containerRef}
        className="relative min-h-[400vh] bg-black overflow-hidden"
        style={{ position: "relative" }}
      >
        {/* Floating Elements - Simplified */}
        <div className="fixed inset-0 pointer-events-none">
          {particles.slice(0, 8).map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-emerald-400/20 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: particle.id * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <motion.div
            className="text-center max-w-5xl mx-auto px-6"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            <motion.p
              className="text-emerald-400 text-sm font-medium tracking-[0.2em] uppercase mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              My Work
            </motion.p>

            <motion.h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] tracking-tight mb-12">
              Selected
              <br />
              <span className="text-emerald-400">Projects</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Three innovative solutions showcasing expertise in machine
              learning, AI integration, and full-stack development.
            </motion.p>
          </motion.div>
        </div>

        {/* Projects Showcase */}
        {projects.map((project, index) => {
          const transforms = projectTransforms[index];
          const isActive = activeProject === index;

          return (
            <div key={project.id} className="sticky top-0 h-screen">
              <motion.div
                className="h-full flex items-center justify-center px-6"
                style={{
                  y: transforms.y,
                  opacity: transforms.opacity,
                  scale: transforms.scale,
                }}
              >
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                  {/* Project Info */}
                  <motion.div
                    className="space-y-6"
                    initial={{ x: -50, opacity: 0 }}
                    animate={
                      isActive ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }
                    }
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {/* Project Header */}
                    <motion.div
                      className="flex items-center gap-4 mb-6 cursor-pointer group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-r ${project.gradient} transition-all duration-300 group-hover:shadow-xl`}
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                          boxShadow: `0 10px 25px rgba(${
                            project.color === "emerald"
                              ? "16,185,129"
                              : project.color === "blue"
                              ? "59,130,246"
                              : "249,115,22"
                          }, 0.4)`,
                        }}
                      >
                        <project.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <p className="text-gray-400 text-sm font-light transition-colors duration-300 group-hover:text-gray-300">
                          {project.subtitle}
                        </p>
                        <p
                          className={`text-${project.color}-400 text-sm font-medium transition-all duration-300 group-hover:brightness-110`}
                        >
                          Project {project.id + 1}
                        </p>
                      </div>
                    </motion.div>

                    <motion.h2
                      className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight transition-all duration-300 hover:text-emerald-100 cursor-pointer"
                      initial={{ y: 30, opacity: 0 }}
                      animate={
                        isActive ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }
                      }
                      transition={{ duration: 0.6, delay: 0.3 }}
                      whileHover={{
                        x: 10,
                        textShadow: "0 0 20px rgba(16,185,129,0.3)",
                      }}
                    >
                      {project.title}
                    </motion.h2>

                    <motion.p
                      className="text-lg text-gray-300 font-light leading-relaxed mb-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={
                        isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                      }
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Stats Grid */}
                    <motion.div
                      className="grid grid-cols-3 gap-4 mb-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={
                        isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                      }
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      {project.stats.map((stat, i) => (
                        <motion.div
                          key={i}
                          className="text-center p-3 bg-white/5 rounded-lg border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 cursor-pointer"
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                            y: -2,
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            className={`text-xl font-light text-${project.color}-400 mb-1`}
                          >
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-500 font-light">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Technologies */}
                    <motion.div
                      className="space-y-3"
                      initial={{ y: 20, opacity: 0 }}
                      animate={
                        isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                      }
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <h4 className="text-emerald-400 text-sm font-medium tracking-[0.2em] uppercase">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 font-light transition-all duration-300 hover:bg-white/10 hover:border-white/20 cursor-pointer"
                            whileHover={{
                              scale: 1.05,
                              y: -2,
                              borderColor:
                                project.color === "emerald"
                                  ? "#10b981"
                                  : project.color === "blue"
                                  ? "#3b82f6"
                                  : "#f97316",
                              color:
                                project.color === "emerald"
                                  ? "#10b981"
                                  : project.color === "blue"
                                  ? "#3b82f6"
                                  : "#f97316",
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      className="flex gap-4 pt-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={
                        isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                      }
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium transition-all duration-300 hover:shadow-xl"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 30px rgba(255,255,255,0.2)",
                          y: -2,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </motion.a>
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 border border-white/20 text-gray-300 rounded-lg font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/40"
                          whileHover={{
                            scale: 1.05,
                            y: -2,
                            borderColor:
                              project.color === "emerald"
                                ? "#10b981"
                                : project.color === "blue"
                                ? "#3b82f6"
                                : "#f97316",
                            color:
                              project.color === "emerald"
                                ? "#10b981"
                                : project.color === "blue"
                                ? "#3b82f6"
                                : "#f97316",
                            boxShadow: `0 10px 30px rgba(${
                              project.color === "emerald"
                                ? "16,185,129"
                                : project.color === "blue"
                                ? "59,130,246"
                                : "249,115,22"
                            }, 0.2)`,
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </motion.a>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Project Visual */}
                  <motion.div
                    className="relative"
                    initial={{ x: 50, opacity: 0 }}
                    animate={
                      isActive ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }
                    }
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.div
                      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 transition-all duration-300 hover:border-white/20 cursor-pointer group"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                        y: -5,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          initial={{ scale: 1.05 }}
                          animate={isActive ? { scale: 1 } : { scale: 1.05 }}
                          transition={{ duration: 0.8 }}
                        />

                        {/* Project number overlay */}
                        <motion.div
                          className="absolute top-4 right-4"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <div
                            className={`w-8 h-8 bg-${project.color}-400 rounded-full flex items-center justify-center text-black font-medium text-sm shadow-lg transition-all duration-300 hover:shadow-xl`}
                          >
                            {project.id + 1}
                          </div>
                        </motion.div>

                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.section>
    </div>
  );
});

Projects.displayName = "Projects";

export default Projects;
