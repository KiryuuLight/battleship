/* eslint-disable no-shadow */
import viewUtils from '../utils/viewUtils';
import randomCoords from '../utils/modelUtils';

const gameScreenPlace = (data) => {
    // Setup root div
    const app = viewUtils.createElement('div', 'root');

    // Title of the game
    const title = viewUtils.createElement('h1', 'title');
    title.textContent = 'Battleship';

    // Player One section
    const playerOneContainer = viewUtils.createPlayer(data.playerOne);

    // Player Two Section
    const playerTwoContainer = viewUtils.createPlayer(data.playerTwo);
    playerTwoContainer.classList.add('op-4');

    // Main content
    const mainContent = viewUtils.createElement('main', 'main');
    mainContent.append(playerOneContainer, playerTwoContainer);

    // Append all elements to root
    const elementContainer = viewUtils.createElement('div', 'elementContainer');
    const btnRandomise = viewUtils.createButton('Randomise', 'btnRandomise');
    const btnReset = viewUtils.createButton('Reset', 'btnReset');

    // Dragable Item

    const dragableItem = viewUtils.createElement('div', 'dragableElement');
    dragableItem.draggable = true;
    const cell = viewUtils.createElement('div', 'cell busy');
    dragableItem.append(cell);
    elementContainer.append(btnRandomise, dragableItem, btnReset);

    const btnStart = viewUtils.createButton('Start', 'btnStart');

    const buttons = [elementContainer, btnStart];

    app.append(title, mainContent, ...buttons);
    document.body.appendChild(app);

    // Functions

    const attachDragCellEvent = () => {
        const cells = viewUtils.getAllElements('.board:not(#CPU) .row .cell');
        cells.forEach((cell) => {
            cell.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.currentTarget.classList.add('position');
            });

            cell.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('position');
            });

            cell.addEventListener('drop', (e) => {
                e.preventDefault();
                e.currentTarget.classList.add('busy');
                e.currentTarget.classList.remove('position');
            });
        });
    };

    const generateRandomCoords = (notCpu) => {
        let element = '.board#CPU';

        if (notCpu) element = '.board:not(#CPU)';

        const cells = viewUtils.getAllElements(`${element} .row .cell`);

        const generateRandomShips = (length) => {
            let [x, y] = randomCoords();

            while (x > length) {
                [x, y] = randomCoords();
            }

            const coordsGenerated = Array.from({ length }, (_, i) => [
                x + i,
                y,
            ]);

            const cellArrays = Array.from(cells).forEach((cell) => {
                const coordsCell = [
                    Number(cell.dataset.x),
                    Number(cell.dataset.y),
                ];

                if (
                    coordsGenerated.some(
                        (value) =>
                            JSON.stringify(value) === JSON.stringify(coordsCell)
                    )
                ) {
                    cell.classList.add('busy');
                }
            });

            return cellArrays;
        };

        const generatePieces = (piece, length) => {
            for (let i = 0; i < piece; i += 1) {
                generateRandomShips(length);
            }
        };

        generatePieces(1, 4);
        generatePieces(2, 3);
        generatePieces(3, 2);
        generatePieces(4, 1);
    };

    const resetBoard = () => {
        const board = viewUtils.getElement('.board:not(#CPU)');
        const newBoard = viewUtils.createBoard(data.playerOne.board.getBoard());
        board.innerHTML = newBoard.innerHTML;
        attachDragCellEvent();
    };

    const attachRandomiseCellEvent = () => {
        btnRandomise.addEventListener('click', () => {
            resetBoard();
            generateRandomCoords(true);
        });
    };

    const getPositionedShips = (notCpu) => {
        let element = '.board#CPU';

        if (notCpu) element = '.board:not(#CPU)';

        const cells = viewUtils.getAllElements(`${element} .row .cell`);
        const cellsArray = Array.from(cells);
        const positions = cellsArray
            .filter((cell) => cell.classList.contains('busy'))
            .map((cell) => {
                const x = Number(cell.dataset.x);
                const y = Number(cell.dataset.y);
                return [x, y];
            });

        return positions;
    };

    const attachResetButtonEvent = () => {
        btnReset.addEventListener('click', resetBoard);
    };

    const generatePositionsComputer = () => {
        generateRandomCoords();
        const positionsComputer = getPositionedShips();
        return positionsComputer;
    };

    const bindStartGame = (handler) => {
        btnStart.addEventListener('click', () => {
            const positionsPlayer = getPositionedShips(true);
            const positionsComputer = generatePositionsComputer();

            if (positionsPlayer.length !== 0) {
                app.remove();
                const positions = [positionsPlayer, positionsComputer];
                handler(positions);
            }
        });
    };

    const attachDragStartEvent = () => {
        dragableItem.addEventListener('dragstart', () => {});
    };

    const initListeners = () => {
        attachDragCellEvent();

        attachDragStartEvent();

        attachRandomiseCellEvent();

        attachResetButtonEvent();
    };

    initListeners();

    return {
        bindStartGame,
    };
};

export default gameScreenPlace;
