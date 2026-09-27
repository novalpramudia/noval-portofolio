"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { ToastProvider } from "@/hooks/useToast";
import LoadingScreen from "./LoadingScreen";
import CustomCursor from "./CustomCursor";
import BackgroundFX from "./BackgroundFX";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <LoadingScreen />
        <CustomCursor />
        <BackgroundFX />
        {children}
      </ToastProvider>
    </AuthProvider>
  );
}
