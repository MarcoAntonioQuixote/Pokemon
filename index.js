defineDocElements();
allPokemon = defineAllPokemon(); //array of objects
allTypes = defineElementTypes(); //array of arrays(types)

var player = {}; //what items here can be moved to the bottom?
player.pokemon = [];
var p = player.pokemon //used as a sub throughout game, refers to player's roster of 6 pokemon
player.roster = []; //<-- necessary?
player.money = 2000;
player.allFainted = false;
player.gameOver = false;  //use this to end the game
player.testBattle = true; //use this to jump into the battle more quickly to test it out
var myNemesis = {};
myNemesis.pokemon = [];
myNemesis.name = "Arch-Fucking-Nemesis";
myNemesis.allFainted = false;

//Question - am I going to need to cancel listening to events - because it looks like they are still running;

storyMode();

async function storyMode() {
	var playerName = await introduction(); //*** adjust here to fully initialize game
	player.name = playerName; //playerName or just "Player"
	await pickStarter();
	thirdStep();
}

function introduction() { return new Promise(resolve => {
	let clicks = 1; //0 to include first text
	let text = [
		"So many adventures await! Let's get started!",
		"What's your name?" //"First, remind me. What's your name?"
	]
	var name = "Player"; //erase = "Player" and uncomment the next line when skipping intro
	go.addEventListener("click", getName);

	function getName() {
		go.innerText = "Go!";
		o4.innerText = "Quit Game";
		t.innerText = text[clicks];
		clicks++;
		if (clicks == 2) {
			buttons(false, true);
			submit.addEventListener("click", function () {
				name = i.value;
				text.push(`Right, your name is ${name}.`, `Nice to see you again, ${name}! Your journey awaits!`);
				buttons(true, false);
				t.innerText = text[clicks];
				clicks++;
				this.removeEventListener("click", arguments.callee); //use this code to remove listener
			})
		}
		if (clicks == 5) {
			go.removeEventListener("click", getName);
			o1.innerText = "Player: " + name;
			resolve(name);
		}
	}
})}

