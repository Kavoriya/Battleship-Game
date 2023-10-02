import { CellBuilder } from "./cellBuilder.js";

export class Battlefield {
   constructor(gameboard, style) {
      let table = document.createElement('table');
      table.classList.add('battlefield-table');
      let tBody = document.createElement('tbody');
      let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      
      for (let row = 0; row < gameboard.length; row++) {
         let tRow = document.createElement('tr');
         for (let cell = 0; cell < gameboard[row].length; cell++) {
            let tD = new CellBuilder(row, cell);
            let cellContent = document.createElement('div');
            cellContent.classList.add('cell-content');

            if (row == 0) {
               let letter = document.createElement('div');
               letter.classList.add('column-letter', 'marker');
               letter.textContent = letters[cell];
               cellContent.append(letter);
            }
      
            if (cell == 0) {
               let digit = document.createElement('div');
               digit.classList.add('row-digit', 'marker');
               digit.textContent = row + 1;
               cellContent.append(digit);
            }
            
            if (style == 'Main Menu') {
               if (gameboard[row][cell].ship != null)  {
                  tD.classList.add('has-ship');
               }
            }
            
            if (style == 'Game(Player)') {
               if (gameboard[row][cell].ship != null)  {
                  tD.classList.add('has-ship');
               }
         
               if ((gameboard[row][cell].ship != null) 
               && (gameboard[row][cell].isHit)) {
                  tD.classList.add('hit');
               }
         
               if ((gameboard[row][cell].ship == null) 
               && (gameboard[row][cell].isHit)) {
                  tD.classList.add('miss');
               }
            }

            if (style == 'Game(Computer)') {
               if ((gameboard[row][cell].ship != null) 
               && (gameboard[row][cell].isHit)) {
                  tD.classList.add('hit');
               }
         
               if ((gameboard[row][cell].ship == null) 
               && (gameboard[row][cell].isHit)) {
                  tD.classList.add('miss');
               }
            }

            if (gameboard[row][cell].ship 
            && gameboard[row][cell].ship.isSunk) {
               tD.classList.add('sunk');
               let cross = document.createElement('span');
               cross.textContent = 'X';
               cellContent.append(cross);
            }

            tD.append(cellContent);
            tRow.append(tD);
         }
         tBody.append(tRow);
      }
      table.append(tBody);
      return table;
   }
}