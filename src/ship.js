export class Ship {
   constructor(length) {
      this.length = length;
      this.hits = 0;
      this.isSunk = false;
      this.coords = [];
   }

   hit() {
      this.hits++;
      this.checkIfSunk();
   }

   checkIfSunk() {
      if (this.hits >= this.length) {
         this.isSunk = true;
      }
   }

}