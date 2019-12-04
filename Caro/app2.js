var boardGrid = document.querySelector(".board");
var cells = document.querySelectorAll(".cell");
var btnReset = document.querySelector(".btn-reset");
var btnInput = document.querySelector(".btn-input");
var lblNoti = document.getElementById("label");
var lblSize = document.getElementById("labelSize");
var inputM = document.getElementById("input-m");
var inputN = document.getElementById("input-n");

var m = 3;
var n = 3;
var board = [];
var turn = 1;
var running = true;

function resetGame(){
	board = [];
	let row = [];
	for(let i=0; i<n; i++)
		row.push(0);
	for(let i=0; i<n; i++)
		board.push([...row]);

	lblSize.textContent=`Grid(${n} x ${n}) M = ${m}`;

	boardGrid.style.width =`${n*100}px`;
	let strCells ="";
	for(let i=0; i<n*n; i++)
		strCells += `<div class="cell" value="${i}"></div>`;
	boardGrid.innerHTML=strCells;
	//console.log(strCells);

	cells = document.querySelectorAll(".cell");
	cells.forEach(cell=>cell.textContent="");
	cells.forEach(cell=>cell.addEventListener('click',cellClick));
	
	running=true;
	lblNoti.textContent = "Result";
}

function checkWinner(x,y){
	console.log(x);
	console.log(y);
	let val = board[x][y];	
	
	//check hang doc
	let i=x-1;
	let j=y;
	let cnt=1;
	while(i>=0 && board[i][j] == val){
		cnt++;
		i--;
	}
	i=x+1;
	while(i<n && board[i][j] == val){
		cnt++;
		i++;
	}
	if(cnt>=m)
		return val;
	//check hang ngang
	cnt=1;
	i=x;
	j=y-1;
	while(j>=0 && board[i][j] == val){
		cnt++;
		j--;
	}
	j=y+1;
	while(j<n && board[i][j] == val){
		cnt++;
		j++;
	}
	if(cnt>=m)
		return val;
	//check hang cheo
	cnt=1;
	i=x-1;
	j=y-1;
	while(j>=0 && i>=0 && board[i][j] == val){
		cnt++;
		j--;
		i--;
	}
	j=y+1;
	i=x+1;
	while(j<n && i<n && board[i][j] == val){
		cnt++;
		j++;
		i++;
	}
	if(cnt>=m)
		return val;
	//check hang cheo nguoc
	cnt=1;
	i=x+1;
	j=y-1;
	while(j>=0 && i<n && board[i][j] == val){
		cnt++;
		j--;
		i++;
	}
	i=x-1;
	j=y+1;
	while(j<n && i>=0 && board[i][j] == val){
		cnt++;
		j++;
		i--;
	}
	if(cnt>=m)
		return val;
	return 0;
}

function cellClick(e){	
	if(running==false)
		return;
	if(this.textContent!="")
		return;
	
	let num = this.getAttribute("value");
	
	board[Math.floor(num/n)][num%n] = turn;

	if(turn==1){
		turn=2;
		this.textContent="X";
	}else if (turn==2) {
		turn=1;
		this.textContent="O";
	}
	
	let winner = checkWinner(Math.floor(num/n),num%n);
	
	if(winner!=0){
		running = false;
		lblNoti.textContent = `Winner is ${ winner == 1? "X" : "O" }`;
		//alert(`Winner is ${ winner == 1? "X" : "O" }`);
		window.scrollTo(0, 0);
	}
}

function btnResetGame(e){
	e.preventDefault();
	resetGame();
}

function btnInputGame(e){
	e.preventDefault();
	n = parseInt(inputN.value);
	m = parseInt(inputM.value);
	resetGame();
}

window.onload = resetGame();

btnInput.addEventListener('click',btnInputGame);
btnReset.addEventListener('click',btnResetGame);
cells.forEach(cell=>cell.addEventListener('click',cellClick));