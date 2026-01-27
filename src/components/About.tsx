import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import avatar from "../assets/avatar.jpg";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const About = () => {
  const [activeParagraph, setActiveParagraph] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch interactions for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent, index: number) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;
    
    // Only toggle if it's mostly a tap (not a scroll)
    if (Math.abs(diff) < 10) {
      setActiveParagraph(index === activeParagraph ? null : index);
    }
  };

  // Scroll progress and reading detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.clientHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsReading(rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const paragraphs = [
    "My tech journey started in 2020 during the COVID lockdown. I was a 200-level Physiology student at the University of Ilorin, stuck at home with nothing much to do. That moment of stillness led me to seek advice from colleagues, including Prince Appiah and Abdulrazak, who encouraged me to start tech.",
    "I purchased a Python course by Jose Portilla, one of the top Udemy instructors at the time. That was where I learned Python and Django for backend development. While learning backend, I became fascinated by how web interfaces work — how design turns into real interactive experiences. That curiosity led me into frontend development through Colt Steele's full-stack web development course (60+ hours).",
    "From there, I went fully into full-stack development, building APIs and consuming them in frontend applications. Although I didn't build the YelpCamp project from the course, I took the knowledge and built my own full e-commerce platform from scratch.",
    "This project included product listing, full e-commerce functionality, custom backend APIs, and an admin dashboard. There were no templates and very few UI libraries — everything was built from scratch. That project became my true introduction to building real products.",
    "I later joined the HNG Internship while in 300-level. Although I had to drop at Stage 4 due to health challenges, the experience exposed me to collaborating with designers, working with deadlines, pitching products, and building in structured teams. It shaped my professional workflow.",
    "After that, I transitioned into Java as a backend engineer while still building side projects using React, Node.js, and Express. My first freelance role came from a final-year student who needed a backend system for his defense project. That became my first client experience.",
    "Since then, I have worked on a fintech product, contributed to an LMS startup called Guided, and collaborated with top engineers in Ilorin through an agency building client products.",
    "I've also mentored and tutored junior developers across different schools in Ilorin, including Tosh Consult and Kwara Tech, in onsite roles. Teaching helped strengthen my communication and leadership skills.",
    "I built my first EdTech startup, EduLink, using Java, where I also collaborated with and managed a development team.",
    "Today, I focus on building scalable backend systems, modern full-stack applications, and products that solve real-world problems. I don't just code — I think in systems, users, and long-term product growth."
  ];

  const links = [
    { label: "E-commerce Frontend", url: "https://frontend0.onrender.com/" },
    { label: "Admin Dashboard", url: "https://myadminpanel.onrender.com/" },
    { label: "EduLink", url: "https://edulink-kbad.onrender.com" }
  ];

  const skills = [
    "Python", "Django", "JavaScript", "React", "Node.js", "Express",
    "Java", "Backend Systems", "Full-Stack", "API Design", "System Architecture",
    "Team Leadership", "Product Thinking"
  ];

  return (
    <section 
      ref={sectionRef}
      id="about-section"
      className="min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-20 lg:py-24 relative bg-white"
    >
      {/* Progress Indicator - Hidden on very small mobile */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-black z-50 hidden xs:block"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Reading Indicator - Hidden on mobile, shown on tablet+ */}
      <motion.div 
        className="fixed top-4 right-4 flex items-center gap-2 z-50  md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: isReading ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="w-2 h-2 bg-black rounded-full"
          animate={{ scale: isReading ? [1, 1.5, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <span className="text-xs font-medium text-black">Reading...</span>
      </motion.div>

      {/* Mobile reading indicator */}
      {isMobile && (
        <motion.div 
          className="fixed bottom-4 right-4 w-10 h-10 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center z-50"
          animate={{ opacity: isReading ? 1 : 0.3 }}
        >
          <div className="w-2 h-2 bg-black rounded-full" />
        </motion.div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
        className="max-w-3xl w-full px-2 sm:px-0"
      >
        {/* Header Section */}
        <motion.div variants={item} className="text-center mb-10 sm:mb-14 md:mb-16">
          <motion.div
            className="relative inline-block mb-4 sm:mb-6"
            whileHover={{ scale: isMobile ? 1 : 1.05 }}
          >
            <motion.img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-3 sm:border-4 border-black object-cover shadow-lg"
              whileHover={{ rotate: isMobile ? 0 : 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-dashed border-black"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          <motion.h1
            variants={item}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 tracking-tight"
          >
            About Me
          </motion.h1>
          
          <motion.div 
            variants={item}
            className="w-20 sm:w-24 h-1 bg-black mx-auto mb-4 sm:mb-6 md:mb-8"
          />
          
          <motion.p 
            variants={item}
            className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-2 sm:px-0"
          >
            Full-stack developer & product thinker with a focus on scalable systems
          </motion.p>
        </motion.div>

        {/* Timeline Indicator - Hidden on mobile, shown on tablet+ */}
        {!isMobile && (
          <motion.div variants={item} className="relative mb-8 md:mb-12 hidden md:block">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200" />
            {paragraphs.map((_, index) => (
              <motion.div
                key={index}
                className="absolute left-0 w-2 h-2 bg-black rounded-full -ml-1"
                style={{ top: `${(index / (paragraphs.length - 1)) * 100}%` }}
                animate={{ 
                  scale: activeParagraph === index ? 1.5 : 1,
                  backgroundColor: activeParagraph === index ? "#000" : "#666"
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>
        )}

        {/* Mobile timeline indicator */}
        {isMobile && (
          <motion.div 
            variants={item}
            className="flex justify-center mb-6"
          >
            <div className="flex items-center gap-1">
              {paragraphs.slice(0, 5).map((_, index) => (
                <motion.div
                  key={index}
                  className="w-1.5 h-1.5 rounded-full bg-gray-300"
                  animate={{ 
                    scale: activeParagraph === index ? 1.3 : 1,
                    backgroundColor: activeParagraph === index ? "#000" : "#e5e7eb"
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Content with Interactive Paragraphs */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {paragraphs.map((paragraph, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`relative group ${isMobile ? 'pl-2' : 'md:pl-0'}`}
              onMouseEnter={() => !isMobile && setActiveParagraph(index)}
              onMouseLeave={() => !isMobile && setActiveParagraph(null)}
              onClick={() => !isMobile && setActiveParagraph(index === activeParagraph ? null : index)}
              onTouchStart={(e) => handleTouchStart(e)}
              onTouchEnd={(e) => handleTouchEnd(e, index)}
            >
              {/* Paragraph Number - Hidden on very small mobile */}
              <motion.div 
                className={`absolute top-0 text-sm font-mono text-gray-400 group-hover:text-black
                  ${isMobile ? 'hidden xs:block -left-8' : '-left-12'}`}
                animate={{ x: activeParagraph === index && !isMobile ? -5 : 0 }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.div>

              {/* Paragraph Content */}
              <motion.p
                className={`leading-relaxed cursor-pointer transition-all duration-300 
                  ${isMobile ? 
                    'text-base pl-0 active:pl-2' : 
                    'text-lg md:text-xl pl-0 group-hover:pl-4'
                  }
                  ${activeParagraph === index ? 
                    "text-black font-medium" : 
                    "text-gray-700"
                  }`}
                animate={!isMobile ? {
                  paddingLeft: activeParagraph === index ? "1rem" : "0",
                  borderLeftWidth: activeParagraph === index ? "2px" : "0px"
                } : {}}
                style={{ borderLeftColor: "#000" }}
              >
                {paragraph}
                
                {/* Highlight year and key terms - Responsive styling */}
                {paragraph.includes('2020') && (
                  <span className="inline-block bg-black text-white px-1.5 sm:px-2 py-0.5 sm:py-1 ml-1 sm:ml-2 text-xs sm:text-sm rounded mt-1 sm:mt-0">
                    2020
                  </span>
                )}
                {paragraph.includes('full-stack development') && (
                  <span className="inline-block border border-black px-1.5 sm:px-2 py-0.5 sm:py-1 ml-1 sm:ml-2 text-xs sm:text-sm rounded mt-1 sm:mt-0">
                    full-stack
                  </span>
                )}
              </motion.p>

              {/* Expandable Details */}
              {index === 3 && activeParagraph === 3 && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                  className={`${isMobile ? 'ml-2 p-3' : 'ml-4 p-4'} bg-gray-50 rounded-lg border border-gray-200`}
                >
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">🔗 Project Links:</p>
                  <div className="space-y-1 sm:space-y-2">
                    {links.slice(0, 2).map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm hover:text-black transition-colors break-all"
                      >
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full shrink-0" />
                        <span className="truncate">{link.label}</span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}

              {index === 8 && activeParagraph === 8 && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                  className={`${isMobile ? 'ml-2 p-3' : 'ml-4 p-4'} bg-gray-50 rounded-lg border border-gray-200`}
                >
                  <a
                    href={links[2].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm hover:text-black transition-colors break-all"
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full shrink-0" />
                    <span className="truncate">{links[2].label}</span>
                  </a>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Skills/Tags at Bottom */}
        <motion.div 
          variants={item}
          className="mt-12 sm:mt-14 md:mt-16 pt-6 sm:pt-8 border-t border-gray-200"
        >
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-3 sm:mb-4">TECHNOLOGIES & SKILLS</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border border-black rounded-full hover:bg-black hover:text-white transition-colors cursor-default"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: isMobile ? 0 : -2 }}
                whileTap={{ scale: isMobile ? 0.95 : 1 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Navigation Hint - Different for mobile vs desktop */}
        <motion.div 
          variants={item}
          className="mt-8 sm:mt-10 md:mt-12 text-center text-xs sm:text-sm text-gray-500"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          {isMobile ? (
            <span className="flex items-center justify-center gap-1">
              <span className="inline-block w-4 h-4 border-2 border-gray-500 rounded-full"></span>
              Tap paragraphs for details
            </span>
          ) : (
            "↑ Scroll to navigate • Click paragraphs to expand details"
          )}
        </motion.div>
      </motion.div>

      {/* Mobile bottom navigation indicator */}
      {isMobile && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 h-2 bg-linear-to-r from-transparent via-black to-transparent opacity-20"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
    </section>
  );
};

export default About;