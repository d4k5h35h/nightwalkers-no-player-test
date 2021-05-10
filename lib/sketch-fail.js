var player, playerDead, playerRunning, playerSmacked, playerAttack, playerJump;
var gVampGroup, gVampDead, gVampIdle, gVampAttack;
var aVampGroup, aVampDead, aVampIdle, aVampAttack;
var dracula, dracDead, dracWalk, dracSmacked, dracAttack, dracTaunt;
var JUMP, ATTACK, RANGE;
var trapsGroundGroup, thorns, lava;
var trapsAirGroup, projectile, blade;
var floorDecorGroup, Box, flower, tree, torch;
var beginGround, dungGround, swampGround, invisGround;
var beginBG, swampBG, dungBG;
var score;
var GUI = 0, PLAY = 1, WIN = 2, END = 3;
var state = PLAY;
var gameOver, reset;
var GOImg,RImg;

function preload(){
    //game over and reset image preloads
    GOImg = loadImage("gameOver.png");
    RImg = loadImage("restart.png");

    //floor preloads
    beginGround = loadImage("beginFloor.png");
    swampGround = loadImage("swampFloor.png");
    dungGround = loadImage("dungFloor.png");

    //background preloads
    beginBG = loadImage("beginBG.png");
    swampBG = loadImage("swampBG.png");
    dungBG = loadImage("dungBG.png");
    
    //controls animations
    JUMPimg = loadImage("jump.png");
    ATTACKimg = loadImage("punch.png");
    RANGEimg = loadImage("range.png");

    //player animations
    playerRunning = loadAnimation("player/run(1).png","player/run(2).png","player/run(3).png","player/run(4).png","player/run(5).png","player/run(6).png","player/run(7).png","player/run(8).png","player/run(9).png","player/run(10).png");
    
    playerDead = loadAnimation("player/die(1).png","player/die(2).png","player/die(3).png","player/die(4).png","player/die(5).png","player/die(6).png","player/die(7).png","player/die(8).png","player/die(9).png","player/die(10).png");
    
    playerSmacked = loadAnimation("player/hit(1).png","player/hit(2).png","player/hit(3).png","player/hit(4).png","player/hit(5).png","player/hit(6).png","player/hit(7).png","player/hit(8).png","player/hit(9).png","player/hit(10).png");
    
    playerAttack = loadAnimation("player/attack(1).png","player/attack(2).png","player/attack(3).png","player/attack(4).png","player/attack(5).png","player/attack(6).png","player/attack(7).png","player/attack(8).png","player/attack(9).png","player/attack(10).png");
    
    playerJump = loadAnimation("player/jump(1).png","player/jump(2).png","player/jump(3).png","player/jump(4).png","player/jump(5).png","player/jump(6).png","player/jump(7).png","player/jump(8).png","player/jump(9).png","player/jump(10).png");

    //dracula animations
    dracWalk = loadAnimation("dracula/walk(1).png","dracula/walk(2).png","dracula/walk(3).png","dracula/walk(4).png","dracula/walk(5).png","dracula/walk(6).png","dracula/walk(7).png","dracula/walk(8).png","dracula/walk(9).png","dracula/walk(10).png","dracula/walk(11).png","dracula/walk(12).png");
    
    dracDead = loadAnimation("dracula/die(1).png","dracula/die(2).png","dracula/die(3).png","dracula/die(4).png","dracula/die(5).png","dracula/die(6).png","dracula/die(7).png","dracula/die(8).png","dracula/die(9).png","dracula/die(10).png","dracula/die(11).png","dracula/die(12).png","dracula/die(13).png","dracula/die(14).png","dracula/die(15).png");
    
    dracSmacked = loadAnimation("dracula/hurt(1).png","dracula/hurt(2).png","dracula/hurt(3).png","dracula/hurt(4).png","dracula/hurt(5).png","dracula/hurt(6).png","dracula/hurt(7).png","dracula/hurt(8).png","dracula/hurt(9).png","dracula/hurt(10).png","dracula/hurt(11).png","dracula/hurt(12).png");
    
    dracAttack = loadAnimation("dracula/attack(1).png","dracula/attack(2).png","dracula/attack(3).png","dracula/attack(4).png","dracula/attack(5).png","dracula/attack(6).png","dracula/attack(7).png","dracula/attack(8).png","dracula/attack(9).png","dracula/attack(10).png","dracula/attack(11).png","dracula/attack(12).png");
    
    dracTaunt = loadAnimation("dracula/taunt(1).png","dracula/taunt(2).png","dracula/taunt(3).png","dracula/taunt(4).png","dracula/taunt(5).png","dracula/taunt(6).png","dracula/taunt(7).png","dracula/taunt(8).png","dracula/taunt(9).png","dracula/taunt(10).png","dracula/taunt(11).png","dracula/taunt(12).png","dracula/taunt(13).png","dracula/taunt(14).png","dracula/taunt(15).png","dracula/taunt(16).png","dracula/taunt(17).png");


    //gVamp animations
    gVampAttack = loadAnimation("groundVamp/attack(1).png","groundVamp/attack(2).png","groundVamp/attack(3).png","groundVamp/attack(4).png","groundVamp/attack(5).png","groundVamp/attack(6).png","groundVamp/attack(7).png","groundVamp/attack(8).png","groundVamp/attack(9).png","groundVamp/attack(10).png","groundVamp/attack(11).png","groundVamp/attack(12).png");

    gVampDead = loadAnimation("groundVamp/die(1).png","groundVamp/die(2).png","groundVamp/die(3).png","groundVamp/die(4).png","groundVamp/die(5).png","groundVamp/die(6).png","groundVamp/die(7).png","groundVamp/die(8).png","groundVamp/die(9).png","groundVamp/die(10).png","groundVamp/die(11).png","groundVamp/die(12).png","groundVamp/die(13).png","groundVamp/die(14).png","groundVamp/die(15).png");
    
    gVampIdle = loadAnimation("groundVamp/idle(1).png","groundVamp/idle(2).png","groundVamp/idle(3).png","groundVamp/idle(4).png","groundVamp/idle(5).png","groundVamp/idle(6).png","groundVamp/idle(7).png","groundVamp/idle(8).png","groundVamp/idle(9).png","groundVamp/idle(10).png","groundVamp/idle(11).png","groundVamp/idle(12).png");

    //aVamp animations
    aVampAttack = loadAnimation("aeroVamp/attack(1).png","aeroVamp/attack(2).png","aeroVamp/attack(3).png","aeroVamp/attack(4).png","aeroVamp/attack(5).png","aeroVamp/attack(6).png","aeroVamp/attack(7).png","aeroVamp/attack(8).png","aeroVamp/attack(9).png","aeroVamp/attack(10).png","aeroVamp/attack(11).png","aeroVamp/attack(12).png");

    aVampDead = loadAnimation("aeroVamp/die(1).png","aeroVamp/die(2).png","aeroVamp/die(3).png","aeroVamp/die(4).png","aeroVamp/die(5).png","aeroVamp/die(6).png","aeroVamp/die(7).png","aeroVamp/die(8).png","aeroVamp/die(9).png","aeroVamp/die(10).png","aeroVamp/die(11).png","aeroVamp/die(12).png","aeroVamp/die(13).png","aeroVamp/die(14).png","aeroVamp/die(15).png");
    
    aVampIdle = loadAnimation("aeroVamp/idle(1).png","aeroVamp/idle(2).png","aeroVamp/idle(3).png","aeroVamp/idle(4).png","aeroVamp/idle(5).png","aeroVamp/idle(6).png","aeroVamp/idle(7).png","aeroVamp/idle(8).png","aeroVamp/idle(9).png","aeroVamp/idle(10).png","aeroVamp/idle(11).png","aeroVamp/idle(12).png");

}

