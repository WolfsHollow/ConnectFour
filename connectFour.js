const title = document.getElementById('title');
const frameWrapper = document.getElementById('frameWrapper');
const frameSq = document.getElementById('frameSq');
const overlayScreen = document.getElementById('overlayScreen');
const root = document.documentElement;


let boardColumns = [];
let boardColDivs= [];
let boardSingleDivs = [[],[],[],[],[],[],[]];
let boardArray= [[],[],[],[],[],[],[]];
let playerTurn = 'R';
let playerColor = 'red';
const HEIGHT = 6;
const WIDTH = 7;      
      
(function createBoard(){
  for (column=0; column<7; column++){
    boardColDivs[column] = document.createElement('div'); //make div for each column
    boardColDivs[column].addEventListener('click', placeToken);
    boardColDivs[column].classList.add('columnDiv');
    boardColDivs[column].value = column;
    frameSq.appendChild(boardColDivs[column]); 
    for (row=0; row<6; row++){
      boardSingleDivs[column][row] = document.createElement('div');
      boardSingleDivs[column][row].classList.add('singleDiv');
      boardSingleDivs[column][row].value = row;
      boardColDivs[column].appendChild(boardSingleDivs[column][row]); 
    }
  } 
})();

function placeToken(){
  playerTurn, playerColor = changeTurn();
  let clickedColumn = this.value;
  let columnArray = boardArray[clickedColumn];
  if (columnArray.length<6){
    columnArray.push(playerTurn);
    let singleDiv = boardSingleDivs[clickedColumn][6-columnArray.length];
    console.log(playerColor);
    singleDiv.style.backgroundColor = playerColor[1];
    // root.style.setProperty('--color', playerColor[1]);
    singleDiv.classList.add('fall');
    checkWin();
  }
}

function changeTurn(){
  if (playerTurn == 'R'){
    playerTurn = 'B';
    color = 'blue';
  }
  else if (playerTurn == 'B'){
    playerTurn = "R";
    color = 'yellow';
  }
  return [playerTurn, color];
}

function checkWin(){
  for (row = HEIGHT-1; row >= 0 ; row--){
    for (column = 0; column < WIDTH; column++){
      let player = boardArray[column][row];
      if (player != undefined){
               
        if (column+3 < WIDTH && // check right
            player == boardArray[column+1][row] &&
            player == boardArray[column+2][row] &&
            player == boardArray[column+3][row]){
          console.log('horizontal win');
          gameWin(player);
          return player;
        }

        if (row + 3 < HEIGHT){ //check down
          if (player == boardArray[column][row+1] &&
              player == boardArray[column][row+2] &&
              player == boardArray[column][row+3]){
            console.log('vertical win');
            gameWin(player);
            return player;
          }          
        }
        if (row+3 < HEIGHT && column+3 < WIDTH){
          // check \
          if (player == boardArray[column+1][row+1] &&
             player == boardArray[column+2][row+2] &&
             player == boardArray[column+3][row+3]){
            console.log('\ diagonal win');
            gameWin(player);
            return player;
          }
        }
        if (row+3 < HEIGHT && column-3 >= 0){
          if (player == boardArray[column-1][row+1] &&
             player == boardArray[column-2][row+2] &&
             player == boardArray[column-3][row+3]){
            console.log('/ diagonal win');
            gameWin(player);
            return;
          }
        }
      }     
    }    
  }
} 
  
function gameWin(player){
  overlayScreen.classList.add('show');
  overlayScreen.addEventListener('click', hideOverlay);
  let winner;
  if (player == 'B'){
    winner = 'Blue';
  }
  else {
    winner = 'Yellow';
  }
  overlayMessage.textContent = `${winner} wins!`;
}

function hideOverlay(){
  overlayScreen.classList.remove('show');
}