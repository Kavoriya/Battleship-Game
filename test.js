import { Ship } from './script.js';

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