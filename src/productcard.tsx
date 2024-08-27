import { useState, useEffect } from 'react';
import "./index.css"    

interface ProductCardProps {
  product: {
    id: string;
    name: string;
  };
}

function ProductCard({ product }: ProductCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {

      try {
        const response = await fetch(`https://pfp-public-productdb-api.azurewebsites.net/api/picture/${product.id}`);
        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
          setImageUrl(url);
        } else {
          console.error("Failed to fetch product image.", response.status);
          setImageUrl(null);
        }
      } catch (error) {
        console.error("Error fetching product", error);
        setImageUrl(null);
      }
    };

    fetchImage();
  }, [product.id]);

  return (
    <div className="shadow-lg rounded-lg w-full h-auto flex flex-col items-center p-4">
      <div className="relative w-full h-48 mb-4 bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-gray-500">Intet billede tilgængeligt</p>
          </div>
        )}
      </div>
      <h2 className="text-lg font-semibold mb-2 text-center text-blue-700">{product.name}</h2>
    </div>
  );
}

export default ProductCard;
