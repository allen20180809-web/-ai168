export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  image?: string;
  isNew?: boolean;
}

export interface Activity {
  id: string;
  type: 'publish' | 'update' | 'gallery';
  title: string;
  time: string;
  tag: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  time: string;
  content: string;
  likes: number;
  isAuthor?: boolean;
  replies?: Comment[];
}
