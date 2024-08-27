import { useState } from 'react';
import FreeTextSearch from './freesearch';
import CheckFilter from './checkfilter';

interface ProductFilterProps {
  onFilterChange: (filters: { search: string; complianceTypeIds: number[] }) => void;
}

function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [searchText, setSearchText] = useState("");
  const [complianceTypeIds, setComplianceTypeIds] = useState<number[]>([]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    onFilterChange({ search: text, complianceTypeIds });
  };

  const handleComplianceChange = (selectedTypes: number[]) => {
    setComplianceTypeIds(selectedTypes);
    onFilterChange({ search: searchText, complianceTypeIds: selectedTypes });
  };

  return (
    <div className="p-4 bg-gray-100">
      <FreeTextSearch onSearch={handleSearch} />
      <CheckFilter onFilterChange={handleComplianceChange} />
    </div>
  );
}

export default ProductFilter;
