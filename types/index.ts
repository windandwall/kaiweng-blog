export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  readingTime: number;
  coverImage?: string;
  featured?: boolean;
  draft?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
  status: 'active' | 'completed' | 'archived';
}

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}
