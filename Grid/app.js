var inputM = document.getElementById("input-m");
var inputN = document.getElementById("input-n");
var formInp = document.querySelector("form");
var btnInput = document.querySelector(".btn-input");
var header = document.querySelector(".header");
var boardGrid = document.querySelector(".grid");
var headerItem = document.querySelectorAll(".nav-item");
var wrapper= document.querySelector(".wrapper");

var m = 3;
var n = 3;

var board = [];

function randomNum(max) {
    return Math.floor(Math.random() * max);
}

function sortGrid(e){
	let num = this.getAttribute("value");
	board.sort((a,b)=>a[num]-b[num]);
	let strCells ="";
	for(let i=0; i<n*m; i++)
		strCells += `<div class="cell" value="${i}">${board[Math.floor(i/m)][i%m]}</div>`;
	boardGrid.innerHTML=strCells;
}

function showGrid(e){
	e.preventDefault();
	n = parseInt(inputN.value);
	m = parseInt(inputM.value);
	formInp.classList.add("hidden");
	let strHeader = "";
	for(let i=0; i<m; i++)
		strHeader += `<div class="nav-item" value="${i}">${i+1}</div>`;
	header.innerHTML = strHeader;
	headerItem = document.querySelectorAll(".nav-item");
	headerItem.forEach(item=>item.addEventListener('click',sortGrid));

	header.style.width =`${m*50}px`;
	board = [];
	
	for(let i=0; i<n; i++){
		let row = [];
		for(let i=0; i<m; i++)
			row.push(randomNum(1000));
		board.push([...row]);
	}

	boardGrid.style.width =`${m*50}px`;
	let strCells ="";
	for(let i=0; i<n*m; i++)
		strCells += `<div class="cell" value="${i}">${board[Math.floor(i/m)][i%m]}</div>`;
	boardGrid.innerHTML=strCells;
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY-8) >= document.body.scrollHeight) {
        // you're at the bottom of the page
        for(let i=n; i<n+100; i++){
			let row = [];
			for(let i=0; i<m; i++)
				row.push(randomNum(1000));
			board.push([...row]);
		}
		n=n+100;
		
		boardGrid.style.width =`${m*50}px`;
		let strCells ="";
		for(let i=0; i<n*m; i++)
			strCells += `<div class="cell" value="${i}">${board[Math.floor(i/m)][i%m]}</div>`;
		boardGrid.innerHTML=strCells;
    }
};

btnInput.addEventListener('click',showGrid);
