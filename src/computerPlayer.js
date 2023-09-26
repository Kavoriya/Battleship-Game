import { Player } from "./player.js";
import { randomizeDirections } from "./randomizeDirections.js";
import { isValidCell } from "./cellValidator.js";

export class ComputerPlayer extends Player {
   constructor(name = 'Computer') {
      super(name);
      this.target = null;
      this.lastHit = null;
      this.targetDirections = null;
      this.nextDirection = null;
      this.checkedDirection = null;
   }

   makeTurn(player) {
      if (this.target) {
         return this.aimShot(player);
      } else {
         return this.randomShot(player);
      }
   }

   aimShot(player) {
      let shot = this.directionCheck(this.lastHit, this.nextDirection, player.board);
      if (shot == 'Not valid') {
         this.lastHit = this.target;
         this.nextDirection = this.targetDirections.shift();
         return this.aimShot(player);
      }
      let isHit = this.attack([shot[0], shot[1]], player);
      if (!isHit) {
         this.lastHit = this.target;
         this.nextDirection = this.targetDirections.shift();
         return isHit;
      }
      if (isHit && player.board.gameboard[shot[0]][shot[1]].ship.isSunk) {
         this.resetTarget();
         return isHit;
      }
      if (isHit) {
         this.lastHit = [shot[0], shot[1]];
         this.removeFalseDirections(this.checkedDirection);
         return isHit;
      }
   }

   directionCheck(lastHit, direction, board) {
      let cellToHit;
      if (direction == 1) {
         cellToHit = [lastHit[0] - 1, lastHit[1]];
         this.checkedDirection = 'Vertical';
      }
      if (direction == 2) {
         cellToHit = [lastHit[0], lastHit[1] + 1];
         this.checkedDirection = 'Horizontal';
      }
      if (direction == 3) {
         cellToHit = [lastHit[0] + 1, lastHit[1]];
         this.checkedDirection = 'Vertical';
      }
      if (direction == 4) {
         cellToHit = [lastHit[0], lastHit[1] - 1];
         this.checkedDirection = 'Horizontal';
      }
      return this.testCell(cellToHit[0], cellToHit[1], board);
   }

   testCell(row, cell, board) {
      if (!isValidCell([row, cell])
      || (board.gameboard[row][cell].isHit)) {
         return 'Not valid';
      } else {
         return [row, cell];
      }    
   }

   removeFalseDirections(trueDirection) {
      if (trueDirection == 'Vertical') {
         const index2 = this.targetDirections.indexOf(2);
         if (index2 > -1) { 
            this.targetDirections.splice(index2, 1); 
         }
         const index4 = this.targetDirections.indexOf(4);
         if (index4 > -1) { 
            this.targetDirections.splice(index4, 1); 
         }
      }
      if (trueDirection == 'Horizontal') {
         const index1 = this.targetDirections.indexOf(1);
         if (index1 > -1) { 
            this.targetDirections.splice(index1, 1); 
         }
         const index3 = this.targetDirections.indexOf(3);
         if (index3 > -1) { 
            this.targetDirections.splice(index3, 1); 
         }
      }
    }

   resetTarget() {
      this.target = null;
      this.lastHit = null;
      this.targetDirections = null;
      this.nextDirection = null;
      this.checkedDirection = null;
   }

   randomShot(player) {
      while (true) {
         let row = Math.floor(Math.random() * 10);
         let cell = Math.floor(Math.random() * 10);
         if (player.board.gameboard[row][cell].isHit == false) {
            let shot = this.attack([row, cell], player);
            if (shot == true && !player.board.gameboard[row][cell].ship.isSunk) {
               this.target = [row, cell];
               this.lastHit = [row, cell];
               this.targetDirections = randomizeDirections();
               this.nextDirection = this.targetDirections.shift();
            }
            return shot;
         }
      }
   }
}