var progressTotal = 0;
var counter = 0;
var t;
var insideMode = false;
var randomNumber;
var spawnX;
var spawnY;
var door;

var door = $("<img id='door' src='assets/images/DoorOpening-gif.gif'>");
var car = $("<img class='car' src='assets/images/p1-carRight.png'>");
$("#gameId").append(car);
car.css({
    top: 380,
    left: 0
});

var kittens = ["Devin", "Jen", "Jared", "Dylan", "Charlie", "Bryan", "Colin"];
var sideKittens = [];
var totalKits = 0;

function updateDisplay() {
    $("#health").html("Player HP: " + playerHp);
    $("#score").html("Score: " + playerScore);
}

function gainSidekick() {
    if (totalKits < 4) {

        var arrNum = Math.floor(Math.random() * kittens.length);
        var sidekit = $("<img>");
        var displayDiv = $("<div>");
        var kittenName = $("<p class='text-center'>" + kittens[arrNum] + "</p>");
        var apiImage = "https://robohash.org/" + kittens[arrNum] + "/?set=set4";
        sidekit.attr("src", apiImage).addClass("imgItems img-thumbnail");
        // console.log(apiImage);
        displayDiv.addClass("item");
        displayDiv.append(sidekit).append(kittenName);
        $("#gameId").append(displayDiv);
        $(".sidekick").append(displayDiv);

        $(".sidekick").fadeIn(3000);
        kittens.splice(arrNum, 1);
        // console.log(kittens);

        sideKittens.push(apiImage);
        responsiveVoice.speak("You've found a kitten! We'll name it after someone helpful.")

        playerHp += 40;
        playerScore += 40;
        playerAp += 15;
        bossHp -= 50;
        bossAp -= 5;
        totalKits++
        updateDisplay();
    }
}

var pos;
var carYAxis;

//sets positions of trashcans on each map
var trashSpawnPoints = [
    [{
            streetY: 450,
            streetX: 850,
            state: "closed"
        },
        {
            streetY: 120,
            streetX: 850,
            state: "closed"

        },
        {
            streetY: 120,
            streetX: 80,
            state: "closed"

        }
    ],
    [{
            streetY: 125,
            streetX: 80,
            state: "closed"
        },
        {
            streetY: 440,
            streetX: 80,
            state: "closed"

        },
        {
            streetY: 130,
            streetX: 810,
            state: "closed"

        }
    ],
    [{
            streetY: 120,
            streetX: 260,
            state: "closed"
        },
        {
            streetY: 450,
            streetX: 530,
            state: "closed"

        },
        {
            streetY: 450,
            streetX: 20,
            state: "closed"

        }
    ],
    [{
            streetY: 110,
            streetX: 40,
            state: "closed"
        },
        {
            streetY: 450,
            streetX: 400,
            state: "closed"

        },
        {
            streetY: 130,
            streetX: 800,
            state: "closed"

        }
    ],
    [{
            streetY: 120,
            streetX: 145,
            state: "closed"
        },
        {
            streetY: 460,
            streetX: 420,
            state: "closed"

        },
        {
            streetY: 100,
            streetX: 760,
            state: "closed"

        }
    ],
    [{
            streetY: 450,
            streetX: 670,
            state: "closed"
        },
        {
            streetY: 450,
            streetX: 50,
            state: "closed"

        },
        {
            streetY: 150,
            streetX: 620,
            state: "closed"

        }
    ],
    [{
            streetY: 100,
            streetX: 300,
            state: "closed"
        },
        {
            streetY: 95,
            streetX: 840,
            state: "closed"

        },
        {
            streetY: 450,
            streetX: 400,
            state: "closed"

        }
    ],
    [{
            streetY: 110,
            streetX: 200,
            state: "closed"
        },
        {
            streetY: 460,
            streetX: 450,
            state: "closed"

        },
        {
            streetY: 140,
            streetX: 720,
            state: "closed"

        }
    ],
    [{
            streetY: 125,
            streetX: 295,
            state: "closed"
        },
        {
            streetY: 145,
            streetX: 840,
            state: "closed"

        },
        {
            streetY: 440,
            streetX: 210,
            state: "closed"

        }
    ],
    [{
            streetY: 140,
            streetX: 250,
            state: "closed"
        },
        {
            streetY: 450,
            streetX: 240,
            state: "closed"

        },
        {
            streetY: 455,
            streetX: 725,
            state: "closed"

        }
    ],
    [{
            streetY: 130,
            streetX: 660,
            state: "closed"
        },
        {
            streetY: 460,
            streetX: 670,
            state: "closed"

        },
        {
            streetY: 450,
            streetX: 150,
            state: "closed"

        }
    ],
];

