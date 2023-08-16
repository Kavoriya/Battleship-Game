class Ship {
   constructor(length) {
      this.length = length;
      this.hits = 0;
      this.isSunk = false;
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
      this.allSunk = false;
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
      this.shipsList.push(newShip);
   }

   receiveHit(coord) {
      if (this.gameboard[coord[0]][coord[1]].isHit == true) {
         return;
      } else if (this.gameboard[coord[0]][coord[1]].ship != null) {
         this.gameboard[coord[0]][coord[1]].ship.hit();
         this.checkIfAllSunk();
      } 
      this.gameboard[coord[0]][coord[1]].isHit = true;  
   }

   checkIfAllSunk() {
      let allSunk = true;
      this.shipsList.forEach(ship => {
         if (ship.isSunk == false) allSunk = false;
      });
      if (allSunk) this.allSunk = true;
   }

}

export { Ship, Cell, Gameboard };