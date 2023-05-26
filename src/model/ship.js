// Ship Object :
//
// A ship has to be a length property (This indicate the "health" of the ship).
// A ship should contain a hit() function that increases the number of hits in the ship.
// A ship should contain isSunk() function , this function returns true if numbers of hit and length are the same

const Ship = (length) => {
    const getLength = () => length;

    let numberOfHits = 0;

    const getNumberOfHits = () => numberOfHits;

    const hit = () => {
        numberOfHits += 1;
    };

    const isSunk = () => numberOfHits === length;

    return {
        getLength,
        getNumberOfHits,
        hit,
        isSunk,
    };
};

export default Ship;
