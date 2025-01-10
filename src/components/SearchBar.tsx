'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Search by plate number, date, or slot"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-64"
      />
      <Button type="submit" variant="outline" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}

