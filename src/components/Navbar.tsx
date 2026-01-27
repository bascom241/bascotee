import { Home, X, Github, FileText, ArrowUpRight, Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const navVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const mobileMenuVariants = {
  closed: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
  open: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, staggerChildren: 0.1, delayChildren: 0.1 } },
};

const mobileItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 },
};

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const navItems = [
    { icon: Home, label: "Home", link: "/" },
    { icon: X, label: "Twitter", link: "https://x.com/basscotte_" },
    { icon: Github, label: "GitHub", link: "https://github.com/bascom241" },
    { icon: FileText, label: "Resume", link: "/resume.pdf", download: true },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMenuOpen && isMobile) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
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
          <div className="w-full max-w-md">
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-gray-200 shadow-lg w-full"
            >
              {/* Logo */}
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                  <Home size={16} className="text-white" />
                </div>
                <span className="font-medium text-gray-800">Portfolio</span>
              </motion.div>

              {/* Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 relative"
              >
                <motion.div animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
                  <Menu size={20} className="text-gray-700" />
                </motion.div>
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </motion.button>
            </motion.div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-full max-w-md bg-white/98 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-40"
                >
                  <div className="p-2">
                    {/* Nav Links */}
                    {navItems.map((item, i) => (
                      <motion.a
                        key={i}
                        href={item.link}
                        download={item.download ? "resume.pdf" : undefined}
                        target="_blank"
                        rel="noreferrer"
                        variants={mobileItemVariants}
                        onClick={() => { setActiveItem(item.label); setIsMenuOpen(false); }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer mb-1 ${
                          activeItem === item.label ? "bg-gray-100 text-black" : "text-gray-700 hover:bg-gray-50"
                        } transition-all`}
                      >
                        <motion.div whileHover={{ scale: 1.1 }} className="p-2 rounded-lg bg-gray-100">
                          <item.icon size={18} />
                        </motion.div>
                        <span className="font-medium flex-1">{item.label}</span>
                        <ChevronDown size={16} className={`transition-transform duration-300 ${activeItem === item.label ? 'rotate-180' : 'rotate-0'}`} />
                      </motion.a>
                    ))}

                    {/* My Blog Button */}
                    <motion.button
                      variants={mobileItemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-3 px-4 py-3 bg-black text-white rounded-xl font-medium shadow-lg flex items-center justify-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to="/my-blog">
                        <span>My Blog</span>
                      </Link>
                      <ArrowUpRight size={16} />
                    </motion.button>
                  </div>

                  <div className="p-3 border-t border-gray-200 bg-gray-50/50">
                    <p className="text-xs text-gray-500 text-center">Tap outside to close menu</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          // Desktop menu
          <motion.div className="flex items-center gap-1 px-6 sm:px-8 py-3 rounded-3xl bg-white/95 backdrop-blur-xl border border-gray-200 shadow-lg relative overflow-hidden max-w-3xl">
            {navItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                download={item.download ? "resume.pdf" : undefined}
                target="_blank"
                rel="noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 p-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all relative"
              >
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.a>
            ))}

            {/* My Blog Desktop Button */}
            <motion.div className="ml-3">
              <motion.button
                whileHover={{ scale: 1.06, backgroundColor: "#000" }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-medium shadow-md flex items-center gap-2 overflow-hidden"
              >
                <Link to="/my-blog">
                  <span>My Blog</span>
                </Link>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </motion.nav>

      {/* Mobile backdrop */}
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
