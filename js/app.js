/*-------------------------------- Constants --------------------------------*/
const winningCombos =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const playerChoices= [] // to be done later 
const player1 = '🤵'
const player2 = '👽'
const sound1 = new Audio(/* url*/)
/* play command is sound1.play() */

/*---------------------------- Variables (state) ----------------------------*/
let board 
let turn
let winner
let tie



/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const boardEl = document.querySelector('.board')
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/

function init(){
    board = ['','','',
            '','','',
            '','','']
    turn = player1
    winner = false
    tie = false
    render()
    
}


function render(){
    updateBoard()
    updateMessage()
}

function updateBoard(){
    board.forEach((element,i) => {
        squareEls[i].textContent = element 
    
        if (element==='')
            squareEls[i].style.backgroundColor = '#a0d0d0'
        if (element===player1)
            squareEls[i].style.backgroundColor = '#C47335'
        if (element===player2)
            squareEls[i].style.backgroundColor = '#56351E'
    })

}
function updateMessage(){
    if (!winner && !tie){
        messageEl.textContent=`${turn}'s turn `
    }
    else if (tie && !winner){
         messageEl.textContent='tie !'

    }
    else {
        confetti.start(1500)
         messageEl.textContent=`${turn} Wins!`
    }

}
function handleClick(event){
    if (event.target.className !=='sqr') return
    let squareIndex = event.target.id
    if (board[squareIndex] !== '') return
    if (winner) return
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}
function placePiece(index){
    board[index] = turn
    console.log(board)
}
function checkForWinner(){
    winningCombos.forEach(winningCombo=> {
        if ( board[winningCombo[0]] !=='' //not empty
        && board[winningCombo[0]] === board[winningCombo[1]] //1=2
        && board[winningCombo[0]] === board[winningCombo[2]])//1=3
            winner = true
        
    })
}
function checkForTie(){
    
    if (!winner && !board.includes('')) tie = true
    
}
function switchPlayerTurn(){
    if (winner) return
    turn = turn === player1? player2: player1
}

init()
/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click',handleClick)
resetBtnEl.addEventListener('click',init)