function setup(){
    //default stabilization and optimization boosts
    p5.disableFriendlyErrors = true;

    //frames per second (fps) declaration
    frameRate(60);

    //canvas / fullscreen declaration
    createCanvas(600, 200);

    //player mechanics and behaviours
    player = createSprite(50, 180, 20, 50);
    player.addAnimation("Prun", playerRunning);
    player.addAnimation("Pdead", playerDead);
    player.addAnimation("Pjump", playerJump);
    player.addAnimation("Pattack", playerAttack);
    player.addAnimation("Phit", playerSmacked);
    player.scale = 0.25;
    player.setCollider("rectangle", 0, 0, 500, 500);


    //game over sprite configurations
    gameOver = createSprite(300, 100, 10, 10)
    gameOver.addImage("over", GOImg);
    gameOver.visible = false;
    
    //restart sprite configurations
    restart = createSprite(350, 100, 0, 10);
    restart.addImage("restart", RImg);
    restart.visible = false;

    //ground mechanics and configuration
    ground = createSprite(200, 180, 400, 20);
    ground.x = ground.width / 2;
    ground.velocityX = -4;
    ground.addImage("beginFloor", beginGround);
    ground.addImage("swampFloor", swampGround);
    ground.addImage("dungFloor", dungGround);
    ground.scale = 0.175;
    
    //invisGround configurations
    invisGround = createSprite(200, 190, 400, 18);
    // invisGround.visible = false;

    //group declaration
    trapsAirGroup = new Group();
    trapsGroundGroup = new Group();
    floorDecorGroup = new Group();

    //starting score declaration
    score = 0;

    //starting state declaration
    state = PLAY;
}

