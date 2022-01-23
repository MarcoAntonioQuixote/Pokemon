var tb = document.getElementById("textBox");

var b = document.getElementById("bottom");


var speeds = {
	pause: 250,
	slow: 120,
	normal: 70,
	fast: 40,
	instant: 3
}

var textLines = [
	{speed: speeds.pause, string: "Hey!"},
	{speed: speeds.normal, string: "Welcome to the world of Pokémon!"},
	{speed: speeds.slow, string: "So many..."},
	{speed: speeds.pause, string: "badass", classes: ["red"]},
	{speed: speeds.normal, string: "adventures await!"},
	{speed: speeds.slow, string: "But first, tell me..."}
];

var characters = [];
textLines.forEach((line, index) => {

	if (index < textLines.length-1) {
		line.string += " ";
	}

	line.string.split("").forEach(character => {
		var span = document.createElement("span");
		span.innerHTML = character;
		tb.appendChild(span);
		characters.push({
			span: span,
			isSpace: characters === " ",
			delayAfter: line.speed,
			classes: line.classes || []
		})
	})
})

function revealOneCharacter(list) {
	var next = list.splice(0,1)[0];
	next.span.classList.add("revealed");
	next.classes.forEach((c) => {
		next.span.classList.add(c);
	});

	var delay = next.isSpace ? 0 : next.delayAfter;

	if (list.length > 0) {
		setTimeout(function() {
			revealOneCharacter(list);
		}, delay)
	}
}

revealOneCharacter(characters);