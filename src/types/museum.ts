export interface Museum {
  id: number;
  name: string;
  location: string;
  type: 'Art' | 'Science' | 'History';
  description: string;
  website: string;
  has3DTour: boolean;
  hasAudioTour: boolean;
  rating: 1 | 2 | 3 | 4 | 5;
  imageUrl: string;
  link3DTour: string;
  review: string;
}
