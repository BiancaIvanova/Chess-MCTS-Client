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

    const letterLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const numberLabels = [8, 7, 6, 5, 4, 3, 2, 1]

    return (
        <div className="board-container">
            <div className="number-labels">
                {numberLabels.map((n, i) => (
                    <div key={i} className="number-label">{n}</div>
                ))}
            </div>

            <div className="chessboard">{squares}</div>

            <div className="letter-labels">
                {letterLabels.map((l, i) => (
                    <div key={i} className="letter-label">{l}</div>
                ))}
            </div>
        </div>
    )
}

export default Chessboard;