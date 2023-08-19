import { Gameboard } from "./gameboard.js";

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

}