// Ship Object :
//
// A ship must have length property (This indicate the "health" of the ship).
// A ship should contain a hit() function that increases the number of hits in the ship.
// A ship should contain isSunk() function , this function returns true if numbers of hit and length are the same.

import Ship from '../model/ship';

describe('Ship Factory Related', () => {
    const shipObj = Ship(1);

    test('Ship must have a getLength property', () => {
        expect(shipObj).toHaveProperty('getLength');
    });

    test('Ship must have a number of Hits property', () => {
        expect(shipObj).toHaveProperty('getNumberOfHits');
    });

    test('Ship Ship must have a hit function', () => {
        expect(shipObj).toHaveProperty('hit');
    });

    test('Ship Ship must have a isSunk function', () => {
        expect(shipObj).toHaveProperty('isSunk');
    });

    test('Hit Function increases the number of hits', () => {
        shipObj.hit()
        expect(shipObj.getNumberOfHits()).toBe(1);
    });

    test('isSunk Function should return true if length and number of hits are the same', () => {
        expect(shipObj.isSunk()).toBe(true);
    });
});
