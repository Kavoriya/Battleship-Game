import { Cell } from "./cell.js";
import { Ship } from "./ship.js";
import { findEdges } from "./findEdges.js";

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
         newShip.coords.push(coord);
         this.occupyCells(coord);
      })
      this.shipsList.push(newShip);
   }

   receiveHit(coord) {
      this.gameboard[coord[0]][coord[1]].isHit = true;
      let ship = this.gameboard[coord[0]][coord[1]].ship;
      if (ship != null) {
         ship.hit();
         if (ship.isSunk) {
            ship.coords.forEach(coord => this.hitCellEdges(coord))
         }
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
      let cellsToOccupy = findEdges(coord);
      cellsToOccupy.forEach(cell => {
         this.gameboard[cell[0]][cell[1]].isOccupied = true;
      })
   }

   hitCellEdges(coord) {
      let cellsToHit = findEdges(coord);
      cellsToHit.forEach(cell => {
         this.gameboard[cell[0]][cell[1]].isHit = true;
      })
   }
}