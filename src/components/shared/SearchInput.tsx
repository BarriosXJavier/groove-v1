"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, SearchIcon } from "lucide-react";
import ProductCard from "./ProductCard";

interface SearchResult {
  title: string;
  price: number;
  imageUrl: string;
  location: string;
  listingId: string;
  category: string;
}

const SearchComponent = ({ userId }: { userId?: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Track if search was submitted

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const response = await fetch(`/api/search?query=${searchTerm}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mx-auto mt-12 relative bg-white max-w-sm flex flex-1 items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300">
          <Input
            type="text"
            placeholder="Enter keywords"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex border-none shadow-none text-gray-600"
          />
          <Button type="submit" disabled={loading} className="outline-none">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <SearchIcon />
            )}
          </Button>
        </div>
      </form>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {/* Search Results */}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => (
            <ProductCard
              key={result.listingId}
              title={result.title}
              price={result.price}
              imageUrl={result.imageUrl || ""}
              location={result.location}
              listingId={result.listingId}
              category={result.category}
              userId={userId} // Clerk user ID
            />
          ))}
        </div>
      )}

      {/* No Results Found */}
      {!loading && hasSearched && results.length === 0 && (
        <p className="text-center">No results found</p>
      )}
    </div>
  );
};

export default SearchComponent;
