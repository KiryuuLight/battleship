// Ship Object :
//
// A ship must have length property (This indicate the "health" of the ship).
// A ship should contain a hit() function that increases the number of hits in the ship.
// A ship should contain isSunk() function , this function returns true if numbers of hit and length are the same.

import Gameboard from '../model/gameboard';
import Ship from '../model/ship';

describe('Gameboard Factory Related', () => {
    let gameboardObj = Gameboard();

    test('Should have the size of 10 x 10', () => {
        expect(gameboardObj.getBoard().length).toBe(10);
    });

    test('Should return the position of a certain item ', () => {
        expect(gameboardObj.getPosition([4, 3])).toEqual({ position: '4,3' });
    });

    describe('placeShip() method related', () => {
        const result = gameboardObj.placeShip([4, 2]);

        test('Method should be able to place ships at specific coordinates', () => {
            expect(result.position).toBe('4,2');
            expect(result).toHaveProperty('shipInformation');
        });

        test('Method should be able to place ships at specific coordinates', () => {
            expect(result.position).toBe('4,2');
            expect(result).toHaveProperty('shipInformation');
        });

        test('Key shipInformation in value return should have getLength , getNumberOfHits , hit and isSunk properties', () => {
            expect(result.shipInformation).toHaveProperty('getLength');
            expect(result.shipInformation).toHaveProperty('getNumberOfHits');
            expect(result.shipInformation).toHaveProperty('hit');
            expect(result.shipInformation).toHaveProperty('isSunk');
        });

        test('If a ship exists, the method should not be able to place a ship at the provided coordinate', () => {
            expect(gameboardObj.placeShip([4, 2])).toBe(undefined);
        });
    });

    // Gameboards should have a receiveAttack function that takes a pair of coordinates, determines
    // whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship,
    // or records the coordinates of the missed shot.

    test('Should have the receiveAttack function', () => {
        expect(gameboardObj).toHaveProperty('receiveAttack');
    });

    describe('receiveAttack() method related', () => {
        beforeEach(() => {
            gameboardObj = Gameboard();
        });

        test('receiveAttack should register the missed shot if the ship was not found ', () => {
            gameboardObj.receiveAttack([1, 2]);
            expect(gameboardObj.getMissedShots()).toEqual([[1, 2]]);
        });

        test('receiveAttack should increase the hit property if the ship was found ', () => {
            gameboardObj.placeShip([4, 2]);

            gameboardObj.receiveAttack([4, 2]);

            const shipAttacked = gameboardObj.getPosition([4, 2]);

            expect(shipAttacked.shipInformation.getNumberOfHits()).toEqual(1);
        });
    });

    test('Should keep track of missed attacks so they can display them properly.', () => {
        gameboardObj.receiveAttack([0, 2]);
        gameboardObj.receiveAttack([3, 7]);
        gameboardObj.receiveAttack([1, 9]);
        gameboardObj.receiveAttack([7, 3]);

        expect(gameboardObj.getMissedShots()).toEqual([
            [0, 2],
            [3, 7],
            [1, 9],
            [7, 3],
        ]);
    });

    describe('allSunk() method related', () => {
        beforeEach(() => {
            gameboardObj = Gameboard();
        });

        test('Should be able to report whether or not all of their ships have been sunk', () => {
            const shipsAttacked = [
                [7, 8],
                [1, 3],
                [5, 5],
                [8, 0],
                [4, 4],
            ];

            shipsAttacked.forEach((ship) => gameboardObj.placeShip(ship));

            shipsAttacked.forEach((ship) => gameboardObj.receiveAttack(ship));

            expect(gameboardObj.allSunk()).toBe(true);
        });
    });
});
