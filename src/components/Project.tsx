import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ExternalLink, Github, ChevronRight, X, Zap, Code, Star, ArrowRight, Maximize2, Play, Pause, Smartphone, Briefcase, FolderGit2 } from 'lucide-react';
import p1 from "../assets/projects/guided.png";
import p2 from "../assets/projects/connect.png";
import p3 from "../assets/projects/Screenshot 2025-08-09 182308.png";

import ShopIt from "../assets/projects/portfolio2.png"
import ShopItAdmin from "../assets/projects/admin.png"
import doctor from "../assets/projects/portfolio3.png"
import span from "../assets/projects/portfolio4.png"
import achi from "../assets/projects/archi.png"
import edulink from "../assets/projects/edulink.png"
import pharmalink from "../assets/projects/pharmalink.jpg"
import chow from "../assets/projects/chow.jpg"
// Define TypeScript interfaces
interface ProjectStats {
  [key: string]: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  link: string;
  gitHub?: string;
  challenges: string[];
  solutions: string[];
  impact: string;
  featured?: boolean;
  stats?: ProjectStats;
  category: 'side' | 'professional' | 'mobile';
}

interface ProjectCardProps {
  project: Project;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  handleProjectClick: (project: Project) => void;
}

// Tab configuration
type TabType = 'side' | 'professional' | 'mobile';

const tabs: { id: TabType; label: string; icon: React.ReactNode; count: number }[] = [
  { 
    id: 'side', 
    label: 'Side Projects', 
    icon: <FolderGit2 size={20} />,
    count: 6 
  },
  { 
    id: 'professional', 
    label: 'Professional Work', 
    icon: <Briefcase size={20} />,
    count: 2 
  },
  { 
    id: 'mobile', 
    label: 'Mobile Apps', 
    icon: <Smartphone size={20} />,
    count: 2 
  },
];

