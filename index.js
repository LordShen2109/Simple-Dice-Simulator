$(document).ready(function() {
    let gameActive = true;
    let currentRotation = 0;
    let currentIndex=0;
    $("body").addClass("element");
    
    // Dice images array (dice1.png to dice6.png)
    const diceImages = ["./images/side_1_pip.png","./images/side_2_pips.png", "./images/side_3_pips.png", "./images/side_4_pips.png", "./images/side_5_pips.png", "./images/side_6_pips.png"];
    // const originalH1Text = $("h1").text();
    $("img ,p").click(function() {
        // currentRotation=0;
        if (!gameActive) return;
        gameActive=false;
        currentRotation += 90*7; // 90 degrees * 6 rotations
        playSoundFromPosition(1.25);
        function playSoundFromPosition(startTime) {
            const sound = new Audio('./sounds/dice.mp3'); // Get the audio element
    
            sound.currentTime = startTime; // Set the starting time
            sound.play(); // Play the sound
        }
        $("img").css("transform", `rotate(${currentRotation}deg)`);
        $("img").addClass("op");
    });
  
    // When rotation finishes, change dice image with animation
    $("img").on("transitionend", function() {
        const randomDiceIndex = Math.floor(Math.random() * 6);
        // $("img").css("transform", `rotate(${0}deg)`);
        // Add fade-out class to start the fade-out animation
        $("img").addClass("fade-out");
        $("img").removeClass("op");

        // Wait for the fade-out animation to complete before changing the image
        setTimeout(function() {
            // Change the dice image
            $("img").attr("src", diceImages[randomDiceIndex]);
            // console.log($("img").attr("src"));
            if ($("img").attr("src").endsWith('side_6_pips.png')) {
                $("h1").text("🤓☝️ You WIN!!!");
                $("p").text("Reload to play again");
                var music=new Audio('./sounds/makenai_ai_ga_kitto.mp3');
                music.play();
                gameActive = false;
            } else {
                // Reset the h1 text to its original value
                // Array of texts
                const texts = ["Try Again 🙃", "Better Luck Next Time 😔", "Keep Rolling! 🎲","Not good enough 😅","Don't give up 👊"];

                // Variable to track the current index
                // let currentIndex = 0;

                // Function to set the h1 text in a cycle
                function cycleText() {
                // Set the h1 text to the current index text
                    $("h1").text(texts[currentIndex]);

                // Increment the index and reset if it reaches the end of the array
                    currentIndex = (currentIndex + 1) % texts.length;
                }

                // Call cycleText whenever you want to change the text
                cycleText();

                gameActive=true;
            }
            // Reset rotation when new image is set to prevent further rotation affecting it
            // $("img").css("transform", "rotate(0deg)");

            // Remove the fade-out class and fade-in the new image
            $("img").removeClass("fade-out");
        }, 1500); // The fade-out duration is 0.5s, matching the CSS transition
    });
    
  
    
});
