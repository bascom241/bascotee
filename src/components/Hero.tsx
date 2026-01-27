import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import avatar from "../assets/avatar.jpg"
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item:Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-3xl text-center"
      >
        {/* Avatar */}
        <motion.div variants={item} className="flex justify-center mb-6">
          <motion.img
            src={avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-purple-600"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 150 }}
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={item}
          className="text-4xl md:text-5xl font-bold leading-tight"
        >
          Hey, I'm <span className="text-black">Abdulbasit Abdulwahab.</span>
          <br />
          Software Engineer
        </motion.h1>

        {/* Text */}
        <motion.p
          variants={item}
          className="mt-4 text-gray-500 text-base md:text-lg"
        >
          Creating innovative solutions and captivating designs.
          <br />
          University student by day, visionary creator by night.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={item}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 bg-black text-white rounded-full font-medium"
          >
            Hire Me!
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-green-100 text-green-700 text-sm font-medium"
          >
            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
            Available for new project
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
