LEVEL = 0
var game_pattern = [] 
var user_pattern = []
game_is_on = false
var colors = ["red","green", "blue", "yellow"]

$("body").keypress(function(){
    if(game_is_on==false) {
        game_is_on = true
        nextSequence()
        $("h1 ").text("LEVEL "+LEVEL)
    }
})

$(".btn").click(function(){
    user_chosen_color = $(this).attr("id")
    user_pattern.push(user_chosen_color)
    console.log(user_pattern)
    console.log(game_pattern)
    blink(user_chosen_color)
    checkPattern(user_pattern.length-1)
})

function startOver(){
    LEVEL = 0
    game_pattern = []
    user_pattern = []
    game_is_on = false
}


function nextSequence(){
    user_pattern = []
    LEVEL++
    $("h1 ").text("LEVEL "+LEVEL)
    var random_number = Math.floor(Math.random() * 4)
    var random_color = colors[random_number]
    blink(random_color)
    game_pattern.push(random_color)
}

function checkPattern(index){
    console.log("user_pattern[index] :"+user_pattern[index])
    console.log("game_pattern[index] :"+game_pattern[index])
    if(user_pattern[index]==game_pattern[index]){
        if(user_pattern.length==game_pattern.length){
            $("body").addClass("next")
            setTimeout(function(){$("body").removeClass("next")},1000)
            setTimeout(nextSequence, 1500)
        }
    }
    else{
        playSound("wrong")
        $("h1").text("Game Over. Press any key to restart.")
        $("body").addClass("game-over")
        setTimeout(function(){$("body").removeClass("game-over")},2000)
        startOver()
    }
}

function blink(button_color){
    $("#"+button_color).fadeOut(80).fadeIn(80)
    playSound(button_color)
}

function playSound(button_color){
    audio_name = "sounds/"+button_color+".mp3"
    var audio = new Audio(audio_name)
    audio.play()
}

