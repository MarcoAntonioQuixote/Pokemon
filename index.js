var t = document.getElementById("top"); //use t.innerHTML = to write on the top part of screen
var i = document.getElementById("input"); //use i.value to acquire input value
var go = document.getElementById("go");
var submit = document.getElementById("submit");

var playerName = introduction();
console.log("Here is the player's name: " + playerName);


var player = {};
   player.name = playerName;
   player.pokemon = [];
   player.roster = [];
   player.money = 2000;
   player.allFainted = false;
var p = player.pokemon //used as a sub throughout game, refers to player's roster of 6 pokemon
var myNemesis = {};
   myNemesis.pokemon = [];
   myNemesis.name = "Arch-Fucking-Nemesis";
   myNemesis.allFainted = false;
pickStarter();

function introduction () {
   let clickCount = 0;
   //alert("Hi! Welcome to the world of Pokémon!");
   go.style.display = "";

   x = "So many adventures await! Let's get started.";
   y = "First, tell me. What's your name?";
   a = "Nice to meet you! Your journey awaits!";
   text = [x,y,a];

   go.addEventListener("click",function (){
      t.innerHTML = (text[clickCount]);
      clickCount++;
      if (clickCount == 2) {
         submit.style.display = "";
         go.style.display = "none";
         i.style.display = "";
      }
   });

   submit.addEventListener("click", function(){
    let name = document.getElementById("input").value;
    document.getElementById("input").value = "";
    let z = "Right, your name is " + name + "!";
    text.splice(2,0,z);
    go.style.display = "";
    t.innerHTML = (text[clickCount]);
    clickCount++;
    console.log("Here is " + name);
   return name;
   });
}

function pickStarter(){
   t.innerHTML = "Do you wish to go to the Pokémon lab " + player.name + "?";
}