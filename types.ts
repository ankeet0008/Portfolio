export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

export interface ProjectDetails {
  status: string;
  statusColor: string;
  descriptionPrefix: string;
  description: string;
  progressTitle: string;
  progressSubtitle: string;
  techStack: string[];
  features: string[];
  quote: string;
  ctaText: string;
  ctaLink: string | null;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}