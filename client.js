if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

//let select = false;
let TOption = 2; // 0 for premade, 1 for custom
let level = 0;
let advOption = false;
let timerFunction;
let timerFunctionTwo;

let warmupTime = 0; // time in seconds
let highTime = 0; // high intensity training time in seconds
let lowTime = 0; // low intensity training time in seconds
let sets = 0; // amounts of high intensity training sets
let currentSet = 0;
let currentIntensity = 1; // 0 for low, 1 for high
let advancedIntervals = 0;
let advancedArray = [];

function selectTimerType(x) {
	TOption = (x == "premade") ? 0 : 1;
	document.getElementById("premade").style.border = "4px solid #fc9003";
	document.getElementById("custom").style.border = "4px solid #446e9b";
	document.getElementById("premade").style.outline = "none";
	document.getElementById("custom").style.outline = "none";
	
	document.getElementById(x).style.outline = "10px double black";
}//timerParameters

function advanceTimer() {
	if (level == 0) {
		if (TOption == 2) {
			document.getElementById("err1").style.display = "block";
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
			return;
		}
		
		
		
		if (TOption == 0) {
			document.getElementById("premade").style.display = "none";
			document.getElementById("custom").style.display = "none";
			document.getElementById("err1").style.display = "none";
			
			document.getElementById("title2").innerHTML = "Premade Timers:";
		} else {
			document.getElementById("premade").style.display = "none";
			document.getElementById("custom").style.display = "none";
			document.getElementById("err1").style.display = "none";
			
			document.getElementById("customInputParameters").style.display = "block";
			document.getElementById("advancedSettings").style.display = "block";
			document.getElementById("title2").innerHTML = "Basic Timer Options:";
			document.getElementById("advancedSettings").innerHTML = "Switch to Advanced";
			document.getElementById("btn").innerHTML = "Start Timer";
			
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
		}//else
		
		level++;
		
	} else if (level == 1) {
		initiateWorkoutTimer();
	} else if (level == 2){
		clearInterval(timerFunction);
		clearInterval(timerFunctionTwo);
		currentSet++;
		startAdvancedTimer();
	} else {
		document.getElementById("actualTimer").style.display = "none";
		document.getElementById("premade").style.outline = "none";
		document.getElementById("custom").style.outline = "none";
		document.getElementById("title2").innerHTML = "Choose a timer option:";
		document.getElementById("btn").innerHTML = "Continue";
		document.getElementById("title2").style.display = "block";
		document.getElementById("premade").style.display = "block";
		document.getElementById("custom").style.display = "block";
		
		let advElem = document.querySelectorAll(".advancedContainerInterval");
		for (let i = 0; i < advElem.length; i++) {
			advElem[i].remove();
		}
		
		document.getElementById("advancedInputParameters").style.height = "580px";
		document.getElementById("createInterval").style.borderTop = "none";
		
		TOption = 2; // 0 for premade, 1 for custom
		level = 0;
		advOption = false;
		timerFunction;

		warmupTime = 0; // time in seconds
		highTime = 0; // high intensity training time in seconds
		lowTime = 0; // low intensity training time in seconds
		sets = 0; // amounts of high intensity training sets
		currentSet = 0;
		currentIntensity = 1; // 0 for low, 1 for high
		advancedIntervals = 0;
		advancedArray = [];
	}
	
}//advanceTimer

function switchSettings() {
  if (!advOption) {
	  advOption = true;
	  document.getElementById("customInputParameters").style.display = "none";
	  document.getElementById("advancedSettings").innerHTML = "Switch to Basic";
	  document.getElementById("title2").innerHTML = "Advanced Timer Options:";
	  document.getElementById("advancedInputParameters").style.display = "block";
  } else {
	  advOption = false;
	  document.getElementById("advancedInputParameters").style.display = "none";
	  document.getElementById("advancedSettings").innerHTML = "Switch to Advanced";
	  document.getElementById("title2").innerHTML = "Basic Timer Options:";
	  document.getElementById("customInputParameters").style.display = "block";
  }
}//switchSettings

