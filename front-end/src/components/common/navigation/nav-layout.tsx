"use client";
import React from "react";
import Header from "./header";
import Sidebar from "./sidebar"; 


export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <main className="flex-grow bg-[#F7FBFF] w-full">
            <div className="mx-auto min-h-screen w-full max-w-screen-2xl p-3 sm:px-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
  );
}
