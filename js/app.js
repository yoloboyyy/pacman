(function() {
  //WORLD
  var world = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [
      0,
      9,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      0
    ],
    [0, 10, 1, 0, 0, 0, 0, 0, 6, 10, 5, 10, 8, 0, 0, 0, 0, 0, 2, 10, 0],
    [
      0,
      10,
      0,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      0,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      0,
      10,
      0
    ],
    [0, 10, 0, 11, 8, 0, 0, 0, 6, 10, 0, 10, 8, 0, 0, 0, 6, 11, 0, 10, 0],
    [
      0,
      10,
      0,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      0,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      0,
      10,
      0
    ],
    [0, 10, 4, 0, 0, 0, 0, 0, 6, 10, 0, 10, 8, 0, 0, 0, 0, 0, 3, 10, 0],
    [
      0,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      0,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      0
    ],
    [0, 10, 1, 0, 0, 0, 0, 0, 6, 10, 0, 10, 8, 0, 0, 0, 0, 0, 2, 10, 0],
    [
      0,
      10,
      0,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      0,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      0,
      10,
      0
    ],
    [0, 10, 0, 11, 8, 0, 0, 0, 6, 10, 0, 10, 8, 0, 0, 0, 6, 11, 0, 10, 0],
    [
      0,
      10,
      0,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      0,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      0,
      10,
      0
    ],
    [0, 10, 4, 0, 0, 0, 0, 0, 6, 10, 7, 10, 8, 0, 0, 0, 0, 0, 3, 10, 0],
    [
      0,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      0
    ],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3]
  ];

  var LEFT = 0,
    RIGHT = 1,
    UP = 2,
    DOWN = 3;

  var currentTime = 0;


  var curMovement = -1;
  
  //PACMAN
  var pacman = {
    x: 1,
    y: 1
  };

  var ghost = {
    x: 19,
    y: 13
  };

  //SCORE
  var score = 0;

  

  //DISPLAY WORLD
  function displayWorld() {
    var output = "";
    for (var i = 0; i < world.length; i++) {
      output += "\n<div class='row'>\n";
      for (var j = 0; j < world[i].length; j++) {
        //            BRICKS
        if (world[i][j] == 0) output += "<div class='brick'></div>";
        else if (world[i][j] == 1)
          output += "<div class='brick lefttop'></div>";
        else if (world[i][j] == 2)
          output += "<div class='brick righttop'></div>";
        else if (world[i][j] == 3)
          output += "<div class='brick rightbottom'></div>";
        else if (world[i][j] == 4)
          output += "<div class='brick leftbottom'></div>";
        else if (world[i][j] == 5) output += "<div class='brick top'></div>";
        else if (world[i][j] == 6) output += "<div class='brick right'></div>";
        else if (world[i][j] == 7) output += "<div class='brick bottom'></div>";
        else if (world[i][j] == 8) output += "<div class='brick left'></div>";
        //            DYNAMIC CONTENT
        else if (world[i][j] == 9) output += "<div class='empty'></div>";
        else if (world[i][j] == 10) output += "<div class='coin'></div>";
        else if (world[i][j] == 11) output += "<div class='cherries'></div>";
      }
      output += "\n</div>";
    }
    $("#world").html(output);
  }

  //DISPLAY PACMAN
  function displayPacman() {
    document.getElementById("pacman").style.left = pacman.x * 20 + "px";
    document.getElementById("pacman").style.top = pacman.y * 20 + "px";
  }
  //DISPLAY GHOST
  function displayGhost() {
    document.getElementById("ghost").style.left = ghost.x * 20 + "px";
    document.getElementById("ghost").style.top = ghost.y * 20 + "px";
  }

  //DISPLAY SCORE
  function displayScore() {
    document.getElementById("score").innerHTML = `Your score: ${score}`;
  }

  function drawTimer() {
    interval = setInterval(() => { 
      document.getElementById("time").innerHTML = `Time: ${currentTime} seconds`;
      currentTime += 1;
     }, 1000);
  }

  function goDown(possibility) {
    if (
      world[pacman.y - 1][pacman.x] == 9 ||
      world[pacman.y - 1][pacman.x] == 10 ||
      world[pacman.y - 1][pacman.x] == 11
    ) {
      if (possibility) return true;
      $("#pacman").removeClass("right");
      $("#pacman").removeClass("up");
      $("#pacman").removeClass("left");
      $("#pacman").addClass("down");
      pacman.y--;
    }
    return false;
  }

  function goUp(possibility) {
    if (
      world[pacman.y + 1][pacman.x] == 9 ||
      world[pacman.y + 1][pacman.x] == 10 ||
      world[pacman.y + 1][pacman.x] == 11
    ) {
      if (possibility) return true;
      $("#pacman").removeClass("right");
      $("#pacman").removeClass("left");
      $("#pacman").removeClass("down");
      $("#pacman").addClass("up");
      pacman.y++;
    }
    return false;
  }
  function goLeft(possibility) {
    if (
      world[pacman.y][pacman.x - 1] == 9 ||
      world[pacman.y][pacman.x - 1] == 10 ||
      world[pacman.y][pacman.x - 1] == 11
    ) {
      if (possibility) return true;
      $("#pacman").removeClass("right");
      $("#pacman").removeClass("up");
      $("#pacman").removeClass("down");
      $("#pacman").addClass("left");
      pacman.x--;
    }
    return false;
  }
  function goRight(possibility) {
    if (
      world[pacman.y][pacman.x + 1] == 9 ||
      world[pacman.y][pacman.x + 1] == 10 ||
      world[pacman.y][pacman.x + 1] == 11
    ) {
      if (possibility) return true;
      $("#pacman").removeClass("left");
      $("#pacman").removeClass("up");
      $("#pacman").removeClass("down");
      $("#pacman").addClass("right");
      pacman.x++;
    }
    return false;
  }

  function move() {
    switch (curMovement) {
      case LEFT:
        goLeft();
        break;
      case RIGHT:
        goRight();
        break;
      case DOWN:
        goDown();
        break;
      case UP:
        goUp();
        break;
    }
    setTimeout(function() {
      if (world[pacman.y][pacman.x] == 10) {
        world[pacman.y][pacman.x] = 9;
        score += 10;
        displayWorld();
        displayScore();
      }
      //PACMAN SCORING CHERRIES
      if (world[pacman.y][pacman.x] == 11) {
        world[pacman.y][pacman.x] = 9;
        score += 50;
        displayWorld();
        displayScore();
      }
      displayPacman();
      checkend();
    }, 200);
  }

  //PACMAN MOVEMENT
  document.onkeydown = function(e) {
    e.preventDefault();
    //LEFT
    if (e.keyCode == 37) {
      if (goLeft(true)) curMovement = LEFT;
    }
    //RIGHT
    else if (e.keyCode == 39) {
      if (goRight(true)) curMovement = RIGHT;
    }
    //DOWN
    else if (e.keyCode == 38) {
      if (goDown(true)) curMovement = DOWN;
    }
    //UP
    else if (e.keyCode == 40) {
      if (goUp(true)) curMovement = UP;
    }
    //PACMAN SCORING COINS
  };

  

  
    

  $("#btn-up").click(function (){
    if (goUp(true)) curMovement = UP;
  })
  $("#btn-right").click(function (){
    if (goRight(true)) curMovement = RIGHT;
  })
  $("#btn-down").click(function (){
    if (goDown(true)) curMovement = DOWN;
  })
  $("#btn-left").click(function (){
    if (goLeft(true)) curMovement = LEFT;
  })
  


  //GHOST MOVEMENT
  function getRandom() {
    var random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    return random;
  }

  var currentDirection = 1;

  function ghostMove() {
    var newDirection = getRandom();

    //Left Right New Direction
    if (
      //If it's going right or left and up or down is available
      ((currentDirection == 1 || currentDirection == 2) &&
        (world[ghost.y + 1][ghost.x] == 9 ||
          world[ghost.y + 1][ghost.x] == 10 ||
          world[ghost.y + 1][ghost.x] == 11 ||
          world[ghost.y + 1][ghost.x] == 12 ||
          world[ghost.y - 1][ghost.x] == 9 ||
          world[ghost.y - 1][ghost.x] == 10 ||
          world[ghost.y - 1][ghost.x] == 11 ||
          world[ghost.y - 1][ghost.x] == 12)) ||
      //Or if it's going up or down and left or right is available
      ((currentDirection == 3 || currentDirection == 4) &&
        (world[ghost.y][ghost.x + 1] == 9 ||
          world[ghost.y][ghost.x + 1] == 10 ||
          world[ghost.y][ghost.x + 1] == 11 ||
          world[ghost.y][ghost.x + 1] == 12 ||
          world[ghost.y][ghost.x - 1] == 9 ||
          world[ghost.y][ghost.x - 1] == 10 ||
          world[ghost.y][ghost.x - 1] == 11 ||
          world[ghost.y][ghost.x - 1] == 12))
    ) {
      //Check to make sure it won't change direction to it's current direction
      while (newDirection == currentDirection) {
        newDirection = getRandom();
      }
      //Change direction to a new direction
      currentDirection = newDirection;
    }

    if (
      currentDirection == 1 &&
      (world[ghost.y][ghost.x - 1] == 9 ||
        world[ghost.y][ghost.x - 1] == 10 ||
        world[ghost.y][ghost.x - 1] == 11 ||
        world[ghost.y][ghost.x - 1] == 12)
    ) {
      ghost.x--;
      //        console.log("move left")
    } else if (
      currentDirection == 2 &&
      (world[ghost.y][ghost.x + 1] == 9 ||
        world[ghost.y][ghost.x + 1] == 10 ||
        world[ghost.y][ghost.x + 1] == 11 ||
        world[ghost.y][ghost.x + 1] == 12)
    ) {
      //        console.log("move right")
      ghost.x++;
    } else if (
      currentDirection == 3 &&
      (world[ghost.y - 1][ghost.x] == 9 ||
        world[ghost.y - 1][ghost.x] == 10 ||
        world[ghost.y - 1][ghost.x] == 11 ||
        world[ghost.y - 1][ghost.x] == 12)
    ) {
      //        console.log("move up")
      ghost.y--;
    } else if (
      currentDirection == 4 &&
      (world[ghost.y + 1][ghost.x] == 9 ||
        world[ghost.y + 1][ghost.x] == 10 ||
        world[ghost.y + 1][ghost.x] == 11 ||
        world[ghost.y + 1][ghost.x] == 12)
    ) {
      //        console.log("move down")
      ghost.y++;
    }
    displayGhost();
  }

  //GHOST REFRESH
  setInterval(ghostMove, 500);
  setInterval(move, 200);
  //CHECK FOR GAME END
  function checkend() {
    if (pacman.x == ghost.x && pacman.y == ghost.y) {
      $("#gameover").fadeIn();
      clearInterval(interval);
    }
    if (score==1630){
      $("#wingame").fadeIn();
      clearInterval(interval);
    }
  }

  
  $(document).ready(function() {
    displayWorld();
    displayPacman();
    displayGhost();
    displayScore();
    drawTimer();    
  });
})();