const projects: Project[] = [
  // Side Projects (Category: 'side')
  {
    id: 1,
    title: "GuidEd - Learning Management System",
    description: "A comprehensive online education platform connecting students with instructors through interactive courses.",
    image: p1,
    techStack: ["React", "Node.js", "MongoDB", "Express", "JWT Auth", "Typescript"],
    link: "https://guided-edu.onrender.com/",
    gitHub: "https://github.com/bascom241/guided",
    challenges: [
      "uploading videos to cloudinary",
      "Handling concurrent user enrollments",
      "Secure payment integration "
    ],
    solutions: [
      "Regulating Data streaming by streaming the videos with chunk using buffer",
      "Optimized database queries with indexing",
      "Integrated paystack with webhook verification"
    ],
    impact: "Students having access to quality course with cheaper rates",
    featured: true,
    stats: { users: "<1K", rating: "4.8", },
    category: 'side'
  },

  
    {
    id: 2,
    title: "EduLink - Connecting Students to Teachers",
    description: `EduLink is an educational platform that connects students with skilled teachers and digital classrooms. It helps students discover their talents, find the right educators to guide them, and access learning resources online. Teachers can manage classes, track student progress, and communicate directly with learners.`,
    image: edulink,
    techStack: ["Java", "Spring Boot", "PostgreSQL", "React", "Tailwind CSS", "WebSockets", "Paystack API", "Google Gmail API"],
    link: "https://edulink-kbad.onrender.com/",
    gitHub: "https://github.com/bascom241/EdulinkServer", // If you want to share backend repo or frontend
    challenges: [
      "Handling payments for each classroom and tracking subscriptions",
      "Real-time messaging between tutors and students using Gmail integration",
      "Query optimization for fast performance across multiple classrooms",
      "Real-time notifications using WebSockets",
      "Ensuring unique accounts and subaccounts for each tutor",
      "Slug generation for unique identifiers across classrooms and users"
    ],
    solutions: [
      "Implemented Paystack API to manage payments and subaccounts for tutors",
      "Built WebSocket-based real-time notifications and chat system",
      "Optimized database queries for performance and scalability",
      "Integrated Gmail API for seamless tutor-student communication",
      "Implemented slug-based unique identifiers for classrooms and user accounts"
    ],
    impact: "Currently active with 34 signed-in students and 20+ classrooms, enabling smooth digital learning and reliable tutor-student interaction.",
    featured: true,
    stats: { students: "34+", classrooms: "20+", activeSessions: "100% real-time" },
    category: "professional"
  },
 
  {
    id: 3,
    title: "Medilorn Lab Management System",
    description: "A MERN-based application designed to streamline laboratory operations and patient management.",
    image: p3,
    link: "https://easy-lab-ui.onrender.com/",
    gitHub: "https://github.com/bascom241/EasyLab",
    techStack: ["Next.js", "MongoDB", "Express", "Tailwind CSS"],
    challenges: [
      "Tracking and managing daily patients efficiently",
      "Ensuring secure patient data handling",
      "Integrating premium features"
    ],
    solutions: [
      "Implemented robust patient record management",
      "Used JWT authentication with encryption",
      "Added premium subscription features"
    ],
    impact: "Enabled labs to handle 2x more patients daily",
    stats: { patients: "<1K+", accuracy: "not measured", efficiency: "not measured" },
    category: 'side'
  },
  {
    id: 4,
    title: "ShopIt - E-commerce Platform",
    description: "Full-featured online store with product management, cart system, and secure checkout.",
    image: ShopIt,
    link: "https://frontend0.onrender.com",
    gitHub: "https://github.com/bascom241/Eccormerce1",
    techStack: ["Next.js", "Stripe", "MongoDB", "Express", "Redux", "Tailwind CSS"],
    challenges: [
      "Managing complex product variants",
      "Cart persistence across sessions",
      
    ],
    solutions: [
      "Created flexible product variant schema",
      "Implemented localStorage + database sync",
  
    ],
    impact: "not measured ",
    stats: { orders: "2+", revenue: "#10000", uptime: "50%" },
    category: 'side'
  },
  {
    id: 5,
    title: "ShopIt Admin Dashboard",
    description: "Centralized management system for e-commerce operations and analytics.",
    image: ShopItAdmin,
    link: "https://myadminpanel.onrender.com",
    gitHub: "https://github.com/bascom241/Eccormerce1",
    techStack: ["Next.js", "Chart.js", "MongoDB Aggregation", "Express"],
    challenges: [
      "Real-time sales analytics",
      "Role-based access control"
    ],
    solutions: [
      "Built custom data aggregation pipelines",
      "Developed granular permission system"
    ],
    impact: "Reduced administrative tasks by 60%",
    stats: { efficiency: "10%", users: "5+", charts: "15+" },
    category: 'side'
  },
  {
    id: 6,
    title: "Doctor Appointment System",
    description: "Healthcare scheduling platform connecting patients with medical professionals.",
    image: doctor,
    link: "https://doctor-appointment-3-9yn3.onrender.com/",
    gitHub: "https://github.com/bascom241/Doctor-Appointment",
    techStack: ["MERN Stack", "Redux", "Cloudinary", "JWT Auth"],
    challenges: [
      "Calendar scheduling conflicts",
      "HIPAA-compliant data handling",
     
    ],
    solutions: [
      "Implemented time slot validation",
      "Encrypted sensitive health data",
      
    ],
    impact: "not tracked",
    stats: { patients: "3+", satisfaction: "55%", appointments: "30" },
    category: 'side'
  },

  // Professional Work (Category: 'professional')
  {
    id: 7,
    title: "SPAN Connect",
    description: "Official platform for SPAN Association showcasing events and member activities.",
    image: span,
    link: "https://spanunilorinchapter.vercel.app/",
    techStack: ["HTML","CSS", "JAVASCRIPT"],
    challenges: [
      "Responsiveness ",
      "Deployments"
    ],
    solutions: [
      "Implemented media query for responsiveness",
      "Vercel"
    ],
    impact: "Increased member participation by 75%",
    stats: { members: "10", events: "not tracked", growth: "not tracked" },
    category: 'professional'
  },
  {
    id: 8,
    title: "Architectural Firm Website",
    description: "Modern showcase for architectural services with portfolio gallery and client portal.",
    image: achi,
    link: "https://client-architecture.vercel.app/",
    techStack: ["Next.js",  "Framer Motion", "Tailwind CSS"],
    challenges: [
  
      "Mobile responsiveness"
    ],
    solutions: [
     
      "Implemented adaptive design system"
    ],
    impact: "not tracked ",
    stats: { leads: "not tracked ", views: "not tracked ", conversion: "not tracked" },
    category: 'professional'
  },

  // Mobile Apps (Category: 'mobile')

  {
    id: 9,
    title: "PharmaLink - Medication Reminder",
    description: "Smart medication reminder & pharmacy locator app to help users manage medications and find nearby pharmacies.",
    image: pharmalink, // You can replace with mobile app image
    techStack: ["React Native", "TypeScript", "Node.js", "Google Maps API", "Push Notifications","Open Ai"],
    link: "",
    gitHub: "https://github.com/bascom241/phamalink",
    challenges: [
      "Accurate medication scheduling and reminders",
      "Real-time pharmacy location and availability",
      "Data privacy for health information",
      "Cross-platform compatibility"
    ],
    solutions: [
      "Built intelligent scheduling system with customizable reminders",
      "Integrated Google Maps API with pharmacy database",
      "Implemented secure local storage for health data",
      "Used Expo for consistent iOS/Android experience"
    ],
    impact: "Helps users maintain consistent medication habits with convenient pharmacy access",
    featured: true,
    stats: { reminders: "200+", pharmacies: "5+", accuracy: "99%" },
    category: 'mobile'
  },
  {
    id: 10,
    title: "ChowNaija - Food Review App",
    description: "A React Native mobile application for discovering and reviewing local Nigerian restaurants and dishes.",
    image: chow, // You can replace with mobile app image
    techStack: ["React Native", "TypeScript", "springboot", "postgress", "Expo"],
    link: "",
    gitHub: "https://github.com/bascom241/ChowNaijaUI",
    challenges: [
      "Real-time restaurant reviews and ratings",
      "Location-based restaurant discovery",
      "Image upload and optimization for mobile",
    
    ],
    solutions: [
      "normal http request/response used ",
      "Used React Native Maps with geolocation API",
      "Integrated Cloudinary for image optimization",
     
    ],
    impact: "Provides food enthusiasts with authentic Nigerian restaurant reviews and ratings",
    featured: true,
    stats: { reviews: "not tracked ", restaurants: "10+", users: "3" },
    category: 'mobile'
  },
  
   {
    id: 11,
    title: "Unilorin Connect",
    description: "A campus connection platform developed for a client to enable students to post resources, access a marketplace, and chat in real-time.",
    image: p2,
    link: "https://uilconnectapp.onrender.com/",
    gitHub: "https://github.com/bascom241/unilorinconnect",
    techStack: ["Next.js", "MongoDB", "Express", "Tailwind CSS", "Framer Motion"],
    challenges: [
      "Real time messaging system ",
      "Event registration system",
      "ui updates from real time messages "
    ],
    solutions: [
      "Integrated socket.io in express for real time messaging",
      "Created automated confirmation flows",
      "Rendering the data in the ui before data gets interaction with the database "
    ],
    impact: "Easy flow of communication between students ",
    stats: { users: "<1K+", active: "20%", events: "10+" },
    category: 'professional'
  },

];

