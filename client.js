let select = false;
let option = 0; // 0 for premade, 1 for custom

function selectTimerType(x) {
	option = (x == "premade") ? 0 : 1;
	document.getElementById("premade").style.border = "4px solid #fc9003";
	document.getElementById("custom").style.border = "4px solid #446e9b";
	document.getElementById("premade").style.outline = "none";
	document.getElementById("custom").style.outline = "none";
	
	document.getElementById(x).style.outline = "10px double black";
}//timerParameters

function modifyTimer() {
	document.querySelector(".container").style.display = "none";
	
	if (option == 0) {
		
	} else {
		
	}
}