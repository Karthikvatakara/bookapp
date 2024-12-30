"use client";
import { useState } from "react";
import HeaderSection from "@/components/HeaderSection";
import CardSection from "@/components/CardSection";


export default function Home() {
    const [ searchQuery, setSearchQuery ] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

  return (
    <div>
    <HeaderSection searchQuery={searchQuery} onSearch={handleSearch}/>
    <CardSection searchQuery={searchQuery}/>
    </div>
  );
}
