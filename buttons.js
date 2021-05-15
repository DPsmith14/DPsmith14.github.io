const NUM_DICE_FACES = 6;

let dice = [
			{
				color: 'lightgray',
				hits: 1,
				blanks: 5, 
				count: 0,

			},
			{
				color: 'gray',
				hits: 2,
				blanks: 4, 
				count: 0,

			},
			{
				color: 'brown',
				hits: 2,
				blanks: 4, 
				count: 0,

			},
			{
				color: 'orange',
				hits: 2,
				blanks: 4, 
				count: 0,

			},
			{
				color: 'green',
				hits: 3,
				blanks: 3, 
				count: 0,

			},
			{
				color: 'white',
				hits: 3,
				blanks: 3, 
				count: 0,

			},
			{
				color: 'red',
				hits: 2,
				blanks: 4, 
				count: 0,

			},
			{
				color: 'blue',
				hits: 3,
				blanks: 3, 
				count: 0,

			},
			{
				color: 'yellow',
				hits: 2,
				blanks: 4, 
				count: 0,

			},
			{
				color: 'purple',
				hits: 1,
				blanks: 5, 
				count: 0,

			},
		];

let startPlayerDie = {
	// start player die
	color: 'black',
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
	diceCounter.setAttribute("class", "dice-counter");

	// create the box for the dice(will be the color of the dice)
	let diceBox = document.createElement("div");
	diceBox.setAttribute("id", dice.color);
	diceBox.setAttribute("style", "background-color: " + dice.color + ";");
	diceBox.innerText = 0;

	// button to increment the count of the dice
	let incrementButton = document.createElement("div");
	incrementButton.setAttribute("class", "increment-button");
	incrementButton.setAttribute("class", "button");
	incrementButton.innerText = "+";
	incrementButton.onclick = function() {
		// maybe have some kind of visual effect as well
		dice.count++;
		diceBox.innerText = dice.count;
	}
	
	// button to decrement the count of the dice
	let decrementButton = document.createElement("div");
	decrementButton.setAttribute("class", "decrement-button");
	decrementButton.setAttribute("class", "button");
	decrementButton.innerText = "-";
	decrementButton.onclick = function() {
		// maybe have some kind of visual effect as well
		dice.count === 0 ? dice.count = 0 : dice.count--;
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
	let yesButton = counterNode.getElementByClassName("increment-button");
	let diceBox = counterNode.getElementById(startPlayerDie.color);
	let noButton = counterNode.getElementByClassName("decrement-button");

	yesFunction = function() {
		startPlayerDie.active = true;
		diceBox.innerText = "Active";
		yesButton.onclick = undefined;
		noButton.onclick = noFunction;
	};

	noFunction = function() {
		startPlayerDie.active = false;
		diceBox.innerText = "Inactive";
		noButton.onclick = undefined;
		yesButton.onclick = yesFunction;
	};

	yesButton.innerText = "Yes";
	yesButton.onclick = yesFunction;

	noButton.innerText = "No";
	noButton.onclick = undefined;
}

document.addEventListener('DOMContentLoaded', function(event) {
	//the event occurred
	createDiceCounters();
})




