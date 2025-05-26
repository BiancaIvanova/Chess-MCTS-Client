import React from 'react';
import './Chessboard.css';

const Chessboard = () => {
    const rows = 8;
    const columns = 8;
    const squares = [];

    for (let row = 0; row < rows; row++)
    {
        const rowSquares = [];

        for (let column = 0; column < columns; column++)
        {
            const isDark = (row + column) % 2 === 1;
            rowSquares.push(
                <div
                    key={`${row}-${column}`}
                    className={`square ${isDark ? 'dark' : 'light'}`}
                ></div>
            );
            console.log(`Rendering row ${row}`);
        }
        squares.push(
            <div key={row} className="row">
                {rowSquares}
            </div>
        );
    }

    return <div className="chessboard">{squares}</div>
}

export default Chessboard;