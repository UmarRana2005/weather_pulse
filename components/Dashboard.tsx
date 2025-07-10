"use client";
import React from "react";
import Image from "next/image";
import Avatar from "../public/avatar.jpg";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import Data from "@/app/test/data";
const Dashboard = () => {
  return (
    <div className="flex flex-col gap-9 items-start justify-start px-2 py-2 bg-piank-200">
      <div className="w-[750px] flex justify-between items-start gap-3">
        <div className="flex justify-center items-center gap-3">
          <div className="size-14 relative">
            <Image
              src={Avatar}
              alt="Avatar"
              fill
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          </div>
          <div className="flex items-start justify-center flex-col">
            <h1 className="text-lg">Hello,</h1>
            <h2 className="text-lg font-semibold">Umar Rana</h2>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <SearchBar onSearch={(search) => console.log(search)} />
          <ThemeToggle />
        </div>
      </div>
      <Data />
    </div>
  );
};

export default Dashboard;
