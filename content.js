/**
 * =========================================================================
 * PORTFOLIO CONTENT & DATA CONFIGURATION
 * =========================================================================
 * 
 * Personal profile details for Aathithyan A.
 * All information is directly mapped from the résumé without unverified additions.
 */

const portfolioData = {
  // ==========================================
  // 1. Personal & Contact Information
  // ==========================================
  personal: {
    name: "Aathithyan A",
    initials: "AA",
    role: "Entry-Level Embedded Engineer",
    headline: "Electronics and Communication Engineering graduate focused on embedded systems and firmware development.",
    
    // Roles that dynamically cycle in the hero section typing animation
    typewriterRoles: [
      "Entry-Level Embedded Engineer",
      "Firmware Development Enthusiast",
      "B.E. ECE Graduate (2026)",
      "Microcontroller & IoT Developer"
    ],

    // Elevator pitch / short bio in hero section
    shortBio: "B.E. ECE graduate (2026) with skills in Embedded C, microcontroller programming, UART/SPI/I2C protocols, sensor interfacing, and circuit design. Seeking to apply debugging and firmware development skills to real-world embedded products.",

    // Detailed bio in About section
    aboutBio: [
      "B.E. Electronics and Communication Engineering graduate (2026) with specialized skills in Embedded C, microcontroller programming, communication protocols (UART, SPI, I2C), sensor interfacing, and circuit design.",
      "Seeking to apply rigorous debugging and firmware development expertise to high-reliability real-world embedded systems and IoT products."
    ],

    // Profile photo: Left blank as none was provided in résumé
    profilePhoto: "",

    email: "adhithyana135@gmail.com",
    phone: "+91 9361252350",
    location: "Chennai, India",
    
    // Resume link: default placeholder
    resumeUrl: "#",

    // Availability status
    status: {
      available: true,
      text: "Available for new opportunities"
    },

    // Social & Professional Profiles (GitHub left blank as unlisted)
    socials: {
      github: "",
      linkedin: "https://www.linkedin.com/in/aathithyan",
      twitter: "",
      email: "mailto:adhithyana135@gmail.com"
    }
  },

  // ==========================================
  // 2. Key Metrics & Value Pillars (About Section)
  // Left unverified statistics empty to adhere to strictly verified data
  // ==========================================
  aboutStats: [],

  valuePillars: [
    {
      icon: "code",
      title: "Problem Solving",
      description: "Firmware debugging, microcontroller troubleshooting, and circuit analysis."
    },
    {
      icon: "zap",
      title: "Teamwork & Collaboration",
      description: "Coordinating effectively across cross-functional engineering and academic projects."
    },
    {
      icon: "layout",
      title: "Adaptability",
      description: "Quickly learning new microcontroller architectures, protocols, and software tools."
    }
  ],

  // ==========================================
  // 3. Skills by Category
  // ==========================================
  skills: [
    {
      category: "Embedded & Hardware",
      icon: "layout",
      items: [
        "Embedded C",
        "C",
        "Microcontroller Programming",
        "UART Protocol",
        "SPI Protocol",
        "I2C Protocol",
        "GPIO",
        "Sensor Interfacing",
        "Circuit Design"
      ]
    },
    {
      category: "IoT & Systems",
      icon: "server",
      items: [
        "IoT-Based System Design",
        "Firmware Development",
        "Hardware Debugging"
      ]
    },
    {
      category: "Software & Simulation Tools",
      icon: "tool",
      items: [
        "VS Code",
        "MATLAB",
        "Lumerical Interconnect",
        "Data Science"
      ]
    },
    {
      category: "Core Competencies",
      icon: "database",
      items: [
        "Problem-Solving",
        "Teamwork and Collaboration",
        "Adaptability"
      ]
    }
  ],

  // ==========================================
  // 4. Projects Showcase
  // ==========================================
  projects: [
    {
      id: 1,
      title: "Machine Learning-Based Inverse Optimization of Mach-Zehnder Modulator Parameters in Silicon Photonic QPSK Communication Systems",
      category: "tools",
      categoryBadge: "Research & Systems",
      description: "Uses machine learning to find suitable Mach-Zehnder modulator parameters to improve signal quality and performance in silicon photonic QPSK communication systems.",
      image: "",
      technologies: ["Machine Learning", "Silicon Photonics", "QPSK Communications"],
      demoUrl: "", // Left blank as not listed
      githubUrl: "", // Left blank as not listed
      modalDetails: {
        badge: "Silicon Photonics & Machine Learning",
        longDescription: "Uses machine learning to find suitable Mach-Zehnder modulator parameters to improve signal quality and performance in silicon photonic QPSK communication systems.",
        highlights: [
          "Applied machine learning methods to the inverse optimization of Mach-Zehnder modulators",
          "Aimed at optimizing transmission performance and signal integrity in photonic QPSK systems",
          "Explored intersection of optical communication systems and computational optimization"
        ]
      }
    }
  ],

  // ==========================================
  // 5. Work Experience Timeline
  // ==========================================
  experience: [
    {
      role: "Data Science Intern",
      company: "Kevel Corp",
      location: "Madurai, India",
      period: "July 17 – August 22, 2025",
      description: "Data science internship focused on applied analytics and machine learning methodologies.",
      points: [
        "Engaged in data analysis, model exploration, and computational workflows.",
        "Collaborated with mentors and team members on practical data science tasks."
      ]
    }
  ],

  // ==========================================
  // 6. Education Timeline
  // ==========================================
  education: [
    {
      degree: "Bachelor of Engineering in Electronics and Communication Engineering",
      institution: "Anna University",
      location: "Dindigul, India",
      period: "2026",
      description: "CGPA: 7.20 / 10",
      points: [
        "Coursework in Embedded Systems, Microcontroller Programming, Communication Protocols, and Circuit Design."
      ]
    },
    {
      degree: "Higher Secondary Certificate (Mathematics & Biology)",
      institution: "Arignar Anna Hr. Sec. School",
      location: "Sendurai, India",
      period: "2022",
      description: "Score: 74.87%",
      points: [
        "Focus on Mathematics, Physics, Chemistry, and Biology."
      ]
    }
  ],

  // ==========================================
  // 7. Training & Certifications
  // ==========================================
  achievements: [
    {
      title: "Advanced Driver Assistance System (ADAS)",
      issuer: "Naan Mudhalvan, Anna University",
      year: "Certified",
      description: "Specialized technical training on Advanced Driver Assistance Systems (ADAS) and automotive electronic safety architectures."
    },
    {
      title: "Data Science Internship Certification",
      issuer: "Kevel Corp, Madurai",
      year: "2025",
      description: "Certificate of completion for practical internship training in data science and computational modeling."
    }
  ]
};

// Export for browser window
if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}
