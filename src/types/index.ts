export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  type: string;
  features: string[];
  conceptRationale: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'core' | 'frameworks' | 'design' | 'tools';
  categoryLabel: string;
  description: string;
  iconName: string;
}

export interface NavItem {
  name: string;
  href: string;
}
