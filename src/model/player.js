import generateRandomCoords from '../utils/modelUtils';

const Player = (name = 'CPU') => {
    const getName = () => name;

    const movements = {};

    let onPlayersChange = () => {};

    let onLogChange = () => {};

    const bindOnPlayersChange = (callback) => {
        onPlayersChange = callback;
    };

    const bindOnLogChange = (callback) => {
        onLogChange = callback;
    };

    const turn = (boardEnemy, coords = generateRandomCoords()) => {
        while (movements[coords]) {
            // eslint-disable-next-line no-param-reassign
            coords = generateRandomCoords();
        }

        const isComputer = name === 'CPU';
        movements[coords] = true;

        const attack = boardEnemy.receiveAttack(coords);

        onPlayersChange();
        onLogChange({ name, coords, attack });

        return {
            attemptTo: coords,
            successfully: attack,
            byComputer: isComputer,
        };
    };

    return {
        getName,
        turn,
        bindOnPlayersChange,
        bindOnLogChange,
    };
};

export default Player;
