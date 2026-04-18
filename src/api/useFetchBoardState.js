export async function fetchBoardState() {
    const res = await fetch('http://localhost:8080/api/state');

    const data = await res.json();

    if (!data.boardFEN) {
        throw new Error('No board data returned');
    }

    return parseFEN(data.boardFEN);
}

export const parseFEN = (fen) => {
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
