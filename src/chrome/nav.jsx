import { createContext, useContext } from "react";

const ChromeNavContext = createContext(null);

export function ChromeNavProvider({ navigate, children }) {
  return <ChromeNavContext.Provider value={navigate}>{children}</ChromeNavContext.Provider>;
}

export function useChromeNavigate() {
  return useContext(ChromeNavContext);
}
