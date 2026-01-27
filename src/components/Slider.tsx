import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import type { SliderItem } from "../utils/SliderData";
import { sliderData } from "../utils/SliderData";
import type { JSX } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Heart } from "lucide-react";
import type { Variants } from "framer-motion";

const Slider = (): JSX.Element => {
  const [active, setActive] = useState<SliderItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  console.log(isHovered)
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive slides per view
  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      const isMobileDevice = width < 768;
      setIsMobile(isMobileDevice);
      
      if (width < 640) {
        setSlidesPerView(1);
      } else if (width < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  // Calculate transform based on slides per view
  const transformValue = -currentIndex * (100 / slidesPerView);

  const nextSlide = () => {
    const maxIndex = Math.max(0, sliderData.length - slidesPerView);
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, sliderData.length - slidesPerView);
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  // Touch swipe for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

 

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden bg-linear-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Visual Stories
          </h2>
          <p className="text-gray-600 text-sm xs:text-base max-w-2xl mx-auto px-2">
            Explore captivating stories through stunning visuals. Click to dive deeper.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div 
          ref={containerRef}
          className="relative"
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Buttons - Hide on mobile */}
          {!isMobile && (
            <>
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:bg-white border border-gray-200"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:bg-white border border-gray-200"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800" />
              </motion.button>
            </>
          )}

          {/* Progress Bar */}
          <div className="absolute -top-6 sm:-top-8 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden z-20">
            <div 
              className="h-full bg-linear-to-r from-gray-800 to-gray-600 transition-all duration-500"
              style={{ 
                width: `${((currentIndex + 1) / Math.max(1, sliderData.length - slidesPerView + 1)) * 100}%` 
              }}
            />
          </div>

          {/* Mobile Swipe Indicator */}
          {isMobile && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-gray-500">
              <span className="animate-pulse">← Swipe →</span>
            </div>
          )}

          {/* Slider Track */}
          <div className="overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl bg-white/50 backdrop-blur-sm border border-gray-100">
            <motion.div
              ref={sliderRef}
              className="flex touch-pan-x"
              animate={{ x: `${transformValue}%` }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 1
              }}
            >
              {sliderData.map((item: any, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ 
                    scale: isMobile ? 1 : 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: isMobile ? 0.98 : 1 }}
                  onClick={() => setActive(item)}
                  className={`
                    ${slidesPerView === 1 ? 'min-w-full px-2' : ''}
                    ${slidesPerView === 2 ? 'min-w-1/2 px-3' : ''}
                    ${slidesPerView === 3 ? 'min-w-1/3 px-4' : ''}
                    py-4 sm:py-6 lg:py-8 cursor-pointer group relative
                  `}
                >
                  {/* Card */}
                  <div className="relative rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden bg-linear-to-br from-white to-gray-50 shadow-md border border-gray-200 group-hover:shadow-xl transition-all duration-500 h-70 sm:h-80 md:h-90 lg:h-105">
                    {/* Image Container */}
                    <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                        whileHover={{ scale: isMobile ? 1 : 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Expand Icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: isMobile ? 0.9 : 1 }}
                        className="absolute top-3 right-3 w-8 h-8 lg:w-10 lg:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md lg:shadow-lg"
                      >
                        <Maximize2 className="w-3 h-3 lg:w-4 lg:h-4 text-gray-800" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 lg:p-6">
                      <motion.h3 
                        className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-gray-800 transition-colors line-clamp-1"
                        whileHover={{ x: isMobile ? 0 : 5 }}
                      >
                        {item.title}
                      </motion.h3>
                      
                      <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">
                        {item.reason}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                          <span>2.4k</span>
                        </div>
                        <div className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          #{index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-800 rounded-lg sm:rounded-xl lg:rounded-2xl transition-all duration-500 pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {Array.from({ length: Math.max(1, sliderData.length - slidesPerView + 1) }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: isMobile ? 1 : 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentIndex(index)}
                className={`
                  transition-all duration-300 rounded-full
                  ${index === currentIndex 
                    ? "bg-gray-800" 
                    : "bg-gray-300 hover:bg-gray-400"
                  }
                  ${isMobile ? 'w-2 h-2' : 'w-3 h-3'}
                  ${index === currentIndex && !isMobile ? 'w-6 sm:w-8' : ''}
                `}
              />
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          {isMobile && (
            <div className="flex justify-center gap-4 mt-6">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg font-medium shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg font-medium shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Modal - Responsive */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              layoutId={`card-${active.id}`}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col mx-2"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 25
              }}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white border border-gray-200"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800" />
              </motion.button>

              {/* Image */}
              <div className="relative h-50 sm:h-62.5 md:h-75 lg:h-87.5 bg-gray-50 flex items-center justify-center overflow-hidden">
                <motion.img
                  src={active.image}
                  alt={active.title}
                  className="max-w-full max-h-full object-contain p-2 sm:p-4"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex-1 overflow-y-auto">
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4"
                >
                  {active.title}
                </motion.h3>

                {/* BOLD Description */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4 sm:mb-6"
                >
                  <p className="text-lg sm:text-xl md:text-2xl font-black leading-relaxed tracking-tight bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {active.reason}
                  </p>
                </motion.div>

                {/* Additional Content */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base"
                >
                  <p>
                    This visual story captures the essence of creativity and innovation. 
                    Each element has been carefully crafted to tell a compelling narrative.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
                    <div className="px-3 py-1.5 bg-gray-100 rounded-full text-xs sm:text-sm">
                      Visual Design
                    </div>
                    <div className="px-3 py-1.5 bg-gray-100 rounded-full text-xs sm:text-sm">
                      Storytelling
                    </div>
                    <div className="px-3 py-1.5 bg-gray-100 rounded-full text-xs sm:text-sm">
                      Art Direction
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8"
                >
                  <motion.button
                    whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 bg-gray-900 text-white rounded-lg sm:rounded-xl font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    View Full Story
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActive(null)}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg sm:rounded-xl font-medium hover:border-gray-800 hover:bg-gray-50 text-sm sm:text-base"
                  >
                    Close
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Slider;