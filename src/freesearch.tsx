import { useState } from 'react';

interface FreeTextSearchProps {
  onSearch: (searchText: string) => void;
}

function FreeTextSearch({ onSearch }: FreeTextSearchProps) {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSearch(searchText);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 relative">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Søg produkter"
        className="w-full pl-10 p-2 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-500 focus:outline-none"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M12.9 14.32a8 8 0 111.42-1.42l4.27 4.27-1.42 1.42-4.27-4.27zM8 14a6 6 0 100-12 6 6 0 000 12z" />
        </svg>
      </button>
    </form>
  );
}

export default FreeTextSearch;
