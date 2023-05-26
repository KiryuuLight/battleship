import Player from "../model/player";
import Gameboard from "../model/gameboard";
//Create Player.

// Players can take turns playing the game by attacking the enemy Gameboard.
// The game is played against the computer, so make the ‘computer’ capable of making random plays. 
// The AI does not have to be smart, but it should know whether or not a given move is legal. 
// (i.e. it shouldn’t shoot the same coordinate twice).


describe('Player factory related' , () => {

    let playerOne = Player('Michael'); 

    let gameboardObj = Gameboard();

    test('Should have name property' , () => {
        expect(playerOne.getName()).toBe('Michael');
    })

    describe('Players can take turns playing the game by attacking the enemy Gameboard.' , () => {
        test('Player One should take a turn', () => {
            gameboardObj.placeShip([4, 3]);
            expect(playerOne.turn(gameboardObj, [4, 3])).toEqual({
                attemptTo : [4,3],
                successfully : true,
                byComputer : false,
            });
        });
    });

    describe('If no name is passed , player should be controlled by computer' , () => {
        beforeEach(() => {
            playerOne = Player(); 
            gameboardObj = Gameboard();
        })

        test('Should have computer name per default' , () => {
            expect(playerOne.getName()).toBe('CPU');
        })

        test('Computer should make a random movement', () => {
            expect(playerOne.turn(gameboardObj).byComputer).toBe(true)
        });
    });

    describe('Player | Computer shouldn"t shoot the same coordinate twice' , () => {
        beforeEach(() => {
            playerOne = Player('Luis'); 
            gameboardObj = Gameboard();
        })

        test('Player | Computer shouldn"t shoot the same coordinate twice', () => {
            playerOne.turn(gameboardObj, [4, 3])

            expect(playerOne.turn(gameboardObj, [4, 3])).toBe(undefined)
        });
    });

    
})