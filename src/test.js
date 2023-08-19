import { Ship, Cell, Gameboard, Player, ComputerPlayer } from './script.js';

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

test('Gameboard reports not all ships sunk', () => {
   let gameboard = new Gameboard;
   gameboard.addShip([[0, 5], [0, 6]]);
   gameboard.addShip([[2, 2], [2, 3], [2, 4]]);
   gameboard.receiveHit([0, 5]);
   gameboard.receiveHit([0, 6]);
   gameboard.receiveHit([2, 2]);
   gameboard.receiveHit([2, 3]);
   expect(gameboard.allSunk).toBe(false);
});

test('Gameboard reports all ships sunk', () => {
   let gameboard = new Gameboard;
   gameboard.addShip([[0, 5], [0, 6]]);
   gameboard.addShip([[2, 2], [2, 3], [2, 4]]);
   gameboard.receiveHit([0, 5]);
   gameboard.receiveHit([0, 6]);
   gameboard.receiveHit([2, 2]);
   gameboard.receiveHit([2, 3]);
   gameboard.receiveHit([2, 4]);
   expect(gameboard.allSunk).toBe(true);
});

test('1st player attacks 2nd player', () => {
   let player1 = new Player('player 1');
   let player2 = new Player('player 2');
   player1.board.addShip([[0, 0], [0, 1]]);
   player2.board.addShip([[0, 0], [0, 1]]);
   player1.attack([0, 0], player2);
   expect(player2.board.gameboard[0][0].isHit).toBe(true);
});

test('1st player sinks 2nd player ship', () => {
   let player1 = new Player('player 1');
   let player2 = new Player('player 2');
   player1.board.addShip([[0, 0], [0, 1]]);
   player2.board.addShip([[0, 0], [0, 1]]);
   player1.attack([0, 0], player2);
   player1.attack([0, 1], player2);
   expect(player2.board.gameboard[0][0].ship.isSunk).toBe(true);
   expect(player2.board.allSunk).toBe(true);
});

test('2nd player loses after losing all ships', () => {
   let player1 = new Player('player 1');
   let player2 = new Player('player 2');
   player1.board.addShip([[0, 0], [0, 1]]);
   player2.board.addShip([[0, 0], [0, 1]]);
   player1.attack([0, 0], player2);
   player1.attack([0, 1], player2);
   player2.checkBoard();
   expect(player2.hasLost).toBe(true);
});

test('Computer makes a turn', () => {
   let player1 = new Player('player 1');
   let player2 = new ComputerPlayer('player 2');
   player1.board.addShip([[0, 0], [0, 1]]);
   player2.board.addShip([[0, 0], [0, 1]]);
   let check = player2.makeTurn(player1);
   expect(player1.board.gameboard[check[0]][check[1]].isHit).toBe(true);
})