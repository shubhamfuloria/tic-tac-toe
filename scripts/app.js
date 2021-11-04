var p1, p2;
var currGame;

const newGameBtnEl = document.querySelector('.new-game')
const formEl = document.querySelector('.popup')
const startBtnEl = document.querySelector('.start-btn');
const player1Input = document.getElementById('player-1')
const player2Input = document.getElementById('player-2')
const cells = document.querySelectorAll('.cell');
const playerScoreEl = document.querySelectorAll('.player-score')
const resetBtnEl = document.querySelector('.reset')
const noticeEl = document.querySelector('.notice')
const noticePlayer1Name = document.querySelector('.player-1-name');
const noticePlayer2Name= document.querySelector('.player-2-name')
const noticeScorePlayer1 = document.querySelector('.score-player-1');
const noticeScorePlayer2 = document.querySelector('.score-player-2')

function openPopup() {
    console.log("Clicked New Game")
    formEl.classList.add('open')
}


function showScoreUI() {
    playerScoreEl.forEach(player => player.classList.add('show-score'))
}



function initialize() {
    const player1 = player1Input.value;
    const player2 = player2Input.value;
    p1 = new Player(player1, 'X', 0);
    p2 = new Player(player2, 'O', 1);

    currGame = new Game(p1, p2);

    currGame.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
    formEl.classList.remove('open');
    currGame.isRunning = true;
    updateUI.renderBoard();
    updateUI.renderScoreBoard();
    updateUI.renderNotice();
    showScoreUI();
}

//listeners 

cells.forEach(cell => cell.addEventListener('click', function () {
    let cellId = this.getAttribute('data-id')
    currGame.move(cellId);
}));

newGameBtnEl.addEventListener('click', openPopup)
startBtnEl.addEventListener('click',  initialize)
resetBtnEl.addEventListener('click', function () {
    currGame.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    currGame.isRunning = true;
    currGame.currTurnId = 0;
    updateUI.renderNotice();
    updateUI.renderBoard();
})