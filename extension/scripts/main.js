var gameOpened = false;

$("body").append("<div id=\"chrome-retro-overlay\"></div>");
$("body").append("<div id=\"chrome-retro-game-link\" alt=\"Game\">"); // TODO:.onclick();

$("#chrome-retro-game-link").click(function(){
	if(gameOpened){
		console.log("again click");
		gameStarted=false;
		$("#donkeyCanvas").remove();
		gameOpened = false;
	}else{
		console.log("click to open");
		$("body").append("<canvas id=\"donkeyCanvas\" width=\"600\" height=\"375\"></canvas>");
		document.onkeypress = handleKeyboardEvent;
		redraw(0);
		gameOpened = true;
	}
});