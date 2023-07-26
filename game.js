
var numberArray = [];
var colorArray = [];
var currentChoicesArray = [];
var programColor;
var resetTime = 500;
var level = numberArray.length;
var choice;
var color;
var lastColorEnteredInArray;
var playing = false;
var clickCount = 0;
// var activeGame = false;
var soundPlayed;
var audioFileToLoad;
var wrongAudio = new Audio("./sounds/wrong.mp3");

function nextSequence() {
    var newRandom = (Math.floor(Math.random() * 4)) + 1;
    // console.log(newRandom);
    numberArray.push(newRandom);
    // console.log("Numbers: " + numberArray);
    level = numberArray.length;
    // activeGame = true;
    pushColorArray(newRandom);
    getLastColorEnteredInArray();
    
    return level;
  }

function getLastColorEnteredInArray () {
    lastColorEnteredInArray = colorArray[((colorArray.length)-1)];
    // console.log("The last random color chosen was: " + lastColorEnteredInArray);
    return lastColorEnteredInArray;
}

function testChoice(colorChosen){

    
    if(colorArray[clickCount] == colorChosen){

        clickCount++;
        console.log("correct");

        
        if(clickCount == colorArray.length){
            console.log(clickCount + " Next sequence.");

            nextSequence();
            oneFlashNextColor();
            currentChoicesArray = [];
            clickCount = 0;

        } else {
            
            console.log(clickCount + "keep going....");
            
            console.log(colorArray); 
        }
      
    } else {
        console.log("Wrong: Correct = " + colorArray[clickCount] + " / Yours = " + colorChosen);
        wrongAudio.play();
        numberArray = [];
        colorArray = [];
        currentChoicesArray = [];
        level = 0;
        clickCount = 0;
        playing = false;
        return clickCount;
        }
}

function pushCurrentChoiceArray(colorChosen){
    currentChoicesArray.push(colorChosen);
}

function soundOn (audioFileToLoad){
    soundPlayed = new Audio(audioFileToLoad);
    soundPlayed.play();
}

// TO start the game we need to inititalize the run with a first random 
// square flash - once any key is pressed.  First detect a keypress....


// still need to initialize with a keypress.....
if(playing != true){
    
      $("body").on( "keypress", function() {
        playing = true;

        $("#level-title").html("LEVEL " + (level+1));
        nextSequence();
        oneFlashNextColor();
        return playing;
      } );

}  
do {        
            $("button").click(function(){
                colorSequencePlayback();
            })
            // once started.....            
            // we need to detect mouse clicks. 
            $("div.btn").click(function () {
                // COLOR SELECTOR CLICK EVENT VARIABLE SWITCH - choice
                
                
                color = $(this).css("backgroundColor");

                $(this).addClass("pressed");

                setTimeout(function () {
                    $("div.btn").removeClass("pressed");
                }, resetTime);


                // check to see if the color they hit was equal to the last number
                switch(color){
                    case "rgb(0, 128, 0)": 
                        audioFileToLoad = "./sounds/green.mp3";
                        choice = 1;
                        colorChosen = "green";
                        break;
                    case "rgb(255, 0, 0)":
                        audioFileToLoad = "./sounds/red.mp3";
                        choice = 2;
                        colorChosen = "red";
                        break;
                    case "rgb(255, 255, 0)":
                        audioFileToLoad = "./sounds/yellow.mp3";
                        choice = 3;
                        colorChosen = "yellow";
                        break;
                    case "rgb(0, 0, 255)": 
                        audioFileToLoad = "./sounds/blue.mp3";
                        choice = 4;
                        colorChosen = "blue";
                        break;
                            
                } 
                // rgb(0, 128, 0) green
                // rgb(255, 0, 0) red
                // rgb(255, 255, 0) yellow
                // rgb(0, 0, 255) blue
                soundOn(audioFileToLoad);
                
                
                

                
                // TEST TO SEE IF THE COLOR MATCHES
                // check to see if it was the right button... and then does the sequence match.
                if(clickCount < colorArray.length) {
                    pushCurrentChoiceArray(colorChosen);
                    testChoice(colorChosen); 

 
                }   else if(clickCount = colorArray.length){
                        console.log("level up");
                        nextSequence();
                        oneFlashNextColor();
                
                }  
                

                
   

                
                if(colorArray.length == 0){
                    $("#level-title").html("Press A Key to Start");
                } else {
                    $("#level-title").html("LEVEL " + (level));
                }

                
            });      

    } // end of the do

while (playing == true);
//  if the click is wrong we flash the sceen and stop the sequence, display high score, reset the sequence


// if the click is the same as the one expected..... we need to flash a correct signal and the nextSequence is started.


function oneFlashNextColor(){


    var interval = setInterval(function () {
        var btnClass = colorArray[((colorArray.length)-1)];
        setTimeout(function() {
        
            $(".btn." + btnClass).addClass("pressed");


            setTimeout(function () {
                $("div.btn").removeClass("pressed");
            }, resetTime);
       
        }, resetTime);

        switch(colorArray[((colorArray.length)-1)]){
            case "green": 
                audioFileToLoad = "./sounds/green.mp3";
                // choice = 1;
                break;
            case "red":
                audioFileToLoad = "./sounds/red.mp3";
                // choice = 2;
                break;
            case "yellow":
                audioFileToLoad = "./sounds/yellow.mp3";
                // choice = 3;
                break;
            case "blue": 
                audioFileToLoad = "./sounds/blue.mp3";
                // choice = 4;
                break;
                    
        }   

        soundPlayed = new Audio(audioFileToLoad);
        soundPlayed.play();
        clearInterval(interval);
        
    }, resetTime);

    

}


function colorSequencePlayback() {
    if(colorArray.length != 0){
        var i = 0;
        var interval = setInterval(function() {
            var btnClass = colorArray[i];

            switch(colorArray[i]){
                case "green": 
                    audioFileToLoad = "./sounds/green.mp3";
                    // choice = 1;
                    break;
                case "red":
                    audioFileToLoad = "./sounds/red.mp3";
                    // choice = 2;
                    break;
                case "yellow":
                    audioFileToLoad = "./sounds/yellow.mp3";
                    // choice = 3;
                    break;
                case "blue": 
                    audioFileToLoad = "./sounds/blue.mp3";
                    // choice = 4;
                    break;
                        
            } 

            setTimeout(function() {
            
                $(".btn." + btnClass).addClass("pressed");
                soundPlayed = new Audio(audioFileToLoad);
                soundPlayed.play();

                setTimeout(function () {
                    $("div.btn").removeClass("pressed");
                }, 100);
        
            }, 1000);

            i++;
            if (i === colorArray.length) {
                clearInterval(interval);
            }
        }, resetTime);
  }
}



function pushColorArray(newRandom) {
    

        switch(newRandom){
            case 1: 
                programColor = "green";
                break;
            case 2:
                programColor = "red";
                break;
            case 3:
                programColor = "yellow";
                break;
            case 4: 
                programColor = "blue";
                break;
        }
        colorArray.push(programColor);
        console.log("Colors: " + colorArray);


}