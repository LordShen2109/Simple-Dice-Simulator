$(document).ready(function() {
    let gameActive = true;
    let currentRotation = 0;
    let currentIndex=0;
    $("body").addClass("element");
    const diceImages = ["./images/side_1_pip.png","./images/side_2_pips.png", "./images/side_3_pips.png", "./images/side_4_pips.png", "./images/side_5_pips.png", "./images/side_6_pips.png"];
    $("img ,p").click(function() {
        if (!gameActive) return;
        gameActive=false;
        currentRotation += 90*7; 
        playSoundFromPosition(1.25);
        function playSoundFromPosition(startTime) {
            const sound = new Audio('./sounds/dice.mp3'); 
            sound.currentTime = startTime; 
            sound.play(); 
        }
        $("img").css("transform", `rotate(${currentRotation}deg)`);
        $("img").addClass("op");
    });
    $("img").on("transitionend", function() {
        const randomDiceIndex = Math.floor(Math.random() * 6);
        $("img").addClass("fade-out");
        $("img").removeClass("op");
        setTimeout(function() {
            $("img").attr("src", diceImages[randomDiceIndex]);
            if ($("img").attr("src").endsWith('side_6_pips.png')) {
                $("h1").text("✌️ You WIN!!! 👏🏁");
                $("p").text("Click Here to Reload  🔄");
                $("p").click(function() {
                    location.reload(); // Reload the page when clicked
                });
                var music=new Audio('./sounds/makenai_ai_ga_kitto.mp3');
                music.play();
                gameActive = false;
            } else {
                const texts = ["Try Again 🙃", "Better Luck Next Time 😔", "Keep Rolling! 🎲","Not good enough 😅","Don't give up 👊","Keep at it 🙌"];
                function cycleText() {
                    $("h1").text(texts[currentIndex]);
                    currentIndex = (currentIndex + 1) % texts.length;
                }
                cycleText();

                gameActive=true;
            }
            $("img").removeClass("fade-out");
        }, 1500); 
    });
});
