const NUM_DICE_FACES = 6;

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

function calculateProbabilitySurvive() {
	for(let i = 0; i < dice.length; i++) {

	}
}

function complementRulePercent(value) {
	return (1 - value) * 100;
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
	incrementButton.onclick = function() {
		// maybe have some kind of visual effect as well
		dice.count++;
		diceBox.innerText = dice.count;
		decrementButton.classList.remove("disabled");
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

	diceBox.style.color = "white";

	yesFunction = function() {
		startPlayerDie.active = true;
		diceBox.innerHTML = "&#10004;"; 
		yesButton.onclick = undefined;
		noButton.onclick = noFunction;

		// change style of buttons
		yesButton.classList.add("disabled");
		noButton.classList.remove("disabled");
	};

	noFunction = function() {
		startPlayerDie.active = false;
		diceBox.innerHTML = "&#10006;";
		noButton.onclick = undefined;
		yesButton.onclick = yesFunction;

		// change style of buttons
		noButton.classList.add("disabled");
		yesButton.classList.remove("disabled");
	};

	yesButton.innerText = "Yes";

	noButton.innerText = "No";

	noFunction();
}

document.addEventListener('DOMContentLoaded', function(event) {
	//the event occurred
	createDiceCounters();
})




