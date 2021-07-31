//particles array as global variable callout
var particles = [];

// ground images and sprite variable declaration
var ground, groundBeginImg, groundSwampImg, groundDungImg, invisGround;

//image appliant variables
var flora1, flora2, flora3, flora4, flora5;
var willow1, willow2, willow3, willow4, willow5, willow6;
var light1, light2, light3, light4;
var coinImg;
var bladeAnimation, thornImg, stalactiteImg;

//animation applicant variable(s)
var trapAnimation;

//spawn generation group variables
var floraSpawner, willowSpawner, lightSpawner, bladeSpawner, thornSpawner, stalactiteSpawner, trapSpawner, coinSpawner;

// background images and sprite variable declaration
var beginBG, swampBG, dungBG;

//score variable declaration
let score = 15001; 
let level = 0;

//player and player animation declaration
var player;
var playerRun;
var playerAttack;
var playerDie;

//button variables
var playbtn, playbtnimg;
var restartbtn, restartbtnimg;
var gameover, gameoverimg;








function preload(){
//button images
    playbtnimg = loadImage("playbutton.png");
    gameoverimg = loadImage("gameover.png");
    restartbtnimg = loadImage("restart.png");

//player animations
    playerAttack = loadAnimation("player/attack(1).png", "player/attack(2).png", "player/attack(3).png", "player/attack(4).png", "player/attack(5).png", "player/attack(6).png", "player/attack(7).png", "player/attack(8).png", "player/attack(9).png", "player/attack(10).png");
    playerAttack.looping = false;

    playerRun = loadAnimation("player/run(1).png", "player/run(2).png", "player/run(3).png", "player/run(4).png", "player/run(5).png", "player/run(6).png", "player/run(7).png", "player/run(8).png", "player/run(9).png", "player/run(10).png");

    playerDie = loadAnimation("player/die(1).png", "player/die(2).png", "player/die(3).png", "player/die(4).png", "player/die(5).png", "player/die(6).png", "player/die(7).png", "player/die(8).png", "player/die(9).png", "player/die(10).png");
    playerDie.looping = false;


//coin png
    coinImg = loadImage("coin.png");
// ground pngs
    groundBeginImg = loadImage("beginFloor.png");
    groundSwampImg = loadImage("swampFloor.png");
    groundDungImg = loadImage("dungFloor.png");

// background pngs
    beginBG = loadImage("beginBG.png");
    swampBG = loadImage("swampBG.png");
    dungBG = loadImage("dungBG.png");

// flora pngs (level 1)
    flora1 = loadImage("beginFlower(1).png");
    flora2 = loadImage("beginFlower(2).png");
    flora3 = loadImage("beginFlower(3).png");
    flora4 = loadImage("beginTree(1).png");
    flora5 = loadImage("beginTree(2).png");
    flora6 = loadImage("beginSign.png");
    //Yes I know the sign is not a part of flora, I know that the first and last digits passed in the random function are rarer compared to the ones in the middle so i figured waypoint signs would definitely go there. 

//swamp trees & willows pngs
    willow1 = loadImage("swampTree(1).png");
    willow2 = loadImage("swampTree(2).png");
    willow3 = loadImage("swampTree(3).png");
    willow4 = loadImage("swampWillow(1).png");
    willow5 = loadImage("swampWillow(2).png");
    willow6 = loadImage("swampWillow(3).png");

//light pngs
    light1 = loadAnimation("dungLight(1).png", "dungLight(2).png", "dungLight(3).png", "dungLight(2).png", "dungLight(1).png");
    light2 = loadImage("dungSign.png") // I know I'm doing it again, OK?!

//blade animation
    bladeAnimation = loadAnimation("beginBlade(1).png", "beginBlade(2).png", "beginBlade(3).png", "beginBlade(4).png");

//thorns png
    thornImg = loadImage("thorns.png");

//stalactite png
    stalactiteImg = loadImage("stalactite.png");

//trap animation
    trapAnimation = loadAnimation("dungTrap(1).png", "dungTrap(2).png", "dungTrap(3).png", "dungTrap(4).png", "dungTrap(5).png");
    trapAnimation.looping = false;
}








