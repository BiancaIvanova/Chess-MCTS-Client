import React, { useEffect, useState, useRef } from 'react';
import './Chessboard.css';
import { useUIState } from './UIStateContext';

const ERROR_THRESHOLD = 6 // attempts before giving up

const Chessboard = ({ setLoading, setErrorText, setShowMessage }) => {
    const MIN_LOADING_TIME = 1000;
    const [boardState, setBoardState] = useState(null);
    const { setBlocked } = useUIState();

    const [hasLoaded, setHasLoaded] = useState(false);
    const [lastFetchOk, setLastFetchOk] = useState(false);

    const failureCount = useRef(0);
    const pollingRef = useRef();

    useEffect(() => {
        let stopped = false;

        const fetchBoard = () => {
        const startTime = Date.now();

        // If we've failed too many times, stop polling and show error
        if (failureCount.current >= ERROR_THRESHOLD)
        {
            setLoading(false);
            setShowMessage(true);
            setErrorText('Unable to load board data');
            setBlocked(true);
            return;
        }

        // Only block UI on first load or if last fetch failed
        const shouldBlock = !hasLoaded || !lastFetchOk;
        if (shouldBlock)
        {
            setLoading(true);
            setShowMessage(false);
            setErrorText('');
            setBlocked(true);
        }

        fetch('http://localhost:8080/api/state')
            .then(res => res.json())
            .then(data => {

                if (!data.boardFEN) throw new Error('No board data returned');
                setBoardState(parseFEN(data.boardFEN));
                setHasLoaded(true);
                setLastFetchOk(true);
                failureCount.current = 0;

                const elapsed = Date.now() - startTime;
                const remaining = Math.max(MIN_LOADING_TIME - elapsed, 0);

                setTimeout(() => {
                    if (shouldBlock)
                    {
                        setLoading(false);
                        setShowMessage(false);
                        setErrorText('');
                        setBlocked(false);
                    }
                }, remaining);
            })

            .catch(() => {
                failureCount.current += 1;
                setLastFetchOk(false);

                const elapsed = Date.now() - startTime;
                const remaining = Math.max(MIN_LOADING_TIME - elapsed, 0);

                setTimeout(() => {
                    // If reached error threshold, show error and stop polling
                    if (failureCount.current >= ERROR_THRESHOLD)
                    {
                        setLoading(false);
                        setShowMessage(true);
                        setErrorText('Unable to load board data');
                        setBlocked(true);
                        stopped = true;
                        if (pollingRef.current) clearInterval(pollingRef.current);
                    }
                    else
                    {
                        // Otherwise, keep showing loading spinner
                        setLoading(true);
                        setShowMessage(false);
                        setErrorText('');
                        setBlocked(true);
                    }
                }, remaining);
            });
        };

        fetchBoard();
        pollingRef.current = setInterval(() => {
        if (!stopped && failureCount.current < ERROR_THRESHOLD) {
            fetchBoard();
        }
        }, 2000);

        return () => clearInterval(pollingRef.current);
    // eslint-disable-next-line
    }, [setLoading, setErrorText, setShowMessage, setBlocked, hasLoaded, lastFetchOk]);

    if (!boardState) return null;

    const rows = 8;
    const columns = 8;
    const letterLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const numberLabels = [8, 7, 6, 5, 4, 3, 2, 1];

    const renderPiece = (piece) => {
        if (!piece) return null;
        const pieceSymbols = {
        wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
        bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
        }
        return <span className="piece">{pieceSymbols[piece] || ''}</span>;
    };

    const squares = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
        const isDark = (row + col) % 2 === 1;
        const piece = boardState?.[row]?.[col] || null;
        squares.push(
            <div key={`${row}-${col}`} className={`square ${isDark ? 'dark' : 'light'}`}>
            {renderPiece(piece)}
            </div>
        );
        }
    }

    return (
        <div className="board-container">
        <div className="number-labels">{numberLabels.map((n,i) => <div key={i} className="number-label">{n}</div>)}</div>
        <div className="chessboard">{squares}</div>
        <div className="letter-labels">{letterLabels.map((l,i) => <div key={i} className="letter-label">{l}</div>)}</div>
        </div>
    );
};

const parseFEN = (fen) => {
    const rows = fen.split(' ')[0].split('/');
    return rows.map(row => {
        const boardRow = [];
        for (let char of row) {
        if (!isNaN(char)) {
            for (let i = 0; i < parseInt(char); i++) boardRow.push(null);
        } else {
            const isWhite = char === char.toUpperCase();
            const color = isWhite ? 'w' : 'b';
            const piece = char.toLowerCase();
            const pieceMap = { p: 'P', r: 'R', n: 'N', b: 'B', q: 'Q', k: 'K' };
            boardRow.push(color + pieceMap[piece]);
        }
        }
        return boardRow;
    });
};

export default Chessboard;
