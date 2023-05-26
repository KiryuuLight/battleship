import Ship from './ship';

const Gameboard = () => {
    const board = [];

    const boardSize = 10;

    const missedShots = [];

    for (let i = 0; i < boardSize; i += 1) {
        const row = [];
        for (let j = 0; j < boardSize; j += 1) {
            row.push({
                position: `${i},${j}`,
            });
        }
        board.push(row);
    }

    const getBoard = () => board;

    const getPosition = (coords) => {
        const [row, column] = coords;
        return board[row][column];
    };

    const getMissedShots = () => missedShots;

    const placeShip = (coords) => {
        const square = getPosition(coords);
        if (square.isShipExist) return undefined;

        const newShip = Ship(1);
        square.shipInformation = newShip;
        square.isShipExist = true;
        return square;
    };

    const receiveAttack = (coords) => {
        const square = getPosition(coords);
        if (square.isShipExist) {
            square.shipInformation.hit();
            return true;
        }
        missedShots.push(coords);
        square.visited = true;
        return false;
    };

    const allSunk = () => {
        const shipsInBoard = [];
        board.forEach((row) =>
            row.forEach((value) => {
                if (value.shipInformation) shipsInBoard.push(value);
            })
        );
        return shipsInBoard.every((value) => value.shipInformation.isSunk());
    };

    return {
        getBoard,
        getPosition,
        getMissedShots,
        placeShip,
        receiveAttack,
        allSunk,
    };
};

export default Gameboard;
