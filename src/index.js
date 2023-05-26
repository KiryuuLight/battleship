// import CustomConsole from './console';

// window.test = CustomConsole('Luis');

import './css/style.css';
import gameController from './controller/gameController';

let newGame = gameController('Luis');

const resetGame = () => {
    newGame = gameController('Luis');
    newGame.bindOnAppResetGame(resetGame);
};

newGame.bindOnAppResetGame(resetGame);
