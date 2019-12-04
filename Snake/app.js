const landCanvas = document.getElementById("land-canvas");
var ctx = landCanvas.getContext("2d");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");
const btnChangeMode = document.getElementById("btn-change-mode");
const lblMode = document.getElementById("label");

const cellSize = 30;
const gridX = 20;
const gridY =20;
var imgSnake = new Image();
var imgFood = new Image();
let iTimer;
let gameRunning = false;
let gameMode = 1;

imgSnake.src = "./snake.svg";
imgFood.src = "./food.svg";

const KEY = {
	LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
}

var snake  = {
	body: [{
				x:10,
				y:10
			}],
	dir: KEY.UP,
	length:1
}

var food = {
	x:0,
	y:0
}

function clearRect(x,y){
	ctx.clearRect(x*cellSize,y*cellSize,cellSize,cellSize);
}

function drawSnake(x,y){
	ctx.drawImage(imgSnake,x*cellSize,y*cellSize);
}
function drawFood(x,y){
	ctx.drawImage(imgFood,x*cellSize,y*cellSize);
}
function changeSnakeDirection(e){
	switch(e.keyCode){
		case KEY.LEFT:
			if(snake.dir == KEY.RIGHT) // khong cho di chuyen nguoc
				break;
			snake.dir = KEY.LEFT;
			break;
		case KEY.RIGHT:
			if(snake.dir == KEY.LEFT)
				break;
			snake.dir = KEY.RIGHT;
			break;
		case KEY.UP:
			if(snake.dir == KEY.DOWN)
				break;
			snake.dir = KEY.UP;
			break;
		case KEY.DOWN:
			if(snake.dir == KEY.UP)
				break;
			snake.dir = KEY.DOWN;
			break;
	}
}

function randomNum(max) {
    return Math.floor(Math.random() * max);
}

function check(x,y){ // kiem tra xem vi tri x,y hop le hay ko
	if(x<0||y<0||x>=gridX||y>=gridY)
		return false;
	for(let i in snake.body){
		if(snake.body[i].x == x && snake.body[i].y == y)
			return false;
	}
	return true;
}

function createFood(){ //tao moi moi
	clearRect(food.x,food.y);
	do{
		food.x = randomNum(gridX);
		food.y = randomNum(gridY);
	}while(check(food.x,food.y)==false);
	drawFood(food.x,food.y);
}

function moveSnake(){
	const getHead = snake.body[snake.body.length-1];
	let newPos = {x:0,y:0};
	switch(snake.dir){
		case KEY.LEFT:
			
			newPos.x=getHead.x-1;
			newPos.y=getHead.y;
			break;
		case KEY.RIGHT:
			
			newPos.x=getHead.x+1;
			newPos.y=getHead.y;
			break;
		case KEY.UP:
			
			newPos.x=getHead.x;
			newPos.y=getHead.y-1;
			break;
		case KEY.DOWN:
			
			newPos.x=getHead.x;
			newPos.y=getHead.y+1;
			break;
	}
	
	if(gameMode==0){ //dat vi tri moi game mode free
		if(newPos.x >= gridX)
			newPos.x = 0;
		if(newPos.x < 0)
			newPos.x = gridX-1;
		if(newPos.y >= gridY)
			newPos.y = 0;
		if(newPos.y < 0)
			newPos.y = gridY-1;
	}
	if(check(newPos.x, newPos.y)==false){
		if(gameRunning){
			gameRunning=false;
			clearInterval(iTimer);
			alert("Game Stop!!");
		}
	}
	if(newPos.x == food.x && newPos.y ==food.y){
		snake.length=snake.length+1;
		createFood();
	}

	snake.body.push(newPos);
	drawSnake(newPos.x,newPos.y);
	clearRect(snake.body[0].x,snake.body[0].y);

	if(snake.length<snake.body.length){
		snake.body.shift();
	}
}

function gameReset(){
	snake  = {
		body: [{
				x:10,
				y:10
			}],
		dir: KEY.UP,
		length:1
	}

	food = {
		x:0,
		y:0
	}

	gameRunning = false;

	if(iTimer)
		clearInterval(iTimer);

	gameMode=0;
	lblMode.textContent = "Mode B";

	ctx.clearRect(0,0,cellSize*gridX,cellSize*gridY);

	drawSnake(snake.body[0].x,snake.body[0].y);
}

function gameStart(e){
	gameReset();
	gameRunning = true;
	createFood();
	iTimer = setInterval(moveSnake, 500);
}

function test(){
	for(let i=0; i<20; i++)
		for(let j=0; j<20; j++)
			drawFood(i,j);
}

function changeMode(e){
	if(gameMode == 0){
		gameMode=1;
		lblMode.textContent = "Mode A";
	}else if(gameMode == 1){
		gameMode=0;
		lblMode.textContent = "Mode B";
	}else{
		gameMode = 0;
		lblMode.textContent = "Mode B";
	}
}

btnChangeMode.addEventListener('click',changeMode);
btnStart.addEventListener('click',gameStart);
btnStop.addEventListener('click',gameReset);
window.addEventListener('keydown', changeSnakeDirection);