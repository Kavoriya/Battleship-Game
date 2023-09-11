import { Gameboard } from "./gameboard.js";

export class ShipsRandomizer {
   constructor() {
      let board = new Gameboard();
      let shipsToPlace = [4, 3, 3, 2, 2, 1, 1];
      for (let ship = 0; ship < shipsToPlace.length; ship++) {
         let start = this.findStartCell(board.gameboard);
         let directions = this.randomizeDirections();
         let shipLength = shipsToPlace[ship];
         for (let i = 0; i < directions.length; i++) {
            let newShip = this.checkDirections(start, directions[i], shipLength, board);
            if (newShip) {
               board.addShip(newShip);
               break;
            }
         }
      }
      return board;
   }

   checkDirections(start, direction, shipLength, board) {
      let startC = start;
      let ship = [start];
      if (direction == 1) {
         return this.checkDirection(-1, 0, startC, shipLength, board, ship);
      }
      if (direction == 2) {
         return this.checkDirection(0, 1, startC, shipLength, board, ship);
      }
      if (direction == 3) {
         return this.checkDirection(1, 0, startC, shipLength, board, ship);
      }
      if (direction == 4) {
         return this.checkDirection(0, -1, startC, shipLength, board, ship);
      }
      return undefined;
   }

   checkDirection(row, column, start, shipLength, board, ship) {
      let isAvailable = true;
      for (let i = 0; i < shipLength - 1; i++) {
         start = [start[0] + row, start[1] + column];
         if (board.isValidCell([start[0], start[1]]) && (!board.gameboard[start[0]][start[1]].isOccupied)) {
            ship.push([start[0], start[1]]);
         } else {
            isAvailable = false;
            ship = [start];
            break;
         }
      }
      if (isAvailable) return ship;
   }

   isOccupied(cell, board) {
      if (board[cell[0]][cell[1]].isOccupied) {
         return true;
      } else return false;
   }

   findStartCell(board) {
      while (true) {
         let startPosition = [
            Math.floor(Math.random() * 10), 
            Math.floor(Math.random() * 10)
         ];
         if (this.isOccupied(startPosition, board)) {
            continue;
         } else {
            return startPosition;
         }
      }
   }

   randomizeDirections() {
      let directions = [1, 2, 3, 4];
      for (var i = directions.length - 1; i > 0; i--) {
         var j = Math.floor(Math.random() * (i + 1));
         var temp = directions[i];
         directions[i] = directions[j];
         directions[j] = temp;
     }
     return directions;
   }

}