//swaps between trash cans open/closed
trashcanStates = {
    "open": "<img class='trashOpened' src='assets/images/p1-trashcan-opened.png'>",
    "closed": "<img class='trash' src='assets/images/p1-trashcan-unopened.png'>"
};

trashCanGenerator();

//makes doors on map
function doorGenerator() {

    //restarts gif
    door.removeAttr("src");
    door.attr("src", 'assets/images/DoorOpening-gif.gif');

    //door pos based on counter
    if (counter === 2) {
        door.css({
            top: 105,
            left: 410
        });
        $("#gameId").append(door);
    } else if (counter === 5) {
        door.css({
            top: 79,
            left: 400
        });
        $("#gameId").append(door);
    } else if (counter === 8) {
        door.css({
            top: 132,
            left: 440
        });
        $("#gameId").append(door);
    }

}

//makes trashcans and puts them on map
function trashCanGenerator() {
    var trashCan;
    var trashHtml;
    var pp1;
    var pp2;
    var distanceCheck;

    randomNumber = Math.floor(Math.random() * 6);
    $("#gameId").empty();
    car.css({
        top: carYAxis,
        left: 0
    });
    $("#gameId").append(car);

    for (xT = 0; xT < trashSpawnPoints[counter].length; xT++) {
        trashCan = trashSpawnPoints[counter][xT];
        trashHtml = $(trashcanStates[trashCan.state]);
        trashHtml.attr("data", xT);
        trashHtml.css({
            top: trashCan.streetY,
            left: trashCan.streetX
        });
        $("#gameId").append(trashHtml);
    }

    //clicking trashcan has chance to spawn a sidekit/+hp
    $(".trash").click(function () {
        pp1 = $(this)[0].offsetLeft - car.position().left
        pp2 = $(this)[0].offsetTop - car.position().top
        distanceCheck = Math.sqrt((pp1 * pp1) + (pp2 * pp2));

        //makes sure user is close enough to click 
        if (distanceCheck < 120) {
            if ($(this).attr("data") == randomNumber && trashSpawnPoints[counter][$(this).attr("data")].state === "closed") {
                gainSidekick();
            }
            trashSpawnPoints[counter][$(this).attr("data")].state = "open";
            $(this).attr("src", "assets/images/p1-trashcan-opened.png").addClass("trashOpened").animate({
                left: "-=15px"
            }, 100);

        } else {
            responsiveVoice.speak("Try getting closer");
        }
    });
}

function bossCheck() {
    insideMode = true;
    $("#gameId").empty();
    $("#gameId").removeClass("game-container" + counter);
    counter++;
    $("#gameId").addClass("game-container" + counter);

    var bossButton = $("<button>");
    bossButton.addClass("btn btn-danger bButt");
    bossButton.attr("id", "start-boss");
    bossButton.text("Fight!")

    var bossText = $("<div>");
    bossText.attr("id", "boss-story");
    bossText.addClass("boss-paragraph");
    bossText.text("Something rustles in the bushes...");
    responsiveVoice.speak("Something rustles in the bushes...");

    setTimeout(function () {
        responsiveVoice.speak("Prepare to defend yourself... human!");
        bossText.text("Prepare to defend yourself Human!")
        bossText.append(bossButton);
    }, 3000)
    $(".game-container11").append(bossText);
}

