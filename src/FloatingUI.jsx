import React from 'react';
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

export const DarkTheme = () => {
    return (
        <button className="dark-theme-container" onClick={toggleTheme}/>
    )
}