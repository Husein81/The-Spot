"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }: { children: React.ReactNode }) {
  // ✅ Memoize QueryClient to persist cache
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider>
        {children}
        <ToastContainer position="bottom-right" />
      </ClerkProvider>
    </QueryClientProvider>
  );
}
