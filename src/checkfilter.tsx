interface CheckFilterProps {
    onFilterChange: (selectedTypes: number[]) => void;
  }
  
  function CheckFilter({ onFilterChange }: CheckFilterProps) {
    const handleCheckboxChange = (e: any) => {
      const selectedType = parseInt(e.target.value);
      onFilterChange([selectedType]);
    };
  
    return (
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Filtrer på produkttype</h3>
        <div className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="1"
              onChange={handleCheckboxChange}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Farlige produkter</span>
          </label>
        </div>
        <div className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="2"
              onChange={handleCheckboxChange}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Mangelfulde produkter</span>
          </label>
        </div>
      </div>
    );
  }
  
  export default CheckFilter;
  