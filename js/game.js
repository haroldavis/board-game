import { obstacle, weapons } from './assets';

class Game {
  constructor(players) {
    this.players = players;
    this.gridSquares = document.querySelectorAll('#grid > div');
    this.currentPlayer = null;
  }

  static map = () => {
    let col = 0;
    let row = 1;

    for (let column = 0; column < 81; column++) {
      col++;
      document.querySelector('#grid').innerHTML += `
        <div class="square" data-column="${col}" data-row="${row}">    
        </div>
        `;

      if (col === 9) {
        col = 0;
        row++
      }
    }
  }

  init = () => {
    this.reset();

    document.querySelector('#health1').innerHTML = this.players[0].health;
    document.querySelector('#health2').innerHTML = this.players[0].health;

    // this.generateElement(this.playerOne.avatar);
    // this.generateElement(this.playerTwo.avatar);


    for (let i = 0; i < 9; i++) {
      this.generateElement(`<img src="${obstacle}" alt="" />`, 'obstacle');
    }

    this.players.map(player => {
      this.generateElement(player, 'player');
    });

    weapons.map(weapon => {
      this.generateElement(`<img src="${weapon}" alt="" />`, 'weapon');
    });

    console.log(this.players)

    this.currentPlayer = this.players[Math.floor(Math.random() * this.players.length)];

    this.detectTurn()

  }

  reset = () => {
    this.gridSquares.forEach(square => {
      square.innerHTML = '';
      square.removeAttribute('class');

      document.querySelectorAll('.panel').forEach(elm => {
        elm.classList.remove('current');
      })
    })
  }

  generateElement = (element, cls) => {
    const randomSquare = Math.floor(Math.random() * this.gridSquares.length);
    const { row, column } = this.gridSquares[randomSquare].dataset
    // aplico destructuring


    const cList = this.gridSquares[randomSquare].classList;

    if (!cList.contains('player') && !cList.contains('obstacle') && !cList.contains('weapon')) {
      this.gridSquares[randomSquare].classList.add(cls);


      if (cls === 'player') {

        this.gridSquares[randomSquare].innerHTML = element.avatar;

        this.players[element.id - 1].position = { row, col: column };

      } else {

        this.gridSquares[randomSquare].innerHTML = element;

      }

    } else {
      //console.log('cls:', cls);
      this.generateElement(element, cls)
    }
  }

  playerHighlights = () => {
    const position = this.currentPlayer.position;

    const col = Number(position.col);
    const row = Number(position.row);

    const moves = (direction, operator) => {

      let move1, move2, move3;

      if (direction === 'north' || direction === 'south') {
        move1 = document.querySelector(`[data-row="${operator === '-' ? row - 1 : row + 1}"][data-column="${col}"]`);
        move2 = document.querySelector(`[data-row="${operator === '-' ? row - 2 : row + 2}"][data-column="${col}"]`);
        move3 = document.querySelector(`[data-row="${operator === '-' ? row - 3 : row + 3}"][data-column="${col}"]`);
      } else {
        move1 = document.querySelector(`[data-column="${operator === '-' ? col - 1 : col + 1}"][data-row="${row}"]`);
        move2 = document.querySelector(`[data-column="${operator === '-' ? col - 2 : col + 2}"][data-row="${row}"]`);
        move3 = document.querySelector(`[data-column="${operator === '-' ? col - 3 : col + 3}"][data-row="${row}"]`);
      }

      if (!move1) return;
      if (move1.classList.contains('obstacle') || move1.classList.contains('player')) return;
      move1.classList.add('highlight');
      move1.addEventListener('click', this.movePlayer);


      if (!move2) return;
      if (move2.classList.contains('obstacle') || move2.classList.contains('player')) return
      move2.classList.add('highlight');
      move2.addEventListener('click', this.movePlayer);


      if (!move3) return;
      if (move3.classList.contains('obstacle') || move3.classList.contains('player')) return;
      move3.classList.add('highlight');
      move3.addEventListener('click', this.movePlayer);


    }

    moves('north', '-');
    moves('south', '+');
    moves('west', '-');
    moves('east', '+');

  }

  movePlayer = (e) => {

    const prevPosition = document.querySelector(`[data-column="${this.currentPlayer.position.col}"][data-row="${this.currentPlayer.position.row}"]`)


    this.players[this.currentPlayer.id - 1].position.col = e.target.dataset.column
    this.players[this.currentPlayer.id - 1].position.row = e.target.dataset.row



    //e.classList.add('current')
    prevPosition.innerHTML = '';
    prevPosition.classList.remove('player');
    e.target.innerHTML = this.currentPlayer.avatar;



    const removeHighlights = () => {
      const posibleMoves = document.querySelectorAll('.highlight');

      posibleMoves.forEach(elm => {
        elm.classList.remove('highlight')
      })
    }

    removeHighlights();


    setTimeout(this.changeTurn, 500);

  }

  changeTurn = () => {
    document.querySelector(`#player${this.players[this.currentPlayer.id - 1].id}`).classList.remove('current');

    if (this.currentPlayer.id === 1) {
      this.currentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[0];
    }

    setTimeout(this.detectTurn, 500);
  }

  detectTurn = () => {
    this.playerHighlights();

    console.log(this.currentPlayer)

    document.querySelector(`#player${this.players[this.currentPlayer.id - 1].id}`).classList.add('current');
  }
};

export default Game;