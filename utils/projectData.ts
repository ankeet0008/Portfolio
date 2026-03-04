import { Project, ProjectDetails } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "LLM Council",
    category: "Skill",
    year: "2024",
    image: "/LLMCouncilHero.png",
    description: "Strategic AI integration and prompt engineering architectures."
  },
  {
    id: 2,
    title: "Skill Twin",
    category: "AI Analysis",
    year: "2023",
    image: "/skilltwinhero.png",
    description: "AI powered resume and industry skill gap analyser."
  },
  {
    id: 3,
    title: "D-Liver",
    category: "AI Medical",
    year: "2024",
    image: "/dliverhero.png",
    description: "Intelligent medical assistant platform to parse and explain medical reports."
  },
  {
    id: 4,
    title: "Echo",
    category: "Audio Stream",
    year: "2022",
    image: "/EchoHero.png",
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
        status: "Beta Testing",
        statusColor: "teal",
        descriptionPrefix: "DocBot & Chill.",
        description: "D-Liver is an intelligent medical assistant platform designed by Team Sage. It parses, analyzes, and explains complex medical reports using advanced AI and up-to-date medical literature.",
        progressTitle: "In Clinical Review",
        progressSubtitle: "Private Beta Active",
        techStack: ['Python', 'LangChain', 'OpenAI', 'React', 'FastAPI'],
        features: ['Report Parsing', 'Literature Correlation', 'Patient-Friendly Summaries'],
        quote: "Democratizing medical understanding through artificial intelligence.",
        ctaText: "Request Access",
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