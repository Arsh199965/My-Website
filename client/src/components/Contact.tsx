"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "arsh199965@gmail.com",
      href: "mailto:arsh199965@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/arsh199965",
      href: "https://github.com/arsh199965",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/arsh-ahmad",
      href: "https://linkedin.com/in/arsh-ahmad-2bb070244",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Available Worldwide",
      href: null,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    <section id="contact" className="py-32 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
      </div>

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
            <div className="h-px bg-emerald-400 w-16"></div>
            <p className="text-emerald-400 text-sm font-medium tracking-[0.2em] uppercase">
              ＊ Connect ＊ Collaborate ＊ Create ＊ Contact ＊
            </p>
            <div className="h-px bg-emerald-400 w-16"></div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] tracking-tight mb-8"
          >
            Let&apos;s Work
            <br />
            <span className="text-emerald-400">Together</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto"
          >
            Ready to bring your next project to life? I&apos;m always excited to
            work on innovative projects and collaborate with forward-thinking
            teams.
          </motion.p>
        </motion.div>

        {/* Contact content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {/* Contact information */}
          <motion.div variants={itemVariants} className="space-y-12">
            <div>
              <h3 className="text-3xl md:text-4xl font-light text-white mb-6">
                Get in Touch
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed font-light mb-12">
                Whether you have a project in mind, want to discuss
                opportunities, or just want to connect, I&apos;d love to hear
                from you. Let&apos;s create something amazing together.
              </p>
            </div>

            <div className="space-y-8">
              {contactInfo.map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  className="group"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20"
                    >
                      <div className="flex-shrink-0 w-14 h-14 bg-emerald-400/10 border border-emerald-400/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-400/20 group-hover:border-emerald-400/40 transition-all duration-300">
                        <item.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm text-emerald-400 font-medium tracking-wider uppercase mb-1">
                          {item.label}
                        </p>
                        <p className="text-lg text-white font-light">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-sm">
                      <div className="flex-shrink-0 w-14 h-14 bg-emerald-400/10 border border-emerald-400/20 rounded-xl flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm text-emerald-400 font-medium tracking-wider uppercase mb-1">
                          {item.label}
                        </p>
                        <p className="text-lg text-white font-light">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div variants={itemVariants}>
            <div className="p-8 lg:p-12 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-sm">
              <h3 className="text-3xl md:text-4xl font-light text-white mb-8">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-emerald-400 font-medium tracking-wider uppercase mb-3"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.08] transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-emerald-400 font-medium tracking-wider uppercase mb-3"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.08] transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-emerald-400 font-medium tracking-wider uppercase mb-3"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.08] transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-emerald-400 text-black rounded-xl font-medium transition-all duration-300 hover:bg-emerald-300"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-32 pt-16 border-t border-white/10"
        >
          <p className="text-lg text-gray-400 font-light mb-6">
            © 2024 Arsh Ahmad. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 font-light">
            Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
