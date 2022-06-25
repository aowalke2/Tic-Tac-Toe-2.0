const GRID_WIDTH = 600;
const GRID_SIZE = 3;
const BORDER_SIZE = 2;
const pvpButton = document.getElementById('player2-button');
const pvcButton = document.getElementById('ai-button');
const resetButton = document.getElementById('reset-button');
const winningPlayer = document.getElementById('winner');

const Player = (name, symbol) =>{
    const getName = () => name;
    const getMark = () => symbol;

    return {getName, getMark};
};

const gameBoard = (() => {
    const gameBoard = document.getElementById('gameboard');
    let isFirstPlayerTurn = true;
    let winner = '';

    const player1 = Player('Bill', 'X');
    const player2 = Player('Bob', 'O');

    const makeSquare = (grid, location, symbol, gameArray) => {
        let square = document.createElement('div');
        square.classList.add('square');
        square.style.width = GRID_WIDTH/GRID_SIZE + 'px';
        square.style.height = GRID_WIDTH/GRID_SIZE + 'px';
        square.style.border = BORDER_SIZE + 'px solid #0E0021';
        square.textContent = symbol;
        grid.appendChild(square);
        if(square.textContent === ''){
            square.addEventListener('click', () => {
                let locationArray = location.split(",");
                let row = parseInt(locationArray[0]);
                let column = parseInt(locationArray[1]);
                let mark = '';
                
                if(winner === '')
                {
                    if(isFirstPlayerTurn){
                        mark = player1.getMark();
                    }
                    else{
                        mark = player2.getMark();
                    }
                }

                gameArray[row][column] = mark;

                if(checkGameArray.winningSymbol(gameArray) === 'X'){
                    winner = 'X';
                    winningPlayer.textContent = "X won, three in a row!";
                }
                else if(checkGameArray.winningSymbol(gameArray) === 'O'){
                    winner = 'O';
                    winningPlayer.textContent = "O won, three in a row!";
                }
                else{
                    if(checkGameArray.arrayIsFull(gameArray)){
                        winningPlayer.textContent = "Cat Game, it's a tie";
                    }
                    else{
                        isFirstPlayerTurn = !isFirstPlayerTurn;
                    }

                }
                makeGrid(gameArray);
            });
        }
    };

    const makeGrid = (newGameArray) => {
        while(gameBoard.firstChild){
            gameBoard.removeChild(gameBoard.firstChild);
        }

        let gameArray = newGameArray;
        
        let location;
        let symbol;
        let grid = document.createElement('div');

        grid.classList.add('grid');
        grid.style.width = (GRID_WIDTH + 6*BORDER_SIZE) + 'px';
        gameBoard.appendChild(grid);

        for(let i = 0; i < GRID_SIZE; i++){
            for(let j = 0; j < GRID_SIZE; j++){
                location = `${i},${j}`;
                symbol = gameArray[i][j];
                makeSquare(grid, location, symbol, gameArray); 
            }
        }
    };
    return {makeGrid};
})();

const checkGameArray = (() => {
    const arrayIsFull = (gameArray) => {
        for(let i = 0; i < GRID_SIZE; i++){
            for(let j = 0; j < GRID_SIZE; j++){
                if(gameArray[i][j] === ''){
                    return false;
                }
            }
        }
        return true;
    };

    const winningSymbol = (gameArray) =>{
        //checking the rows
		for (let i = 0; i < GRID_SIZE; i++) {
			if (gameArray[i][0] === gameArray[i][1] && gameArray[i][1] === gameArray[i][2] && gameArray[i][0] !== '') {
				return gameArray[i][0];
			}
		}
		//checking the columns
		for (let j = 0; j < 3; j++) {
			if (gameArray[0][j] === gameArray[1][j] && gameArray[1][j] === gameArray[2][j] && gameArray[0][j] !== '') {
				return gameArray[0][j];
			}
		}
		//checking diagonals
		if (gameArray[0][0] === gameArray[1][1] && gameArray[1][1] === gameArray[2][2] && gameArray[0][0] !== '') {
			return gameArray[0][0];
		}
		if (gameArray[2][0] === gameArray[1][1] && gameArray[1][1] === gameArray[0][2] && gameArray[2][0] !== '') {
			return gameArray[2][0];
		}
		return '';
    };

    const emptyArray = (gameArray) => {
        for(let i = 0; i < GRID_SIZE; i++){
            for(let j = 0; j < GRID_SIZE; j++){
                gameArray[i][j]='';
            }
        }
    };

    return {arrayIsFull, winningSymbol, emptyArray};
})();

let gameArray = [['','',''],['','',''],['','','']];
gameBoard.makeGrid(gameArray);

pvpButton.addEventListener('click', () => {});
pvcButton.addEventListener('click', () => {});
resetButton.addEventListener('click', () => {
    let gameArray = [['','',''],['','',''],['','','']];
    gameBoard.makeGrid(gameArray);
    winningPlayer.textContent ='';
});

//implement minimax one day
