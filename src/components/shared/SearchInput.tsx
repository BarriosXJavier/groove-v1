"use client"

import { SetStateAction, useState } from 'react';

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const handleSearch = () => {
    // TO DO: implement search logic here
    console.log(`Searching for ${searchQuery}`);
  };

  const handleFilterChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setFilterBy(event.target.value);
  };

  return (
    <div className="bg-white flex px-4 py-3 my-8 border-b border-[#333] focus-within:border-gray-800 overflow-hidden max-w-md mx-auto font-[sans-serif]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 192.904 192.904"
        width="18px"
        className="fill-gray-600 mr-3"
      >
        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
      </svg>
      <input
        type="email"
        placeholder="Search ..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="w-full outline-none text-sm"
      />
      <button
        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
      <select
        value={filterBy}
        onChange={handleFilterChange}
        className="ml-4"
      >
        <option value="all">All</option>
        <option value="category">Category</option>
        <option value="price">Price</option>
      </select>
    </div>
  );
};

export default SearchInput;