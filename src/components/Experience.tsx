import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Briefcase, 
  Calendar, 
  Globe, 
  Code, 
  Users, 
  Award, 
  ChevronRight,
  Building,
  Clock,
  Wifi,
  Target,
  Navigation
} from 'lucide-react';

import type { Variant } from 'framer-motion';
interface Experience {
  id: number;
  company: string;
  role: string;
  location: string;
  type: 'remote' | 'onsite' | 'hybrid';
  coordinates: {
    lat: number;
    lng: number;
    zoom: number;
  };
  period: {
    start: string;
    end: string;
    duration: string;
  };
  description: string;
  techStack: string[];
  achievements: string[];
  techHub?: string; // For remote work
  current?: boolean;
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "Tech Agency",
    role: "Full Stack Developer",
    location: "Ilorin, Nigeria",
    type: "onsite",
    coordinates: {
      lat: 8.4889,
      lng: 4.5500,
      zoom: 13
    },
    period: {
      start: "Jun 2023",
      end: "Present",
      duration: "1.5 years"
    },
    description: "Building client products and collaborating with top engineers in Ilorin through an agency building client products.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "TypeScript", "Tailwind"],
    achievements: [
      "Led development of 5+ client projects",
      "Reduced deployment time by 40%",
      "Mentored 3 junior developers"
    ],
    current: true
  },
  {
    id: 2,
    company: "Fintech Startup",
    role: "Backend Engineer",
    location: "Remote",
    type: "remote",
    coordinates: {
      lat: 9.0765,
      lng: 7.3986,
      zoom: 5 // Zoom out for Nigeria overview
    },
    period: {
      start: "Mar 2022",
      end: "May 2023",
      duration: "1.2 years"
    },
    description: "Worked on a fintech product processing payments and building scalable backend systems.",
    techStack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Docker", "AWS"],
    achievements: [
      "Built payment processing system handling 10K+ transactions daily",
      "Improved API response time by 60%",
      "Implemented microservices architecture"
    ],
    techHub: "Ilorin Tech Hub"
  },
  {
    id: 3,
    company: "Guided LMS",
    role: "Frontend Developer",
    location: "Remote",
    type: "remote",
    coordinates: {
      lat: 8.4889,
      lng: 4.5500,
      zoom: 13
    },
    period: {
      start: "Sep 2021",
      end: "Feb 2022",
      duration: "6 months"
    },
    description: "Contributed to an LMS startup called Guided, building interactive learning interfaces.",
    techStack: ["Next.js", "React", "Framer Motion", "Firebase", "Stripe"],
    achievements: [
      "Built real-time course dashboard",
      "Integrated payment system with Stripe",
      "Improved user engagement by 35%"
    ],
    techHub: "Ilorin Digital Center"
  },
  {
    id: 4,
    company: "EduLink Startup",
    role: "Lead Developer & Team Manager",
    location: "Ilorin, Nigeria",
    type: "hybrid",
    coordinates: {
      lat: 8.4889,
      lng: 4.5500,
      zoom: 14
    },
    period: {
      start: "Jan 2021",
      end: "Aug 2021",
      duration: "8 months"
    },
    description: "Built my first EdTech startup using Java, where I also collaborated with and managed a development team.",
    techStack: ["Java", "Spring", "MySQL", "React", "WebSocket"],
    achievements: [
      "Built complete EdTech platform from scratch",
      "Managed team of 4 developers",
      "Secured 500+ user signups in first month"
    ]
  },
  {
    id: 5,
    company: "HNG Internship",
    role: "Full Stack Developer Intern",
    location: "Remote",
    type: "remote",
    coordinates: {
      lat: 6.5244,
      lng: 3.3792,
      zoom: 10 // Lagos overview
    },
    period: {
      start: "May 2020",
      end: "Aug 2020",
      duration: "4 months"
    },
    description: "Joined the HNG Internship while in 300-level. Although I had to drop at Stage 4 due to health challenges, the experience exposed me to collaborating with designers, working with deadlines, pitching products, and building in structured teams.",
    techStack: ["JavaScript", "Node.js", "React", "Figma", "Git"],
    achievements: [
      "Collaborated with designers and developers",
      "Built products under tight deadlines",
      "Learned professional workflow practices"
    ],
    techHub: "Remote Collaboration Hub"
  }
];

