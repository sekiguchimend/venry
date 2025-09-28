import { Site, PaginationInfo } from '../../../types/id-pass';

export const filterSites = (sites: Site[], searchTerm: string): Site[] => {
  return sites.filter(site =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const paginateSites = (
  sites: Site[],
  currentPage: number,
  itemsPerPage: number
): { paginatedSites: Site[]; paginationInfo: PaginationInfo } => {
  const totalPages = Math.ceil(sites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSites = sites.slice(startIndex, endIndex);

  const paginationInfo: PaginationInfo = {
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems: sites.length,
  };

  return { paginatedSites, paginationInfo };
};