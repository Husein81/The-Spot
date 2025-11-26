"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Shad } from "@repo/ui";
import SideBar from "../side-bar";
import SidebarHeader from "../side-header";

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Shad.SidebarProvider>
        <SideBar />
        <div className="w-full">
          <SidebarHeader />
          <div className="container mx-auto p-4">{children}</div>
        </div>
      </Shad.SidebarProvider>
    </QueryClientProvider>
  );
};

export default Providers;
