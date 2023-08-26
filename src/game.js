import { ComputerPlayer } from "./computerPlayer.js";
import { Player } from "./player.js";

export class Game {
   constructor(playerOneBoard) {
      this.player = new Player();
      this.player.board = playerOneBoard;
      console.log(this.player);
      this.computer = new ComputerPlayer();
      this.populateComputerBoard();
      this.isOver = false;
      this.winner = null;
   }

   refresh() {
      let main = document.querySelector('main');
      main.innerHTML = '';

      this.renderPlayerOneDiv(main);
      this.renderComputerDiv(main);
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

   renderPlayerOneDiv(main) {
      let playerOneDiv = document.createElement('div');
      playerOneDiv.classList.add('player-div');
      let boardOne = document.createElement('div');
      boardOne.classList.add('board');
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

            boardOne.appendChild(cellDiv);
         }
      }

      playerOneDiv.appendChild(boardOne);
      main.appendChild(playerOneDiv);

   }

   renderComputerDiv(main) {
      let computerDiv = document.createElement('div');
      computerDiv.classList.add('player-div');
      let computerBoard = document.createElement('div');
      computerBoard.classList.add('board');

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
      
      computerDiv.appendChild(computerBoard);
      main.appendChild(computerDiv);
   }

   computerTurn() {
      let main = document.querySelector('main');
      let hit = this.computer.makeTurn(this.player);
      if (hit[0]) {
         this.checkGameOver();
         main.classList.add('disabled');
         setTimeout(() => {
            this.computerTurn()
         }, 2000);
      } else {
         main.classList.remove('disabled');
         console.log(hit[1], hit[2])
      }

      this.refresh();
   }

   playerTurn(coords) {
      let hit = this.player.attack(coords, this.computer);
      if (hit) {
         this.checkGameOver();
      } else {
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

   checkGameOver() {
      this.player.checkBoard();
      this.computer.checkBoard();
      if (this.player.hasLost) {
         this.winner = this.computer;
      }
      if (this.computer.hasLost) {
         this.winner = this.player;
      }
      if (this.player.hasLost || this.computer.hasLost) {
         console.log(this.winner.name + ' won!');
         this.isOver = true;
      }
   }
}