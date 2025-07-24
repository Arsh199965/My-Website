"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
          className="mb-32"
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <p className="text-emerald-400 text-sm font-medium tracking-[0.2em] uppercase mb-6">
              Approach
            </p>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[0.9] tracking-tight">
              My comprehensive{" "}
              <span className="text-emerald-400">development</span> approach
              that delivers intelligent solutions.
            </h3>
          </motion.div>

          {/* 4-column grid */}
          <div className="grid lg:grid-cols-4 gap-16">
            {[
              {
                number: "1.",
                title: "Data Collection & Analysis",
                description:
                  "I gather and analyze datasets, performing exploratory data analysis to understand patterns, identify features, and prepare clean, structured data for machine learning models.",
              },
              {
                number: "2.",
                title: "Model Development & Training",
                description:
                  "I design and implement machine learning models using PyTorch and Scikit-learn, conducting iterative training with proper validation techniques to ensure optimal performance.",
              },
              {
                number: "3.",
                title: "Generative AI Integration",
                description:
                  "I leverage LangChain and modern Gen AI technologies to build intelligent applications that can understand, process, and generate human-like responses for various use cases.",
              },
              {
                number: "4.",
                title: "Deployment & Optimization",
                description:
                  "I deploy ML models into production environments, creating user-friendly web interfaces and ensuring scalable, efficient solutions that solve real-world problems.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.number}
                variants={itemVariants}
                className="space-y-6"
              >
                <div className="text-6xl md:text-7xl font-light text-emerald-400/30">
                  {item.number}
                </div>
                <h4 className="text-2xl md:text-3xl font-light text-white leading-tight">
                  {item.title}
                </h4>
                <p className="text-gray-300 font-light leading-relaxed text-lg">
                  {item.description}
                </p>

                
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats section like the inspiration */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h3
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-20"
          >
            It's not just about algorithms. It's about impact and creating
            intelligent solutions
            <br />
            that make a difference in people's lives.
          </motion.h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { number: "3+", label: "ML Projects Completed" },
              { number: "2024", label: "Started AI Journey" },
              { number: "100%", label: "Commitment to Learning" },
              { number: "∞", label: "Passion for Innovation" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl lg:text-7xl font-light text-emerald-400 mb-4">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-light text-lg leading-relaxed">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
