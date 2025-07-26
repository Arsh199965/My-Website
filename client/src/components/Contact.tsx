"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState, memo, useMemo, useCallback, useEffect } from "react";
import emailjs from "@emailjs/browser";

const Contact = memo(() => {
  const [ref, inView] = useInView({
    triggerOnce: false, // Changed to false so animations replay when coming back into view
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Generate deterministic particle positions
  const particles = useMemo(() => {
    const positions = [];
    // Using a simple deterministic sequence instead of Math.random()
    for (let i = 0; i < 15; i++) {
      const seed = i * 137.508; // Golden angle for even distribution
      positions.push({
        id: i,
        left: ((seed % 360) / 360) * 100,
        top: (((seed * 1.618) % 360) / 360) * 100,
        duration: 3 + (i % 3),
        delay: i * 0.2,
      });
    }
    return positions;
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const contactInfo = useMemo(
    () => [
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
    ],
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (isSubmitting) return;

      setIsSubmitting(true);
      setSubmitStatus("idle");

      try {
        // EmailJS configuration - using environment variables
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
          throw new Error(
            "EmailJS configuration is incomplete. Please check your environment variables."
          );
        }

        // Template parameters for EmailJS - matching the custom template structure
        const templateParams = {
          name: formData.name,
          from_email: formData.email,
          name_first_letter: formData.name.charAt(0).toUpperCase(),
          to_email: "arsh199965@gmail.com",
          message: formData.message,
          subject: `New Portfolio Contact from ${formData.name}`,
          time: new Date().toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
          }),
        };

        // Send email using EmailJS
        await emailjs.send(serviceId, templateId, templateParams, publicKey);

        // Success
        setSubmitStatus("success");
        setStatusMessage(
          "Message sent successfully! I'll get back to you soon."
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
          setStatusMessage("");
        }, 5000);
      } catch (error) {
        console.error("EmailJS Error:", error);
        setSubmitStatus("error");
        setStatusMessage(
          "Failed to send message. Please try again or contact me directly at arsh199965@gmail.com"
        );

        // Clear error message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
          setStatusMessage("");
        }, 5000);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, isSubmitting]
  );

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
      {/* Enhanced Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />

        {/* Animated gradient blobs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 0.8, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles - only render on client */}
        {isMounted &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-emerald-400/20 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
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
            className="inline-flex items-center gap-4 mb-8 relative"
          >
            <motion.div
              className="h-px bg-emerald-400 w-16"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ originX: 0 }}
            ></motion.div>
            <motion.p
              className="text-emerald-400 text-sm font-medium tracking-[0.2em] uppercase relative"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.span
                animate={
                  inView
                    ? {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }
                    : {}
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background:
                    "linear-gradient(90deg, #34d399, #10b981, #059669, #10b981, #34d399)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ＊ Connect ＊ Collaborate ＊ Create ＊ Contact ＊
              </motion.span>
            </motion.p>
            <motion.div
              className="h-px bg-emerald-400 w-16"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ originX: 1 }}
            ></motion.div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] tracking-tight mb-8"
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Let&apos;s Work
            </motion.span>
            <br />
            <motion.span
              className="text-emerald-400 inline-block"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              Together
            </motion.span>
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
                    <motion.a
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
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="flex-shrink-0 w-14 h-14 bg-emerald-400/10 border border-emerald-400/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-400/20 group-hover:border-emerald-400/40 transition-all duration-300"
                        whileHover={{
                          rotate: 5,
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <item.icon className="w-6 h-6 text-emerald-400" />
                      </motion.div>
                      <div>
                        <p className="text-sm text-emerald-400 font-medium tracking-wider uppercase mb-1">
                          {item.label}
                        </p>
                        <p className="text-lg text-white font-light">
                          {item.value}
                        </p>
                      </div>
                    </motion.a>
                  ) : (
                    <motion.div
                      className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-sm"
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.div
                        className="flex-shrink-0 w-14 h-14 bg-emerald-400/10 border border-emerald-400/20 rounded-xl flex items-center justify-center"
                        whileHover={{
                          rotate: 5,
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <item.icon className="w-6 h-6 text-emerald-400" />
                      </motion.div>
                      <div>
                        <p className="text-sm text-emerald-400 font-medium tracking-wider uppercase mb-1">
                          {item.label}
                        </p>
                        <p className="text-lg text-white font-light">
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="p-8 lg:p-12 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-sm"
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.3 },
              }}
            >
              <motion.h3
                className="text-3xl md:text-4xl font-light text-white mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Send a Message
              </motion.h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm text-emerald-400 font-medium tracking-wider uppercase mb-3"
                  >
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.08] transition-all duration-300"
                    placeholder="Your name"
                    whileFocus={{
                      scale: 1.01,
                      transition: { duration: 0.2 },
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm text-emerald-400 font-medium tracking-wider uppercase mb-3"
                  >
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.08] transition-all duration-300"
                    placeholder="your.email@example.com"
                    whileFocus={{
                      scale: 1.01,
                      transition: { duration: 0.2 },
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm text-emerald-400 font-medium tracking-wider uppercase mb-3"
                  >
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.08] transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or just say hello..."
                    whileFocus={{
                      scale: 1.01,
                      transition: { duration: 0.2 },
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  {/* Status Message */}
                  {submitStatus !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl mb-4 flex items-center gap-3 ${
                        submitStatus === "success"
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                          : "bg-red-500/10 border border-red-500/20 text-red-400"
                      }`}
                    >
                      {submitStatus === "success" ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <p className="text-sm">{statusMessage}</p>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={
                      !isSubmitting
                        ? {
                            scale: 1.02,
                            boxShadow: "0 0 30px rgba(52, 211, 153, 0.3)",
                            transition: { duration: 0.2 },
                          }
                        : {}
                    }
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                      isSubmitting
                        ? "bg-emerald-400/50 text-black/50 cursor-not-allowed"
                        : "bg-emerald-400 text-black hover:bg-emerald-300"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-32 pt-16 border-t border-white/10 relative"
        >
          <motion.div
            className="absolute inset-0 -top-px"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.3), transparent)",
              height: "1px",
              originX: 0.5,
            }}
          />
          <motion.p
            className="text-lg text-gray-400 font-light mb-6"
            whileHover={{
              color: "#9ca3af",
              transition: { duration: 0.2 },
            }}
          >
            © 2024 Arsh Ahmad. All rights reserved.
          </motion.p>
          <motion.p
            className="text-sm text-gray-500 font-light"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
