var gray = "#555555";
var lightgray = "#AAAAAA";
var greenish = "#00AAAA";
var red = "#FF1C2B";
var donkeyPosition = 0;
var timeIntervall = 15;
var donkeyLeftSide = true;
var carLeftSide = false;
var carPosition = 0;
var carYtopposition;
var carYbottomposition;
var donkeyYtopposition;
var donkeyYbottomposition;
var gameStarted = false;
var donkeyPoints = 0;
var driverPoints = 0;

// TODO SHOW BOOM when collision

function handleKeyboardEvent(event){
	console.log("event.keyCode: " + event.keyCode);
	if(event.keyCode == 32){
		if(gameStarted){
			carLeftSide = !carLeftSide;
		}
	}
	// ENTER
	if(event.keyCode == 13){
		if(gameStarted){
			gameStarted=false;
			// TODO stop game
		}else{
			donkeyPoints = 0;
			driverPoints = 0;
			gameStarted=true;
			// TODO start game
		}
	}
}

function createBackground(){
	
	$("#donkeyCanvas").drawRect({
		fillStyle: gray,
		x: 300, y: 175,
		width: 600,
		height: 375
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: greenish,
		x: 100, y: 185,
		width: 170,
		height: 345
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: greenish,
		x: 475, y: 185,
		width: 230,
		height: 345
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: gray,
		x: 475, y: 285,
		width: 200,
		height: 45
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: gray,
		x: 475, y: 335,
		width: 200,
		height: 30
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: gray,
		x: 475, y: 45,
		width: 90,
		height: 15
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: gray,
		x: 475, y: 75,
		width: 60,
		height: 15
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: gray,
		x: 100, y: 45,
		width: 90,
		height: 15
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: gray,
		x: 100, y: 75,
		width: 60,
		height: 15
	});
	
	// street
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: 190, y: 175,
		width: 2,
		height: 375
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: 355, y: 175,
		width: 2,
		height: 375
	});	
	
	// donkey and driver
	$("#donkeyCanvas").drawText({
		fillStyle: lightgray,
		x: 100, y: 45,
		fontSize: 12,
		fontFamily: "'Press Start 2P', cursive",
		text: "Donkey"
	});
	
	$("#donkeyCanvas").drawText({
		fillStyle: lightgray,
		x: 475, y: 45,
		fontSize: 12,
		fontFamily: "'Press Start 2P', cursive",
		text: "Driver"
	});
	
	// helptext
	$("#donkeyCanvas").drawText({
		fillStyle: lightgray,
		x: 475, y: 285,
		fontSize: 12,
		fontFamily: "'Press Start 2P', cursive",
		text: "Press Space\nBar to switch\nlanes"
	});
	
	var secondText;
	
	if(gameStarted){
		secondText = "Press ENTER\nto STOP the game";
	}else{
		secondText = "Press ENTER\nto START the game";
	}
	
	$("#donkeyCanvas").drawText({
		fillStyle: lightgray,
		x: 475, y: 335,
		fontSize: 12,
		fontFamily: "'Press Start 2P', cursive",
		text: secondText
	});
}

function redraw(status){
	// TODO instead of creating whole background, create only street new
	createBackground();
	drawScore();
	animateStreetLines(status);
	animateDonkey();
	animateCar();
	
	// TODO animate more here

	var newStatus;
	if(gameStarted){
		checkStatus();
		if(status<500000){
			newStatus= status + 1;
		}else{
			newStatus= 0;
		}
	}else{
		newStatus=status;
	}
	window.setTimeout("redraw("+newStatus+")",timeIntervall);
}

function checkStatus(){

	var collisionDetected = false;

	if(donkeyLeftSide==carLeftSide){
		
		if(carYtopposition>donkeyYtopposition && carYtopposition<donkeyYbottomposition){
			collisionDetected = true;
			console.log("COLLISION 1 detected!!!");
		}
		if(carYtopposition<donkeyYtopposition && carYbottomposition>donkeyYtopposition){
			collisionDetected = true;
			console.log("COLLISION 2 detected!!!");
		}
	}
	
	if(collisionDetected){
		donkeyPosition = 0;
		carPosition = 0;
		donkeyLeftSide = Math.random()<0.5;
		donkeyPoints = donkeyPoints+1;
	}else{
		if(donkeyPosition>=50){
			donkeyPosition = 0;
			donkeyLeftSide = Math.random()<0.5;
			if(carPosition>=11){
				carPosition = 0;
				donkeyPosition = 0;
				driverPoints = driverPoints+1;
			}else{
				carPosition = carPosition+1;
			}
		}else{
			donkeyPosition = donkeyPosition + 1;
		}
	}
}

