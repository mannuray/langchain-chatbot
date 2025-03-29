
import React, { createContext, useContext, useState, useEffect } from "react";
import settings from "@/settings";

type SettingsContextType = {
  apiUrl: string;
  setApiUrl: (url: string) => void;
};

const defaultSettings: SettingsContextType = {
  apiUrl: settings.apiUrl,
  setApiUrl: () => {},
};

const SettingsContext = createContext<SettingsContextType>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiUrl, setApiUrl] = useState<string>(() => {
    // Try to load from localStorage on initial render
    const savedUrl = localStorage.getItem("expertApiUrl");
    return savedUrl || defaultSettings.apiUrl;
  });

  // Save to localStorage whenever apiUrl changes
  useEffect(() => {
    localStorage.setItem("expertApiUrl", apiUrl);
  }, [apiUrl]);

  return (
    <SettingsContext.Provider value={{ apiUrl, setApiUrl }}>
      {children}
    </SettingsContext.Provider>
  );
};
