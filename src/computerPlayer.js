import { Player } from "./player.js";

export class ComputerPlayer extends Player {
   constructor(name = 'Computer') {
      super(name);
   }

   makeTurn(player) {
      let row = Math.floor(Math.random() * 10);
      let column = Math.floor(Math.random() * 10);
      if (player.board.gameboard[row][column].isHit == false) {
         this.attack([row, column], player);
      }
      return [row, column];
   }
}