// Project Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  index, 

  setHoveredIndex, 
  handleProjectClick 
}) => {
  const projectCardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const techChipVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  };

  // Category badge styles
  const categoryStyles = {
    side: "bg-blue-100 text-blue-800 border-blue-200",
    professional: "bg-purple-100 text-purple-800 border-purple-200",
    mobile: "bg-green-100 text-green-800 border-green-200"
  };

  return (
    <motion.div
      key={project.id}
      variants={projectCardVariants}
      whileHover="hover"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onClick={() => handleProjectClick(project)}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Category Badge */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium border ${categoryStyles[project.category]}`}
        >
          {project.category === 'mobile' ? 'Mobile App' : 
           project.category === 'professional' ? 'Professional' : 'Side Project'}
        </motion.div>

        {/* Featured Badge */}
        {project.featured && (
          <motion.div
            initial={{ rotate: -45, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 right-4 px-3 py-1 bg-black text-white rounded-full text-xs font-bold"
          >
            FEATURED
          </motion.div>
        )}

        {/* Expand Icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          className="absolute top-16 right-4 w-10 h-10 bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-gray-200"
        >
          <Maximize2 className="w-5 h-5 text-black" />
        </motion.div>

        {/* Mobile App Indicator */}
        {project.category === 'mobile' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/70 text-white px-3 py-1 rounded-full text-xs"
          >
            <Smartphone size={12} />
            <span>Mobile App</span>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <motion.h3
            className="text-xl font-bold text-black group-hover:text-gray-800 transition-colors"
            whileHover={{ x: 5 }}
          >
            {project.title}
          </motion.h3>
          <motion.div
            whileHover={{ rotate: 45 }}
            className="text-gray-500 group-hover:text-black"
          >
            <ArrowRight size={20} />
          </motion.div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Stats */}
        {project.stats && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 mb-4"
          >
            {Object.entries(project.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold text-black">{value}</div>
                <div className="text-xs text-gray-500 capitalize">{key}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tech, i) => (
            <motion.span
              key={i}
              variants={techChipVariants}
              custom={i}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-300"
            >
              {tech}
            </motion.span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs border border-gray-300">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Hover Line */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-1 ${
          project.category === 'side' ? 'bg-blue-500' :
          project.category === 'professional' ? 'bg-purple-500' :
          'bg-green-500'
        }`}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Main Project Component
