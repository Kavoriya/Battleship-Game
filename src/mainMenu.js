import { Game } from "./game.js";
import { Gameboard } from "./gameboard.js";
import { ShipsRandomizer } from "./shipsRandomizer.js";
import { Battlefield } from "./battlefieldBuilder.js";
import { createHeader } from "./header.js";
import { createFooter } from "./footer.js";

export class mainMenu {
   constructor() {
      this.playerOneGameboard = new Gameboard();
      // this.addShipsToPlayerOne();
      this.playerOneGameboard = new ShipsRandomizer();
      let body = document.querySelector('body');
      let header = createHeader();
      let main = document.createElement('main');
      let footer = createFooter();
      this.renderPlayerOneDiv(main);
      this.renderMenuDiv(main);

      body.append(header, main, footer);

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
      playerOneDiv.classList.add('player-div', 'player-one-div');
      let battlefield = new Battlefield(this.playerOneGameboard.gameboard, 'Main Menu');
      playerOneDiv.appendChild(battlefield);
      let buttonsSection = this.renderButtonsSection(playerOneDiv, battlefield);
      playerOneDiv.append(buttonsSection); 
      main.appendChild(playerOneDiv);
   }

   renderMenuDiv(main) {
      let menuDiv = document.createElement('div');
      menuDiv.classList.add('player-div', 'menu-div');
      let playWithComputerButton = document.createElement('button');
      playWithComputerButton.classList.add('menu-button');
      playWithComputerButton.textContent = 'PLAY AGAINST COMPUTER';
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

   renderButtonsSection(playerOneDiv, battlefield) {
      let buttonsSection = document.createElement('div');
      buttonsSection.classList.add('buttons-section');
      buttonsSection.append(this.renderRandomizeButton(playerOneDiv, battlefield));
      return buttonsSection;
   }

   renderRandomizeButton(playerOneDiv, battlefield) {
      let randomizeButton = document.createElement('button');
      randomizeButton.classList.add('randomize-btn');
      randomizeButton.textContent = 'Randomize';
      randomizeButton.addEventListener('click', () => {
         this.playerOneGameboard = new ShipsRandomizer();
         battlefield.remove();
         battlefield = new Battlefield(this.playerOneGameboard.gameboard, 'Main Menu');
         playerOneDiv.append(battlefield);
      })
      return randomizeButton;
   }  

}