"use client";

import LeftSidebar from "@/components/LeftSideBar";
import { sidebarLinks } from "@/constants";
import React from "react";

const ForYouPage = () => {
  return (
    <div className="flex">
      <LeftSidebar sidebarLinks={sidebarLinks} />
      <main className="flex-1">
      </main>
    </div>
  );
};

export default ForYouPage;