const Project: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>('side');
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<any>(null);

  // Filter projects based on active tab
  const filteredProjects = projects.filter(project => project.category === activeTab);
  
  // Get projects for the big text rotator (featured projects only)
  const featuredProjects = projects.filter(project => project.featured);

  // Auto-rotation effect for big text (only featured projects)
  useEffect(() => {
    if (isAutoRotating && featuredProjects.length > 0) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
      }, 4000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoRotating, featuredProjects.length]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsAutoRotating(false);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setIsAutoRotating(true);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* BIG TEXT DISPLAY */}
      <div className="max-w-7xl mx-auto mb-20 relative">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-black"
          >
            PROJECTS
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto"
          >
            Interactive showcase of impactful solutions across different domains and platforms
          </motion.p>
        </div>

        {/* Big Text Rotator - Only featured projects */}
        <div className="relative h-50 sm:h-62.5 md:h-75 flex items-center justify-center mb-12">
          <AnimatePresence mode="wait">
            {featuredProjects.length > 0 && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.2, y: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={() => handleProjectClick(featuredProjects[activeIndex])}
              >
                <motion.h3
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-center text-black"
                  whileHover={{ scale: 1.05 }}
                >
                  {featuredProjects[activeIndex].title.split(' ')[0]}
                </motion.h3>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Auto-rotation controls */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full border border-gray-300 z-10"
          >
            {isAutoRotating ? (
              <>
                <Pause size={16} className="text-black" />
                <span className="text-sm text-gray-700">Pause</span>
              </>
            ) : (
              <>
                <Play size={16} className="text-black" />
                <span className="text-sm text-gray-700">Play</span>
              </>
            )}
          </motion.button>

          {/* Progress Dots */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
            {featuredProjects.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoRotating(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-black w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* TABS SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-12"
      >
        {/* Desktop Tabs */}
        <div className="hidden md:flex flex-wrap gap-4 justify-center mb-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const tabCount = projects.filter(p => p.category === tab.id).length;
            
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                  isActive 
                    ? tab.id === 'side' ? 'bg-blue-50 border-2 border-blue-500 text-blue-700 shadow-lg shadow-blue-100' :
                      tab.id === 'professional' ? 'bg-purple-50 border-2 border-purple-500 text-purple-700 shadow-lg shadow-purple-100' :
                      'bg-green-50 border-2 border-green-500 text-green-700 shadow-lg shadow-green-100'
                    : 'bg-gray-100 border-2 border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  isActive 
                    ? tab.id === 'side' ? 'bg-blue-100' :
                      tab.id === 'professional' ? 'bg-purple-100' :
                      'bg-green-100'
                    : 'bg-gray-200'
                }`}>
                  {tab.icon}
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">{tab.label}</div>
                  <div className={`text-sm ${
                    isActive 
                      ? tab.id === 'side' ? 'text-blue-600' :
                        tab.id === 'professional' ? 'text-purple-600' :
                        'text-green-600'
                      : 'text-gray-500'
                  }`}>
                    {tabCount} project{tabCount !== 1 ? 's' : ''}
                  </div>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-t-full ${
                      tab.id === 'side' ? 'bg-blue-500' :
                      tab.id === 'professional' ? 'bg-purple-500' :
                      'bg-green-500'
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Mobile Tabs */}
        <div className="md:hidden flex flex-col gap-3 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const tabCount = projects.filter(p => p.category === tab.id).length;
              
              return (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 px-4 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                    isActive 
                      ? tab.id === 'side' ? 'bg-blue-500 text-white' :
                        tab.id === 'professional' ? 'bg-purple-500 text-white' :
                        'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isActive 
                      ? 'bg-white/20' 
                      : tab.id === 'side' ? 'bg-blue-100 text-blue-700' :
                        tab.id === 'professional' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                  }`}>
                    {tabCount}
                  </span>
                </motion.button>
              );
            })}
          </div>
          
          {/* Mobile Tab Content */}
          <div className="text-center">
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm font-medium ${
                activeTab === 'side' ? 'text-blue-600' :
                activeTab === 'professional' ? 'text-purple-600' :
                'text-green-600'
              }`}
            >
              {activeTab === 'side' && 'Personal projects built to explore new technologies and solve interesting problems'}
              {activeTab === 'professional' && 'Projects developed as part of professional work and client engagements'}
              {activeTab === 'mobile' && 'Cross-platform mobile applications built with React Native'}
            </motion.p>
          </div>
        </div>

        {/* Active Tab Description - Desktop */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden md:block text-center"
        >
          <p className={`text-lg font-medium ${
            activeTab === 'side' ? 'text-blue-600' :
            activeTab === 'professional' ? 'text-purple-600' :
            'text-green-600'
          }`}>
            {activeTab === 'side' && 'Personal projects built to explore new technologies and solve interesting problems'}
            {activeTab === 'professional' && 'Projects developed as part of professional work and client engagements'}
            {activeTab === 'mobile' && 'Cross-platform mobile applications built with React Native'}
          </p>
        </motion.div>
      </motion.div>

      {/* PROJECTS GRID */}
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            handleProjectClick={handleProjectClick}
          />
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-100">
            <FolderGit2 size={48} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No projects in this category</h3>
          <p className="text-gray-500">Check back soon for new additions!</p>
        </motion.div>
      )}

      {/* PROJECT MODAL */}
      {/* PROJECT MODAL */}
<AnimatePresence>
  {selectedProject && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleCloseModal}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-6xl w-full max-h-[95vh] bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-300 flex flex-col"
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCloseModal}
          className="absolute top-4 right-4 z-50 w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-300 shadow-md"
        >
          <X className="w-6 h-6 text-black" />
        </motion.button>

        {/* Modal Content - Scrollable Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Image & Stats */}
            <div className="lg:w-2/5 p-6 lg:p-8 bg-gray-50 border-r border-gray-200">
              {/* Category Badge */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                  selectedProject.category === 'side' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                  selectedProject.category === 'professional' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                  'bg-green-100 text-green-800 border border-green-200'
                }`}
              >
                {selectedProject.category === 'mobile' ? <Smartphone size={16} /> :
                 selectedProject.category === 'professional' ? <Briefcase size={16} /> :
                 <FolderGit2 size={16} />}
                <span className="font-medium">
                  {selectedProject.category === 'mobile' ? 'Mobile App' :
                   selectedProject.category === 'professional' ? 'Professional Project' :
                   'Side Project'}
                </span>
              </motion.div>

              <motion.img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 lg:h-80 object-cover rounded-xl mb-6 border border-gray-200"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              />

              {/* Stats */}
              {selectedProject.stats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-3 gap-4 mb-6"
                >
                  {Object.entries(selectedProject.stats).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-white rounded-lg border border-gray-200">
                      <div className="text-2xl font-bold text-black">{value}</div>
                      <div className="text-xs text-gray-600 capitalize mt-1">{key}</div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="text-black font-bold mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons - FIXED VISIBILITY */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3 mt-8 sticky bottom-0 bg-gray-50 pt-4 pb-2"
              >
                {selectedProject.link ? (
                  <motion.a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </motion.a>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 py-3 bg-gray-100 text-gray-500 rounded-xl font-medium flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <ExternalLink size={18} />
                    Coming Soon
                  </motion.div>
                )}
                {selectedProject.gitHub && (
                  <motion.a
                    href={selectedProject.gitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <Github size={18} />
                    GitHub
                  </motion.a>
                )}
              </motion.div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:w-3/5 p-6 lg:p-8">
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl lg:text-4xl font-bold text-black mb-4"
              >
                {selectedProject.title}
              </motion.h3>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-700 text-lg mb-8"
              >
                {selectedProject.description}
              </motion.p>

              {/* Challenges & Solutions */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="text-black font-bold mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    Challenges
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.challenges.map((challenge, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="text-gray-600 flex items-start gap-2"
                      >
                        <ChevronRight className="w-4 h-4 text-black mt-1 shrink-0" />
                        {challenge}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="text-black font-bold mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-600" />
                    Solutions
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.solutions.map((solution, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="text-gray-600 flex items-start gap-2"
                      >
                        <ChevronRight className="w-4 h-4 text-black mt-1 shrink-0" />
                        {solution}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Impact */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="p-6 bg-gray-50 rounded-xl border border-gray-200 mb-8"
              >
                <h4 className="text-black font-bold mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  Impact
                </h4>
                <p className="text-gray-700 text-lg">{selectedProject.impact}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </section>
  );
};

export default Project;