//checks for previous map
$(document).keydown(function (e) {


    if (insideMode == false) {
        var pos = car.position();
        var carYAxis = parseInt(pos.top) - 1;
        carLastPos = pos;

        //drive left
        if (e.keyCode == 37 || e.keyCode == 65) {

            if ($(car).attr("data") === "north") {
                $(car).attr("src", "assets/images/p1-car-turning-NW.png").removeClass("carUpDown").addClass("carTurning");
                if (pos.top < 210) {
                    car.animate({
                        top: "-=0px"
                    }, 100);
                } else {
                    car.animate({
                        top: "-=20px"
                    }, 100);
                }
                $(car).removeAttr("data", "north").attr("data", "west");

            } else if ($(car).attr("data") === "south") {
                $(car).attr("src", "assets/images/p1-car-turning-WS.png").removeClass("carUpDown").addClass("carTurning");
                if (pos.top > 360) {
                    car.animate({
                        top: "+=0px"
                    }, 100);
                } else {
                    car.animate({
                        top: "+=20px"
                    }, 100);
                }
                $(car).removeAttr("data", "south").attr("data", "west");
            } else {
                $(car).attr("src", "assets/images/p1-carLeft.png");
                $(car).attr("data", "west").removeClass("carTurning");
                if (counter === 0 && pos.left < 60) {
                    car.css("left", "-=0px");
                } else if (pos.top < 140 && pos.left > 690) {
                    car.css("left", "-=0px");
                    car.animate({
                        top: "+=0px"
                    }, 100);
                } else {
                    car.css("left", "-=50px");
                }

            }

            if (pos.left < 50) {
                // console.log("pos.left<20 is working");
                if (counter !== 0) {
                    $("#gameId").removeClass("game-container" + counter);
                    counter--;
                    trashCanGenerator();
                    doorGenerator();
                    $("#gameId").addClass("game-container" + counter);
                    car.css({
                        top: carYAxis,
                        left: 800
                    });

                    // console.log("progress total " + progressTotal);
                }
            }

            //drive up
        } else if (e.keyCode == 38 || e.keyCode == 87) {
            $(car).attr("src", "assets/images/p1-carUp.png").removeClass("carTurning");

            if ($(car).attr("data") === "east") {
                $(car).attr("src", "assets/images/p1-car-turning-NE.png").addClass("carTurning");
                if (counter === 10 && pos.left > 715) {
                    car.animate({
                        left: "+=0px"
                    }, 100);
                    $(car).removeAttr("data", "east").attr("data", "north");
                } else {
                    car.animate({
                        left: "+=20px"
                    }, 100);
                    $(car).removeAttr("data", "east").attr("data", "north");
                }
            } else if ($(car).attr("data") === "west") {
                $(car).attr("src", "assets/images/p1-car-turning-NW.png").addClass("carTurning");
                if (counter === 0 && pos.left < 40) {
                    car.animate({
                        left: "-=0px"
                    }, 100);
                    $(car).removeAttr("data", "west").attr("data", "north");
                } else {
                    car.animate({
                        left: "-=20px"
                    }, 100);
                    $(car).removeAttr("data", "west").attr("data", "north");
                }
            } else {
                if (counter === 10 && pos.left > 675) {
                    $(car).attr("data", "north").attr("src", "assets/images/p1-carUp.png").addClass("carUpDown").removeClass("carTurning");
                    car.css("top", "-=20px");

                    if (pos.top < 20) {
                        insideMode = true;
                        $("#gameId").empty();
                        $("#gameId").removeClass("game-container" + counter);
                        counter++;
                        $("#gameId").addClass("game-container" + counter);

                        var bossButton = $("<button>");
                        bossButton.addClass("btn btn-danger bButt");
                        bossButton.attr("id", "start-boss");
                        bossButton.text("Fight!")

                        var bossText = $("<div>");
                        bossText.attr("id", "boss-story");
                        bossText.addClass("boss-paragraph");
                        bossText.text("Something rustles in the bushes...")
                        setTimeout(function () {
                            responsiveVoice.speak("Prepare to defnd yourself human!");
                            bossText.text("Prepare to defend yourself Human!")
                            bossText.append(bossButton);

                        }, 3000)

                        $(".game-container11").append(bossText);

                    }
                    // console.log(car.position());
                } else if (pos.top < 210) {
                    $(car).attr("data", "north").attr("src", "assets/images/p1-carUp.png").addClass("carUpDown").removeClass("carTurning");
                    car.css("top", "-=0px");

                } else {
                    $(car).attr("data", "north").attr("src", "assets/images/p1-carUp.png").addClass("carUpDown").removeClass("carTurning");
                    car.css("top", "-=20px");
                }
            }

            //drive right
        } else if (e.keyCode == 39 || e.keyCode == 68) {

            if (pos.left > 800) {
                car.css({
                    top: carYAxis,
                    left: 0
                });
                pos.left = 0;
                $("#gameId").removeClass("game-container" + counter);
                counter++;
                $("#gameId").addClass("game-container" + counter);
                if (counter > progressTotal) {
                    progressTotal++;
                }
                // console.log("pos left " + pos.left);
                trashCanGenerator();
                doorGenerator();
                // console.log("progress total "+progressTotal);
                // console.log("counter " + counter);

            }
            if ($(car).attr("data") === "north") {
                $(car).attr("src", "assets/images/p1-car-turning-NE.png").removeClass("carUpDown").addClass("carTurning");
                if (pos.top < 210) {
                    car.animate({
                        top: "-=0px"
                    }, 100);
                } else {
                    car.animate({
                        top: "-=20px"
                    }, 100);
                }
                $(car).removeAttr("data", "north").attr("data", "east");

            } else if ($(car).attr("data") === "south") {
                $(car).attr("src", "assets/images/p1-car-turning-ES.png").removeClass("carUpDown").addClass("carTurning");
                if (pos.top > 360) {
                    car.animate({
                        top: "+=0px"
                    }, 100);
                } else {
                    car.animate({
                        top: "+=20px"
                    }, 100);
                }
                $(car).removeAttr("data", "south").attr("data", "east");
            } else {
                $(car).attr("src", "assets/images/p1-carRight.png");
                $(car).attr("data", "east").removeClass("carTurning");
                if (counter === 10 && pos.left > 700) {
                    car.css("left", "-=0px");
                    responsiveVoice.speak("Look there! Go north!")
                } else if (pos.top < 140 && pos.left > 690) {
                    car.css("left", "-=0px");
                    car.animate({
                        top: "+=0px"
                    }, 100);
                } else {
                    car.css("left", "+=50px");
                }

            }

            //drive down
        } else if (e.keyCode == 40 || e.keyCode == 83) {
            $(car).attr("src", "assets/images/p1-carDown.png").removeClass("carTurning");
            if (pos.top > 360) {
                $(car).attr("data", "south").attr("src", "assets/images/p1-carDown.png").addClass("carUpDown");
                car.css("top", "+=0px");
            } else if ($(car).attr("data") === "east") {
                $(car).removeAttr("data", "east").attr("data", "south");
                if (counter === 10 && pos.left > 715) {
                    car.animate({
                        left: "+=0px"
                    }, 100);
                    $(car).attr("src", "assets/images/p1-car-turning-ES.png").addClass("carTurning");
                } else {
                    car.animate({
                        left: "+=20px"
                    }, 100);
                    $(car).attr("src", "assets/images/p1-car-turning-ES.png").addClass("carTurning");
                }
            } else if ($(car).attr("data") === "west") {
                $(car).removeAttr("data", "west").attr("data", "south");
                if (counter === 0 && pos.left < 40) {
                    car.animate({
                        left: "-=0px"
                    }, 100);
                    $(car).attr("src", "assets/images/p1-car-turning-WS.png").addClass("carTurning");
                } else {
                    car.animate({
                        left: "-=20px"
                    }, 100);
                    $(car).attr("src", "assets/images/p1-car-turning-WS.png").addClass("carTurning");
                }
            } else {
                $(car).attr("data", "south").attr("src", "assets/images/p1-carDown.png").addClass("carUpDown").removeClass("carTurning");
                car.css("top", "+=20px");
            }
        }
    }




})


           