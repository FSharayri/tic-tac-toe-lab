
/*-------------------------------- Constants --------------------------------*/
const squareElements = document.querySelectorAll(".sqr")
const boardElement = document.querySelector(".board")
const messageElement= document.querySelector("#message")
const buttonElement = document.querySelector("#button")

/*---------------------------- Variables (state) ----------------------------*/

play = false
let turnXO = 0
let winner



/*------------------------ Cached Element References ------------------------*/






/*-------------------------------- Functions --------------------------------*/
markSquare = function(e){
    let squareEl = e.target
    const writeX = (element)=> {
        element.textContent = "X"
        element.classList.toggle("used")
    }
    const writeO = (element)=> {
        element.textContent = "O"
        element.classList.toggle("used")
    }
    if (squareEl.textContent ===''){
        turnXO++

        if (turnXO%2 ===1){
            writeX(squareEl)
            messageElement.textContent= "O player's turn"
        }
        else {
            writeO(squareEl)
            messageElement.textContent= "X player's turn"
        }

    }
    if (winCondition()){
       
        messageElement.textContent= `player ${winner} Wins !!`
        boardElement.removeEventListener('click',markSquare)
        // againButtonElement.disabled = false
    }
    else if (turnXO===9){messageElement.textContent=" its a Tie"}
    
}
function winCondition(){
    for (let i =0; i<3; i++) {
    if (squareElements[i].textContent===squareElements[i+3].textContent&& squareElements[i].textContent===squareElements[i+6].textContent&&squareElements[i].textContent!=='')
        {winner = squareElements[i].textContent
        return true}
    
    }
    for (let i= 0 ; i<7; i+=3){
        if (squareElements[i].textContent===squareElements[i+1].textContent && squareElements[i].textContent===squareElements[i+2].textContent && squareElements[i].textContent!=='')
            {winner = squareElements[i].textContent
             return true}
    }
    if (squareElements[0].textContent===squareElements[4].textContent&& squareElements[0].textContent===squareElements[8].textContent&&squareElements[0].textContent!=='')
        {winner = squareElements[0].textContent
            return true}
    if (squareElements[2].textContent===squareElements[4].textContent&& squareElements[2].textContent===squareElements[6].textContent&&squareElements[2].textContent!=='')
        {winner = squareElements[2].textContent
            return true}
    return false

}
function playagain(){
    // clear all squares 

    for(squareElement of squareElements){
        squareElement.textContent =''
        squareElement.classList.remove("used")
    }
    // clickable squares 
    boardElement.addEventListener('click', markSquare)
    // new message
    messageElement.textContent ="X's turn"
    
    turnXO= 0
    
}
/*----------------------------- Event Listeners -----------------------------*/

boardElement.addEventListener('click', markSquare)
buttonElement.addEventListener("click",playagain)




