import '../css/style.css';
import gameScreenPlace from '../view/gameScreenPlace';
import gameController from './gameController';
import Player from '../model/player';
import Gameboard from '../model/gameboard';

const newGame = gameController();

const playerOne = Player('Player');
const playerTwo = Player();

const boardOne = Gameboard();
const boardTwo = Gameboard();

const model = {
    playerOne: {
        player: playerOne,
        board: boardOne,
    },
    playerTwo: {
        player: playerTwo,
        board: boardTwo,
    },
};

const newData = () => {
    model.playerOne.player = Player('Player');
    model.playerTwo.player = Player();

    model.playerOne.board = Gameboard();
    model.playerTwo.board = Gameboard();
};

let view = gameScreenPlace(model);

const startGameHandler = (positionsPlayers) => {
    positionsPlayers[0].forEach((value) =>
        model.playerOne.board.placeShip(value)
    );

    positionsPlayers[1].forEach((value) =>
        model.playerTwo.board.placeShip(value)
    );

    newGame.bindOnAppInitGame(model);
};

const resetGame = () => {
    newData();
    view = gameScreenPlace(model);
    view.bindStartGame(startGameHandler);
};

view.bindStartGame(startGameHandler);
newGame.bindOnAppResetGame(resetGame);
