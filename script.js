let ball = document.getElementById('ball');
let rod1 = document.getElementById('rod1');
let rod2 = document.getElementById('rod2');

rod1.style.left = rod1.offsetLeft + "px";
rod2.style.left = rod2.offsetLeft + "px";

let gameon = false;
let score = 0;
let movement;
let scoreStore;
let maxscore;
const storeName = "Random";
let storeScore;


(function () {
    rod = localStorage.getItem(storeName);
    maxscore = localStorage.getItem(storeScore);
    // console.log(rod, maxscore)

    if (rod === null || maxscore === null) {
        alert("This is the first time you are playing this game. Press Enter to START");
        maxscore = 0;
        rod = "Rod1"
    } else {
        alert(rod + " has maximum score of " + maxscore * 100);
    }

    resetgame(rod);
})();

function resetgame(rods){

    // console.log(rods)
    rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + 'px';
    rod2.style.left = (window.innerWidth - rod2.offsetWidth) / 2 + 'px';
    ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + 'px';

    // Losing Player with the Ball when restart

    if(rods === 'Rod 2'){
        ball.style.top = (rod1.offsetTop + rod1.offsetHeight) + 'px';
        ballSpeedY = 2;
    }
    else if(rods === 'Rod 1'){
        ball.style.top = (rod2.offsetTop - rod2.offsetHeight) + 'px';
        ballSpeedY = -2;
    }
    
    score = 0;
    gameon = false;
}

function storeWin(rod, score){
    
    if(score > maxscore){
        maxscore = score;
        localStorage.setItem(storeName, rod);
        localStorage.setItem(scoreStore, score);
    }

    clearInterval(movement);
    resetgame(rod);
    alert(rod + " wins with a score of " + (score * 100) + ". Max score is: " + (maxscore * 100));    
}



document.addEventListener('keydown', function(event){

    var left1 = parseInt(rod1.style.left);
    var left2 = parseInt(rod2.style.left);
    var innerW = window.innerWidth;
    var innerH = window.innerHeight;
    let rod1W = rod1.offsetWidth;
    let rod2W = rod2.offsetWidth;
    let rod1H = rod1.offsetHeight;
    let rod2H = rod2.offsetHeight;
    console.log(event.keyCode)
    if(event.keyCode == 68 || event.keyCode == 39){
        if(left1< (innerW-rod1W) || left2< (innerW - rod2W)){
            
            // console.log("D pressed");
            rod1.style.left = (left1 + 15) + 'px';
            rod2.style.left = (left2 + 15) + 'px';
    }
    }

    if(event.keyCode == 65 || event.keyCode == 37){

        if(left1> 5 || left2 >5){
            // console.log("A pressed");
            rod1.style.left = (left1 - 15) + 'px';
            rod2.style.left = (left2 - 15) + 'px';
        }
    }

    if(event.keyCode == 13){

        
        let ballMove = ball.getBoundingClientRect();
        let ballx = ballMove.x;
        let bally = ballMove.y;
        let ballWidth = ball.offsetWidth;

        let ballSpeedX = 2;
            ballSpeedY = 2;
        // console.log(ballMove.x, ballMove.y)

        if(!gameon){
            gameon=true;

            movement = setInterval(function(){

                // Movement of Ball 

                ballx+= ballSpeedX;
                bally+= ballSpeedY;

                ball.style.top = bally + "px";
                ball.style.left = ballx + "px";

                
                // Change Direction 

                if((ballx + ballWidth) > innerW || ballx < 0){
                    ballSpeedX = -ballSpeedX;
                }

                // Rod 1 

                if((bally + 4)<= rod1H){
                    ballSpeedY = -ballSpeedY; // Reverses the direction
                    score++;

                    // End Game 

                    if((ballx < rod1.getBoundingClientRect().x) || ( ballx > (rod1.getBoundingClientRect().x + rod1W))){
                        storeWin('Rod 2', score);
                    }
                }

                // Rod 2 

                else if((bally + 19) >= (innerH - rod2H)){
                    ballSpeedY = -ballSpeedY; // Reverses the direction
                    score++;

                    if((ballx < rod2.getBoundingClientRect().x || ballx > (rod2.getBoundingClientRect().x + rod2W))){
                        storeWin('Rod 1', score);
                    }
                }


            },10);
        
        }
    }

}); 

