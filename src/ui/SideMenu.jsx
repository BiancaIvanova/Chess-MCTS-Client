import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChess, faChessBoard, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './SideMenu.css';

const SideMenu = ({ open, onClose, onSelectPage }) => {
    const handleMenuClick = (page) => {
        onSelectPage(page);
        onClose();
    };

    return (
        <>
            <div
                className={`side-menu-backdrop ${open ? 'open' : ''}`}
                onClick={onClose}
            />

            <nav className={`side-menu ${open ? 'open' : ''}`}>
                <h2 className="side-menu-title"></h2>

                <button
                    className="side-menu-option"
                    onClick={() => handleMenuClick('play')}
                >
                    <FontAwesomeIcon className="side-menu-option-icon" icon={faChess} />
                    Play Game
                </button>

                <button
                    className="side-menu-option"
                    onClick={() => handleMenuClick('analysis')}
                >
                    <FontAwesomeIcon className="side-menu-option-icon" icon={faChessBoard} />
                    Analysis
                </button>

                <button
                    className="side-menu-option"
                    onClick={() => handleMenuClick('statistics')}
                >
                    <FontAwesomeIcon className="side-menu-option-icon" icon={faChartLine} />
                    Statistics
                </button>
            </nav>
        </>
    );
};

export default SideMenu;