// Map component using iframe from OpenStreetMap
const MapView: React.FC<{ 
  experience: Experience; 
  isRotating: boolean;
  isHovered: boolean;
}> = ({ experience, isRotating, isHovered }) => {
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef<number>(0);
  
  // Rotation animation
  useEffect(() => {
    if (isRotating) {
      const interval = setInterval(() => {
        rotationRef.current = (rotationRef.current + 1) % 360;
        setRotation(rotationRef.current);
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isRotating]);

  // Get map style based on experience type
  const getMapStyle = () => {
    const baseUrl = "https://www.openstreetmap.org/export/embed.html";
    const params = new URLSearchParams({
      bbox: `${experience.coordinates.lng - 0.02},${experience.coordinates.lat - 0.02},${experience.coordinates.lng + 0.02},${experience.coordinates.lat + 0.02}`,
      layer: "mapnik",
      marker: `${experience.coordinates.lat},${experience.coordinates.lng}`
    });
    
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <motion.div
      className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-gray-300 bg-gray-100"
      animate={{
        rotateY: isHovered ? rotation : 0,
        scale: isHovered ? 1.05 : 1
      }}
      transition={{
        rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 0.3 }
      }}
    >
      {/* Map Container */}
      <div className="absolute inset-0">
        <iframe
          src={getMapStyle()}
          className="w-full h-full border-0"
          loading="lazy"
          title={`Map of ${experience.location}`}
        />
      </div>

      {/* Location Marker */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          <motion.div
            className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"
            animate={{
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
        </div>
      </motion.div>

      {/* Remote Work Overlay */}
      {experience.type === 'remote' && experience.techHub && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-gray-200 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-800">Remote Work</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">Tech Hub: {experience.techHub}</p>
        </motion.div>
      )}

      {/* Current Location Badge */}
      {experience.current && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs font-bold rounded-full shadow-lg"
        >
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            CURRENT
          </div>
        </motion.div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-300"
        >
          <Navigation className="w-4 h-4 text-gray-700" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-300"
        >
          <Target className="w-4 h-4 text-gray-700" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState<Experience>(experiences[0]);
  const [isRotating, setIsRotating] = useState(false);
  const [isMapHovered, setIsMapHovered] = useState(false);
  const [time, setTime] = useState<string>('');
  const [weather, setWeather] = useState<string>('');

  // Update current time for selected location
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Lagos', // Nigeria timezone
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch weather data (mock for now)
  useEffect(() => {
    const fetchWeather = async () => {
      // Mock weather data based on location
      const weatherData = {
        "Ilorin, Nigeria": "Sunny, 32°C",
        "Remote": "Connected 🌐",
        "Lagos, Nigeria": "Partly Cloudy, 30°C"
      };
      
      setWeather(weatherData[selectedExperience.location as keyof typeof weatherData] || "Clear, 28°C");
    };

    fetchWeather();
  }, [selectedExperience]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-black">
            Experience Map
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Interactive journey through my professional career. Click on locations to explore roles and technologies used.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Map */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="space-y-6"
          >
            {/* Map Container */}
            <div
              onMouseEnter={() => setIsMapHovered(true)}
              onMouseLeave={() => setIsMapHovered(false)}
            >
              <MapView 
                experience={selectedExperience} 
                isRotating={isRotating}
                isHovered={isMapHovered}
              />
            </div>

            {/* Map Controls */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRotating(!isRotating)}
                className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                  isRotating 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}
              >
                <Globe className="w-4 h-4" />
                {isRotating ? 'Stop Rotation' : 'Rotate Map'}
              </motion.button>

              <motion.div
                variants={itemVariants}
                className="flex-1 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Local Time:</span>
                  </div>
                  <span className="font-mono font-medium text-black">{time}</span>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex-1 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Weather:</span>
                  </div>
                  <span className="font-medium text-black">{weather}</span>
                </div>
              </motion.div>
            </div>

            {/* Location Info */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gray-50 rounded-xl border border-gray-200"
            >
              <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">City:</span>
                  <span className="font-medium text-black">{selectedExperience.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Work Type:</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedExperience.type === 'onsite' 
                        ? 'bg-blue-100 text-blue-800' 
                        : selectedExperience.type === 'remote'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {selectedExperience.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Coordinates:</span>
                  <span className="font-mono text-sm text-black">
                    {selectedExperience.coordinates.lat.toFixed(4)}, {selectedExperience.coordinates.lng.toFixed(4)}
                  </span>
                </div>
                {selectedExperience.techHub && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tech Hub:</span>
                    <span className="font-medium text-black flex items-center gap-1">
                      <Wifi className="w-4 h-4" />
                      {selectedExperience.techHub}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Experience List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="space-y-6"
          >
            {/* Timeline Header */}
            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-black">Career Timeline</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase className="w-5 h-5" />
                <span>{experiences.length} Positions</span>
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  onClick={() => setSelectedExperience(exp)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                    selectedExperience.id === exp.id
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-800 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        selectedExperience.id === exp.id
                          ? 'bg-white/20'
                          : 'bg-gray-100'
                      }`}>
                        <Building className={`w-5 h-5 ${
                          selectedExperience.id === exp.id ? 'text-white' : 'text-gray-700'
                        }`} />
                      </div>
                      <div>
                        <h4 className={`text-lg font-bold ${
                          selectedExperience.id === exp.id ? 'text-white' : 'text-black'
                        }`}>
                          {exp.company}
                        </h4>
                        <p className={`text-sm ${
                          selectedExperience.id === exp.id ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {exp.role}
                        </p>
                      </div>
                    </div>
                    {exp.current && (
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        selectedExperience.id === exp.id
                          ? 'bg-white text-black'
                          : 'bg-black text-white'
                      }`}>
                        CURRENT
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className={`mb-4 text-sm ${
                    selectedExperience.id === exp.id ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {exp.description}
                  </div>

                  {/* Info Row */}
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{exp.period.start} - {exp.period.end}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{exp.period.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedExperience.id === exp.id
                            ? 'bg-white/20 text-white border border-white/30'
                            : 'bg-gray-100 text-gray-700 border border-gray-300'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.techStack.length > 3 && (
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        selectedExperience.id === exp.id
                          ? 'text-gray-400'
                          : 'text-gray-500'
                      }`}>
                        +{exp.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Select Indicator */}
                  {selectedExperience.id === exp.id && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 mt-4 text-sm"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>Currently viewing this location</span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gray-50 rounded-xl border border-gray-200"
            >
              <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Career Stats
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-black">{experiences.length}</div>
                  <div className="text-xs text-gray-600">Positions</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-black">4+</div>
                  <div className="text-xs text-gray-600">Years Exp</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-black">20+</div>
                  <div className="text-xs text-gray-600">Technologies</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-black">3</div>
                  <div className="text-xs text-gray-600">Locations</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section - Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Key Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedExperience.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-50 rounded-xl border border-gray-200 group hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-black rounded-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-black mb-2">Achievement #{index + 1}</h4>
                    <p className="text-gray-600 text-sm">{achievement}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;