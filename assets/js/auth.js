$(document).ready(function () {
    var userIn = false;

    $("#auth").hide();
    mystery()
    $("#mysteryButt").on("click", function () {
        $("#mysteryButt").remove();

        startPage();

    })

    $(document).on("click", "#play-game", function () {
        $("#game-box").remove();
        $("#auth").show();
    });

    $(document).on("click", "#skip", function () {
        $("#game-box").remove();
        $("#auth").show();

    })

    var config = {
        apiKey: "AIzaSyAW4oe-QFXhUeCMs3WmYzl0EQL_qFqngHE",
        authDomain: "group-project-1-7ad35.firebaseapp.com",
        databaseURL: "https://group-project-1-7ad35.firebaseio.com",
        projectId: "group-project-1-7ad35",
        storageBucket: "group-project-1-7ad35.appspot.com",
        messagingSenderId: "571501272814"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var auth = firebase.auth();

    var ui = new firebaseui.auth.AuthUI(auth);

    ui.start('#firebaseui-auth-container', {
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
    });

    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                return true;
            },
            uiShown: function () {
                document.getElementById('loader').style.display = 'none';
            }
        },
        signInFlow: 'popup',
        signInSuccessUrl: 'index1.html',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        tosUrl: "terms.html",
    };
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

    var rowSkip = $("<div>")
    rowSkip.addClass("row")

    var skipAuth = $("<button>");
    skipAuth.text("Skip");
    skipAuth.addClass("btn btn-danger");
    skipAuth.attr("id", "skip-auth")
    rowSkip.append(skipAuth)


    $("#auth").append(rowSkip)

    $(document).on("click", "#skip-auth", function () {
        window.location = "index1.html";

    })


    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });

    //big nealy invisible question mark to start game
    function mystery() {

        var mystery = $("<button>");
        mystery.addClass("mystery");
        mystery.attr("id", "mysteryButt")
        mystery.text("?");
        $("#mystery").append(mystery);
    }

    //colfax thangs gif and begin button load
    function startPage() {
        var row1 = $("<div>")
        row1.addClass("row");

        var row2 = $("<div>");
        row2.addClass("row")

        var skip = $("<button>");
        skip.addClass("btn btn-danger");
        skip.attr("id", "skip")
        skip.text("Skip")
        row2.append(skip)

        var playGame = $("<button>");
        playGame.attr("id", "play-game");
        playGame.addClass("btn btn-danger");
        playGame.text("Begin?");
      

        var newSound = document.createElement("audio");
        newSound.src = "assets/sounds/theme.mp3";
        newSound.play();

        var openGif = $("<img>");
        openGif.addClass("thangsIntro");
        openGif.attr("src", "assets/images/Colfax Thangs Open.gif");
        row1.append(openGif)

        $("#gif-div").append(row1)
        $("#gif-div").append(row2)

        setTimeout(function () {
            openGif.attr("src", "assets/images/colfax_thangs_static.gif");
            $("#skip").hide();
            $(row2).append(playGame);
        }, 13900);
    }



});