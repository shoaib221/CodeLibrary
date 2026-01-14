"use client"

import './ThemeButton1.css'
import { useThemeContext } from './Theme';

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeButton11() {
    const  { themeName, toggleTheme } = useThemeContext()

    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 rounded-full bg-(--color1) text-(--color4) flex items-center justify-center  transition-all duration-300 hover:scale-110 focus:outline-none  overflow-hidden"
            aria-label="Toggle theme"  title='Toggle Theme'
        >
            <div className="relative w-6 h-6">
                {/* Sun Icon - slides from left */}
                <Sun
                    className={`absolute inset-0  transition-all duration-500 
                        ${ themeName === 'dark'
                            ? "translate-x-[-200%] opacity-0"
                            : "translate-x-0 opacity-100"
                        }`}
                    size={20}
                />

                {/* Moon Icon - slides from right */}
                <Moon
                    className={`absolute inset-0  transition-all duration-500 
                        ${ themeName === 'dark'
                            ? "translate-x-0 opacity-100"
                            : "translate-x-[200%] opacity-0"
                        }`}
                    size={20}
                />
            </div>
        </button>
    );
}

