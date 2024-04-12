"use client";

import ThemeService from "@/shared/services/theme/theme.service";
import ThemeSvcContext from "@/shared/services/theme/theme.context";
import { QueryClientProvider } from "react-query";
import queryClient from "@/shared/query-client";
import React, { useState, useEffect, ReactNode } from "react";


const themeSvc = new ThemeService();

type ContextComponentProps = {
  children: ReactNode;
};

export default function ContextComponent({ children }: ContextComponentProps) {
  return (
    // <AuthContext.Provider value={authService}>
      <ThemeSvcContext.Provider value={themeSvc}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeSvcContext.Provider>
    // </AuthContext.Provider>
  );
}