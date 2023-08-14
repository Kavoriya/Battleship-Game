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