function setup(){
// canvas stuff
    createCanvas(windowWidth, windowHeight);

// basic ground mechanics
    ground = createSprite(width/2, height - 20, width, 50);
    ground.addImage("beginground", groundBeginImg);
    ground.addImage("swampground", groundSwampImg);
    ground.addImage("dungeonground", groundDungImg);
    invisGround = createSprite(width/2, height - 30, width, ground.height + 10);
    invisGround.visible = false;

//group declaration
    floraSpawner = new Group();
    willowSpawner = new Group();
    lightSpawner = new Group();
    bladeSpawner = new Group();
    thornSpawner = new Group();
    trapSpawner = new Group();
    stalactiteSpawner = new Group();
    coinSpawner = new Group();



//button stuff
    playbtn = createSprite(width / 2,height - 50,150,50);
    playbtn.addImage("playbuttonimage", playbtnimg);
    playbtn.scale = 0.5;
    playbtn.visible = false;

    restartbtn = createSprite(width / 2, height - 250, 250, 50);
    restartbtn.addImage("restartimage", restartbtnimg);
    restartbtn.scale = 0.75;
    restartbtn.visible = false;

    gameover = createSprite(width / 2, height / 2, 275, 75);
    gameover.addImage("gameoverimage", gameoverimg);
    gameover.scale = 0.75;
    gameover.visible = false;

    
    
//player config
    player = createSprite(150, height - 250, 100, 175);
    player.addAnimation("run", playerRun);
    player.addAnimation("attack", playerAttack);
    player.addAnimation("die", playerDie);
    player.changeAnimation("run");
    player.scale = 0.25;
    player.setCollider("rectangle", 5 , -10, 300, 470);

}








function draw(){
// default background
    background(0, 0, 0);

// background and level change negotiation

    //starting screen
    if(score == 15001){
        level = 0;
    }

    //level 1
    if (score <= 1500){
        background(beginBG);
        invisGround.height = 50;
        level = 1;
    }
    //level 2
    if (score <= 7500 && score >= 1500){
        background(swampBG);
        level = 2;
    }
    //level 3
    if (score <= 15000 && score >= 7500){
        background(dungBG);
        level = 3;
    }


    //setup screen
    if(score == 16001){
        level = 4;
    }

    
    if (score == 17001){
        level = 5;
    }

// score controls
    textSize(20);
    fill(0, 0, 0);
    stroke(255, 255, 255);
    text("Score: " + score, windowWidth - windowWidth + 20, windowHeight - windowHeight + 50);
    text("Level: " + level, windowWidth / 2, windowHeight - windowHeight + 50);

    
// ground postition controls

    invisGround.immovable = true;

    if (ground.position.x < 75){
        ground.position.x = width/2 + 75;
    }

    //startup screen
    if(level == 0){ 
        ground.velocity.x = 0;
        ground.visible = false;
        player.visible = false;
        score = 15001;

        fire();

        playbtn.visible = true;

        playbtn.onMouseReleased = function(){
            score = 16001;
            playbtn.visible = false;
            ground.visible = true;
            player.visible = true;
        }

    }

    if (level == 1){
        beginStuff();
    }

    if(level == 2){  
        swampStuff();
    }
    
    if(level == 3){
        dungStuff();
    }

    //setup screen
    if (level == 4){
        score = 16001;
        playbtn.visible = true;
        player.visible = false;
        ground.visible = false;

        playbtn.onMouseReleased = function(){
            score = 0;
            playbtn.visible = false;
            ground.visible = true;
            player.visible = true;
        }
    }

    //failure screen
    if(level == 5){
        score = 17001;
        gameover.visible = true;
        restartbtn.visible = true;
        ground.visible = false;

        restartbtn.onMouseReleased = function(){
            score = 0;
            restartbtn.visible = false;
            gameover.visible = false;
            ground.visible = true;
            player.visible = true;
            player.changeAnimation("run");
        }
    }


    score = score + Math.round(getFrameRate()/90);


//player stuff
    player.collide(invisGround);
    player.depth = player.depth + 1;
    player.velocity.y = 4; 


    if(keyWentDown("87") && player.position.y <= 125){
        player.velocity.y = -20;
    }
    

    
    if(player.overlap(bladeSpawner) || player.overlap(thornSpawner) || player.overlap(stalactiteSpawner) || player.overlap(trapSpawner)){
        dead();
    }


// sprite drawing engine starup
    drawSprites();
}