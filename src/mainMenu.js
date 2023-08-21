import { Gameboard } from "./gameboard.js";

export class mainMenu {
   constructor() {
      this.playerOneGameboard = new Gameboard();
      this.playerTwoGameboard = new Gameboard();
      let body = document.querySelector('body');
      let main = document.createElement('main');
      let playerOneDiv = document.createElement('div');
      let playerTwoDiv = document.createElement('div');
      playerOneDiv.classList.add('player-div');
      playerTwoDiv.classList.add('player-div');

      let boardOne = document.createElement('div');
      boardOne.classList.add('board');

      for (let row = 0; row < this.playerOneGameboard.gameboard.length; row++) {
         for (let cell = 0; cell < this.playerOneGameboard.gameboard[row].length; cell++) {
            let cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.row = row;
            cellDiv.dataset.column = cell;

            if (this.playerOneGameboard.gameboard[row][cell].ship != null)  {
               cellDiv.classList.add('has-ship');
            }

            if ((this.playerOneGameboard.gameboard[row][cell].ship != null) 
            && (this.playerOneGameboard.gameboard[row][cell].isHit)) {
               cellDiv.classList.add('hit');
            }

            if ((this.playerOneGameboard.gameboard[row][cell].ship == null) 
            && (this.playerOneGameboard.gameboard[row][cell].isHit)) {
               cellDiv.classList.add('miss');
            }

            boardOne.appendChild(cellDiv);
         }
      }

      playerOneDiv.appendChild(boardOne);
      main.appendChild(playerOneDiv);
      body.appendChild(main);

   }

   randomizeShips() {

   }

}