import React, { useState, useEffect } from 'react';
import './FloatingUI.css';

export const GitHubLink = () => {
    return (
        <div className="github-container">
            <a
                href="https://github.com/BiancaIvanova/Chess-MCTS-Client"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/assets/github-mark.svg" alt="GitHub Logo"/>
            </a>
        </div>
    )
}

export const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'system';
    })

    const applyTheme = (themeValue) => {
        if (themeValue === "light")
        {
            document.body.classList.add('light-mode')
            document.body.classList.remove('dark-mode')
        }
        else if (themeValue === "dark")
        {
            document.body.classList.add('dark-mode')
            document.body.classList.remove('light-mode')
        }
        else
        {
            const darkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches; 

            if (darkPreference) {
                document.body.classList.add('dark-mode')
                document.body.classList.remove('light-mode')
            } else {
                document.body.classList.add('light-mode')
                document.body.classList.remove('dark-mode')
            }
        }
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);

        if (theme === 'system') 
        {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

            const handler = () => {
                applyTheme('system');
            }

            mediaQuery.addEventListener('change', handler);

            applyTheme('system');

            return () => mediaQuery.removeEventListener('change', handler);
        }
        else
        {
            applyTheme(theme);
        }

        
    }, [theme]);

    return (
        <div className="theme-toggle">
            <button
                className={theme === 'light' ? 'active' : ''}
                onClick={() => setTheme('light')}
                aria-label="Light mode"
            >
                <div className="svg-icon sun-icon"/>
            </button>

            <button
                className={theme === 'system' ? 'active' : ''}
                onClick={() => setTheme('system')}
                aria-label="System mode"
            >
                <div className="svg-icon system-icon"/>
            </button>

            <button
                className={theme === 'dark' ? 'active' : ''}
                onClick={() => setTheme('dark')}
                aria-label="Dark mode"
            >
                <div className="svg-icon moon-icon"/>
            </button>
        </div>
    )
}