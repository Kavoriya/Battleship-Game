import { Player } from "./player.js";

export class ComputerPlayer extends Player {
   constructor(name = 'Computer') {
      super(name);
   }

   makeTurn(player, rTarget, cTarget) {
      let shot = false;
      while (!shot) {
         if (rTarget != undefined && cTarget != undefined) {
            if (player.board.gameboard[rTarget][cTarget].isHit == false) {
               shot = true;
               return [this.attack([rTarget, cTarget], player), rTarget, cTarget];
            }
         }
         let row = Math.floor(Math.random() * 10);
         let column = Math.floor(Math.random() * 10);
         if (player.board.gameboard[row][column].isHit == false) {
            shot = true;
            return [this.attack([row, column], player), row, column];
         }
      }
   }

}