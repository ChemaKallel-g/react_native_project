import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/colors";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
    mode: ThemeMode;
    colors: typeof Colors.light;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemColorScheme = useColorScheme();
    const [mode, setMode] = useState<ThemeMode>(systemColorScheme === "dark" ? "dark" : "light");

    useEffect(() => {
        if (systemColorScheme === "dark" || systemColorScheme === "light") {
            setMode(systemColorScheme);
        }
    }, [systemColorScheme]);

    const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    const value = {
        mode,
        colors: Colors[mode],
        toggleTheme,
        isDark: mode === "dark",
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
