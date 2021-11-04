function Game(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.currTurnId = 0;
    this.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
    this.isRunning = false;
}
class Player {
    constructor(name, sign, id) {
        this.name = name;
        this.id = id;
        this.score = 0;
        this.sign = sign;
    }
}
Game.prototype.nextTurn = function () {
    this.currTurnId = Number(!this.currTurnId);
}

//this function will return the winner player object
Game.prototype.ifWon = function () {
    //row check 
    for (let el of this.board) {
        if (isEveryElementSame(el)) {
            return true;
        }
    }
    //column check
    for (let i = 0; i < 3; i++) {
        //create an array from columns
        let ar = this.board.map(function (array) {
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
        left_diagonal.push(this.board[i][i])
        right_diagonal.push(this.board[i][2 - i]);
    }
    if (isEveryElementSame(left_diagonal) || isEveryElementSame(right_diagonal)) {
        return true;
    }
    return false;
}
Game.prototype.move = function (cellId) {
    let row = Number(cellId[0]);
    let col = Number(cellId[1]);

    if (this.ifWon() === false && this.isRunning == true) {

        let sign = this.currTurnId === 0 ? 'X' : 'O'
        if (this.board[row][col] === null) { //should be a valid move
            this.board[row][col] = sign;
            if (this.ifWon()) {
                //currPlayer has won
                console.log(this.getCurrentPlayer().name + " has won the match :)")
                currGame.getCurrentPlayer().score++;
                updateUI.renderScoreBoard();
                updateUI.renderNotice(this.getCurrentPlayer().id);
                this.isRunning = false;
            }
            else if(this.ifDraw()) {
                this.isRunning = false;
                updateUI.renderNotice(2);
            }
            currGame.nextTurn();
            updateUI.renderBoard();
            updateUI.renderScoreBoard();
            if(this.isRunning === true)
                updateUI.renderNotice();
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

Game.prototype.ifDraw = function () {

    for(array of this.board) {
        for(el of array) {
            if(el === null) {
                return false;
            }
        }
    }
    return true;
}


//UI
var updateUI = {
    renderBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let cell = document.querySelector(`.cell[data-id="${i}${j}"]`);
                if (currGame.board[i][j] != null) {
                    cell.innerHTML = currGame.board[i][j];
                } else {
                    cell.innerHTML = '';

                }
            }
        }
    },
    renderScoreBoard() {
        noticePlayer1Name.innerHTML = currGame.p1.name;
        noticePlayer2Name.innerHTML = currGame.p2.name;
        noticeScorePlayer1.innerHTML = currGame.p1.score;
        noticeScorePlayer2.innerHTML = currGame.p2.score;
    },
    renderNotice(signal) {
        //signal : 
        /*
            0 -> p1 won
            1 -> p2 won
            2 -> draw
            3 -> nothing special
        */
        let message = '';
        switch (signal) {
            case 0:
                message = `${currGame.p1.name} won the match :)`
                break;
            case 1:
                message = `${currGame.p2.name} won the match :)`
                break;
            case 2:
                message = `It's a draw :|`
                break;
            default:
                message = `It's ${currGame.getCurrentPlayer().name} turn!`
                break;
        }
        if (message !== '') {
            noticeEl.innerHTML = message;
        }
    },

}



//utility functions

function isEveryElementSame(array) {
    return array.every(el => el === array[0] && el !== null);
}