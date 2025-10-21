"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex gap-2 w-full max-w-lg mx-auto my-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Drops or Cards..."
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
      />
      <button
        onClick={() => onSearch(query)}
        className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800"
      >
        Search
      </button>
    </div>
  );
}
























