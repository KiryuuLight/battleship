const createElement = (tag, className) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    return element;
};

const createButton = (text, className) => {
    const btnContainer = createElement('div', 'btnContainer');
    const btn = createElement('button', `btn ${className}`);
    btn.textContent = text;
    btnContainer.append(btn);
    return btnContainer;
};

const getElement = (selector) => {
    const element = document.querySelector(selector);
    return element;
};

const getAllElements = (selector) => {
    const element = document.querySelectorAll(selector);
    return element;
};

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const createBoard = (board) => {
    const parent = createElement('div', 'board');

    for (let i = 0; i < board.length; i += 1) {
        const battleRow = createElement('div', 'row');

        for (let j = 0; j < board[i].length; j += 1) {
            const cell = createElement('div', 'cell');

            if (board[i][j].shipInformation) {
                if (board[i][j].shipInformation.isSunk())
                    cell.classList.add('sunk');
            }

            if (board[i][j].visited) cell.classList.add('visited');

            cell.dataset.x = [i];
            cell.dataset.y = [j];
            battleRow.append(cell);
            if (i === 0) {
                const letter = createElement('span', 'letter');
                letter.textContent = letters[j];
                cell.appendChild(letter);
            }

            if (j === 0) {
                const number = createElement('span', 'number');
                number.textContent = i + 1;
                cell.appendChild(number);
            }
        }
        parent.append(battleRow);
    }
    return parent;
};

const createPlayer = (player) => {
    const playerInfo = createElement('section', player.player.getName());
    const playerName = createElement('p', 'playerName');
    playerName.textContent = `${player.player.getName()}`;
    const board = createBoard(player.board.getBoard());
    board.id = player.player.getName();
    playerInfo.append(playerName, board);

    const isThere = getElement(`section.${player.player.getName()}`);

    if (isThere) {
        isThere.replaceWith(playerInfo);
        return undefined;
    }

    return playerInfo;
};

export default {
    createElement,
    createButton,
    createBoard,
    createPlayer,
    getElement,
    getAllElements,
};