function drawScore(){
	$("#donkeyCanvas").drawText({
		fillStyle: lightgray,
		x: 100, y: 75,
		fontSize: 12,
		fontFamily: "'Press Start 2P', cursive",
		text: donkeyPoints
	});
	
	$("#donkeyCanvas").drawText({
		fillStyle: lightgray,
		x: 475, y: 75,
		fontSize: 12,
		fontFamily: "'Press Start 2P', cursive",
		text: driverPoints
	});
}

function animateStreetLines(status){
	
	var variable = status%10;
	
	for(var i=0;i<12;i++){
		$("#donkeyCanvas").drawRect({
			fillStyle: lightgray,
			x: 270, y: (-30+36*i)+variable*6,
			width: 2,
			height: 23
		});
	}
}

function animateCar(){
	var carX, carY;
	var rearWidth = 12;
	var rearHeight = 30;
	var frontWidth = 6;
	var frontHeight = 16;
	
	if(carLeftSide){
		carX = 210;
		carY = 300-(carPosition*12);
	}else{
		carX = 295;
		carY = 300-(carPosition*12);
	}
	
	carYtopposition = carY-65;
	carYbottomposition = carY+20;
	
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: carX, y: carY,
		width: rearWidth,
		height: rearHeight
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: carX+40, y: carY,
		width: rearWidth,
		height: rearHeight
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: carX+4, y: carY-50,
		width: frontWidth,
		height: frontHeight
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: carX+36, y: carY-50,
		width: frontWidth,
		height: frontHeight
	});
	
	// body
	
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: carX+20, y: carY-22,
		width: 16,
		height: 74
	});
	
	// comment this out
	
	/*$("#donkeyCanvas").drawRect({
		fillStyle: red,
		x: carX+20, y: carYtopposition,
		width: 2,
		height: 2
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: red,
		x: carX+20, y: carYbottomposition,
		width: 2,
		height: 2
	});*/
	
}

function animateDonkey(){
	
	var donkeyX, donkeyY;
	var legswidth = 6;
	var widthBetweenLegs = 2;
	var legsheight = 20;
	var bodyheight = 15;
	var bodywidth = 10+(widthBetweenLegs*2)+(legswidth*4);
	
	if(donkeyLeftSide){
		donkeyX = 210;
		donkeyY = 20+(donkeyPosition*6);
	}else{
		donkeyX = 300;
		donkeyY = 20+(donkeyPosition*6);
	}
	
	donkeyYtopposition = donkeyY-18;
	donkeyYbottomposition = donkeyY+12;
	
	// legs
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: donkeyX, y: donkeyY,
		width: legswidth,
		height: legsheight
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: donkeyX+widthBetweenLegs+legswidth, y: donkeyY,
		width: legswidth,
		height: legsheight
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: donkeyX+10+widthBetweenLegs+(legswidth*2), y: donkeyY,
		width: legswidth,
		height: legsheight
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: donkeyX+10+(widthBetweenLegs*2)+(legswidth*3), y: donkeyY,
		width: legswidth,
		height: legsheight
	});
	
	// body
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: donkeyX+16, y: donkeyY-4,
		width: bodywidth,
		height: bodyheight
	});
	
	// tail
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: donkeyX-8, y: donkeyY-2,
		width: 4,
		height: 4
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: donkeyX-10, y: donkeyY,
		width: 2,
		height: 2
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: donkeyX-6, y: donkeyY-6,
		width: 2,
		height: 4
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: lightgray,
		x: donkeyX-4, y: donkeyY-8,
		width: 2,
		height: 2
	});
	
	// head
	// TODO
	
	// comment this out
	/*$("#donkeyCanvas").drawRect({
		fillStyle: red,
		x: donkeyX+16, y: donkeyY+12,
		width: 2,
		height: 2
	});
	
	$("#donkeyCanvas").drawRect({
		fillStyle: red,
		x: donkeyX+16, y: donkeyY-18,
		width: 2,
		height: 2
	});*/
}