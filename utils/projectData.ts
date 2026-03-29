import { Project, ProjectDetails } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Skill Twin",
    category: "AI Analysis",
    year: "2023",
    image: "/skilltwinhero.png",
    description: "AI powered resume and industry skill gap analyser.",
    type: 'ml'
  },
  {
    id: 2,
    title: "D-Liver",
    category: "AI Medical",
    year: "2024",
    image: "/dliverhero.png",
    description: "Intelligent medical assistant platform to parse and explain medical reports.",
    type: 'ml'
  },
  {
    id: 3,
    title: "ChestXR",
    category: "AI Medical",
    year: "2024",
    image: "/chestxrhero.png", // placeholder image name
    description: "AI-Powered Chest X-Ray Classification with real-time analysis.",
    type: 'ml'
  },
  {
    id: 4,
    title: "Odisha Heritage",
    category: "Web Design",
    year: "2024",
    image: "/ecommerce.png", // keeping placeholder image unless told otherwise
    description: "The Majestic West - Exploring Odisha Heritage.",
    type: 'uiux',
    link: "https://sundargarh.vercel.app/"
  }
];

export const getProjectDetails = (project: Project): ProjectDetails | null => {
  switch (project.id) {
    case 1:
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
    case 2:
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
    case 3:
      return {
        status: "Live",
        statusColor: "blue",
        descriptionPrefix: "Diagnostic AI.",
        description: "An AI-powered diagnostic tool that classifies chest X-rays with high accuracy, providing instant insights and confidence scores for medical imaging.",
        progressTitle: "Public Beta",
        progressSubtitle: "Live on Vercel",
        techStack: ['FastAPI', 'PyTorch', 'React', 'Tailwind'],
        features: ['Real-time Analysis', 'Confidence Scores', 'Image Preprocessing'],
        quote: "Enhancing diagnostic accuracy through deep learning.",
        ctaText: "Visit App",
        ctaLink: "https://chest-x-ray-claiisfication.vercel.app/"
      };
    case 4:
      return {
        status: "Completed",
        statusColor: "green",
        descriptionPrefix: "Heritage & Culture.",
        description: "A visually rich web platform dedicated to showcasing the majestic heritage and culture of Sundargarh. Features modern typography and smooth interactions.",
        progressTitle: "Live",
        progressSubtitle: "Available Online",
        techStack: ['React', 'Web Design', 'Typography'],
        features: ['Interactive UI', 'Cultural Showcase', 'Responsive Design'],
        quote: "Bringing heritage to the digital forefront.",
        ctaText: "Visit Website",
        ctaLink: "https://sundargarh.vercel.app/"
      };
    default:
      return null;
  }
};