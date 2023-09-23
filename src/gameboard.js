import { Cell } from "./cell.js";
import { Ship } from "./ship.js";
import { isValidCell } from "./cellValidator.js";

export class Gameboard {
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
         this.occupyCells(coord);
      })
      this.shipsList.push(newShip);
   }

   receiveHit(coord) {
      this.gameboard[coord[0]][coord[1]].isHit = true;
      if (this.gameboard[coord[0]][coord[1]].ship != null) {
         this.gameboard[coord[0]][coord[1]].ship.hit();
         this.checkIfAllSunk();
         return true;
      } 
      return false;
   }

   checkIfAllSunk() {
      let allSunk = true;
      this.shipsList.forEach(ship => {
         if (ship.isSunk == false) allSunk = false;
      });
      if (allSunk) this.allSunk = true;
   }

   occupyCells(coord) {
      let cellsToOccupy = [];
      let north = [coord[0] - 1, coord[1]];
      let northEast = [coord[0] - 1, coord[1] + 1];
      let east = [coord[0], coord[1] + 1];
      let southEast = [coord[0] + 1, coord[1] + 1];
      let south = [coord[0] + 1, coord[1]];
      let southWest = [coord[0] + 1, coord[1] - 1];
      let west = [coord[0], coord[1] - 1];
      let northWest = [coord[0] - 1, coord[1] - 1];
      cellsToOccupy.push(north, northEast, east, 
         southEast, south, southWest, 
         west, northWest, coord);
      cellsToOccupy.forEach(cell => {
         if (isValidCell(cell)) {
            this.gameboard[cell[0]][cell[1]].isOccupied = true;
         }
      })
   }
}