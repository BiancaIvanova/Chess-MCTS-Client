import React, { useEffect, useState } from 'react';
import './Chessboard.css';

const Chessboard = () => {
    const rows = 8;
    const columns = 8;
    const letterLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const numberLabels = [8, 7, 6, 5, 4, 3, 2, 1]

    const [boardState, setBoardState] = useState(null);

    useEffect(() => {
    const fetchBoard = () => {
        fetch('http://localhost:8080/api/state')
        .then(res => res.json())
        .then(data => {
            const fen = data.boardFEN;
            const parsed = parseFEN(fen);
            setBoardState(parsed);
        })
        .catch(err => console.error('Failed to fetch board state:', err));
    };

    fetchBoard();

    const intervalId = setInterval(fetchBoard, 2000);

    return () => clearInterval(intervalId);
    }, []);


    const renderPiece = (piece) => {
        if (!piece) return null;
        const pieceSymbols = {
            wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
            bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
        }
        return <span className="piece">{pieceSymbols[piece] || ''}</span>
    };

    const squares = [];

    if (!boardState)
    {
        return <div>Loading board...</div>;
    }

    for (let row = 0; row < rows; row++)
    {
        const rowSquares = [];

        for (let column = 0; column < columns; column++)
        {
            const isDark = (row + column) % 2 === 1;
            let piece = null;

            if (boardState && boardState[row] && boardState[row][column])
            {
                piece = boardState[row][column];
            }

            rowSquares.push(
                <div
                    key={`${row}-${column}`}
                    className={`square ${isDark ? 'dark' : 'light'}`}
                >
                    {renderPiece(piece)}
                </div>
            );

            console.log(`Rendering row ${row}`); // remove when done
        }
        squares.push(
            <div key={row} className="row">
                {rowSquares}
            </div>
        );
    }

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

const parseFEN = (fen) => {
    const rows = fen.split(' ')[0].split('/');
    return rows.map(row => {
        const boardRow = [];
        for (let char of row)
        {
            if (!isNaN(char))
            {
                // Empty squares
                for (let i = 0; i < parseInt(char); i++)
                {
                    boardRow.push(null);
                }
            }
            else
            {
                const isWhite = char === char.toUpperCase();
                const color = isWhite ? 'w' : 'b';
                const piece = char.toLowerCase();
                const pieceMap = {
                    p: 'P', r: 'R', n: 'N', b: 'B', q: 'Q', k: 'K'
                };
                boardRow.push(color + pieceMap[piece]);
            }
        }
        return boardRow;
    });
};


export default Chessboard;