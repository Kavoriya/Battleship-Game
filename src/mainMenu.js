import { Game } from "./game.js";
import { Gameboard } from "./gameboard.js";

export class mainMenu {
   constructor() {
      this.playerOneGameboard = new Gameboard();
      this.addShipsToPlayerOne();

      let body = document.querySelector('body');
      let main = document.createElement('main');

      this.renderPlayerOneDiv(main);
      this.renderMenuDiv(main);

      body.appendChild(main);

   }

   addShipsToPlayerOne() {
      this.playerOneGameboard.addShip([[0, 5], [0, 6], [0, 7], [0, 8]]);
      this.playerOneGameboard.addShip([[2, 1], [2, 2], [2, 3]]);
      this.playerOneGameboard.addShip([[2, 8], [3, 8], [4, 8]]);
      this.playerOneGameboard.addShip([[6, 0], [6, 1]]);
      this.playerOneGameboard.addShip([[6, 4], [7, 4]]);
   }

   renderPlayerOneDiv(main) {
      let playerOneDiv = document.createElement('div');
      playerOneDiv.classList.add('player-div');
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

   }

   renderMenuDiv(main) {
      let menuDiv = document.createElement('div');
      menuDiv.classList.add('player-div', 'menu-div');
      let playWithComputerButton = document.createElement('button');
      playWithComputerButton.classList.add('menu-button');
      playWithComputerButton.textContent = 'PLAY';
      playWithComputerButton.addEventListener('click', () => {
         this.playGameWithComputer(this.playerOneGameboard);
      });

      menuDiv.append(playWithComputerButton);

      main.appendChild(menuDiv);
   }

   playGameWithComputer(playerOneGameboard) {
      console.log('play');
      let game = new Game(playerOneGameboard);
      game.refresh();
   }

}