import gameController from './controller/gameController';

const showBoard = (board) => {
    return board.map((row) => {
        return row.map((value) => {
            let icon = '🌊';
            if (value.shipInformation) {
                if (value.shipInformation.isSunk()) icon = '🔥';
            }
            return icon;
        });
    });
};

const Console = (name) => {
    const data = gameController('Luis');

    let actualPlayer = data.playerOne;
    let noPlayer = data.playerTwo;

    const isWinner = () => {
        if (actualPlayer.board.allSunk()) {
            console.log(`All ${actualPlayer} ship's sunk! `);
            console.log(`${noPlayer} wins!`);
            return;
        }
        if (noPlayer.board.allSunk()) {
            console.log(`All ${noPlayer} ship's sunk! `);
            console.log(`${actualPlayer} wins!`);
        }
    };

    const switchTurn = () => {
        if (actualPlayer.name === name) {
            actualPlayer = data.playerTwo;
            noPlayer = data.playerOne;
            return;
        }
        noPlayer = data.playerTwo;
        actualPlayer = data.playerOne;
    };

    const playerTurn = (coords) => {
        console.log(`Player : ${actualPlayer.name} turn!`);
        console.log(`Your board :`);
        console.log(showBoard(actualPlayer.board.getBoard()));
        console.log(`Enemy's board :`);
        console.log(showBoard(noPlayer.board.getBoard()));
        const attempt = actualPlayer.methods.turn(noPlayer.board, coords);
        let state = 'No ships there';
        if (attempt.successfully) state = 'Hit';

        console.log(
            `${actualPlayer.name} made an attack at ${attempt.attemptTo} and ${state}!`
        );

        switchTurn();
        isWinner();
    };

    return {
        switchTurn,
        playerTurn,
    };
};

export default Console;
