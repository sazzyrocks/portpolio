export interface Project {
  id: string
  title: string
  subtitle: string
  category: "3d" | "fullstack" | "ai"
  categoryLabel: string
  description: string
  extendedDetails: string
  image: string
  liveUrl?: string
  githubUrl?: string
  tags: string[]
  metrics: { label: string; value: string }[]
  featured?: boolean
}

export interface SkillCategory {
  title: string
  subtitle: string
  iconName: string
  skills: { name: string; level: number; note: string }[]
}

export interface Milestone {
  period: string
  title: string
  organization?: string
  description: string
  tags: string[]
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Sajal Porey",
    alias: "sazzyrocks",
    role: "Full-Stack Developer & Creative Technologist",
    location: "India",
    email: "sajalporey2003@gmail.com",
    github: "https://github.com/sazzyrocks",
    linkedin: "https://linkedin.com/in/sajalporey",
    leetcode: "https://leetcode.com/u/sazzyrocks",
    solarisDemo: "https://solar-system-5xjaei1jg-sajalporeys-projects.vercel.app/solaris/",
    bioHeadline: "Engineering with Artistic Vision.",
    bioLeading:
      "I bridge the gap between creative visual computing and bulletproof system engineering. From real-time 3D WebGL simulations to resilient backend architectures, I design software for speed, tactile elegance, and human delight.",
    stats: [
      { value: "3+", label: "Flagship Architectures" },
      { value: "60", suffix: "FPS", label: "WebGL Real-Time Graphics" },
      { value: "100%", label: "Obsession with Craft" },
    ],
  },

  projects: [
    {
      id: "solaris",
      title: "SOLARIS",
      subtitle: "Interactive 3D Solar System Simulation",
      category: "3d",
      categoryLabel: "3D & WebGL",
      featured: true,
      description:
        "A high-fidelity celestial mechanics engine with procedural planetary textures, accurate Keplerian orbital trajectories, custom atmospheric GLSL shaders, and frictionless orbital camera controls.",
      extendedDetails:
        "Built using pure Three.js and custom GLSL fragment shaders to simulate real-time planetary rings, sun flares, dynamic shadow mapping, and planetary surface materials without degrading mobile frame rates.",
      image: "/assets/solaris.jpg",
      liveUrl: "https://solar-system-5xjaei1jg-sajalporeys-projects.vercel.app/solaris/",
      githubUrl: "https://github.com/sazzyrocks/solar-system",
      tags: ["Three.js", "WebGL", "GLSL Shaders", "TypeScript", "Vercel"],
      metrics: [
        { label: "Performance", value: "60 FPS Locked" },
        { label: "Rendering", value: "Custom GLSL" },
        { label: "Navigation", value: "Orbital Controls" },
      ],
    },
    {
      id: "repo-doctor",
      title: "RepoDoctor",
      subtitle: "GitHub Repository Health & Automation Assistant",
      category: "fullstack",
      categoryLabel: "Developer Tooling",
      featured: false,
      description:
        "A developer intelligence assistant delivering instantaneous repository health audits, automated CI/CD pipeline generation, security vulnerability scans, and documentation completeness checklists.",
      extendedDetails:
        "Integrates with the GitHub REST API to perform deep AST and workflow analysis, flag exposed configurations, suggest automated Dependabot routines, and generate PR-ready workflow files.",
      image: "/assets/repo_doctor.jpg",
      githubUrl: "https://github.com/sazzyrocks/repo-doctor",
      tags: ["TypeScript", "Node.js", "GitHub API", "CI/CD Actions", "Security"],
      metrics: [
        { label: "Diagnostics", value: "12+ Static Rules" },
        { label: "Pipeline", value: "Automated Workflows" },
        { label: "Security", value: "Vulnerability Auditing" },
      ],
    },
    {
      id: "voiceshield-ai",
      title: "VoiceShield-AI",
      subtitle: "Deepfake Synthetic Speech Detection Platform",
      category: "ai",
      categoryLabel: "AI & Cybersecurity",
      featured: false,
      description:
        "An intelligent audio cybersecurity architecture engineered to detect deepfake synthetic voice clones and acoustic impersonation attacks in real-time using spectral audio feature decomposition.",
      extendedDetails:
        "Leverages short-time Fourier transforms (STFT), Mel-frequency cepstral coefficients (MFCCs), and neural classification models exposed via high-throughput FastAPI microservice endpoints.",
      image: "/assets/voiceshield_ai.jpg",
      githubUrl: "https://github.com/sazzyrocks/VoiceShield-AI",
      tags: ["Python", "FastAPI", "Audio DSP", "PyTorch", "Cybersecurity"],
      metrics: [
        { label: "Detection", value: "Real-time Spectral" },
        { label: "Engine", value: "FastAPI / PyTorch" },
        { label: "Vector", value: "Acoustic Anti-Spoof" },
      ],
    },
  ] as Project[],

  skillCategories: [
    {
      title: "Visual Computing & Frontend",
      subtitle: "Fluid ergonomics, responsive design, and real-time graphics",
      iconName: "Eye",
      skills: [
        { name: "React & Next.js", level: 92, note: "Server components, reactive state, custom hooks" },
        { name: "Three.js & WebGL", level: 88, note: "Scene graphs, shaders, lighting, 60fps render loops" },
        { name: "TypeScript & JavaScript ESNext", level: 94, note: "Strict typing, async architectures" },
        { name: "Framer Motion & GSAP", level: 90, note: "Spring dynamics, FLIP layoutId, orchestrated reveals" },
        { name: "Tailwind CSS & Modern CSS", level: 95, note: "Container queries, OKLCH tokens, accessible layouts" },
      ],
    },
    {
      title: "Backend & Systems",
      subtitle: "Resilient services, real-time communications, and data stores",
      iconName: "Server",
      skills: [
        { name: "Node.js & Express", level: 90, note: "RESTful APIs, middleware architecture, auth" },
        { name: "Python & FastAPI", level: 86, note: "Asynchronous microservices, data processing" },
        { name: "PostgreSQL & MongoDB", level: 88, note: "Relational schemas, indexing, aggregation" },
        { name: "Redis & WebSockets", level: 84, note: "In-memory caching, pub/sub, duplex communication" },
      ],
    },
    {
      title: "Engineering Practices & Toolchain",
      subtitle: "Testing, deployment automation, and performance profiling",
      iconName: "Cpu",
      skills: [
        { name: "Git & GitHub Actions CI/CD", level: 92, note: "Branch protection, automated testing, releases" },
        { name: "Docker & Containerization", level: 85, note: "Multi-stage builds, compose environments" },
        { name: "Web Vitals & Performance", level: 94, note: "LCP/INP tuning, zero CLS, bundle splitting" },
        { name: "Accessibility (WCAG 2.1 AA)", level: 90, note: "Focus rings, aria-roles, 4.5:1 contrast, keyboard flow" },
      ],
    },
  ] as SkillCategory[],

  milestones: [
    {
      period: "2026 — Present",
      title: "Interactive Graphics & Spatial Systems",
      organization: "Creative Systems",
      description:
        "Expanded into GPU-accelerated computing, mathematical orbital models, and real-time GLSL rendering. Pushing browser capabilities to deliver console-grade web experiences.",
      tags: ["WebGL", "Three.js", "GLSL Shaders", "Creative Tech"],
    },
    {
      period: "2025",
      title: "Full-Stack Tooling & Audio Intelligence",
      organization: "Engineering Systems",
      description:
        "Architected automated developer workflows, AST static auditing engines, and explored real-time anti-spoofing audio classification models using spectral feature processing.",
      tags: ["Distributed Systems", "FastAPI", "Audio DSP", "Developer Tooling"],
    },
    {
      period: "Foundations",
      title: "Core Computer Science & Design Rigor",
      organization: "Academic & Open-Source",
      description:
        "Cultivated rigorous foundations in Data Structures, Algorithms, UI/UX interaction psychology, and modern web specifications. Active contributor in open-source GitHub ecosystems.",
      tags: ["Algorithms", "Clean Code", "Design Systems"],
    },
  ] as Milestone[],
}
