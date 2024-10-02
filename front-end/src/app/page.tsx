"use client";

import HeroSection from "@/components/common/homepage";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

function Home() {
  // const token = sessionStorage.getItem("token");
  // useEffect(() => {
  //   if (!token) {
  //     redirect("/login");
  //   }
  // }, [token]);

  return (
    <>
      <HeroSection />
    </>
  );
}

export default Home;