function draw(){
    //default background
    background(255);

    //standard gui stuff
    if(state == GUI){

    }

    //hardcore stuff that happens during gameplay
    if(state == PLAY){
        //score math
        score = score + Math.round(getFrameRate() / 60);
        text("Score: " + score, 500, 50);

        //jump declaration
        if (keyDown("space") && player.position.y >= 161.5) {
            player.velocity.y = -10;
          }

          //gravity declaration
          player.velocity.y = player.velocity.y + 0.6;
      
          //ground repetition
          if (ground.position.x < 0) {
            ground.position.x = ground.width/2;
          }

          //player animation declaration
          if(player.position.y <= 161.5){
              player.changeAnimation("Prun");
          }
          if(player.position.y >= 161.6){
            player.changeAnimation("Pjump");
          }
          
          if(score <= 5000){
              background(beginBG);
              ground.changeImage("beginFloor");
              spawnGVamps();
          }

          if(score >= 5001 && score <= 10000){
              background(swampBG);
              ground.changeImage("swampFloor");
              spawnGVamps();
              spawnAVamps();
          }

          if(score >= 10001){
              background(dungBG);
              ground.changeImage("dungFloor");
              spawnDracula();
          }

        //ground movement declaration
        ground.velocity.x = -10;


    }

    //good stuff that happens when player wins the game
    if(state == WIN){

    }
    
    //sad stuff that happens when player dies
    if(state == END){

    }
    
        //player collision declaration
        player.collide(invisGround);
    drawSprites();
}


function spawnGVamps(){

    //ground Vampire mechanics and behaviours
    var gVamp = createSprite(50, 180, 20, 50);
    gVamp.addAnimation("Gidle", gVampIdle);
    gVamp.addAnimation("Gdead", gVampDead);
    gVamp.addAnimation("Gattack", gVampAttack);
    gVamp.scale = 0.25; 
   // gVampGroup.add(gVamp);
        //gVamp.debug = true;

    
}

function spawnAVamps(){
    //air Vampire mechanics and behaviours
    var aVamp = createSprite(50, 180, 20, 50);
    aVamp.addAnimation("Aidle", aVampIdle);
    aVamp.addAnimation("Adead", aVampDead);
    aVamp.addAnimation("Aattack", aVampAttack);
    aVamp.scale = 0.25;
    //aVamp.debug = true;
}

function spawnDracula(){
    //dracula's mechanics and behaviours
    var dracula = createSprite(50, 180, 20, 50);
    dracula.addAnimation("Drun", dracWalk);
    dracula.addAnimation("Ddead", dracDead);
    dracula.addAnimation("Dattack", dracAttack);
    dracula.addAnimation("Dtaunt", dracTaunt);
    dracula.addAnimation("Dsmacked", dracSmacked);
    dracula.scale = 0.25;
    //dracula.debug = true;
}

function floorDecor(){

}