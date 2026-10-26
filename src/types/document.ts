export interface Document {
  id: string;
  title: string;
  description?: string;
  category?: 'Guide' | 'Educational' | 'Research' | 'Other';
  fileUrl: string;
  thumbnail?: string;
  dateAdded: string;
}
