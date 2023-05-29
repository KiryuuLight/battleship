import gameScreen from '../view/gameScreen';

const gameController = () => {
    let onAppResetGame = () => {};

    const bindOnAppResetGame = (callback) => {
        onAppResetGame = callback;
    };

    const bindOnAppInitGame = (model) => {
        const { playerOne, playerTwo } = model;

        const view = gameScreen();

        const handleReset = () => onAppResetGame();

        const checkAndRenderWinner = (player, opponent) => {
            if (opponent.board.allSunk()) {
                view.renderWinner(player.player);
                view.bindUserRequestRestart(handleReset);
                return true;
            }
            return false;
        };

        const isWinner = (player, opponent) =>
            checkAndRenderWinner(player, opponent) ||
            checkAndRenderWinner(opponent, player);

        const handleAttack = (coords) => {
            playerOne.player.turn(playerTwo.board, coords);
            // Set timeout to simulate response to the machine
            setTimeout(() => {
                playerTwo.player.turn(playerOne.board);
                if (isWinner(playerOne, playerTwo)) return;
                view.bindSquareAttack(handleAttack);
            }, 1000);
        };

        const onPlayersChange = () =>
            view.renderPlayers({ playerOne, playerTwo });
        const onLogChange = (data) => view.renderLog(data);

        playerOne.player.bindOnPlayersChange(onPlayersChange);
        playerTwo.player.bindOnPlayersChange(onPlayersChange);
        playerOne.player.bindOnLogChange(onLogChange);
        playerTwo.player.bindOnLogChange(onLogChange);

        view.renderPlayers(model);
        view.bindSquareAttack(handleAttack);
    };

    return {
        bindOnAppInitGame,
        bindOnAppResetGame,
    };
};

export default gameController;
