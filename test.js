import { Ship, Cell, Gameboard } from './script.js';

test('A ship gets sunk when getting hit == "length" times', () => {
   let ship = new Ship(2);
   for (let i = 0; i < 2; i++) {
      ship.hit();
   }
  expect(ship.isSunk).toBe(true);
});

test('A ship is not sunk when getting hit < "length" times', () => {
   let ship = new Ship(3);
   for (let i = 0; i < 2; i++) {
      ship.hit();
   }
  expect(ship.isSunk).toBe(false);
});

test('Gameboard adds a 1 cell ship correctly', () => {
   let gameboard = new Gameboard;
   gameboard.addShip([[0, 5]]);
  expect(gameboard.gameboard[0][5].ship).not.toBeNull();
});

test('Gameboard adds a 2 cell ship correctly', () => {
   let gameboard = new Gameboard;
   gameboard.addShip([[0, 5], [0, 6]]);
  expect(gameboard.gameboard[0][5].ship).not.toBeNull();
  expect(gameboard.gameboard[0][6].ship).not.toBeNull();
});

test('Gameboard receives a miss', () => {
   let gameboard = new Gameboard;
   gameboard.addShip([[0, 5], [0, 6]]);
   gameboard.receiveHit([0, 7]);
   expect(gameboard.gameboard[0][7].isHit).toBe(true);
});

test('Ship receives a hit', () => {
   let gameboard = new Gameboard;
   gameboard.addShip([[0, 5], [0, 6]]);
   gameboard.receiveHit([0, 5]);
   expect(gameboard.gameboard[0][5].isHit).toBe(true);
   expect(gameboard.gameboard[0][5].ship.hits).toBe(1);
});

test('Ship receives 2 hits', () => {
   let gameboard = new Gameboard;
   gameboard.addShip([[0, 5], [0, 6]]);
   gameboard.receiveHit([0, 5]);
   gameboard.receiveHit([0, 6]);
   expect(gameboard.gameboard[0][5].isHit).toBe(true);
   expect(gameboard.gameboard[0][6].isHit).toBe(true);
   expect(gameboard.gameboard[0][5].ship.hits).toBe(2);
   expect(gameboard.gameboard[0][6].ship.hits).toBe(2);
});

test('Ship gets sunk', () => {
   let gameboard = new Gameboard;
   gameboard.addShip([[0, 5], [0, 6]]);
   gameboard.receiveHit([0, 5]);
   gameboard.receiveHit([0, 6]);
   expect(gameboard.gameboard[0][5].ship.isSunk).toBe(true);
   expect(gameboard.gameboard[0][6].ship.isSunk).toBe(true);
});
