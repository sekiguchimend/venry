export interface WomanItem {
  id: string;
  profileImage: string;
  name: string;
  age: number;
  isNewcomer: boolean;
  measurements: {
    height: number;
    bust: number;
    waist: number;
    hip: number;
  };
  registrationDate: string;
  isPublic: boolean;
}

export interface WomenListProps {
  items: WomanItem[];
  searchTerm?: string;
  onSearch?: (term: string) => void;
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}