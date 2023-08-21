import { ComputerPlayer } from "./computerPlayer.js";
import { Player } from "./player.js";

export class Game {
   constructor() {
      this.player = new Player();
      this.computer = new ComputerPlayer();
   }

   refresh() {
      this.displayPlayerBoard();
      this.displayComputerBoard();
   }

   populateBoards() {
      this.populatePlayerBoard();
      this.populateComputerBoard();
   }

   populatePlayerBoard() {
      this.player.board.addShip([[0, 0], [0, 1], [0, 2]]);
      this.player.board.addShip([[2, 0], [2, 1], [2, 2]]);
      this.player.board.addShip([[4, 0], [4, 1], [4, 2]]);
      this.player.board.addShip([[4, 6], [4, 7], [4, 8]]);
   }

   populateComputerBoard() {
      this.computer.board.addShip([[0, 0], [0, 1], [0, 2]]);
      this.computer.board.addShip([[2, 0], [2, 1], [2, 2]]);
      this.computer.board.addShip([[4, 0], [4, 1], [4, 2]]);
      this.computer.board.addShip([[4, 6], [4, 7], [4, 8]]);
   }

   displayPlayerBoard() {
      this.removePlayerBoard();
      let body = document.querySelector('body');
      let playerBoard = document.createElement('div');
      playerBoard.classList.add('board', 'player-board');

      for (let row = 0; row < this.player.board.gameboard.length; row++) {
         for (let cell = 0; cell < this.player.board.gameboard[row].length; cell++) {
            let cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.row = row;
            cellDiv.dataset.column = cell;

            if (this.player.board.gameboard[row][cell].ship != null)  {
               cellDiv.classList.add('has-ship');
            }

            if ((this.player.board.gameboard[row][cell].ship != null) 
            && (this.player.board.gameboard[row][cell].isHit)) {
               cellDiv.classList.add('hit');
            }

            if ((this.player.board.gameboard[row][cell].ship == null) 
            && (this.player.board.gameboard[row][cell].isHit)) {
               cellDiv.classList.add('miss');
            }

            playerBoard.appendChild(cellDiv);
         }
      }

      body.appendChild(playerBoard);
   }

   displayComputerBoard() {
      this.removeComputerBoard();
      let body = document.querySelector('body');
      let computerBoard = document.createElement('div');
      computerBoard.classList.add('board', 'computer-board');

      for (let row = 0; row < this.computer.board.gameboard.length; row++) {
         for (let cell = 0; cell < this.computer.board.gameboard[row].length; cell++) {
            let cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.row = row;
            cellDiv.dataset.column = cell;
            cellDiv.addEventListener('click', () => {
               this.playerTurn([row, cell]);
            })

            if ((this.computer.board.gameboard[row][cell].ship != null) 
            && (this.computer.board.gameboard[row][cell].isHit)) {
               cellDiv.classList.add('hit');
            }

            if ((this.computer.board.gameboard[row][cell].ship == null) 
            && (this.computer.board.gameboard[row][cell].isHit)) {
               cellDiv.classList.add('miss');
            }

            computerBoard.appendChild(cellDiv);
         }
      }
      
      body.appendChild(computerBoard);
   }

   computerTurn() {
      console.log('Computer turn');
      let body = document.querySelector('body');
      let hit = this.computer.makeTurn(this.player);
      if (hit[0]) {
         body.classList.add('disabled');
         setTimeout(() => {
            this.computerTurn()
         }, 5000);
         console.log('Computer hits')
         
      } else {
         console.log('Computer misses')
         console.log(hit[1], hit[2])
         body.classList.remove('disabled');
      }

      this.refresh();
   }

   playerTurn(coords) {
      let hit = this.player.attack(coords, this.computer);
      if (hit) {
         console.log('Player hits');
      } else {
         console.log('Player misses');
         this.computerTurn();
      }

      this.refresh();
   }

   removePlayerBoard() {
      if(document.querySelector('.player-board')) {
         document.querySelector('.player-board').remove();
      }
   }

   removeComputerBoard() {
      if(document.querySelector('.computer-board')) {
         document.querySelector('.computer-board').remove();
      }
   }
}