function pickStarter() { return new Promise(resolve => { //0, no reply, 1, y/n, 2, text input
	let clicks = 1;
	let pokeballs = ["1", "2", "3"];
	let starters = ["Bulbasaur", "Charmander", "Squirtle"];
	let ball;
	var starter = "";
	let nameStarter;
	let givenName;
	let starterPokemon = {};
	//"You failed to pick a Pokémon after being given 3 tries. You are not ready to become a Pokémon trainer.", **** re-insert this code later

	t.innerText = "Do you wish to go the the Pokémon lab, " + player.name + "?";
	buttons(false,true);
	go.addEventListener("click",playScene);
	submit.addEventListener("click",playScene);
	i.addEventListener("keydown", function(event){
		if (event.keyCode == 13) {
			event.preventDefault();
			submit.click();
		}
	});

	function playScene() {
		clicks++;
		switch (clicks) {
			case 1:
				t.innerText = "Do you wish to go the the Pokémon lab, " + player.name + "?";
				buttons(false,true);
				break;
			case 2: 
				let advance = validateYesOrNo(i.value);
				buttons(true,false);
				if (advance[0] == false || advance[1] == false) {
					t.innerText = "Wow. Okay, that's cool. I guess you're just going to grow old and let life pass you by. I'll ask you once more for good measure: ";
					clicks = 0;
					break;
				}
				else {
					t.innerText = "Awesome! Let's head on over to the Pokémon Lab!";
					break;
				}
			case 3:
				t.innerText = "You are now at the Pokémon Lab. How Cool! There are three Pokéballs sitting on the counter. Unforunately, you don't know what Pokémon are in these Pokéballs. All you hear are sounds and all you feel are rumbles as you pick up and examine the Pokéballs closely.";
				break;
			case 4:
				t.innerText = "Which Pokéball do you choose? 1, 2, or 3?";
				buttons(false,true);
				break;
			case 5:
				ball = validateResponse(i.value,pokeballs);
				if (ball[1] == false) {
					t.innerText = sorry();
					clicks = 3; //is it clicks-- or clicks a #?
					break;
				}
				else {
					t.innerText = `You selected Pokéball number ${ball[0]}.`;
					buttons(true,false);
					starter = starters[randomized(0,2)]; //picking Pokéball doesn't matter
					break;
				}
			case 6:
				t.innerText = "Inside that Pokéball is - ";
				break;
			case 7:
				t.innerText = `A ${starter}!`;
				break;
			case 8:
				t.innerText = "Congratulations! You have taken the first step to becoming a Pokémon master! Be kind to all Pokémon. But show no fear in crushing your opponents!";
				break;
			case 9:
				t.innerText = `First though, give ${starter} some love!`;
				break;
			case 10:
				t.innerText = `Would you like to name your ${starter}?`
				buttons(false,true);
				break;
			case 11:
				nameStarter = validateYesOrNo(i.value);
				if (nameStarter[1] == false) {
					t.innerText = sorry();
					clicks = 9;
					break;
				}
				else if (nameStarter[0] == true) {
					t.innerText = `What will you name your ${starter}?`;
					buttons(false,true);
					clicks = 12;
					break;
				}
				else {
					givenName = starter;
					clicks = 13;
					break;
				}
			case 12:
				t.innerText = `What will you name your ${starter}?`;
				buttons(false,true);
				break;
			case 13:
				if (i.value == ""){
					t.innerText = sorry();
					clicks = 11;
				}
				else {
					givenName = i.value;
					go.click();
					break;
				}			
			case 14:
				starterPokemon.pokemon = starter;
				starterPokemon.name = givenName;
				starterPokemon = initiatePokemon(starterPokemon);
				t.innerText = `Very awesome, ${player.name}! You now have a ${starter} named ${givenName}! It is a ${starterPokemon.type} type and has ${starterPokemon.HP} HP! Good to know!`;
				buttons(true,false);

				switch (starter) {
					case "Bulbasaur":
						myNemesis.pokemon.push(allPokemon[1]);
						break;
					case "Charmander":
						myNemesis.pokemon.push(allPokemon[2]);
						break;
					case "Squirtle":
						myNemesis.pokemon.push(allPokemon[0]);
						break;
				}
				console.log(p[0]);
				break;
			case 15:
				resolve(clicks);
				break;
				// var movesOfPokemon = moveNames(player.myPokemon[0]);
				// player.myPokemon[0].moveset = movesOfPokemon; 
				//*** check if you still need this code
		}
	}
})}

function thirdStep() {
	alert("If this works you're bad ass!");
	t.innerText = "Fuck yeah, she works!";
}

function initiatePokemon(newPokemon) { //receives an object, a new pokemon, 
	// with pokeName and given name at least
	// this is interesting, I use the generalized traits defined in 
	// registry of AllPokemon to help define *this* specific pokemon.

	for (x = 0; x < allPokemon.length; x++){ //check through entire pokedex registry
		if (newPokemon.pokemon == allPokemon[x]["pokemon"]){ //see if this pokemon matches
			for (var prop in allPokemon[x]){ //for all props within generalized pokemon
				newPokemon[prop] = allPokemon[x][prop]; //define those in this pokemon
			}
		}
	}

	newPokemon.moveset = []; //w/n pokemon obj, define 4 moves in set for easy var access
	for (x = 0; x < newPokemon.moves.length; x++){
		newPokemon.moveset.push(newPokemon.moves[x][0]);
	}

	player.roster.push(newPokemon.name);

	p.push(newPokemon); //add this specific pokemon to my team
	return newPokemon; //return object
}

function validateResponse(answer,acceptables) { //?? only accepts arrays I think
	let validated = [answer,true]; //user input, T/F return whether it's validated 
	if (acceptables.includes(answer)){
		return validated;
	}
	else {
		validated[1] = false;
		return validated;
	}
}

