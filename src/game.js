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
      this.randomizeShips(this.player);
      this.randomizeShips(this.computer);
   }

   refresh() {
      let main = document.querySelector('main');
      main.innerHTML = '';

      this.renderPlayerOneDiv(main);
      this.renderComputerDiv(main);
   }

   populateBoards() {
      // this.populatePlayerBoard();
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

            if (this.player.board.gameboard[row][cell].isOccupied) {
               cellDiv.classList.add('occupied');
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

   randomizeShips(player) {
      let shipsToPlace = [4, 3, 3, 2, 2, 1, 1];
      for (let ship = 0; ship < shipsToPlace.length; ship++) {
         let start = this.findStartCell(player.board.gameboard);
         let directions = this.randomizeDirections();
         let shipLength = shipsToPlace[ship];
         for (let i = 0; i < directions.length; i++) {
            let newShip = this.checkDirections(start, directions[i], shipLength, player.board);
            if (newShip) {
               player.board.addShip(newShip);
               break;
            }
         }
      }
   }

   checkDirections(start, direction, shipLength, board) {
      let startC = start;
      let ship = [start];
      if (direction == 1) {
         return this.checkDirection(-1, 0, startC, shipLength, board, ship);
      }
      if (direction == 2) {
         return this.checkDirection(0, 1, startC, shipLength, board, ship);
      }
      if (direction == 3) {
         return this.checkDirection(1, 0, startC, shipLength, board, ship);
      }
      if (direction == 4) {
         return this.checkDirection(0, -1, startC, shipLength, board, ship);
      }
      return undefined;
   }

   checkDirection(row, column, start, shipLength, board, ship) {
      let isAvailable = true;
      for (let i = 0; i < shipLength - 1; i++) {
         start = [start[0] + row, start[1] + column];
         if (board.isValidCell([start[0], start[1]]) && (!board.gameboard[start[0]][start[1]].isOccupied)) {
            ship.push([start[0], start[1]]);
         } else {
            isAvailable = false;
            ship = [start];
            break;
         }
      }
      if (isAvailable) return ship;
   }

   isOccupied(cell, board) {
      if (board[cell[0]][cell[1]].isOccupied) {
         return true;
      } else return false;
   }

   findStartCell(board) {
      while (true) {
         let startPosition = [
            Math.floor(Math.random() * 10), 
            Math.floor(Math.random() * 10)
         ];
         if (this.isOccupied(startPosition, board)) {
            continue;
         } else {
            return startPosition;
         }
      }
   }

   randomizeDirections() {
      let directions = [1, 2, 3, 4];
      for (var i = directions.length - 1; i > 0; i--) {
         var j = Math.floor(Math.random() * (i + 1));
         var temp = directions[i];
         directions[i] = directions[j];
         directions[j] = temp;
     }
     return directions;
   }
}