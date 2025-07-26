"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { memo, useMemo } from "react";
import useIsMobile from "../utils/useIsMobile";

const Skills = memo(() => {
  const isMobile = useIsMobile();
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [cardsref, cardsInView] = useInView({
    triggerOnce: isMobile, // Trigger once on mobile, multiple times on desktop
    threshold: 0.1,
  });
  // All skills in a flat array for the conveyor belt - memoized
  const allSkills = useMemo(
    () => [
      "Python",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "LangChain",
      "LangGraph",
      "C",
      "JavaScript",
      "TypeScript",
      "SQL",
      "Next.js",
      "React",
      "React Native",
      "FastAPI",
      "Flask",
      "GSAP",
      "Tailwind CSS",
      "PostgreSQL",
      "MongoDB",
      "OpenAI Whisper",
      "Google Gemini",
      "TF-IDF",
      "Random Forest",
      "cGAN",
      "Streamlit",
      "Git & GitHub",
    ],
    []
  );

  // Duplicate the array for seamless loop - memoized
  const skills = useMemo(() => [...allSkills, ...allSkills], [allSkills]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="skills" className="py-32 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-24"
        >
          <motion.p
            variants={itemVariants}
            className="text-emerald-400 text-sm font-medium tracking-[0.2em] uppercase mb-6"
          >
            Technical Expertise
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] tracking-tight"
          >
            Skills &
            <br />
            <span className="text-emerald-400">Technologies</span>
          </motion.h2>
        </motion.div>

        {/* Skills conveyor belt */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative mb-24"
        >
          {/* Top row - moving right */}
          <div className="relative overflow-hidden py-8">
            <motion.div
              className="flex gap-8 whitespace-nowrap"
              animate={{
                x: [0, -2400], // Adjust based on content width
              }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={`top-${index}`}
                  className="flex-shrink-0 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 group"
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 30px rgba(52, 211, 153, 0.2)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.02 }}
                >
                  <span className="text-gray-300 font-light text-lg whitespace-nowrap group-hover:text-emerald-400 transition-colors duration-300">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom row - moving left */}
          <div className="relative overflow-hidden py-8">
            <motion.div
              className="flex gap-8 whitespace-nowrap"
              animate={{
                x: [-2400, 0], // Opposite direction
              }}
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={`bottom-${index}`}
                  className="flex-shrink-0 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm hover:bg-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 group"
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 30px rgba(52, 211, 153, 0.3)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.02 }}
                >
                  <span className="text-emerald-200 font-light text-lg whitespace-nowrap group-hover:text-emerald-100 transition-colors duration-300">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Approach section with sequential lighting effects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16"
        >
          {[
            {
              number: "1",
              title: "Research & Planning",
              description:
                "I conduct thorough research and planning to understand project requirements and user needs, ensuring a solid foundation for development.",
              delay: 0,
            },
            {
              number: "2",
              title: "Design & Prototyping",
              description:
                "Creating user-centered designs and interactive prototypes to validate concepts and ensure exceptional user experiences.",
              delay: 0.3,
            },
            {
              number: "3",
              title: "Development & Testing",
              description:
                "Building robust, scalable applications using modern technologies while maintaining high code quality and performance standards.",
              delay: 0.6,
            },
            {
              number: "4",
              title: "Deployment & Optimization",
              description:
                "Deploying applications with focus on performance, accessibility, and continuous improvement based on user feedback.",
              delay: 0.9,
            },
          ].map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 50 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: item.delay,
                type: "spring",
                stiffness: 100,
              }}
              className="relative group space-y-6"
            >
              {/* Enhanced number with sequential lighting effects */}
              <motion.div
                className="relative"
                ref={cardsref}
                initial={{ scale: 0.8 }}
                animate={cardsInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: item.delay + 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {/* Glowing background burst */}
                <motion.div
                  className="absolute inset-0 w-24 h-24 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    cardsInView
                      ? {
                          scale: [0, 1.5, 1],
                          opacity: [0, 0.8, 0.3],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    delay: item.delay + 0.4,
                    ease: "easeOut",
                  }}
                  style={{
                    background: `radial-gradient(circle, 
                      rgba(52, 211, 153, 0.6) 0%, 
                      rgba(52, 211, 153, 0.3) 40%, 
                      transparent 70%)`,
                  }}
                />

                {/* Main number with lighting animation */}
                <motion.div
                  className="relative text-7xl md:text-8xl lg:text-9xl font-light leading-none"
                  initial={{
                    color: "rgba(52, 211, 153, 0.2)",
                    textShadow: "0 0 0px rgba(52, 211, 153, 0)",
                    filter: "brightness(0.3)",
                  }}
                  animate={
                    cardsInView
                      ? {
                          color: "rgba(52, 211, 153, 1)",
                          textShadow: [
                            "0 0 0px rgba(52, 211, 153, 0)",
                            "0 0 40px rgba(52, 211, 153, 0.8)",
                            "0 0 25px rgba(52, 211, 153, 0.6)",
                          ],
                          filter: [
                            "brightness(0.3)",
                            "brightness(1.8)",
                            "brightness(1.2)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.2,
                    delay: item.delay + 0.5,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.1,
                    textShadow: "0 0 50px rgba(52, 211, 153, 1)",
                    filter: "brightness(2)",
                    transition: { duration: 0.3 },
                  }}
                >
                  {item.number}.
                </motion.div>

                {/* Pulsing ring effect */}
                <motion.div
                  className="absolute inset-0 w-20 h-20 border-2 border-emerald-400/30 rounded-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={
                    cardsInView
                      ? {
                          scale: [0.8, 1.3, 1],
                          opacity: [0, 0.8, 0.3],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2.5,
                    delay: item.delay + 0.7,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />

                {/* Secondary pulsing ring */}
                <motion.div
                  className="absolute inset-0 w-16 h-16 border border-emerald-400/20 rounded-full"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={
                    cardsInView
                      ? {
                          scale: [1, 1.5, 1.2],
                          opacity: [0, 0.6, 0.2],
                        }
                      : {}
                  }
                  transition={{
                    duration: 3,
                    delay: item.delay + 1,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />

                {/* Floating particles around number */}
                <div className="absolute inset-0 w-24 h-24 overflow-hidden pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-emerald-400/60 rounded-full"
                      initial={{
                        x: "50%",
                        y: "50%",
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={
                        cardsInView
                          ? {
                              x: `${
                                50 + Math.cos((i * 60 * Math.PI) / 180) * 40
                              }%`,
                              y: `${
                                50 + Math.sin((i * 60 * Math.PI) / 180) * 40
                              }%`,
                              opacity: [0, 1, 0.5, 0],
                              scale: [0, 1.5, 1, 0],
                            }
                          : {}
                      }
                      transition={{
                        duration: 4,
                        delay: item.delay + 0.8 + i * 0.2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Energy waves */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`wave-${i}`}
                    className="absolute inset-0 w-32 h-32 border border-emerald-400/10 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      cardsInView
                        ? {
                            scale: [0, 2, 3],
                            opacity: [0, 0.3, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 3,
                      delay: item.delay + 1.2 + i * 0.8,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>

              {/* Enhanced title */}
              <motion.h3
                className="text-2xl lg:text-3xl font-light text-white leading-tight group-hover:text-emerald-400 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: item.delay + 0.8 }}
              >
                {item.title}
              </motion.h3>

              {/* Enhanced description */}
              <motion.p
                className="text-gray-300 font-light leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: item.delay + 1 }}
              >
                {item.description}
              </motion.p>

              {/* Connection line to next step */}
              {index < 3 && (
                <motion.div
                  className="absolute top-12 -right-6 lg:-right-8 w-12 lg:w-16 h-px bg-gradient-to-r from-emerald-400/50 to-emerald-400/20 hidden lg:block"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={cardsInView ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: item.delay + 1.4,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: "left" }}
                />
              )}

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: "0 0 60px rgba(52, 211, 153, 0.15)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom text */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="mt-32 text-center"
        >
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light max-w-4xl mx-auto">
            My all-encompassing approach and methodology that builds impactful
            digital solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

Skills.displayName = "Skills";

export default Skills;
