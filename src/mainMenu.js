import { Game } from "./game.js";
import { Gameboard } from "./gameboard.js";
import { ShipsRandomizer } from "./shipsRandomizer.js";
import { Battlefield } from "./battlefieldBuilder.js";

export class mainMenu {
   constructor() {
      this.playerOneGameboard = new Gameboard();
      // this.addShipsToPlayerOne();
      this.playerOneGameboard = new ShipsRandomizer();
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
      let battlefield = new Battlefield(this.playerOneGameboard.gameboard, 'Main Menu');
      playerOneDiv.appendChild(battlefield);
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