// ground images and sprite variable declaration
var ground, groundBeginImg, groundSwampImg, groundDungImg, invisGround;

//image appliant variables
var flora1, flora2, flora3, flora4, flora5;
var willow1, willow2, willow3, willow4, willow5, willow6;
var light1, light2, light3, light4;
var coinImg;
var bladeImg, thornImg, stalactiteImg, trapImg;

//animation applicant variable(s)
var trapAnimation;

//spawn generation group variables
var floraSpawner, willowSpawner, lightSpawner, bladeSpawner, thornSpawner, stalactiteSpawner, trapSpawner, coinSpawner;

// background images and sprite variable declaration
var beginBG, swampBG, dungBG;

//score variable declaration
var score, level;

//player and player animation declaration
var player;
var playerRun;
var playerJump;
var playerHit;
var playerAttack;
var playerDie;











function preload(){
//player animations
    playerAttack = loadAnimation("player/attack(1).png", "player/attack(2).png", "player/attack(3).png", "player/attack(4).png", "player/attack(5).png", "player/attack(6).png", "player/attack(7).png", "player/attack(8).png", "player/attack(9).png", "player/attack(10).png");

    playerRun = loadAnimation("player/run(1).png", "player/run(2).png", "player/run(3).png", "player/run(4).png", "player/run(5).png", "player/run(6).png", "player/run(7).png", "player/run(8).png", "player/run(9).png", "player/run(10).png");
    
    playerJump = loadAnimation("player/jump(1).png", "player/jump(2).png", "player/jump(3).png", "player/jump(4).png", "player/jump(5).png", "player/jump(6).png", "player/jump(7).png", "player/jump(8).png", "player/jump(9).png", "player/jump(10).png");

    playerHit = loadAnimation("player/hit(1).png", "player/hit(2).png", "player/hit(3).png", "player/hit(4).png", "player/hit(5).png", "player/hit(6).png", "player/hit(7).png", "player/hit(8).png", "player/hit(9).png", "player/hit(10).png");

    playerDie = loadAnimation("player/die(1).png", "player/die(2).png", "player/die(3).png", "player/die(4).png", "player/die(5).png", "player/die(6).png", "player/die(7).png", "player/die(8).png", "player/die(9).png", "player/die(10).png");


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
    light1 = loadImage("dungLight(1).png");
    light2 = loadImage("dungLight(2).png");
    light3 = loadImage("dungLight(3).png");
    light4 = loadImage("dungSign.png") // I know I'm doing it again, OK?!

//blade png
    bladeImg = loadImage("beginBlade.png");

//thorns png
    thornImg = loadImage("thorns.png");

//stalactite png
    stalactiteImg = loadImage("stalactite.png");

//trap image
    trapImg = loadImage("dungTrap(1).png");

//trap animation
    trapAnimation = loadAnimation("dungTrap(1).png", "dungTrap(2).png", "dungTrap(3).png", "dungTrap(4).png", "dungTrap(5).png");
}








function setup(){
// canvas stuff
    createCanvas(windowWidth, windowHeight)
    
// basic ground mechanics
    ground = createSprite(width/2, height - 50, width, 50);
    ground.addImage("beginground", groundBeginImg);
    ground.addImage("swampground", groundSwampImg);
    ground.addImage("dungeonground", groundDungImg);
    invisGround = createSprite(width/2, height - 30, width, 40);
    invisGround.visible = false;

// startup score and level declaration
    score = 0;
    level = 1;

//group declaration
    floraSpawner = new Group();
    willowSpawner = new Group();
    lightSpawner = new Group();
    bladeSpawner = new Group();
    thornSpawner = new Group();
    trapSpawner = new Group();
    stalactiteSpawner = new Group();
    coinSpawner = new Group();
}








function draw(){
// default background
    background(0, 0, 0);

// background and level change negotiation
    if (score <= 1500){
        background(beginBG);
        level = 1;
    }
    if (score <= 7500 && score >= 1500){
        background(swampBG);
        level = 2;
    }
    if (score <= 15000 && score >= 7500){
        background(dungBG);
        level = 3;
    }
    if(score >= 15001){
        level = 4;
    }

// score controls
    textSize(20);
    fill("black");
    stroke("white");
    text("Score: " + score, windowWidth - windowWidth + 20, windowHeight - windowHeight + 50);
    text("Level: " + level, windowWidth / 2, windowHeight - windowHeight + 50);

    score = score + Math.round(getFrameRate()/90);
    
// ground postition controls
    if (ground.position.x < 75){
        ground.position.x = width/2 + 75;
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

    if(level == 4){
        ground.velocity.x = 0;
        ground.visible = false;
        score = 15001;
    }


// sprite drawing engine starup
    drawSprites();
}














function beginDecor(){
//ground in level 1    
    ground.velocity.x = -(3 + 3 * score/500);
    ground.changeImage("beginground");
    ground.scale = 0.375;
//flora generator
if(frameCount % 120 === 0) {
    var flora = createSprite(width,ground.position.y - 275,10,40);
    flora.velocity.x = ground.velocity.x;
    
    //generate random flora
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: flora.addImage(flora1);
              flora.position.y = ground.position.y - 140;
              break;
      case 2: flora.addImage(flora2);
              flora.position.y = ground.position.y - 140;
              break;
      case 3: flora.addImage(flora3);
              flora.position.y = ground.position.y - 129;
              break;
      case 4: flora.addImage(flora4);      
              break;
      case 5: flora.addImage(flora5);
              flora.position.y = ground.position.y - 290;
              break;
      case 6: flora.addImage(flora6);
              flora.position.y = ground.position.y - 198;
              break;
      default: break;
    }
    
    //assign scale and life to the flora           
    flora.scale = 0.5;
    flora.life = 250;
    //add each flora to the group
    floraSpawner.add(flora);
  }
}











