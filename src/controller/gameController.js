import Player from '../model/player';
import Gameboard from '../model/gameboard';
import gameScreen from '../view/gameScreen';
import generateRandomCoords from '../utils/modelUtils';

const gameController = (name) => {
    let onAppResetGame = () => {};
    // Init model
    const playerOne = Player(name);
    const playerTwo = Player();

    const boardOne = Gameboard();
    const boardTwo = Gameboard();

    // Init view
    const view = gameScreen();
    // Set up  random placement coordinates
    const placeRandomShips = (n, board) => {
        for (let i = 0; i < n; i += 1) {
            const [x, y] = generateRandomCoords();
            board.placeShip([x, y]);
        }
    };
    placeRandomShips(1, boardOne);
    placeRandomShips(1, boardTwo);

    const model = {
        playerOne: {
            name: playerOne.getName(),
            methods: playerOne,
            board: boardOne,
        },
        playerTwo: {
            name: playerTwo.getName(),
            methods: playerTwo,
            board: boardTwo,
        },
    };
    const bindOnAppResetGame = (callback) => {
        onAppResetGame = callback;
    };

    const handleReset = () => onAppResetGame();

    const isWinner = () => {
        if (model.playerOne.board.allSunk()) {
            view.renderWinner(model.playerTwo);
            view.bindUserRequestRestart(handleReset);
            return true;
        }
        if (model.playerTwo.board.allSunk()) {
            view.renderWinner(model.playerOne);
            view.bindUserRequestRestart(handleReset);
            return true;
        }
    };

    const handleAttack = (coords) => {
        model.playerOne.methods.turn(model.playerTwo.board, coords);
        setTimeout(() => {
            model.playerTwo.methods.turn(model.playerOne.board);

            if (isWinner()) return;
            view.bindSquareAttack(handleAttack);
        }, 1000);
    };

    const onPlayersChange = () => view.renderPlayers(model);
    const onLogChange = (data) => view.renderLog(data);

    model.playerOne.methods.bindOnPlayersChange(onPlayersChange);
    model.playerTwo.methods.bindOnPlayersChange(onPlayersChange);
    model.playerOne.methods.bindOnLogChange(onLogChange);
    model.playerTwo.methods.bindOnLogChange(onLogChange);

    view.renderPlayers(model);
    view.bindSquareAttack(handleAttack);

    return {
        bindOnAppResetGame,
    };
};

export default gameController;
