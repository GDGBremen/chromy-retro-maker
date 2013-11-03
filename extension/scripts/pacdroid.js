


var posLeft;
var posTop;
var step = 10;

var pacDroidHeight = 40;
var pacDroidWidth = 40;

var UP = 0;
var RIGHT = 1;
var DOWN = 2;
var LEFT = 3;
var direction = RIGHT;

var mouseDistance = 30;

//var pacDroid;

var respectMouse;

window.onload = function createPacDroid() {
	posTop = window.innerHeight / 2;
	posLeft = window.innerWidth / 2;

	var pacDroid=document.createElement("img");
	pacDroid.setAttribute("id", "pacDroid");
	pacDroid.setAttribute("src", chrome.extension.getURL('images/pacdroid_right.png'));
	pacDroid.setAttribute('width', pacDroidWidth + "px");
	pacDroid.setAttribute('height', pacDroidHeight + "px");
	pacDroid.style.position = 'fixed';
	document.documentElement.appendChild(pacDroid);
	pacDroid.style.left = posLeft + "px";
	pacDroid.style.top = posTop + "px";
	document.onmousemove = function(e) {
    	var event = e || window.event;
    	window.mouseX = event.clientX;
    	window.mouseY = event.clientY;
	}

	//turnRandom();
	
	setInterval(function(){process()},100);
}

function process() {
	var pacDroid=document.getElementById("pacDroid");
	var height = window.innerHeight;
	var width = window.innerWidth;



	if (direction === RIGHT) {
		if (posLeft < width) {
			moveRightRespectMouse();	
		} else {
			turnLeft();
			moveLeft();
		}
	}
	if (direction === LEFT) {
		if (posLeft > 0) {
			moveLeftRespectMouse();	
		} else {
			turnRight();
			moveRight();		
		}
	}
	if (direction === UP) {
		if (posTop > 0) {
			moveUpRespectMouse();	
		} else {
			turnDown();
			moveDown();		
		}
	}
	if (direction === DOWN) {
		if (posTop < height) {
			moveDownRespectMouse();	
		} else {
			turnUp();
			moveUp();		
		}
	}

	//if (posTop >= height) {
	//	console.log("back to top");
	//	posTop = 10;
	//}
	fixHorizontal();
	fixVertical();
	pacDroid.style.left = posLeft + "px";
	pacDroid.style.top = posTop + "px";
	
	//console.log("pacDroid placed to: " + posLeft + ", " + posTop);
}

function moveRight() {
	posLeft += step;
}

function moveLeft() {
	posLeft -= step;
}

function moveDown() {
	posTop += step;
}

function moveUp() {
	posTop -= step;
}

function turnLeft() {
	pacDroid.setAttribute('src', chrome.extension.getURL('images/pacdroid_left.png'));	
	posTop += 2 * pacDroidHeight / 3;
	direction = LEFT;
}

function turnRight() {
	pacDroid.setAttribute('src', chrome.extension.getURL('images/pacdroid_right.png'));	
	posTop += 2 * pacDroidHeight / 3;
	direction = RIGHT;
}

function turnUp() {
	pacDroid.setAttribute('src', chrome.extension.getURL("images/pacdroid_up.png"));	
	direction = UP;
	posLeft += 2 * pacDroidWidth / 3;
}

function turnDown() {
	pacDroid.setAttribute('src', chrome.extension.getURL('images/pacdroid_down.png'));	
	direction = DOWN;
	posLeft += 2 * pacDroidWidth / 3;
}

function init() {
    document.captureEvents(Event.MOUSEMOVE)
  	document.onmousemove = handleMouseMove;
}

function moveRightRespectMouse() {
	if (posLeft < window.mouseX && (posLeft + pacDroidWidth + 30) > window.mouseX && 
	posTop < mouseY && mouseY < (posTop + pacDroidHeight)) {
		//turnLeft();
		//moveLeft();
		turnRandom();
	} else {
		moveRight();
	}
}

function moveLeftRespectMouse() {
	if (posLeft > window.mouseX && (posLeft - 30) < window.mouseX && 
	posTop < mouseY && mouseY < (posTop + pacDroidHeight)) {
		//turnRight();
		//moveRight();
		turnRandom();
	} else {
		moveLeft();
	}
}

function moveUpRespectMouse() {
	console.log("mouseY=" + mouseY);
	if (posTop > window.mouseY && (posTop - 30) < window.mouseY && 
	posLeft < mouseX && mouseX < (posLeft + pacDroidWidth)) {
		//turnDown();
		//moveDown();
		turnRandom();
	} else {
		moveUp();
	}
}

function moveDownRespectMouse() {
	if (posTop + pacDroidHeight < window.mouseY && (posTop + pacDroidHeight + 30) < window.mouseY && 
	posLeft < mouseX && mouseX < (posLeft + pacDroidWidth)) {
		//turnUp();
		//moveUp();
		turnRandom();
	} else {
		moveDown();
	}
}

function turnRandom() {
	var newDirection = direction; 
	while (newDirection === direction) {
		var random = Math.random() * 100;
		console.log("random = " + random); 
		if (0.0 <= random && random < 25.0) {	
			newDirection = UP;
		}
		if (25.0 <= random && random < 50.0) {
			newDirection = RIGHT; 
		}
		if (50.0 <= random && random < 75.0) {
			newDirection = DOWN; 
		}
		if (75.0 <= random && random < 100.0) {
			newDirection = RIGHT; 
		}
		console.log("newDirection = " + newDirection);	
	}

	if (newDirection == UP) {
		turnUp();
	}
	if(direction == DOWN) {
		turnDown();
	}
	if(direction == RIGHT) {
		turnRight();
	}
	if(direction == LEFT) {
		turnLeft();
	}
}

function fixHorizontal() {
	var width = window.innerWidth;
	if (posLeft < 0) {
		turnRight();
	}
	if (posLeft > width) {
		turnLeft();
	}
}

function fixVertical() {
	var height = window.innerHeight;
	if (posTop < 0) {
		turnDown();
	}
	if (posTop > height) {
		turnUp();
	}	
}