"use client";

import { useState, ChangeEvent } from "react";
import ShimmerButton from "../ui/shimmer-button";

interface Listing {
  _id: string;
  title: string;
}

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Listing[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const res = await fetch(
        `/api/search?query=${encodeURIComponent(searchQuery)}`
      );
      const data: Listing[] = await res.json();

      setHasSearched(true);

      if (res.ok) {
        setSearchResults(data);
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error searching for furniture:", error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setHasSearched(false);
  };

  return (
    <div className="bg-white flex flex-col items-center px-4 py-2 my-10 border-b border-[#333] focus-within:border-gray-800 overflow-hidden max-w-md mx-auto font-[sans-serif]">
      <div className="flex w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full outline-none text-lg"
          placeholder="Enter keywords"
        />
        <ShimmerButton
          onClick={handleSearch}
        >
          Search
        </ShimmerButton>
      </div>

      {/* Search Results */}
      <div className="mt-4 w-full">
        {hasSearched && searchResults.length > 0 ? (
          <ul>
            {searchResults.map((item) => (
              <li key={item._id} className="py-2 border-b">
                {item.title}
              </li>
            ))}
          </ul>
        ) : hasSearched && searchResults.length === 0 ? (
          <p className="text-center text-lg">{`No results found for "${searchQuery}".`}.</p>
        ) : null}
      </div>
    </div>
  );
};

export default SearchInput;