function swampDecor(){
//ground in level 2    
    ground.velocity.x = -(2.25 + 2.25 * score/750);
    ground.changeImage("swampground");
    ground.scale = 3;
//willow generator
if(frameCount % 160 === 0) {
    var willow = createSprite(width,ground.position.y - 150,10,40);
    willow.velocity.x = ground.velocity.x;
    
    //generate random willow
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: willow.addImage(willow1);
              break;
      case 2: willow.addImage(willow2);
              break;
      case 3: willow.addImage(willow3);
              break;
      case 4: willow.addImage(willow4);
              break;
      case 5: willow.addImage(willow5);
              break;
      case 6: willow.addImage(willow6);
              break;
      default: break;
    }
    
    //assign scale and life to the willow and trees          
    willow.scale = 1.5;
    willow.life = 250;
    //add each willow and tree to the group
    willowSpawner.add(willow);
  }
}














function dungDecor(){
//ground in level 3
    ground.velocity.x = -(1 + 1 * score/1000);
    ground.changeImage("dungeonground");
    ground.scale = 3;
//light generator
if(frameCount % 240 === 0) {
    var light = createSprite(width,ground.position.y - 150,10,40);
    light.velocity.x = ground.velocity.x;
    
    //generate random light
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: light.addImage(light1);
              break;
      case 2: light.addImage(light2);
              break;
      case 3: light.addImage(light3);
              break;
      case 4: light.addImage(light4);
              break;
      default: break;
    }
    
    //assign scale and life to the light        
    light.scale = 2;
    light.life = 250;
    //add each light to the group
    lightSpawner.add(light);
  }
}













function beginProjectiles(){
//blade spawner
if(frameCount % 550 === 0) {
    var blade = createSprite(width,150,10,40);
    blade.addImage(bladeImg);
    blade.velocity.x = ground.velocity.x;
    blade.scale = 0.5;
    blade.life = 250;
    //add each blade to the group
    bladeSpawner.add(blade);
  }
}

function swampProjectiles(){
//thorn spawner
if(frameCount % 550 === 0) {
    var thorns = createSprite(width,ground.position.y - 50,10,40);
    thorns.addImage(thornImg);
    thorns.velocity.x = ground.velocity.x;
    thorns.scale = 0.5;
    thorns.life = 250;
    //add each thorn to the group
    thornSpawner.add(thorns);
  }
}

function dungProjectiles(){
//stalactite spawner
if(frameCount % 190 === 0) {
    var stalactite = createSprite(width,30,10,40);
    stalactite.addImage(stalactiteImg);
    stalactite.velocity.x = ground.velocity.x;
    stalactite.velocity.y = (1 + 1 * score/1000) * 0.45;
    stalactite.scale = 3;
    stalactite.life = 250;
    //add each stalactite to the group
    stalactiteSpawner.add(stalactite);
  }
//trap spawner
if(frameCount % 370 === 0) {
    var trap = createSprite(width,ground.position.y - 20,10,40);
    // trap.addAnimation("traps", trapAnimation);
    trap.addImage("trapimage", trapImg);
    trap.velocity.x = ground.velocity.x;
    trap.scale = 1.5;
    trap.life = 250;
    //add each trap to the group
    trapSpawner.add(trap);
  }
}






function beginEnemies(){}

function swampEnemies(){}

function dungEnemies(){}




function beginStuff(){
    coins();
    beginDecor();
    beginEnemies();
    beginProjectiles();
}
function swampStuff(){
    coins();
    swampDecor();
    swampEnemies();
    swampProjectiles();    
}
function dungStuff(){
    coins();
    dungDecor();
    dungEnemies();
    dungProjectiles();
}





function coins(){
if(frameCount % 60 === 0) {
    var coin = createSprite(width,height / 3,10,40);
    coin.addImage(coinImg);
    coin.velocity.x = ground.velocity.x;

    //assign scale and life to the coins          
    coin.scale = 1.25;
    coin.life = 250;
    //add each coin to the group
    coinSpawner.add(coin);
  }
}