function initiateWorkoutTimer() {
	if (!advOption) {
		setTimerParameters();
		
		document.getElementById("title2").style.display = "none";
		document.getElementById("btn").style.display = "none";
		document.getElementById("customInputParameters").style.display = "none";
		document.getElementById("advancedSettings").style.display = "none";
		
		//warmupTime = 5;
		//highTime = 2;
		//lowTime = 3;
		
		document.getElementById("timerTitle").innerHTML = "Warmup";
		document.getElementById("actualTimer").style.display = "block";
		setTimeout(startInterval, warmupTime * 1000);
		
		currentSet++;
		document.body.style.backgroundColor = "#a9dea0";
		startTimer(warmupTime);
		
		level++;
	} else {
		if (advancedIntervals == 0) {
			document.getElementById("err2").innerHTML = "There are no intervals";
			document.getElementById("err2").style.display = "block";
			return;
		}
		
		//push all data from intervals into an array
		advancedArray = [];
		
		for (let i = 0; i < advancedIntervals; i++) {
			let temp = document.querySelectorAll(".advName")[i].value;
			let temp2;
			if (temp == "") {
				document.getElementById("err2").innerHTML = "Interval name is invalid";
				document.getElementById("err2").style.display = "block";
				return;
			}
			
			temp = parseInt(document.querySelectorAll(".advTime")[i].value, 10);
			temp2 = Number.isInteger(parseInt(document.querySelectorAll(".advTime")[i].value, 10));
			if (temp > 3600 || !temp2) {
				document.getElementById("err2").innerHTML = "Interval time is invalid";
				document.getElementById("err2").style.display = "block";
				return;
			}
			
			let object = {
				name:capitalizeFirstLetter(document.querySelectorAll(".advName")[i].value), 
				time:parseInt(document.querySelectorAll(".advTime")[i].value), 
				type:document.querySelectorAll(".advType")[i].value,
				index:i
			};
			advancedArray.push(object);
		}//for
		
		document.getElementById("advancedSettings").style.display = "none";
		document.getElementById("advancedInputParameters").style.display = "none";
		document.getElementById("title2").style.display = "none";
		document.getElementById("err2").style.display = "none";
		document.getElementById("btn").innerHTML = "Skip";
		document.getElementById("actualTimer").style.display = "block";
		level++;
		
		startAdvancedTimer();
	}
}//initiateWorkoutTimer

function startAdvancedTimer() {
	if (currentSet >= advancedIntervals) {
		document.body.style.backgroundColor = "#d9eaf0";
		document.getElementById("timerTitle").innerHTML = "You did it,";
		document.getElementById("timer").innerHTML = "Congrats!";
		document.getElementById("btn").innerHTML = "Restart";
		level++;
	} else {
		document.body.style.backgroundColor = ((advancedArray[currentSet].type == "warmup") ? "#a9dea0" : (advancedArray[currentSet].type == "high") ? "#ffabab" : "#f5f2b5");
		document.getElementById("timerTitle").innerHTML = advancedArray[currentSet].name;
		timerFunctionTwo = setTimeout(function () {
			
			currentSet++;
			startAdvancedTimer();
		}, advancedArray[currentSet].time * 1000);
		startTimer(advancedArray[currentSet].time);
	}
}//startAdvancedTimer

function startInterval() {
	currentSet++;
	if (currentSet >= sets) {
		startCooldown();
		return;
	}
  
	if (currentIntensity == 1) {
		document.body.style.backgroundColor = "#ffabab";
		document.getElementById("timerTitle").innerHTML = "High Intensity";
		setTimeout(function () {
			
			currentIntensity = 0;
			startInterval();
		}, highTime * 1000);
		startTimer(highTime);
	} else {
		document.body.style.backgroundColor = "#f5f2b5";
		document.getElementById("timerTitle").innerHTML = "Low Intensity";
		setTimeout(function () {
			currentIntensity = 1;
			startInterval();
		}, lowTime * 1000);
		startTimer(lowTime);
	}
}//startInterval

function startCooldown() {
	document.body.style.backgroundColor = "#a9dea0";
	document.getElementById("timerTitle").innerHTML = "Cooldown";
	setTimeout(function () {
			document.body.style.backgroundColor = "#d9eaf0";
			document.getElementById("timerTitle").innerHTML = "You did it,";
			document.getElementById("timer").innerHTML = "Congrats!";
			document.getElementById("btn").style.display = "block";
			document.getElementById("btn").innerHTML = "Restart";
		}, warmupTime * 1000);
		startTimer(warmupTime);
}//startCooldown

function startTimer(duration) {
	duration -= 1;
    let timer = duration, minutes, seconds;
	let temp = duration + 1;
	
	minutes = parseInt(temp / 60, 10);
    seconds = parseInt(temp % 60, 10);
	minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
	document.getElementById("timer").textContent = minutes + ":" + seconds;
    timerFunction = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("timer").textContent = minutes + ":" + seconds;

        if (--timer < 1) {
            timer = duration;
			let audio = new Audio('audio/beep.wav');
			audio.play();
			clearInterval(timerFunction);
        }
    }, 1000);
}//startTimer

function setTimerParameters() {
	warmupTime = warmupSlider.value * 30;
	highTime = highSlider.value * 5;
	lowTime = lowSlider.value * 5;
	sets = (Number(document.getElementById("setAmount").value) * 2) + 1;
}//getTimerParameters

