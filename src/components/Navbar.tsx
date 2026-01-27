import { Home, X, Github, FileText, ArrowUpRight, Menu, ChevronDown } from "lucide-react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    }
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const mobileItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 }
};

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const navItems = [
    { icon: Home, label: "Home", link: "#" },
    { icon: X, label: "Twitter", link: "#" },
    { icon: Github, label: "GitHub", link: "#" },
    { icon: FileText, label: "Resume", link: "#" },
  ];

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector('nav');
      if (isMenuOpen && nav && !nav.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isMobile]);

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-4 sm:top-6 w-full flex justify-center z-50 px-3 sm:px-4"
      >
        {isMobile ? (
          // Mobile Navigation
          <div className="w-full max-w-md">
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="
                flex items-center justify-between
                px-4 py-3
                rounded-2xl
                bg-white/95
                backdrop-blur-xl
                border border-gray-200
                shadow-lg
                w-full
              "
            >
              {/* Logo/Brand */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                  <Home size={16} className="text-white" />
                </div>
                <span className="font-medium text-gray-800">Portfolio</span>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
                className="
                  p-2
                  rounded-xl
                  bg-gray-100
                  hover:bg-gray-200
                  transition-colors
                  relative
                "
              >
                <motion.div
                  animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu size={20} className="text-gray-700" />
                </motion.div>
                
                {/* Notification dot */}
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </motion.button>
            </motion.div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="
                    absolute
                    top-full
                    left-1/2
                    -translate-x-1/2
                    mt-2
                    w-full
                    max-w-md
                    bg-white/98
                    backdrop-blur-xl
                    border border-gray-200
                    rounded-2xl
                    shadow-2xl
                    overflow-hidden
                    z-40
                  "
                >
                  <div className="p-2">
                    {navItems.map((item, i) => (
                      <motion.a
                        key={i}
                        href={item.link}
                        variants={mobileItemVariants}
                        onClick={() => {
                          setActiveItem(item.label);
                          setIsMenuOpen(false);
                        }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          flex items-center gap-3
                          p-3
                          rounded-xl
                          cursor-pointer
                          mb-1
                          ${activeItem === item.label 
                            ? 'bg-gray-100 text-black' 
                            : 'text-gray-700 hover:bg-gray-50'
                          }
                          transition-all
                        `}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="p-2 rounded-lg bg-gray-100"
                        >
                          <item.icon size={18} />
                        </motion.div>
                        <span className="font-medium flex-1">{item.label}</span>
                        <ChevronDown 
                          size={16} 
                          className={`
                            transition-transform duration-300
                            ${activeItem === item.label ? 'rotate-180' : 'rotate-0'}
                          `}
                        />
                      </motion.a>
                    ))}

                    {/* Mobile Blog Button */}
                    <motion.button
                      variants={mobileItemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="
                        w-full
                        mt-3
                        px-4 py-3
                        bg-black
                        text-white
                        rounded-xl
                        font-medium
                        shadow-lg
                        flex items-center justify-center gap-2
                      "
                    >
                      <span>My Blog</span>
                      <ArrowUpRight size={16} />
                    </motion.button>
                  </div>

                  {/* Mobile Menu Footer */}
                  <div className="p-3 border-t border-gray-200 bg-gray-50/50">
                    <p className="text-xs text-gray-500 text-center">
                      Tap outside to close menu
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          // Desktop Navigation
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="
              flex items-center gap-1
              px-6 sm:px-8 py-3
              rounded-3xl
              bg-white/95
              backdrop-blur-xl
              border border-gray-200
              shadow-lg
              relative
              overflow-hidden
              max-w-2xl
            "
          >
            {/* Subtle moving line effect */}
            <motion.div
              className="absolute inset-x-0 top-0 h-0.5 bg-gray-900"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {navItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                variants={itemVariants}
                whileHover="hover"
                initial="initial"
                className="
                  relative
                  p-3
                  rounded-xl
                  cursor-pointer
                  group
                  overflow-hidden
                "
              >
                {/* Expanding background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gray-100 -z-10"
                  initial={{ 
                    scale: 0.8,
                    opacity: 0,
                    borderRadius: "50%"
                  }}
                  whileHover={{ 
                    scale: 1,
                    opacity: 1,
                    borderRadius: "12px"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                />

                {/* Smooth slide effect */}
                <motion.div
                  className="absolute inset-0 bg-black/5 -z-20"
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "0%", opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon 
                      size={18} 
                      className="
                        text-gray-700
                        group-hover:text-black
                        transition-colors
                        duration-300
                      " 
                    />
                  </motion.div>
                  
                  {/* Label that appears on hover */}
                  <AnimatePresence>
                    <motion.span
                      initial={{ opacity: 0, width: 0, x: -10 }}
                      animate={{ 
                        opacity: 1, 
                        width: "auto", 
                        x: 0,
                        transition: {
                          duration: 0.3,
                          ease: "easeOut"
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        width: 0, 
                        x: -10,
                        transition: {
                          duration: 0.2
                        }
                      }}
                      className="
                        text-sm font-medium
                        text-gray-700
                        group-hover:text-black
                        whitespace-nowrap
                        overflow-hidden
                      "
                    >
                      {item.label}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Subtle border animation */}
                <motion.div
                  className="absolute inset-0 rounded-xl border border-transparent group-hover:border-gray-300"
                  initial={false}
                  whileHover={{
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ 
                  scale: 1.06,
                  backgroundColor: "#000"
                }}
                whileTap={{ scale: 0.97 }}
                className="
                  relative
                  ml-3
                  px-6 py-2.5
                  bg-black
                  text-white
                  rounded-full
                  text-sm
                  font-medium
                  shadow-md
                  overflow-hidden
                  group
                  flex items-center gap-2
                "
              >
                {/* Clean slide effect */}
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <span>My Blog</span>
                <ArrowUpRight 
                  size={14} 
                  className="
                    opacity-0 group-hover:opacity-100
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    transition-all duration-300
                  "
                />
              </motion.button>
            </motion.div>

            {/* Minimal dots indicator */}
            <motion.div
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {[1, 2, 3].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-1 h-1 rounded-full bg-gray-400"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: dot * 0.3,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.nav>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;