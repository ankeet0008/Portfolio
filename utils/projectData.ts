import { Project, ProjectDetails } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "LLM Council",
    category: "Skill",
    year: "2024",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2008&auto=format&fit=crop",
    description: "Strategic AI integration and prompt engineering architectures."
  },
  {
    id: 2,
    title: "Skill Twin",
    category: "AI Analysis",
    year: "2023",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop",
    description: "AI powered resume and industry skill gap analyser."
  },
  {
    id: 3,
    title: "Mono",
    category: "Architecture",
    year: "2023",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop",
    description: "Portfolio for a brutalist architecture firm."
  },
  {
    id: 4,
    title: "Echo",
    category: "Audio Stream",
    year: "2022",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
    description: "Spatial audio experience on the web."
  },
];

export const getProjectDetails = (project: Project): ProjectDetails | null => {
  switch (project.id) {
    case 1:
      return {
          status: "Active Development",
          statusColor: "blue",
          descriptionPrefix: "I'm working on it.",
          description: "Redefining how we interact with large language models through structured prompt engineering and intelligent context management.",
          progressTitle: "Work in Progress",
          progressSubtitle: "Building Core Systems",
          techStack: ['OpenAI API', 'Next.js 14', 'Python', 'LangChain', 'Pinecone', 'Redis'],
          features: ['Context-Aware Responses', 'Dynamic Prompt Chaining', 'Low Latency Inference'],
          quote: "Bridging the gap between human intent and machine execution.",
          ctaText: "Notify Launch",
          ctaLink: null
      };
    case 2:
      return {
          status: "Open Source",
          statusColor: "green",
          descriptionPrefix: "Analyze & Optimize.",
          description: "An intelligent analyzer that bridges the gap between your current skills and industry demands using advanced NLP and market data.",
          progressTitle: "Available Now",
          progressSubtitle: "Open Source Repo",
          techStack: ['Python', 'NLP', 'React', 'FastAPI', 'Scikit-learn', 'PostgreSQL'],
          features: ['Resume Parsing', 'Market Gap Analysis', 'Personalized Recommendations'],
          quote: "Your digital twin for career growth and skill acquisition.",
          ctaText: "View on GitHub",
          ctaLink: "https://github.com/ankeet0008/SwillTwin"
      };
    case 3:
       return {
          status: "Live",
          statusColor: "stone",
          descriptionPrefix: "Digital Brutalism.",
          description: "A portfolio website for an architecture firm focusing on raw materials, structural integrity, and monochromatic aesthetics.",
          progressTitle: "Deployed",
          progressSubtitle: "Visit Live Site",
          techStack: ['Three.js', 'WebGL', 'Sanity CMS', 'React', 'GSAP'],
          features: ['3D Model Rendering', 'Smooth Scrolling', 'Dynamic Content'],
          quote: "Form follows function in the digital space.",
          ctaText: "Visit Site",
          ctaLink: "#"
       };
    case 4:
       return {
          status: "Experimental",
          statusColor: "indigo",
          descriptionPrefix: "Visualizing Sound.",
          description: "An immersive web experience that transforms audio input into real-time visual landscapes using WebGL and spatial audio algorithms.",
          progressTitle: "Prototype",
          progressSubtitle: "Interactive Demo",
          techStack: ['Web Audio API', 'Canvas API', 'React', 'Typescript'],
          features: ['Real-time Frequency Analysis', 'Spatial Audio', 'Interactive Visuals'],
          quote: "Hearing with your eyes.",
          ctaText: "Try Demo",
          ctaLink: "#"
       };
    default:
      return null;
  }
};