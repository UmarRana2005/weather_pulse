"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (city: string) => void;
}) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md ">
      <Search className="absolute text-orange-300 left-3 top-1/2 -translate-y-1/2  w-4 h-4" />
      <Input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="pl-10 pr-4 py-2 text-sm rounded-full focus:outline-none focus:shadow-md"
      />
    </form>
  );
}
