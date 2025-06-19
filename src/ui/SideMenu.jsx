import React, { useState, useEffect, useRef } from 'react';
import './FloatingUI.css'; // Reuse your existing styles

export const HamburgerMenu = () => {
    const [open, setOpen] = useState(false);
    const paneRef = useRef();

    // Close if clicking outside
    useEffect(() => {
        const close = (e) => {
            if (paneRef.current && !paneRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, [open]);

    return (
        <>
            <div className="hamburger-toggle">
                <button
                    className={open ? 'active' : ''}
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                >
                    <div className="svg-icon menu-icon" />
                </button>
            </div>

            {open && (
                <div className="hamburger-pane" ref={paneRef}>
                    <p style={{ color: 'white', padding: '1rem' }}>Menu pane</p>
                </div>
            )}
        </>
    );
};
