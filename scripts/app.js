let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function Game(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.currTurnId = 0;
}

Game.prototype.nextTurn = function () {
    this.currTurnId = Number(!this.currTurnId);
}

//this function will return the winner player object
Game.prototype.ifWon = function () {
    //row check 
    for (let el of board) {
        if (isEveryElementSame(el)) {
            return true;
        }
    }
    //column check
    for (let i = 0; i < 3; i++) {
        //create an array from columns
        let ar = board.map(function (array) {
            return array[i];
        })
        if (isEveryElementSame(ar)) {
            return true;
        }
    }
    //diagonals check
    let left_diagonal = [];
    let right_diagonal = [];

    for (let i = 0; i < 3; i++) {
        left_diagonal.push(board[i][i])
        right_diagonal.push(board[i][2 - i]);
    }
    if (isEveryElementSame(left_diagonal) || isEveryElementSame(right_diagonal)) {
        return true;
    }
    return false;
}
Game.prototype.move = function (cellId) {
    let row = Number(cellId[0]);
    let col = Number(cellId[1]);

    if (this.ifWon() === false ) {

        let sign = this.currTurnId === 0 ? 'X' : 'O'
        if (board[row][col] === null) { //should be a valid move
            board[row][col] = sign;
            if (this.ifWon()) {
                //currPlayer has won
                console.log(this.getCurrentPlayer().name + " has won the match :)")
            }
            currGame.nextTurn();
            renderBoard();
        }
    }
}

Game.prototype.getCurrentPlayer = function () {
    if (this.currTurnId == 0) {
        return p1;
    } else {
        return p2;
    }
}

class Player {
    constructor(name, sign, id) {
        this.name = name;
        this.id = id;
        this.score = 0;
        this.sign = sign;
    }
}
//utility function
function isEveryElementSame(array) {
    return array.every(el => el === array[0] && el !== null);
}

//trying the game
var p1, p2;
var currGame;



/*
1. Created Players with sign and id and Name
2. turn logic implemented
3. ifWin code implemented
4. Implement player moves
*/
const newGameBtnEl = document.querySelector('.new-game')
const formEl = document.querySelector('.popup')
const startBtnEl = document.querySelector('.start-btn');
const player1Input = document.getElementById('player-1')
const player2Input = document.getElementById('player-2')
const cells = document.querySelectorAll('.cell');

initialize()

function initialize() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
    const player1 = player1Input.value;
    const player2 = player2Input.value;

    //initializing players
    p1 = new Player(player1, 'X', 0);
    p2 = new Player(player2, 'O', 1);

    currGame = new Game(p1, p2);
    formEl.classList.remove('open');
    renderBoard();
}

function openPopup() {
    //open popup    
    console.log("Clicked New Game")
    formEl.classList.add('open')
}
function renderBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cell = document.querySelector(`.cell[data-id="${i}${j}"]`);
            if (board[i][j] != null) {
                cell.innerHTML = board[i][j];
            } else {
                cell.innerHTML = '';

            }
        }
    }
}

cells.forEach(cell => cell.addEventListener('click', function () {
    let cellId = this.getAttribute('data-id')
    currGame.move(cellId);
}));

newGameBtnEl.addEventListener('click', openPopup)
startBtnEl.addEventListener('click', initialize)




//render Board -> done