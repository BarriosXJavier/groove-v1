"use client";

import SearchComponent from "@/components/shared/SearchInput";
import AllListings from "./all-listings/page";
import Hero2 from "@/components/shared/Hero";
export default function Home() {
  return (
    <main>
      <Hero2 />
      <div className="bg-slate-50/[0.2]">
        <SearchComponent />
        <AllListings />
      </div>
    </main>
  );
}
