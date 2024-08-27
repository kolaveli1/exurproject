import { useState, useEffect } from 'react';
import ProductCard from './productcard';
import ProductFilter from './productfilter';

interface Product {
  id: string;
  name: string;
}

function ProductOverview() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ search: "", complianceTypeIds: [] as number[] });

  const fetchProducts = async (filters: { search: string; complianceTypeIds: number[] }) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://pfp-public-productdb-api.azurewebsites.net/api/product/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchText: filters.search,
            complianceTypeIds: filters.complianceTypeIds,
          }),
        }
      );
      const data = await response.json();
      if (data && data.results) {
        setProducts(data.results.slice(0, 9)); 
        setError(null);
      } else {
        setProducts([]);
        setError("No products found.");
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
      setError('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);

  const handleFilterChange = (newFilters: { search: string; complianceTypeIds: number[] }) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 p-4">
        <ProductFilter onFilterChange={handleFilterChange} />
      </div>
      <div className="md:w-3/4 p-4">
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-600">Intet produkt fundet med dette navn</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {products.length > 0 && products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductOverview;
