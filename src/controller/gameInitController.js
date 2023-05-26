import '../css/style.css';
import gameController from './gameController';

let newGame = gameController('Luis');

const resetGame = () => {
    newGame = gameController('Luis');
    newGame.bindOnAppResetGame(resetGame);
};

newGame.bindOnAppResetGame(resetGame);
