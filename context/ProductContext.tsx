import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types';
import { parse as parseToml } from 'smol-toml';
import { parse as parseMarkdown } from 'marked';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: true,
  error: null
});

export const useProducts = () => useContext(ProductContext);

// List of product files to load. 
// Note: In a browser-native ESM environment without a build step (like Vite's import.meta.glob),
// we cannot dynamically list files from the filesystem. We must explicitly list them here.
const PRODUCT_FILES = [
  'nexus-flow.md',
  'code-stream.md',
  'pixel-perfect.md',
  'data-vantage.md',
  'secure-vault.md',
  'cloud-sync.md',
  'dev-pulse.md',
  'team-spirit.md',
  'bug-hunter.md',
  'api-gateway.md'
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const promises = PRODUCT_FILES.map(async (filename) => {
          // Fetch relative to the public root (where index.html is)
          const response = await fetch(`products/${filename}`);
          if (!response.ok) {
            console.warn(`Failed to load product file: ${filename}`);
            return null;
          }
          const content = await response.text();
          
          // Regex to split TOML front matter (+++) from content
          const match = content.match(/^\+\+\+\r?\n([\s\S]+?)\r?\n\+\+\+\r?\n([\s\S]*)$/);

          if (match) {
            const frontMatterRaw = match[1];
            const markdownRaw = match[2];

            try {
              const data = parseToml(frontMatterRaw) as any;
              const htmlDescription = parseMarkdown(markdownRaw) as string;

              return {
                ...data,
                description: htmlDescription
              } as Product;
            } catch (e) {
              console.error(`Error parsing file ${filename}:`, e);
              return null;
            }
          } else {
            console.warn(`File ${filename} does not match Front Matter pattern.`);
            return null;
          }
        });

        const results = await Promise.all(promises);
        const parsedProducts = results.filter((p): p is Product => p !== null);

        // Sort by date descending
        parsedProducts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setProducts(parsedProducts);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Loading Screen
  if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
         <div className="flex flex-col items-center gap-4">
           <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-800"></div>
           <p className="text-sm font-medium text-gray-500">Loading Lumina Showcase...</p>
         </div>
       </div>
     );
  }

  // Error Screen
  if (error) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
         <div className="max-w-md p-6 bg-white rounded-2xl shadow-sm text-center">
           <p className="text-red-500 font-medium mb-2">Unable to load products</p>
           <p className="text-gray-500 text-sm">{error}</p>
         </div>
       </div>
     );
  }

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};