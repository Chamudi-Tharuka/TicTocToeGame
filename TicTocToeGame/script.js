const cells = document.querySelectorAll('.cell');
const titleHeader = document.querySelector('#titleHeader')
const xPlayerDisplay = document.querySelector('#xPlayerDisplay');
const oPlayerDisplay = document.querySelector('#oPlayerDisplay')
const restartBtn = document.querySelector('#restartBtn')

//Initialize variables for the game
let player = 'X'
let isPauseGame = false
let isGameStart = false

//Array to track the state of each cell
const inputCells = ['', '', '', 
                    '', '', '', 
                    '', '', '']

//Array of win conditions
const winConditions = [
    [0,1,2],[3,4,5],[6,7,8], //rows
    [0,3,6],[1,4,7],[2,5,8], //columns
    [0,4,8],[6,4,2]  //diagonals
]

// Add click event listners to each cell
cells.forEach((cell, index) =>{
    cell.addEventListener('click', () => tapCell(cell, index))
})

function tapCell(cell, index){
    //Ensure the game is not paused and the cell is empty
    if(cell.textContent === '' && !isPauseGame){
        isGameStart = true
        updateCell(cell, index)

        // Do a random pick if there are no results
        if(!checkWinner()){
            changePlayer()
            randonPick()
        }
    }
}

function updateCell(cell, index){
    cell.textContent = player
    inputCells[index] = player
    cell.style.color= (player == 'X') ? '#5151ec' : '#b77fdc'
}
    
function changePlayer(){
    player = (player == 'X') ? 'O' : 'X'
}

function randonPick(){
    //pause the game to allow computer to pick
    isPauseGame = true

    setTimeout(() => {
        let randomeIndex
        do {
            //pick a random index
            randomeIndex = Math.floor(Math.random() * inputCells.length)
        }while (
            //Ensure the chosen cell is empty
            inputCells[randomeIndex] != ''
        )

        //update the cell with computer move
        updateCell(cells[randomeIndex], randomeIndex)

        //check if computer won
        if(!checkWinner()){
            changePlayer()
            // switch back to normlal player
            isPauseGame = false
            return
        }
        player = (player == 'X') ? 'O' : 'X'
    }, 1000) // Delay computer move by 1 second
}

function checkWinner(){
    for (const [a,b,c] of winConditions){
        //check each winning conditions
        if (inputCells[a] == player &&
            inputCells[b] == player &&
            inputCells[c] == player
        ) {
            declareWinner([a,b,c])
            return true
        }
    }
    //check for the draw if all cells are filled
    if(inputCells.every(cell => cell != '')){
        declareDraw()
        return true
    }
}

function declareWinner(winningIndices){
    titleHeader.textContent = ` ${player} Wins!`
    isPauseGame = true

    // Highlight the winning cells
    winningIndices.forEach((index) => cells[index].style.background = '#2A2343')
    restartBtn.style.visibility = 'visible'
}

function declareDraw(){
    titleHeader.textContent = 'Draw!'
    isPauseGame =true
    restartBtn.style.visibility = 'visible'
}

function choosePlayer(selectedPlayer){
    //Ensure the game has not started yet
    if(!isGameStart){
        // Override the selected player value
        player = selectedPlayer
        if(player == 'X'){
            //Highlight X display
            xPlayerDisplay.classList.add('player-active')
            oPlayerDisplay.classList.remove('player-active')
        }else {
            // Highlight O display
            xPlayerDisplay.classList.remove('player-active')
            oPlayerDisplay.classList.add('player-active')
        }
    }
}

restartBtn.addEventListener('click',() =>{
    restartBtn.style.visibility = 'hidden'
    inputCells.fill('')
    cells.forEach(cell => {
        cell.textContent = ''
        cell.style.background = ''
    })
    
    isPauseGame = false
    isGameStart = false
    titleHeader.textContent = 'choose'
})