function createNewInterval() {
	if (advancedIntervals > 0) {
		let x = document.getElementById("advancedInputParameters").clientHeight + 292;
		document.getElementById("advancedInputParameters").style.height = x + "px";
	}
	document.getElementById("createInterval").style.borderTop = "5px solid #7d7d7d";
	
	let elem = document.createElement("DIV");
	elem.innerHTML = "<label>Name: </label>" +
	"<input class=\"advName\" type=\"text\" value=\"Interval " + (advancedIntervals + 1) + "\">" +
	"<br><label>Duration in seconds: </label>" +
	"<input class=\"advTime\" type=\"text\">" +
	"<br><label>Interval Type: </label>" +
	"<select class=\"advType\"><option value=\"warmup\">Warmup/Cooldown</option>" + 
	"<option value=\"high\">High Intensity</option>" +
	"<option value=\"low\">Low Intensity</option></select>" +
	"<br><button onclick=\"deleteInterval(" + advancedIntervals +")\">Delete Interval</button>"
	;
	document.getElementById("advancedInputParameters").insertBefore(elem, document.getElementById("createInterval"));
	elem.className = "advancedContainerInterval";
	elem.setAttribute("id", "interval" + advancedIntervals);
	advancedIntervals++;
	
}

function deleteInterval(x) {
	document.getElementById("interval" + x).remove();
	advancedIntervals--;
	
	if (advancedIntervals > 0) {
		let x = document.getElementById("advancedInputParameters").clientHeight - 292;
		document.getElementById("advancedInputParameters").style.height = x + "px";
	}
}

let warmupSlider = document.getElementById("warmup");
let sliderOutput = document.getElementById("warmupValue");
sliderOutput.innerHTML = warmupSlider.value / 2; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
warmupSlider.oninput = function() {
  sliderOutput.innerHTML = this.value / 2;
};

let highSlider = document.getElementById("highIntensity");
let highSliderOutput = document.getElementById("highValue");
highSliderOutput.innerHTML = highSlider.value * 5; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
highSlider.oninput = function() {
  highSliderOutput.innerHTML = this.value * 5;
};

let lowSlider = document.getElementById("lowIntensity");
let lowSliderOutput = document.getElementById("lowValue");
lowSliderOutput.innerHTML = lowSlider.value * 5; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
lowSlider.oninput = function() {
  lowSliderOutput.innerHTML = this.value * 5;
};

function downloadTimer() {
	advancedArray = [];
	
	for (let i = 0; i < advancedIntervals; i++) {
		let object = {
			name:capitalizeFirstLetter(document.querySelectorAll(".advName")[i].value), 
			time:parseInt(document.querySelectorAll(".advTime")[i].value), 
			type:document.querySelectorAll(".advType")[i].value,
			index:i
		};
		advancedArray.push(object);
	}//for
	
	download("customTimer.txt", JSON.stringify(advancedArray));
}

//do stuff with advanced options file upload
let fileInput = document.getElementById("fileUpload");
fileInput.oninput = function() {
	let file = fileInput.files[0];
	let fileText;
	
	// new FileReader object
	let reader = new FileReader();

	// event fired when file reading finished
	reader.addEventListener('load', function(e) {
	   // contents of the file
	    fileText = e.target.result;
		displayImportedTimer(fileText);
		fileInput.value = "";
	});

	// event fired when file reading failed
	reader.addEventListener('error', function() {
	    alert('Error : Failed to read file');
	});

	// read file as text file
	reader.readAsText(file);
};

function displayImportedTimer(file) {
	advancedIntervals = 0;
	advancedArray = [];
	
	document.getElementById("advancedInputParameters").style.height = "580px";
	let advElem = document.querySelectorAll(".advancedContainerInterval");
	for (let i = 0; i < advElem.length; i++) {
		advElem[i].remove();
	}
	
	advancedArray = JSON.parse(file);
	
	for (let i = 0; i < advancedArray.length; i++) {
		if (advancedIntervals > 0) {
			let x = document.getElementById("advancedInputParameters").clientHeight + 292;
			document.getElementById("advancedInputParameters").style.height = x + "px";
		}
		document.getElementById("createInterval").style.borderTop = "5px solid #7d7d7d";
		
		let elem = document.createElement("DIV");
		elem.innerHTML = "<label>Name: </label>" +
		"<input class=\"advName\" type=\"text\" value=\"" + advancedArray[i].name + "\">" +
		"<br><label>Duration in seconds: </label>" +
		"<input class=\"advTime\" type=\"text\" value=\"" + advancedArray[i].time + "\">" +
		"<br><label>Interval Type: </label>" +
		"<select class=\"advType\"><option value=\"warmup\">Warmup/Cooldown</option>" + 
		"<option value=\"high\">High Intensity</option>" +
		"<option value=\"low\">Low Intensity</option></select>" +
		"<br><button onclick=\"deleteInterval(" + advancedIntervals +")\">Delete Interval</button>"
		;
		document.getElementById("advancedInputParameters").insertBefore(elem, document.getElementById("createInterval"));
		elem.className = "advancedContainerInterval";
		elem.setAttribute("id", "interval" + advancedIntervals);
		advancedIntervals++;
	}//for
	
	let elems = document.querySelectorAll(".advType");
	for (let j = 0; j < advancedArray.length; j++) {
		elems[j].value = advancedArray[j].type;
	}//for
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}//capitalizeFirstLetter

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}//download
