const NUM_DICE_FACES = 6;
let computeButton;
let dice = [
			{
				color: 'lightgray',
				textColor: 'white',
				hits: 1,
				blanks: 5, 
				count: 0,

			},
			{
				color: 'gray',
				textColor: 'white',
				hits: 2,
				blanks: 4, 
				count: 0,

			},
			{
				color: 'brown',
				textColor: 'white',
				hits: 2,
				blanks: 4, 
				count: 0,

			},
			{
				color: 'orange',
				textColor: 'white',
				hits: 2,
				blanks: 4, 
				count: 0,

			},
			{
				color: 'green',
				textColor: 'white',
				hits: 3,
				blanks: 3, 
				count: 0,

			},
			{
				color: 'white',
				textColor: 'blue',
				hits: 3,
				blanks: 3, 
				count: 0,

			},
			{
				color: 'red',
				textColor: 'white',
				hits: 2,
				blanks: 4, 
				count: 0,

			},
			{
				color: 'blue',
				textColor: 'white',
				hits: 3,
				blanks: 3, 
				count: 0,

			},
			{
				color: 'yellow',
				textColor: 'black',
				hits: 2,
				blanks: 4, 
				count: 0,

			},
			{
				color: 'purple',
				textColor: 'white',
				hits: 1,
				blanks: 5, 
				count: 0,

			},
		];

let startPlayerDie = {
	// start player die
	color: 'black',
	textColor: 'red',
	hits: 3,
	blanks: 3, 
	active: false,
};

function atLeastOneDieActive() {
	let oneDieIsActive = false;

	for(let i = 0; i < dice.length; i++) {
		oneDieIsActive = oneDieIsActive || dice[i].count;
	}

	oneDieIsActive = oneDieIsActive || startPlayerDie.active;

	return oneDieIsActive;
}

function calculateProbabilitySurvive() {
	let numerator = 1;
	let denominator = 1;
	
	for(let i = 0; i < dice.length; i++) {
		for(let diceIterator = 0; diceIterator < dice[i].count; diceIterator++) {
			numerator *= dice[i].blanks;
			denominator *= NUM_DICE_FACES;
		}
	}

	// check for start player die
	if(startPlayerDie.active) {
		numerator *= startPlayerDie.blanks;
		denominator *= NUM_DICE_FACES;
	}
	let probabilityBust = numerator / denominator;
	return complementRulePercent(probabilityBust);
}

function complementRulePercent(value) {
	return (1 - value) * 100;
} 

// https://github.com/DPsmith14/DPsmith14.github.io.git

function computeResult() {
	let resultBox = document.getElementById("result");
	if(atLeastOneDieActive()) {
		let percentSurvive = calculateProbabilitySurvive();
		resultBox.innerText = percentSurvive.toFixed(2) + "%";
	} else {
		resultBox.innerText = "No dice selected, you must have at least one die selected for this to work.";
	}
}

function createDiceCounters() {
	for(let i = 0; i < dice.length; i++) {
		// check for errors
		if(dice[i].hits + dice[i].blanks !== 6) {
			console.error("Bad dice: " + i);
		}
		makeDiceCounter(dice[i]);
	}
	let startCounterNode = makeDiceCounter(startPlayerDie);
	configureStartCounter(startCounterNode);
}

function makeDiceCounter(dice) {
	// create the outer container for the increment, diceBox, and decrement
	let diceCounter = document.createElement("div");
	diceCounter.classList.add("dice-counter");

	// create the box for the dice(will be the color of the dice)
	let diceBox = document.createElement("div");
	diceBox.setAttribute("id", dice.color);
	diceBox.classList.add("dice-box");
	diceBox.classList.add("cubes");
	diceBox.style.backgroundColor = dice.color;
	diceBox.style.color = dice.textColor;
	diceBox.innerText = 0;

	// button to increment the count of the dice
	let incrementButton = document.createElement("div");
	incrementButton.classList.add("increment-button");
	incrementButton.classList.add("button");
	incrementButton.classList.add("cubes");
	incrementButton.innerText = "+";

	// set the function for the increment button
	incrementButton.onclick = function() {
		dice.count++;
		diceBox.innerText = dice.count;
		decrementButton.classList.remove("disabled");

		computeResult();
	}
	
	// button to decrement the count of the dice
	let decrementButton = document.createElement("div");
	decrementButton.classList.add("decrement-button");
	decrementButton.classList.add("button");
	decrementButton.classList.add("cubes");
	decrementButton.classList.add("disabled");

	decrementButton.innerText = "-";
	decrementButton.onclick = function() {
		// maybe have some kind of visual effect as well
		dice.count--;
		if(dice.count <= 0) {
			dice.count = 0;
			decrementButton.classList.add("disabled");
		} else {
			decrementButton.classList.remove("disabled");
		}
		diceBox.innerText = dice.count;
		
		computeResult();
	}

	// add the buttons, and diceBox to the container div
	diceCounter.appendChild(incrementButton);
	diceCounter.appendChild(diceBox);
	diceCounter.appendChild(decrementButton);

	document.getElementById("dice-counters").appendChild(diceCounter);
	
	return diceCounter;
}

function configureStartCounter(counterNode) {
	let yesButton = counterNode.children[0];
	let diceBox = counterNode.children[1];
	let noButton = counterNode.children[2];
	diceBox.innerHTML = "&#10006;";

	diceBox.style.color = startPlayerDie.textColor;

	yesFunction = function() {
		startPlayerDie.active = true;
		diceBox.innerHTML = "&#10004;"; 
		yesButton.onclick = undefined;
		noButton.onclick = noFunction;

		// change style of buttons
		yesButton.classList.add("disabled");
		noButton.classList.remove("disabled");

		computeResult();
	};

	noFunction = function() {
		startPlayerDie.active = false;
		diceBox.innerHTML = "&#10006;";
		noButton.onclick = undefined;
		yesButton.onclick = yesFunction;

		// change style of buttons
		noButton.classList.add("disabled");
		yesButton.classList.remove("disabled");
		
		computeResult();
	};

	yesButton.innerText = "Yes";

	noButton.innerText = "No";

	noFunction();
}

document.addEventListener('DOMContentLoaded', function(event) {
	//the event occurred

	createDiceCounters();
})




