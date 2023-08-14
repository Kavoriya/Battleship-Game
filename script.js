class Ship {
   constructor(length) {
      this.length = length;
      this.hits = 0;
      this.isSunk = false;
   }

   hit() {
      this.hits++;
      this.checkSunk();
   }

   checkSunk() {
      if (this.hits >= this.length) {
         this.isSunk = true;
      }
   }

}

class Cell {
   constructor() {
      this.isHit = false;
      this.ship = null;
   }
}

class Gameboard {
   constructor() {
      this.rows = 10;
      this.columns = 10;
      this.shipsList = [];
      this.gameboard = [];
      for (let i = 0; i < this.rows; i++) {
         let row = [];
         for (let j = 0; j < this.columns; j++) {
            row.push(new Cell);
         }
         this.gameboard.push(row);
      }
   }

   addShip(coords) {
      let newShip = new Ship(coords.length);
      coords.forEach(coord => {
         this.gameboard[coord[0]][coord[1]].ship = newShip;
      })
   }

}

export { Ship, Cell, Gameboard };