function validateYesOrNo(answer) {
	let validated = [true, true] // true/false = yes/no, true/false = failed/didn't fail
	if (answer == "Yes" || answer == "yes" || answer == "Y" || answer == "y") {
		return validated;
	}
	else if (answer == "No" || answer == "no" || answer == "N" || answer == "n") {
		validated[0] = false;
		return validated;
	}
	else {
		validated[1] = false;
		return validated;
	}
}

function buttons(goB,submitB) { // T/F show Go Button, T/F show Input and Submit
	i.value = "";
	if (goB == true) {
		go.style.display = "";
		go.focus();
	}
	else {
		go.style.display = "none";
	}
	if (submitB == true) {
		submit.style.display = "";
		i.style.display = "";
		i.focus();
	}
	else {
		submit.style.display = "none";
		i.style.display = "none";
	}
}

function sorry(){
	buttons(true,false);
	let sorry = [
		`Sorry, I did not understand that.`,`Nope, I think you meant something else.`,`Try again, ${player.name}!`, `Be sure to spell things correctly.`,`I'm not God - I can't read your mind. Type a valid response.`,`Whoa, slow down. I didn't catch that. Or, more likely, you didn't type it right.`
	]
	return sorry[randomized(0,sorry.length-1)];
}

function randomized(min, max){ //min and max inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
} 

function defineDocElements() {
	window.t = document.getElementById("top"); //use t.innerText = to write on the top part of screen
	window.b = document.getElementById("bottom");
	window.i = document.getElementById("input"); //use i.value to acquire input value
	window.go = document.getElementById("go");
	window.submit = document.getElementById("submit"); //works fine?
	window.o1 = document.getElementById("O1");
	window.o2 = document.getElementById("O2");
	window.o3 = document.getElementById("O3");
	window.o4 = document.getElementById("O4");
}

function defineAllPokemon() {
	const allPokemon = [
		{
			pokedex: 1, pokemon: "Bulbasaur", type: "Grass", type2: "none",
			level: 12, baseHP: 31, HP: 31, status: "healthy", moves: [
				["vine whip", 7, "Grass", 100, [undefined]],
				["solar beam", 30, "Grass", 50, ["test"]],
				["tackle", 8, "Fighting", 90, [undefined]]],
			special: "none", evolvesInto: "Ivysaur"
		},

		{
			pokedex: 4, pokemon: "Charmander", type: "Fire", type2: "none",
			level: 15, baseHP: 35, HP: 35, status: "healthy", moves: [
				["tackle", 7, "Fighting", 95, [undefined]],
				["fire spin", 8, "Fire", 80, ["burn"]],
				["ember", 14, "Fire", 70, [undefined]]],
			special: "none", evolvesInto: "Charmeleon"
		},

		{
			pokedex: 7, pokemon: "Squirtle", type: "Water", type2: "none",
			level: 14, baseHP: 40, HP: 40, status: "healthy", moves: [
				["headbutt", 10, "Fighting", 75, ["test"]],
				["water gun", 8, "Water", 95, [undefined]],
				["bubble", 5, "Water", 100, [undefined]]],
			special: "none", evolvesInto: "Wartortle"
		},

		{
			pokedex: 12, pokemon: "Butterfree", type: "Bug", type2: "Flying",
			level: 17, baseHP: 45, HP: 45, status: "healthy", moves: [
				["bug bite", 11, "Bug", 75, [undefined]],
				["poison powder", 6, "Posion", 99, ["poison"]],
				["psybeam", 20, "Psychic", 75, [undefined]]],
			special: "none", evolvesInto: "none"
		},

		{
			pokedex: 16, pokemon: "Pidgey", type: "Flying", type2: "none",
			level: 14, baseHP: 27, HP: 27, status: "healthy", moves: [
				["gust", 15, "Flying", 85, [undefined]],
				["tackle", 6, "Fighting", 95, [undefined]],
				["sand attack", 5, "Ground", 100, ["lower accuracy"]]],
			special: "none", evolvesInto: "Pidgeotto"
		},

		{
			pokedex: 25, pokemon: "Pikachu", type: "Electric", type2: "none",
			level: 16, baseHP: 34, HP: 34, status: "healthy", moves: [
				["thunder shock", 11, "Grass", 95, [undefined]],
				["tackle", 7, "Fighting", 95, [undefined]],
				["thunder wave", 3, "Electric", 95, ["paralyze"]]],
			special: "none", evolvesInto: "Raichu"
		},

		{
			pokedex: 29, pokemon: "Nidoran", type: "Poison", type2: "none",
			level: 14, baseHP: 31, HP: 31, status: "healthy", moves: [
				["bite", 12, "Dark", 95, [undefined]],
				["poison sting", 10, "Poison", 90, ["poison"]],
				["sand attack", 7, "Ground", 95, ["lower accuracy"]]],
			special: "none", evolvesInto: "Nidorina"
		},
	];
	return allPokemon;
}

