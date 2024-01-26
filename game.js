// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define an object representing the moving element
const movingElement = {
    x: 50, // initial x position
    y: 0,  // initial y position
    width: 30,
    height: 30,
    speed: 2 // pixels per frame
};

let animationId;
let isAnimating = false;

//ADD MORE SONGS, 2 more, increasing in difficulty
//Mary had a Little Lamb
let song = ['C', 'X', 'Z', 'X', 'C', 'C', 'C',
     'X', 'X', 'X', 'C', 'C', 'C',
    'C', 'X', 'Z', 'X', 'C', 'C', 'C',
    'C', 'X', 'X', 'C', 'X', 'Z'];
let songIndex = 0;
let widthMax = 720;

function draw() {
     // Check if the animation is still running
     if (!isAnimating) {
        return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the moving element
    ctx.fillStyle = '#f59da1'; // Blue color
    ctx.fillRect(movingElement.x, movingElement.y, movingElement.width, movingElement.height);

    
    // Add text inside the rectangle
    ctx.fillStyle = '#FFF'; // White color
    ctx.font = '16px Arial';
    ctx.fillText(song[songIndex], movingElement.x + 5, movingElement.y + 20);

    // Update the position for the next frame
    movingElement.y += movingElement.speed;

    // Check if the element has reached the bottom of the canvas
    if (movingElement.y > canvas.height) {
        // Reset its position to the top
        movingElement.y = 0;

        //move next note to the right
        if (movingElement.x < widthMax){
            movingElement.x += 25;
        }
        else{
            movingElement.x = 50;
        }

        //subtract 2 points for each missed note
        let gameScore = document.getElementById('gameScore');
        gameScore.innerText = Number(gameScore.innerText) + -2;
       

         // Move to the next note in the song
         songIndex = (songIndex + 1) % song.length;

          // Delay before starting the next animation
        setTimeout(() => {
            animationId = requestAnimationFrame(draw);
        }, 100);
    }

    // Request the next animation frame
    if (isAnimating) {
        animationId = requestAnimationFrame(draw);
    }
}

// Function to toggle animation
function toggleAnimation() {
    if (isAnimating) {
        // Stop the animation
        isAnimating = false;
        cancelAnimationFrame(animationId);
        document.getElementById('startStopButton').textContent = 'Start Game';
    } else {
        // Start the animation
        isAnimating = true;
        draw();
        document.getElementById('startStopButton').textContent = 'Stop Game';
    }
}

// Add click event listener to the button
document.getElementById('restartButton').addEventListener('click', restartGame);

//function restart game
function restartGame(){
     // Stop the animation
     isAnimating = false;
     cancelAnimationFrame(animationId);
     document.getElementById('startStopButton').textContent = 'Start Game';

     // reset the score
     let gameScore = document.getElementById('gameScore');
     gameScore.innerText = '0';

     //reset the song
     songIndex = 0;

     //reset the blocks
     movingElement.x = 50;
     movingElement.y = 0;


}

// Add click event listener to the button
document.getElementById('startStopButton').addEventListener('click', toggleAnimation);

// Add keydown event listener, detect if we played the correct note
document.addEventListener('keydown', function(event) {
    //correct note played
    if (event.key === song[songIndex].toLowerCase() && isAnimating) {

         //add to game score
         let gameScore = document.getElementById('gameScore');
         gameScore.innerText = Number(gameScore.innerText) + 1;

         // Stop the animation temporarily
         isAnimating = false;
         cancelAnimationFrame(animationId);

         setTimeout(() => {
            isAnimating = true;
            movingElement.y = 0;
            //move next note to the right
            if (movingElement.x < widthMax){
                movingElement.x += 25;
            }
            else{
                movingElement.x = 50;
            }
       
            songIndex = (songIndex + 1) % song.length;

            // Request the next animation frame
            animationId = requestAnimationFrame(draw);
            document.getElementById('startStopButton').textContent = 'Stop Game';
         }, 100);
    }
});