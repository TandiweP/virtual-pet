/*
virtual-pet.js
Andrew Senin
Drexel CS164
*/



// Constants
var MAX_HAPPINESS = 100;
var MAX_HUNGER = 100;
var MAX_FATIGUE = 100;

var DEC_HAPPINESS = 1;
var DEC_HUNGER = 3;
var DEC_FATIGUE = 2;

var TICK = 1000; // Update delay (ms) resets if got input in meantime

// Housekeeping vars
var timer;

var stateIndex;
var totalStates;
var totalStimuli;

// Vital vars
var happiness;
var hunger;
var fatigue;



// Possible states
var states = [
    {
        name: "bored", // System name
        desc: "Gary is bored", // How it's described to user
        img: "gary-idle.png", // Path to corresponding pic
        next: { // List of relative probabilities to change state
            "happy": 20,
            "tired": 20,
            "hungry": 20,
            "angry": 20
        }
    },
    {
        name: "happy",
        desc: "Gary is feeling happy",
        img: "gary-happy.jpeg",
        next: {
            "bored": 20,
            "tired": 20,
            "hungry": 20,
            "angry": 20
        }
    },
    {
        name: "tired",
        desc: "Gary is worn out",
        img: "gary-tired.png",
        next: {
            "happy": 20,
            "bored": 20,
            "hungry": 20,
            "angry": 20
        }
    },
    {
        name: "hungry",
        desc: "Gary's stomach is growling",
        img: "gary-hungry.png",
        next: {
            "happy": 20,
            "bored": 20,
            "tired": 20,
            "angry": 20
        }
    },
    {
        name: "angry",
        desc: "Gary is seething with rage!",
        img: "gary-angry.png",
        next: {
            "happy": 20,
            "bored": 20,
            "tired": 20,
            "hungry": 20,
        }
    }
];



// Available user inputs
var stimuli = [
    {
        name: "pet", // System name
        desc: "Pet", // Action available to user
        effect: { // List of changes made to vital stats
            deltaHappiness: 35
        }
    },
    {
        name: "feed",
        desc: "Feed",
        effect: {
            deltaHappiness: 10,
            deltaHunger: 40
        }
    },
    {
        name: "sleep",
        desc: "Send to bed",
        effect: {
            deltaHappiness: 5,
            deltaFatigue: 70
        }
    },
    {
        name: "poke",
        desc: "Poke",
        effect: {
            deltaHappiness: -40,
        }
    }
];



function draw() {
    // Sync webpage with pet status
    var img;
    var out;
    var currentState;
    var descText;

    img = document.getElementById("img");
    out = document.getElementById("out");
    
    currentState = states[stateIndex]; 
    descText = currentState.desc;

    img.src = "assets/pet-pics/" + currentState.img;
    img.alt = descText;
    out.innerHTML = descText;

    // Debug
    console.log(
        "hap " + happiness.toString() +
        "\nhun " + hunger.toString() +
        "\nfat " + fatigue.toString()
    );

}



function update() {

    happiness = Math.min(MAX_HAPPINESS, Math.max(0, happiness - DEC_HAPPINESS));
    hunger = Math.min(MAX_HUNGER, Math.max(0, hunger - DEC_HUNGER));
    fatigue = Math.min(MAX_FATIGUE, Math.max(0, fatigue - DEC_FATIGUE));

    draw();

    timer = window.setTimeout(update, TICK);

}



function doAction(action) {

    clearTimeout(timer);

    // logic

    update();
}



function buildInputs() {
    // Create buttons corresponding to each available action
    var inputDiv;
    var stimIndex;

    inputDiv = document.getElementById("inputs");

    for (stimIndex = 0; stimIndex < totalStimuli; ++stimIndex) {
        inputDiv.innerHTML += 
            "<input type=\"button\" \
            value=\"" + stimuli[stimIndex].desc + "\" \
            onclick=\"doAction('" + stimuli[stimIndex].name + "')\">";
    }
}



function init() {

    stateIndex = 0;
    totalStates = states.length;
    totalStimuli = stimuli.length;

    happiness = MAX_HAPPINESS;
    hunger = MAX_HUNGER;
    fatigue = MAX_FATIGUE;

    buildInputs();
    draw();

    setTimeout(update, TICK);

}

