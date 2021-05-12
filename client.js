let select = false;
let TOption = 2; // 0 for premade, 1 for custom
let level = 0;

let warmupTime = 0; // time in seconds
let highTime = 0; // high intensity training time in seconds
let lowTime = 0; // low intensity training time in seconds
let sets = 0; // amounts of sets
let currentSet = 0;
let currentIntensity = 0; // 0 for low, 1 for high
let temp = 0;

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
			document.getElementById("error").style.display = "block";
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
			return;
		}
		document.getElementById("premade").style.display = "none";
		document.getElementById("custom").style.display = "none";
		document.getElementById("error").style.display = "none";
		
		document.getElementById("customInputParameters").style.display = "block";
		document.getElementById("title2").innerHTML = "Enter Timer Parameters:";
		document.getElementById("btn").innerHTML = "Start Timer";
		level++;
		
		if (TOption == 0) {
			
		} else {
			
		}//else
	} else if (level == 1) {
		sets = Number(document.getElementById("setAmount").value);
		document.getElementById("btn").innerHTML = "Skip?";
		document.getElementById("customInputParameters").style.display = "none";
		document.getElementById("title2").style.display = "none";
		
		warmupTime = 5;
		highTime = 10;
		lowTime = 15;
		
		document.getElementById("actualTimer").style.display = "block";
		setTimeout(startInterval, warmupTime * 1000);
		document.body.style.backgroundColor = "#a9dea0";
		startTimer(warmupTime - 1);
		currentIntensity = 1;
		
		level++;
	} else {
		console.log("bruh");
	}
	
}

function startInterval() {
	sets = (sets * 2) - 1;
	if (currentSet >= sets) {
		startCooldown();
		return;
	}
	
	if (currentIntensity == 1) {
		console.log("high");
		document.body.style.backgroundColor = "#ffabab";
		document.getElementById("timerTitle").innerHTML = "High Intensity";
		setTimeout(function () {
			
			currentIntensity = 0;
			currentSet++;
			startInterval();
		}, highTime * 1000);
		startTimer(highTime - 1);
	} else {
		console.log("low");
		document.body.style.backgroundColor = "#f5f2b5";
		document.getElementById("timerTitle").innerHTML = "Low Intensity";
		setTimeout(function () {
			currentIntensity = 1;
			currentSet++;
			startInterval();
		}, lowTime * 1000);
		startTimer(lowTime - 1);
	}
}//startInterval

function startCooldown() {
	document.body.style.backgroundColor = "#a9dea0";
	document.getElementById("timerTitle").innerHTML = "Cooldown";
	setTimeout(function () {
			document.getElementById("timerTitle").innerHTML = "You did it,";
			document.getElementById("timer").innerHTML = "Congrats!";
			document.getElementById("btn").innerHTML = "Restart?";
		}, warmupTime * 1000);
		startTimer(warmupTime - 1);
}//startCooldown

let warmupSlider = document.getElementById("warmup");
let sliderOutput = document.getElementById("warmupValue");
sliderOutput.innerHTML = warmupSlider.value / 2; // Display the default slider value
warmupTime = warmupSlider.value * 30;

function startTimer(duration) {
    let timer = duration, minutes, seconds;
	
	minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10) + 1;
	minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
	document.getElementById("timer").textContent = minutes + ":" + seconds;
    let x = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("timer").textContent = minutes + ":" + seconds;

        if (--timer < 1) {
            timer = duration;
			clearInterval(x);
        }
    }, 1000);
}//startTimer


// Update the current slider value (each time you drag the slider handle)
warmupSlider.oninput = function() {
  sliderOutput.innerHTML = this.value / 2;
  warmupTime = this.value * 30;
};

let highSlider = document.getElementById("highIntensity");
let highSliderOutput = document.getElementById("highValue");
highSliderOutput.innerHTML = highSlider.value * 5; // Display the default slider value
highTime = highSlider.value * 5;

// Update the current slider value (each time you drag the slider handle)
highSlider.oninput = function() {
  highSliderOutput.innerHTML = this.value * 5;
  highTime = highSlider.value * 5;
};

let lowSlider = document.getElementById("lowIntensity");
let lowSliderOutput = document.getElementById("lowValue");
lowSliderOutput.innerHTML = lowSlider.value * 5; // Display the default slider value
lowTime = lowSlider.value * 5;

// Update the current slider value (each time you drag the slider handle)
lowSlider.oninput = function() {
  lowSliderOutput.innerHTML = this.value * 5;
  lowTime = lowSlider.value * 5;
};
