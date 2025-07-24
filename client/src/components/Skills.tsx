"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // All skills in a flat array for the conveyor belt
  const allSkills = [
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
  ];

  // Duplicate the array for seamless loop
  const skills = [...allSkills, ...allSkills];

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

        {/* Approach section like the inspiration site */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-4 gap-12"
        >
          {[
            {
              number: "1.",
              title: "Research & Planning",
              description:
                "I conduct thorough research and planning to understand project requirements and user needs, ensuring a solid foundation for development.",
            },
            {
              number: "2.",
              title: "Design & Prototyping",
              description:
                "Creating user-centered designs and interactive prototypes to validate concepts and ensure exceptional user experiences.",
            },
            {
              number: "3.",
              title: "Development & Testing",
              description:
                "Building robust, scalable applications using modern technologies while maintaining high code quality and performance standards.",
            },
            {
              number: "4.",
              title: "Deployment & Optimization",
              description:
                "Deploying applications with focus on performance, accessibility, and continuous improvement based on user feedback.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.number}
              variants={itemVariants}
              className="space-y-6"
            >
              <div className="text-6xl font-light text-emerald-400/30">
                {item.number}
              </div>
              <h3 className="text-2xl font-light text-white leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-300 font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom text */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
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
};

export default Skills;
