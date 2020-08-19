import Player from './player';
import Game from './game';
import { player1, player2 } from './assets';

const playerOne = new Player('player-one', player1, 1).generate();
const playerTwo = new Player('player-two', player2, 2).generate();

// console.log(playerOne);
// console.log(playerTwo);


Game.map();

const game = new Game([playerOne, playerTwo]);

document.querySelector('#newGame').addEventListener('click', () => {
  game.init()
  game.moviePlayer()
});

document.querySelector('#rules').addEventListener('click', () => {
  document.querySelector('#rulesModal').classList.add('open')
});

document.querySelector('#closeRules').addEventListener('click', () => {
  document.querySelector('#rulesModal').classList.remove('open')
});

