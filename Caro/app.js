var cells = document.querySelectorAll(".cell");
var btnReset = document.querySelector(".btn-reset");
var lblNoti = document.getElementById("label");

var board = [];
var turn = 1;
var running = true;

function resetGame(){
	board = [];
	let row = [0,0,0];
	for(let i=0; i<3; i++)
		board.push([...row]);
	cells.forEach(cell=>cell.textContent="");
	running=true;
	lblNoti.textContent = "Result";
}

function checkWinner(){
	if(board[0][0] == board[1][1] && board[1][1] == board[2][2])
		return board[0][0];
	if(board[0][2] == board[1][1] && board[1][1] == board[2][0])
		return board[1][1];

	for(let i=0; i<3; i++){
		if(board[i][0] == board[i][1] && board[i][1] == board[i][2])
			return board[i][0];
		if(board[0][i] == board[1][i] && board[1][i] == board[2][i])
			return board[0][i];
	}

	return 0;
}

function cellClick(e){	
	if(running==false)
		return;
	if(this.textContent!="")
		return;
	
	let num = this.getAttribute("value");
	
	board[Math.floor(num/3)][num%3] = turn;

	if(turn==1){
		turn=2;
		this.textContent="X";
	}else if (turn==2) {
		turn=1;
		this.textContent="O";
	}
	
	let winner = checkWinner();
	
	if(winner!=0){
		running = false;
		lblNoti.textContent = `Winner is ${ winner == 1? "X" : "O" }`;
	}
}

window.onload = resetGame();

btnReset.addEventListener('click',resetGame);
cells.forEach(cell=>cell.addEventListener('click',cellClick));