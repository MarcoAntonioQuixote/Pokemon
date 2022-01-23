defineDocElements(); //t b i submit go o1234
allPokemon = defineAllPokemon(); //array of objects
allTypes = defineElementTypes(); //array of arrays(types)
i.addEventListener("keydown", function(event){
	if (event.keyCode == 13) {
		event.preventDefault();
		submit.click();
	}
});
// var player = definePlayer();

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

//Question - am I going to need to cancel listening to events?? - because it looks like they are still running;

var skip = true; // <-- only need to change this to play entire walk through
if (skip == true) {
	player.name = "Marco Antonio";
	let starterPokemon = {	//comment out this 
		pokemon: "Charmander",
		name: "Fire Lord",
	}
	myNemesis.pokemon.push(allPokemon[2]);
	initiatePokemon(starterPokemon);
	skipAhead();
}
else {
	storyMode();
}

async function storyMode() {
	var playerName = await introduction();
	player.name = playerName;
	await pickStarter();
	await firstBattle();
	embarkation();
}

async function skipAhead() {
    o2.innerText = "made it here";
	await firstBattle();
	embarkation();
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
		d.innerText = text[clicks];
		clicks++;
		if (clicks == 2) {
			buttons(false, true);
			submit.addEventListener("click", function () {
				name = i.value;
				text.push(`Right, your name is ${name}.`, `Nice to see you again, ${name}! Your journey awaits!`);
				buttons(true, false);
				d.innerText = text[clicks];
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

function pickStarter() { return new Promise(resolve => {
	let clicks = 1;
	let pokeballs = ["1", "2", "3"];
	let starters = ["Bulbasaur", "Charmander", "Squirtle"];
	let ball;
	var starter = "";
	let nameStarter;
	let givenName;
	let starterPokemon = {};
	//"You failed to pick a Pokémon after being given 3 tries. You are not ready to become a Pokémon trainer.", **** re-insert this code later

	d.innerText = "Do you wish to go the the Pokémon lab, " + player.name + "?";
	buttons(false,true);
	go.addEventListener("click",playScene);
	submit.addEventListener("click",playScene);

	function playScene() {
		clicks++;
		switch (clicks) {
			case 1:
				d.innerText = "Do you wish to go the the Pokémon lab, " + player.name + "?";
				buttons(false,true);
				break;
			case 2: 
				let advance = validateYesOrNo(i.value);
				buttons(true,false);
				if (advance[0] == false || advance[1] == false) {
					d.innerText = "Wow. Okay, that's cool. I guess you're just going to grow old and let life pass you by. I'll ask you once more for good measure: ";
					clicks = 0;
					break;
				}
				else {
					d.innerText = "Awesome! Let's head on over to the Pokémon Lab!";
					break;
				}
			case 3:
				d.innerText = "You are now at the Pokémon Lab. How Cool! There are three Pokéballs sitting on the counter. Unforunately, you don't know what Pokémon are in these Pokéballs. All you hear are sounds and all you feel are rumbles as you pick up and examine the Pokéballs closely.";
				break;
			case 4:
				d.innerText = "Which Pokéball do you choose? 1, 2, or 3?";
				buttons(false,true);
				break;
			case 5:
				ball = validateResponse(i.value,pokeballs);
				if (ball[1] == false) {
					d.innerText = sorry();
					clicks = 3; //is it clicks-- or clicks a #?
					break;
				}
				else {
					d.innerText = `You selected Pokéball number ${ball[0]}.`;
					buttons(true,false);
					starter = starters[randomized(0,2)]; //picking Pokéball doesn't matter
					break;
				}
			case 6:
				d.innerText = "Inside that Pokéball is - ";
				break;
			case 7:
				d.innerText = `A ${starter}!`;
				break;
			case 8:
				d.innerText = "Congratulations! You have taken the first step to becoming a Pokémon master! Be kind to all Pokémon. But show no fear in crushing your opponents!";
				break;
			case 9:
				d.innerText = `First though, give ${starter} some love!`;
				break;
			case 10:
				d.innerText = `Would you like to name your ${starter}?`
				buttons(false,true);
				break;
			case 11:
				nameStarter = validateYesOrNo(i.value);
				if (nameStarter[1] == false) {
					d.innerText = sorry();
					clicks = 9;
					break;
				}
				else if (nameStarter[0] == true) {
					d.innerText = `What will you name your ${starter}?`;
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
				d.innerText = `What will you name your ${starter}?`;
				buttons(false,true);
				break;
			case 13:
				if (i.value == ""){
					d.innerText = sorry();
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
				d.innerText = `Very awesome, ${player.name}! You now have a ${starter} named ${givenName}! It is a ${starterPokemon.type} type and has ${starterPokemon.HP} HP! Good to know!`;
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
				go.removeEventListener("click", playScene);
				resolve(clicks);
				break;
				// var movesOfPokemon = moveNames(player.myPokemon[0]);
				// player.myPokemon[0].moveset = movesOfPokemon; 
				//*** check if you still need this code
		}
	}
})}

function firstBattle() { return new Promise(resolve => {
    let clicks = 0;
	d.innerText = "It's time to embark on the greatest adventure of your life... behind a computer."
	buttons(true,false);
	go.addEventListener("click",playScene);
	submit.addEventListener("click",playScene);

	async function playScene() {
		clicks++
		switch(clicks) {
			case 1:
				d.innerText = "Oh shit, someone is coming!";
				break;
			case 2:
				await battle(myNemesis);
				break;
			case 3:
				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
			case 7:
				break;
			case 8:
				break;
			case 9:
				break;
			case 10:
				go.removeEventListener("click", playScene);
				submit.removeEventListener("click",playScene);
				resolve(clicks);
				break;
		} //resolve
	}
})}

async function battle(opponent){
	let round = 0;
	let o = opponent.pokemon //roster of opponent's team of pokemon; p = roster of player's pokemon
	let pRoundFighter = p[0]; //shouldn't always be this one, in case fainted; FIX
	let oRoundFighter = o[0]; //specific pokemon object
    let roundFighters = [pRoundFighter,oRoundFighter];
    let forcedLoss = false;
    let surrender = false;
    let attackOrder = ["op","pp"];

	await battleIntro();
	await enterRound(pRoundFighter,oRoundFighter);
	
	function battleIntro() { return new Promise(resolve => {
		let biClicks = 0;
		play.innerText = newScreen("Battle");
		d.innerText = `${opponent.name} is challenging you to a Pokémon battle!`;
		buttons(true,false);
		go.addEventListener("click",playScene);
		submit.addEventListener("click",playScene);

		function playScene() {
			biClicks++;
			switch(biClicks) {
				case 1:
					d.innerText = "She tosses out a pokéball and out pops ---";
					break;
				case 2:
					d.innerText = `A fucking ${oRoundFighter.pokemon}! That Bitch.`;
					break;
				case 3:
					t.innerText = `It's now or never. Go!! ${pRoundFighter.name}!!`;
					d.innerText = "";
					break;
				case 4:
					resolve();
					break;
			}
		}
	})}

	async function enterRound(pRoundFighter,oRoundFighter) { //*********************************************
		round++;
		fightScreen(pRoundFighter,oRoundFighter);
		let decision = await makeDecision(pRoundFighter); //returns [t/f,fight/swap/surrender,move/pokemon]
	}

	async function makeDecision(pp) { return new Promise(resolve => {
		d.innerText = "What would you like to do?";
		t.innerText = "";
		play.innerText = "Fight, Swap Pokémon, or Surrender?";
		buttons(false,true);
		go.addEventListener("click",playScene(i.value));
		submit.addEventListener("click",playScene(i.value));

		async function playScene(choice) { return new Promise(resolve => {
			switch(choice) {
				case "Fight":
					let pfighterMoves = "12"; //await moveSelection(pp);
					break;
				case "Swap Pokemon" || "Swap Pokémon":
				case "Surrender":
				default:

					play.innerText = "";
					if (i.value == "Fight"){
						d.innerText = "Which move will you select?";
						
					}
					else if (i.value == "Swap Pokemon" || i.value == "Swap Pokémon") {

					}
					else if (i.value == "Surrender") {

					}
					else {
						d.innerText = sorry();
						mdClicks = 0;
						break;
					}
					break;
				case 3:
					let pFighterMoves = "12" //await moveSelection(pp);

					t.innerText = `It's now or never. Go!! ${pRoundFighter.name}!!`;
					d.innerText = "";
					resolve();
					break;
			}
		})}

		function moveSelection(pp) {return new Promise(resolve => {
			//receives a pokemon object, return's that pokemon's move's array (from w/n object) or returns false
			let fightMove;
			let moveset = pp.moveset.slice(0);
			moveset.push("Go Back");
			d.innerText = `Here are ${pp.name}'s moves. Which do you select?`;
			play.innerText = pp.moveset.join(" - ") + "\n\n * Go Back";
			buttons(false,true);
			submit.addEventListener("click",function(){
				switch(i.value){
					case pp.moveset[0]:
						fightMove = "12";
						break;
					case pp.moveset[1]:
						break;
					case pp.moveset[2]:
						break;
					case pp.moveset[3]:
						break;
					default: 
				}
			})

		})}
	})}

    function moveSelection(pp) { //receives an object, 
        //returns the move's array 
        //or returns F on myMove to "Go Back" (select b/w fight/swap)
        var myMove = false;
        var whichMove = "Here are your Pokémon's moves. Which do you select? \n"
            + pp.moveset.join(" - ") + "\n\n * Go Back";
        var failMsg = "Why can't you spell any of them right?";
        var possibleChoices = pp.moveset.slice(0);
            possibleChoices.push("Go Back");
        var selectedMove = validateResponse(whichMove,possibleChoices,true,5,5,failMsg);
        for (x = 0; x < pp.moves.length; x++){
            if (selectedMove == "Go Back"){
                return myMove;
            }
            if (selectedMove[0] == pp.moves[x][0]){
                return pp.moves[x];
            }
        } //**********I have a suspcicion you need an option here for failing selectedMove 
    }
/*
    function makeDecision(pp) {
        var unselected = true; //returns [t/f,swap/fight/surrender,pokemon/move]
        var decision = [true, undefined, undefined];

        do {
            var question = "What would you like to do?\n\n"
                + "* Fight                              * Swap Pokemon\n\n"
                + "* Surrender";
            var answers = ["Fight","Swap Pokemon","Surrender"];
            var chooseAction = validateResponse(question,answers,true,10,10,sorry);
            if (chooseAction[1] == false){
                decision[0] = false;
                unselected = false;
                return decision;
            }
            if (chooseAction[0] == "Swap Pokemon"){
                var rosterGroup = "";
                for (x = 0; x < player.roster.length; x++){
                    rosterGroup += "* " + player.roster[x] + "\n";
                }
                var swapQuestion = "Which Pokémon do you want to swap for?\n\n"
                    + rosterGroup + "\n * Go Back";
                var swapChoices = [];
                for (m = 0; m < player.roster.length; m++){
                    if (p[m].status !== "fainted"){
                        swapChoices.push(p[m].name);
                    }
                }
                // var swapChoices = player.roster.slice();//took out the 0 parameter in slice
                // console.log("Inside Make Decision - should be full roster");
                // console.log(swapChoices);
                // for (k = 0; k < player.roster.length; k++) {
                //     if (p[k].status == "fainted") {
                //         console.log("We are at " + k);
                //         console.log(swapChoices);
                //         swapChoices.splice(k,1); //should do k--, 
                //     }
                // }
                console.log("Inside Make Decision - should be full roster minus those fainted");
                console.log(swapChoices);
                var wrongFighter = "Select a fighter by saying their name correctly "
                    + "and be sure that fighter is not already fainted."
                swapChoices.push("Go Back");
                var takeAction = validateResponse(swapQuestion,swapChoices,
                    true,5,10,wrongFighter);
                if (takeAction[1] == false || takeAction[0] == "Go Back"){
                    continue; //this lets us return to and ask main question again
                }
                if (takeAction[1] == true && takeAction[0] != "Go Back"){
                    decision[1] = "Swap Pokemon";
                    for (x = 0; x < p.length; x++) {
                        if (p[x].name == takeAction[0]){
                            decision[2] = p[x];
                        }
                    }
                    unselected = false;
                    return decision;
                }
            }
            if (chooseAction[0] == "Fight"){
                var myMove = moveSelection(pp); 
                    //will return pp.moves[x]; an array, every move at X is an array of move info
                    //or will return true, meaning GO Back to Choose Action (above)
                if (myMove == true){ //??? not sure what this does???
                    continue;
                }
                if (Array.isArray(myMove) == true){
                    decision[1] = "Fight";
                    decision[2] = myMove;
                    unselected = false;
                    return decision;
                }
            }
            if (chooseAction[0] == "Surrender"){
                var toConfirm = "We just want to make sure. Can you try again?";
                var confirmSurrender = validateYesOrNo("Are you sure?",false,3,3,toConfirm);
                if (confirmSurrender[0] == true) {
                    decision[1] = "Surrender";
                    unselected = false;
                    return decision;
                }
            }
        } while (unselected == true);
    } */

	function fightScreen(pp,op){

		//let guage = play.clientWidth; //tells us the length of the Play Area

        let ppHealth = Math.round((pp.HP/pp.baseHP) * 71);
        let opHealth = Math.round((op.HP/op.baseHP) * 71);
        let pPokeFaintedString = "";
        let oPokeFaintedString = "";

        for (z = 0; z < p.length; z++) {
            if (p[z].status == "fainted") {
                pPokeFaintedString += " (ø)";
            }
            if (p[z].status !== "fainted") {
                pPokeFaintedString += " (o)";
            }
        }

        for (z = 0; z < o.length; z++) {
            if (o[z].status == "fainted") {
                oPokeFaintedString += " (ø)";
            }
            if (o[z].status !== "fainted") {
                oPokeFaintedString += " (o)";
            }
        }

        //71 for full line of health with "HP" text, 76 without any text
        if (ppHealth == 0) {
            ppHealth = 1;
        }
        if (opHealth == 0) {
            opHealth = 1;
        }
        var ppHealthBar = "";
        for (x = 1; x <= ppHealth; x++){
            ppHealthBar += "*";
        }
        var opHealthBar = "";
        for (x = 1; x <= opHealth; x++){
            opHealthBar += "*";
        }

        //Player's Team: pokeballs
        //Player's Pokemon: ?? HP
        //Player's HP bar ***********************

        alert(player.name + "'s Team:   " + pPokeFaintedString + "\n" + pp.name + ": " 
            + pp.HP + " HP\n" + ppHealthBar + "\n\n(VS)\n\n" + opponent.name 
            + "'s Team:   " + oPokeFaintedString + "\n" + op.pokemon + ": ??\n"
            + opHealthBar);
    }
} 
/*
function enterRound(pRoundFighter,oRoundFighter) { // pp player's pokemon, op opponent's pokemon objs
	round++;
	fightScreen(pRoundFighter,oRoundFighter); //show Fight Screen
	
	var decision = makeDecision(pRoundFighter); //returns [t/f,fight/swap/surrender,move/pokemon]

	if (decision[1] == "Surrender") {
		surrender = true;
		return;
	}
	if (decision[0] == false) {
		alert("You don't know how Pokémon Battles Work. You're not ready.");
		surrender = true; //*** is this the proper response?
		return;
	}
	if (decision[1] == "Swap Pokemon") {
		pRoundFighter = swapPokemon(pRoundFighter,decision[2],true,false);  //the actual pokemon object
		fightScreen(pRoundFighter,oRoundFighter);
		alert("It's now the opponent's turn!");
		var noMove = ["Swapped",0,"N/A",100,[undefined]];
		var skipPlayerAttack = true;
		var playerAttackFirst = false;
		round = 0;
	}
	if (decision[1] == "Fight" && round == 1){
		var playerAttackFirst = attackFirst();
	}
	if (playerAttackFirst == true){
		attackOrder = ["pp","op"];
	}

	//enter fight function from enter round function
	if (decision[1] == "Fight" || skipPlayerAttack == true){
		if (decision[1] == "Fight") {
			roundFighters = enterFight(attackOrder,decision[2],pRoundFighter,oRoundFighter);
			pRoundFighter = roundFighters[0];
			oRoundFighter = roundFighters[1];
		}
		if (skipPlayerAttack == true){
			roundFighters = enterFight(["op","pp"],noMove,pRoundFighter,oRoundFighter);
			pRoundFighter = roundFighters[0];
			oRoundFighter = roundFighters[1];
		}
	}
	if (round == 16){
		alert("You'll have to finish off the other pokemon or swap your pokemon in the next "
			+ "few moves if you dont want to forfeit this cruel fight.");
	}
	if (round >= 20){
		forcedLoss = true;
		return;
	}
	var battleOver = checkIfFainted();
	if (battleOver == false) {
		enterRound(pRoundFighter,oRoundFighter);
	}
	return;
} */

/*
function battle(opponent){ 
    
    var round = 0;
    var o = opponent.pokemon; //roster of opponent's team of pokemon, p = roster of player's pokemon
    var pRoundFighter = p[0]; //shouldn't always be this one, should be first in roster
    var oRoundFighter = o[0]; //specific pokemon object
    var roundFighters = [pRoundFighter,oRoundFighter];
    var forcedLoss = false;
    var surrender = false;
    var attackOrder = ["op","pp"];

    battleIntro();
    enterRound(pRoundFighter,oRoundFighter);
    if (forcedLoss == true || surrender == true) {
        return exitBattle(false);
    }

    return exitBattle(true);

    function enterRound(pRoundFighter,oRoundFighter) { // pp player's pokemon, op opponent's pokemon objs
        round++;
        fightScreen(pRoundFighter,oRoundFighter); //show Fight Screen
        
        var decision = makeDecision(pRoundFighter); //returns [t/f,fight/swap/surrender,move/pokemon]

        if (decision[1] == "Surrender") {
            surrender = true;
            return;
        }
        if (decision[0] == false) {
            alert("You don't know how Pokémon Battles Work. You're not ready.");
            surrender = true; //*** is this the proper response?
            return;
        }
        if (decision[1] == "Swap Pokemon") {
            pRoundFighter = swapPokemon(pRoundFighter,decision[2],true,false);  //the actual pokemon object
            fightScreen(pRoundFighter,oRoundFighter);
            alert("It's now the opponent's turn!");
            var noMove = ["Swapped",0,"N/A",100,[undefined]];
            var skipPlayerAttack = true;
            var playerAttackFirst = false;
            round = 0;
        }
        if (decision[1] == "Fight" && round == 1){
            var playerAttackFirst = attackFirst();
        }
        if (playerAttackFirst == true){
            attackOrder = ["pp","op"];
        }

        //enter fight function from enter round function
        if (decision[1] == "Fight" || skipPlayerAttack == true){
            if (decision[1] == "Fight") {
                roundFighters = enterFight(attackOrder,decision[2],pRoundFighter,oRoundFighter);
                pRoundFighter = roundFighters[0];
                oRoundFighter = roundFighters[1];
            }
            if (skipPlayerAttack == true){
                roundFighters = enterFight(["op","pp"],noMove,pRoundFighter,oRoundFighter);
                pRoundFighter = roundFighters[0];
                oRoundFighter = roundFighters[1];
            }
        }
        if (round == 16){
            alert("You'll have to finish off the other pokemon or swap your pokemon in the next "
                + "few moves if you dont want to forfeit this cruel fight.");
        }
        if (round >= 20){
            forcedLoss = true;
            return;
        }
        var battleOver = checkIfFainted();
        if (battleOver == false) {
            enterRound(pRoundFighter,oRoundFighter);
        }
        return;
    }
    
    function enterFight(attackOrder,selectedMove,pp,op) {

        var bodyParts = ["butt","gut","side","stomach","face","legs",
                "backside","chest","breast","ass"];

        // console.log("PP is: ");          //This is VERY strange, pp is correct as switched
        // console.log(pp);                 //Pokemon, but pRoundF gets altered, it shouldn't
        // if (round == 1) {                   //as just prior to enterFight (at function call)
        //     console.log("pRound Fighter @ A: ");    //pRound F was === to the value of pp
        //     console.log(pRoundFighter);
        // }                                   //Must have something to do with scope? var dec.
        pRoundFighter = pp;                 // <---- To fix, I am adding this new line
        // if (round == 1) {                   //Shouldn't have to. Understand why.
        //     console.log("pRound Fighter @ B: ");
        //     console.log(pRoundFighter);
        // }

        for (n = 0; n < attackOrder.length; n++){
            var forPlayer = false; //what is the purpose of this?
            if (selectedMove[0] == "Swapped" && n == 1){
                continue;
            }

            //FUUUUUUCK. This was a hard fix! You can't seem to call a function 
            //that uses a variable (x, in this case), because when you come back
            //to the main function, (within the for loop in this case), whatever
            //happened to the variable there, will affect the variable here. (X was altered!)
            //took SOOOOOOOOOOOOOOO LOOOOOOOOOOOONG to fix. Note the hell out of this!

            if (attackOrder[0] == "pp" && n == 0) { //player attack first
                var fighter = pp;
                var defender = op;
                var fightersMove = selectedMove;
                forPlayer = true;
            }
            else if (attackOrder[0] == "pp" && n == 1) { //opponent attack second
                var fighter = op;
                var defender = pp;
                var fightersMove = op.moves[randomized(0,op.moves.length-1)]; //opponent attack first
            }
            else if (attackOrder[0] == "op" && n == 0) {
                var fighter = op;
                var defender = pp;
                var fightersMove = op.moves[randomized(0,op.moves.length-1)]; //player attack second
            }
            else if (attackOrder[0] == "op" && n == 1) {
                var fighter = pp;
                var defender = op;
                var fightersMove = selectedMove;
                forPlayer = true;
            }
            if (fighter.status == "fainted") { //skip the pokemon's move if it is already fainted
                continue;
            }
            if (forPlayer == true){
                alert(fighter.name + " attacks with " + fightersMove[0] + "!");
            }
            else{
                alert(fighter.pokemon + " attacks with " + fightersMove[0] + "!");
            }
            var hitChance = randomized(0,100);
            if (hitChance > fightersMove[3]) {
                if (forPlayer == true) {
                    alert(fighter.name + "'s attack missed " + defender.pokemon 
                        + " entirely! Learn to aim!");
                }
                else {
                    alert(fighter.pokemon + "'s attack missed! " + defender.name + " is lucky!")
                }
                continue;//??? does it work here? I think it does!! How test it?
            }
            var result = attackResult(defender,fightersMove[1],fightersMove[2]);
            if (forPlayer == true) {
                var bodyPart = bodyParts[randomized(0,bodyParts.length-1)];
                if (result[1] != "This move can't even land on this type of Pokémon!") {
                    alert(fighter.name + "'s " + fightersMove[0] + " hits " + defender.pokemon
                        + " right in the " + bodyPart + "! It deals " + result[0] 
                        + " HP damage to " + defender.pokemon + "!");
                }
                if (result[1] != "") {
                    alert(result[1]);
                }
                if (result[2] == true) {
                    alert("The opponent's " + defender.pokemon + " couldn't take it anymore "
                        + "and fainted! Tough love.");
                    
                    //randomly select an opponent's pokemon who's not fainted
                    //find a way to make this not random! Give intelligence to opponent
                    checkIfFainted();
                    if (player.allFainted == true || opponent.allFainted == true){
                        return [pRoundFighter,oRoundFighter]; 
                        //does this if you defeated all pokemon
                    }
                    
                    do {
                        var newOppFighter = o[randomized(0,o.length-1)];
                    } while (newOppFighter.status == "fainted");
                    
                    oRoundFighter = swapPokemon(oRoundFighter,newOppFighter,false,false);
                    //return [pRoundFighter,oRoundFighter];
                }
            }
            else {
                var randomMsg = randomized(1,100);
                var randomMsg2 = randomized(1,100);
                var bodyPart = bodyParts[randomized(0,bodyParts.length-1)];
                if (result[1] != "This move can't even land on this type of Pokémon!") {
                    if (randomMsg <= 50) {
                        alert(fighter.pokemon + "'s " + fightersMove[0] + " hits " 
                            + defender.name + " directly in the " + bodyPart + "! How?! "
                            + "It does " + result[0] + " damage! Argh! " + defender.name 
                            + " has " + defender.HP + " HP remaining!");    
                    }
                    else {
                        alert("Damnit! " + defender.name + " takes " + fighter.pokemon
                            + "'s " + fightersMove[0] + " right around the " + bodyPart + "! "
                            + "The move deals " + result[0] + " damage leaving " + defender.name
                            + " with " + defender.HP + " HP remaining!");
                    }
                }
                if (result[1] != "") {
                    alert(result[1]);
                }
                if (result[2] == true) {
                    if (randomMsg2 <= 50) {
                        alert("Oh Lawd! " + defender.name + " has taken on too much damage, "
                            + "especially near the " + bodyPart + "! " + defender.name 
                            + " has fainted!");
                    }
                    else if (randomMsg2 >50) {
                        alert("Oh Jesus, " + defender.name + " has fainted! They're "
                            + "practically dead!");
                    }
                    checkIfFainted();
                    if (player.allFainted == true || opponent.allFainted == true){
                        return [pRoundFighter,oRoundFighter]; 
                        //does this if all your pokemon are defeated
                    }
                    pRoundFighter = swapPokemon(pRoundFighter,null,true,true);
                }
            }
        }
        return [pRoundFighter,oRoundFighter];
    }

    function swapPokemon(returningPokemon,newFighter,forPlayer,pFighterFainted){ //swithRoundFighter
        if (pFighterFainted == true){
            var rosterGroup = "";
            for (v = 0; v < player.roster.length; v++) {
                rosterGroup += "* " + player.roster[v] + "\n";
            }
            var swapQuestion = "Which Pokémon do you want to swap for?\n\n"
                + rosterGroup;
            var swapChoices = [];
                for (j = 0; j < player.roster.length; j++){
                    if (p[j].status !== "fainted"){
                        swapChoices.push(p[j].name);
                    }
                }
            // player.roster.slice(0);
            // console.log("Inside SWAP Function, swap choices, full roster:");
            // console.log(swapChoices);
            // for (j = 0; j < player.roster.length; j++) {
            //     if (p[j].status == "fainted") {
            //         swapChoices.splice(j,1);
            //         //j--; //I would have thought since you're splicing,
            //         // you would need to account for that by taking 1 from j;
            //     }
            // }
            console.log("SWAP Function Pt. 2, swap choices, full roster minus the fainted:");
            console.log(swapChoices);
            var wrongFighter = "Please select a Pokémon who has not fainted.";
            var newPokemon = validateResponse(swapQuestion,swapChoices,
                true,5,10,wrongFighter);
            if (newPokemon[1] == false) {
                surrender = true;
                return false;
            }
            if (newPokemon[1] == true) {
                for (q = 0; q < p.length; q++){
                    if (p[q].name == newPokemon[0]){
                        var swappingWith = p[q];
                    }
                }
            }
            alert("Return " + returningPokemon.name + "! Beautiful work!\n\n"
                + "*reaches for pokeballs on the waist*\n\n Goooooooooo!");
            alert(swappingWith.name + "!!!!!!");
            round = 0;
            return swappingWith;
        }
        if (forPlayer == true && pFighterFainted == false) {
            alert("Return " + returningPokemon.name + "! Amazing work!\n\n"
                + "*reaches for pokeballs on the waist*\n\n Goooooooooo!");
            alert(newFighter.name + "!!!!!!");
            round = 0;
            return newFighter;
        }
        else {
            alert(opponent.name + ' says:\n\n"That was a fine ass job ' 
                + returningPokemon.pokemon + '! Awesome!"\n\n'
                + '*reaches for pokeballs on the waist*\n\n "Goooooooooo!"');
            alert(newFighter.pokemon + "!!!!!!");
            round = 0;
            return newFighter;
        }
    }

    function makeDecision(pp) {
        var unselected = true; //returns [t/f,swap/fight/surrender,pokemon/move]
        var decision = [true, undefined, undefined];

        do {
            var question = "What would you like to do?\n\n"
                + "* Fight                              * Swap Pokemon\n\n"
                + "* Surrender";
            var answers = ["Fight","Swap Pokemon","Surrender"];
            var chooseAction = validateResponse(question,answers,true,10,10,sorry);
            if (chooseAction[1] == false){
                decision[0] = false;
                unselected = false;
                return decision;
            }
            if (chooseAction[0] == "Swap Pokemon"){
                var rosterGroup = "";
                for (x = 0; x < player.roster.length; x++){
                    rosterGroup += "* " + player.roster[x] + "\n";
                }
                var swapQuestion = "Which Pokémon do you want to swap for?\n\n"
                    + rosterGroup + "\n * Go Back";
                var swapChoices = [];
                for (m = 0; m < player.roster.length; m++){
                    if (p[m].status !== "fainted"){
                        swapChoices.push(p[m].name);
                    }
                }
                // var swapChoices = player.roster.slice();//took out the 0 parameter in slice
                // console.log("Inside Make Decision - should be full roster");
                // console.log(swapChoices);
                // for (k = 0; k < player.roster.length; k++) {
                //     if (p[k].status == "fainted") {
                //         console.log("We are at " + k);
                //         console.log(swapChoices);
                //         swapChoices.splice(k,1); //should do k--, 
                //     }
                // }
                console.log("Inside Make Decision - should be full roster minus those fainted");
                console.log(swapChoices);
                var wrongFighter = "Select a fighter by saying their name correctly "
                    + "and be sure that fighter is not already fainted."
                swapChoices.push("Go Back");
                var takeAction = validateResponse(swapQuestion,swapChoices,
                    true,5,10,wrongFighter);
                if (takeAction[1] == false || takeAction[0] == "Go Back"){
                    continue; //this lets us return to and ask main question again
                }
                if (takeAction[1] == true && takeAction[0] != "Go Back"){
                    decision[1] = "Swap Pokemon";
                    for (x = 0; x < p.length; x++) {
                        if (p[x].name == takeAction[0]){
                            decision[2] = p[x];
                        }
                    }
                    unselected = false;
                    return decision;
                }
            }
            if (chooseAction[0] == "Fight"){
                var myMove = moveSelection(pp); 
                    //will return pp.moves[x]; an array, every move at X is an array of move info
                    //or will return true, meaning GO Back to Choose Action (above)
                if (myMove == true){ //??? not sure what this does???
                    continue;
                }
                if (Array.isArray(myMove) == true){
                    decision[1] = "Fight";
                    decision[2] = myMove;
                    unselected = false;
                    return decision;
                }
            }
            if (chooseAction[0] == "Surrender"){
                var toConfirm = "We just want to make sure. Can you try again?";
                var confirmSurrender = validateYesOrNo("Are you sure?",false,3,3,toConfirm);
                if (confirmSurrender[0] == true) {
                    decision[1] = "Surrender";
                    unselected = false;
                    return decision;
                }
            }
        } while (unselected == true);
    }

// fix what happens when you are unable to make a decision when first one is false!
    function attackFirst(){
        var num = randomized(0,p.length-1);
        var quizItems = [];

        for (var prop in p[num]){
            quizItems.push(prop)
        }
        //**** figure out why you couldn't combine ****
        for (x = 0; x < quizItems.length; x++){
            if (quizItems[x] == "moves"){
                quizItems.splice(x,1);
            }
            if (quizItems[x] == "moveset"){
                quizItems.splice(x,1);
            }
            if (quizItems[x] == "special"){
                quizItems.splice(x,1);
            }
        }
        var question = randomized(0,quizItems.length-1);
        var answer = prompt("To see who goes first, quick question:\n\n" 
            + "What is " + p[num].name + "'s " + quizItems[question]
            + "? Cap sensitive, yo!");
        
        if (answer == p[num][quizItems[question]]){
            alert("Wow, you got it right! You get to make the first move!");
            return true;
        }
        else {
            alert("Sorry, you answered incorrectly. So your opponent makes the first move.");
            return false;
        }
    }

    function attackResult(defender,damage,type) {
        var damageFactor = 1;
        var pTypes1 = defender.type;
        var pTypes2 = defender.type2;
        var pokemonFainted = false;
        var superEffective = ""; 
        var result = []; //return newDamage,super effective, fainted
    
        for (x = 0; x < allTypes.length; x++) {
            if (type == allTypes[x][0]) { //for ex, grass
                for (y = 0; y < allTypes[x][1].length; y++){ //those grass is good against
                    if (pTypes1 == allTypes[x][1][y]) {
                        damageFactor *= 1.2;
                    }
                    if (pTypes2 == allTypes[x][1][y]) {
                        damageFactor *= 1.2;
                    }
                }
                for (z = 0; z < allTypes[x][2].length; z++){ //those grass is not good against
                    if (pTypes1 == allTypes[x][2][z]) {
                        damageFactor *= .7;
                    }
                    if (pTypes2 == allTypes[x][2][z]) {
                        damageFactor *= .7;
                    }
                }
                for (w = 0; w < allTypes[x][3].length; w++) { //those grass cant hit
                    if (pTypes1 == allTypes[x][3][w]) {
                        damageFactor *= 0;
                    }
                    if (pTypes2 == allTypes[x][3][w]) {
                        damageFactor *= 0;
                    }
                }
            }
        }

        if (damageFactor == 0) {
            superEffective = "This move can't even land on this type of Pokémon!";
        }
        else if (damageFactor < .9) {
            superEffective = "It's not very effective, dude...";
        }
        else if (damageFactor > 1.1 && damageFactor <= 1.2) {
            superEffective = "Hey, that move is pretty effective!";
        }
        else if (damageFactor > 1.2) {
            superEffective = "Whoa, super effective attack, homie!";
        }

        var newDamage = Math.round(damage * damageFactor * (randomized(95,105)/100));
        defender.HP = defender.HP - newDamage; //here we are affecting the pokemon's object
        if (defender.HP <= 0) {
            defender.HP = 0;
            defender.status = "fainted";
            console.log("Did you faint the wrong pokemon?");
            console.log(defender.name);
            pokemonFainted = true;
        }

        result.push(newDamage,superEffective,pokemonFainted);
        return result;
    }

    function moveSelection(pp) { //receives an object, 
        //returns the move's array 
        //or returns F on myMove to "Go Back" (select b/w fight/swap)
        var myMove = false;
        var whichMove = "Here are your Pokémon's moves. Which do you select? \n"
            + pp.moveset.join(" - ") + "\n\n * Go Back";
        var failMsg = "Why can't you spell any of them right?";
        var possibleChoices = pp.moveset.slice(0);
            possibleChoices.push("Go Back");
        var selectedMove = validateResponse(whichMove,possibleChoices,true,5,5,failMsg);
        for (x = 0; x < pp.moves.length; x++){
            if (selectedMove == "Go Back"){
                return myMove;
            }
            if (selectedMove[0] == pp.moves[x][0]){
                return pp.moves[x];
            }
        } //**********I have a suspcicion you need an option here for failing selectedMove 
    }

    function checkIfFainted() { //returns t/f a team is fainted, 
        //also updates player objects (all = fainted)
        var faintCount = 0;
        for (x = 0; x < p.length; x++) {
            if (p[x].status == "fainted") {
                faintCount++;
            }
            if (faintCount == p.length){
                player.allFainted = true;
            }
        }
        faintCount = 0;
        for (x = 0; x < o.length; x++) {
            if (o[x].status == "fainted") {
                faintCount++;
            }
            if (faintCount == o.length){
                opponent.allFainted = true;
            }
        }
        if (player.allFainted == true || opponent.allFainted == true) {
            return true;
        }
        else return false;
    }
    
    function exitBattle(mercyLoss) {
        pokemonCenter(false,o);
        var payout = 75;
        if (player.money >= 500) {
            payout = randomized(100,(player.money*.15));
        }
        player.money = player.money - payout;
        
        if (mercyLoss == false) {
            alert("Sorry, to interrupt, but... \n\nThis battle is to be forfeited, girl!");
            alert("Pokémon guidelines say this battle ends in a loss. It's terrible "
                + "to make Pokémon fight all day.");
            alert("So unfortunately, you must bow out, and we declare " + opponent.name 
                + " the winner!");
            alert("Given your loss, you surrender a $" + payout + " payout to your opponent! "
                + "You have $" + player.money + " left.");
            newScreen("End Fight");
            return false;
        }

        if (player.allFainted == true){
            alert("You lost this battle against " + opponent.name + "!")
            displayStatuses(p);
            player.money = player.money - payout;
            alert("Given your loss, you surrender a $" + payout + " payout to your opponent! "
                + "You have $" + player.money + " left.");
            newScreen("End Fight");
            return false;
        }

        else{
            alert("Whoa! Since " + oRoundFighter.pokemon + " isn't standing anymore, and "
                + opponent.name + " has no more Pokémon - ");
            alert("Congratulations " + player.name + "! You're the winner because you "
                + "beat that jackass!");
            alert("And per official Pokémon Battle guidelines, losers have to "
                + "surrender a payout. You earned $" + payout + "! Yes, bitch! Slay!");
            displayStatuses(p);
            newScreen("End Fight");
            return true;
        }   
    }

*/

function embarkation() {
	alert("You shouldn't get here unless you've finished your first battle.");
}

function initiatePokemon(newPokemon) { //receives an object, a new pokemon, 
	// with pokeName and given name at least
	// this is interesting, I use the generalized traits defined in 
	// registry of AllPokemon to help define *this* specific pokemon.

	for (x = 0; x < allPokemon.length; x++){ //check through entire pokedex registry
		if (newPokemon.pokemon == allPokemon[x]["pokemon"]){ //see if this pokemon matches
			for (var prop in allPokemon[x]){ //for all props within generalized pokemon
				newPokemon[prop] = allPokemon[x][prop]; //define those in this pokemon obj
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

function newScreen(screenType){
	let display;
    switch (screenType) {
        case "Pokémon Center":
			display = "*********************NICE ELEVATOR MUSIC PLAYS***********************";
			return display;
        case "Battle":
			display = "******************WHOA - YOU'RE ABOUT TO BATTLE!!!********************";
            return display;
        case "End Fight":
			display = "***********PHEW - THAT WAS SCARY, BUT THE BATTLE IS OVER**************";
			return display;
        default:
			display = "**********************************?***********************************";
			return display;
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
	window.play = document.getElementById("play");
	window.t = document.getElementById("textBox"); //use d.innerText = to write on the top part of screen
	window.d = document.getElementById("display");
	window.i = document.getElementById("input"); //use i.value to acquire input value
	window.go = document.getElementById("go");
	window.submit = document.getElementById("submit"); //works fine?
	window.o1 = document.getElementById("O1");
	window.o2 = document.getElementById("O2");
	window.o3 = document.getElementById("O3");
	window.o4 = document.getElementById("O4");
}

function defineAllPokemon() {
	const allPokemon = [ //moveset property are the four moves to that specific pokemon object
		//example object: data in move: name, damage, type, accuracy, [effects]
		
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


// ******************* USE THIS TEMPLATE FOR SCENES
/*	clicks = 1;
	d.innerText = "Do you wish to go the the Pokémon lab, " + player.name + "?";
	buttons(false,true);
	go.addEventListener("click",playScene);
	submit.addEventListener("click",playScene);

	function playScene() {
		clicks++
		switch(clicks) {
			case 1:				You repeat it here just in case you need to start it over again;
				d.innerText = "Do you wish to go the the Pokémon lab, " + player.name + "?";
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
			case 7:
				break;
			case 8:
				break;
			case 9:
				break;
			case 10:
				go.removeEventListener("click", playScene);
				submit.removeEventListener("click",playScene);
				resolve(clicks); <-- for your promises
				break;
		}
	}*/