function defineElementTypes() { //an array of arrays of arrays
	//separated by: type | elements strong against | elements weak against | attacking impossible
	const allTypeCombos = [
		["Water", ["Fire", "Ground", "Rock"], ["Water", "Grass", "Dragon", "Electric"], ["N/A"]],
		["Fire", ["Grass", "Ice", "Bug"], ["Fire", "Water", "Rock", "Dragon"], ["N/A"]],
		["Grass", ["Water", "Ground", "Rock"], ["Fire", "Grass", "Poison", "Flying"], ["N/A"]],
		["Electric", ["Water", "Flying"], ["Grass", "Electric", "Dragon"], ["Ground"]],
		["Bug", ["Grass", "Psychic", "Dark"], ["Flying", "Fire", "Fighting", "Ghost"], ["N/A"]],
		["Poison", ["Grass", "Psychic", "Dragon"], ["Poison", "Ground", "Rock", "Ghost"], ["N/A"]],
		["Flying", ["Fighting", "Bug", "Grass"], ["Ground", "Electric"], ["N/A"]],
		["Fighting", ["Normal", "Rock", "Ice", "Dark"], ["Flying", "Poison", "Bug", "Psychic"], ["Ghost"]],
		["Ground", ["Poison", "Rock", "Fire", "Electric"], ["Bug", "Grass"], ["Flying"]],
		["Dark", ["Psychic", "Ghost"], ["Bug", "Dark", "Fighting"], ["N/A"]]
	];
	return allTypeCombos;
}
/*
// want to get to this: moves [name,damage,type,odds,[array of effects]]
// ideal design 
// POKEMON OBJECT
// That pokemon's index #
// That pokemon's pokemon name
// That pokemon's given name
// That pokemon's type 1
// That pokemon's type 2
// That pokemon's level
// That pokemon's current HP
// That pokemon's status (healthy, paralyzed, asleep, fainted, confused)
// That pokemon's current moveset
	//Move 1 = [name,damage,type,odds,[array of effects]]
	//Move 2 = [name,damage,type,odds,[array of effects]]
	//Move 3 = [name,damage,type,odds,[array of effects]]
	//Move 4 = [name,damage,type,odds,[array of effects]]
		//Moves 4 could be strong and require quick input from player??
// Effects could be: recover, temp increase damage, burn, paralyze, sleep]\
// The moves that the pokemon can learn at, based on object model, at say:
	// Lv 10 new move 1 = [name,damage,type,odds,[array of effects]];
	// Lv 25 new move 2 = [name,damage,type,odds,[array of effects]];
	// Lv 36 new move 3 = [name,damage,type,odds,[array of effects]];
// A pokemon specialty (high defense, fast, can recover, etc.)
// Can evolve into... What it needs to evolve////) */