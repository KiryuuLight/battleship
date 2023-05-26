import viewUtils from '../utils/viewUtils';

const renderBoard = (boardEnemy) => {
    const board = viewUtils.createBoard(boardEnemy);
    const enemyBoard = viewUtils.getElement('.board:not(#currentPlayer)');
    enemyBoard.parentNode.replaceChild(board, enemyBoard);
};

const gameScreen = () => {
    // Setup root div
    const app = viewUtils.createElement('div', 'root');

    // Title of the game
    const title = viewUtils.createElement('h1', 'title');
    title.textContent = 'Battleship';

    // Main content
    const mainContent = viewUtils.createElement('main', 'main');

    // Register Movements
    const log = viewUtils.createElement('div', 'log');
    log.textContent = 'Click on a square to start the game!';

    // Append all elements to root
    const button = viewUtils.createElement('div', 'btnContainer');
    app.append(title, mainContent, log, button);
    document.body.appendChild(app);

    const renderPlayers = (data) => {
        Object.values(data).forEach((player) => {
            const playerInfo = viewUtils.createElement('section', player.name);
            const playerName = viewUtils.createElement('p', 'playerName');
            playerName.textContent = `${player.name}`;
            const board = viewUtils.createBoard(player.board.getBoard());
            board.id = player.name;
            playerInfo.append(playerName, board);

            const isThere = viewUtils.getElement(`section.${player.name}`);

            if (isThere) {
                isThere.replaceWith(playerInfo);
                return;
            }

            mainContent.append(playerInfo);
        });
    };

    const renderLog = (data) => {
        let attempt = 'Hit';
        if (!data.attack) attempt = 'No ship was found';
        log.textContent = `${data.name} made an attack at [${data.coords}] and ${attempt}!`;
    };

    const renderWinner = (data) => {
        const btnReset = viewUtils.createElement('button', 'btn');
        log.textContent = `${data.name} won the game!`;
        btnReset.textContent = 'Restart';
        btnReset.id = 'btnReset';
        button.append(btnReset);
    };

    const hoverCells = (cell) => {
        cell.addEventListener('mouseenter', (e) => {
            e.target.classList.add('attackSquare');
        });
        cell.addEventListener('mouseleave', (e) => {
            e.target.classList.remove('attackSquare');
        });
    };

    const bindSquareAttack = (handler) => {
        const cells = viewUtils.getAllElements('#CPU .row .cell');
        cells.forEach((cell) => {
            hoverCells(cell);

            cell.addEventListener('click', (e) => {
                const coords = [
                    Number(e.target.dataset.x),
                    Number(e.target.dataset.y),
                ];

                handler(coords);
            });
        });
    };

    const bindUserRequestRestart = (handler) => {
        const btnReset = viewUtils.getElement('#btnReset');
        btnReset.addEventListener('click', () => {
            app.remove();
            handler();
        });
    };

    return {
        renderPlayers,
        renderBoard,
        renderLog,
        renderWinner,
        bindSquareAttack,
        bindUserRequestRestart,
    };
};

export default gameScreen;
