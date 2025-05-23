export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  notes?: string;
  dateAdded: string;
}

export type BookshelfData = Book[]; 