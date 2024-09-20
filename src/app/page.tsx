"use client";

import SearchComponent from "@/components/shared/SearchInput";
// import  CategoriesSection  from "@/components/shared/CategoriesSection"

import AllListings from "./all-listings/page";
import Hero2 from "@/components/shared/Hero2";
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
