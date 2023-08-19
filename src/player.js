import { Gameboard } from "./gameboard";

export class Player {
   constructor(name) {
      this.name = name;
      this.hasLost = false;
      this.board = new Gameboard();
   }
   
   attack(coords, player) {
      player.board.receiveHit([coords[0], coords[1]]);
   }

   checkBoard() {
      if (this.board.allSunk) this.hasLost = true;
   }

   makeComputerTurn(player) {
      let row = Math.floor(Math.random() * 10);
      let column = Math.floor(Math.random() * 10);
      if (player.board.gameboard[row][column].isHit == false) {
         this.attack([row, column], player);
      }
      return [row, column];
   }
}