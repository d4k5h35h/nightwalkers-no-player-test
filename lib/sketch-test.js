// Programmed by d4k5h35h
// Music and sfx by d4k5h35h
// Graphics by d4k5h35h
// Basically i did it all. Thank You.

/*
Level 1 is a walking tutorial as in, the player learns the controls by walking through the level. After reaching certain points in the game they learn a new control.The first control will be the left and right movement buttons. The second control will be jump. The third being the melee attack. The range button will be introduced in level 4.
*/

/*
Level 2 and 3 will be regular gameplay where the player learns to survive on their own.
Level 3 will end in a glorious boss fight with jonah.
*/

/*
Level 4 will be the introduction to the range weapon. this will be used by the player as the player for survival (duh).
*/

/*
Level 5 is also regular gameplay. Level 6 ends in a boss fight with Mavis (Drac's daughter).
*/

/*
Level 7 and 8 is also regular gameplay. Level 9 gives the player a small preview of Dracula's wrath
*/

/*
Level 10 starts and ends with the mega-boss fight. When the player wins they see the cutscene with dracula speaking his last words, then the player goes back home and has a party with his friends... well those who still live.

Then a man with large furry ears appears with a wolf as a small preview for the sequel.
*/

/*
  0.1 = loading screen
  0.2 = menu screen 
  0.3 = story screen
  0.4 = victory screen
  1-10 = game screen
*/

var player,playeranime;
var idle, run, attack, die, hit, jump;
var gravity = 9.614;
var up, left, right, melee, range;
let upimg, leftimg, rightimg, meleeimg, rangeimg;
let button1,bgimg1;
var gameState = 0.1;
var particles = [];
let b1img,b2img,b3img,b4img,b5img;
var music1, sfx1;
var talk = new p5.Speech();

function preload(){
  //images
  b1img = loadImage("buttons/playbutton.png");
  b2img = loadImage("buttons/nextbutton.png");
  b3img = loadImage("buttons/backbutton.png");
  b4img = loadImage("buttons/onbutton.png");
  b5img = loadImage("buttons/offbutton.png");
  bgimg1 = loadImage("grass/png/elements/background.png");
  upimg = loadImage("controls/jump.png");
  leftimg = loadImage("controls/left.png");
  rightimg = loadImage("controls/right.png");
  rangeimg = loadImage("controls/range.png");
  meleeimg = loadImage("controls/punch.png");
  bgimg2 = loadImage("swamp/Background.png");
  bgimg3 = loadImage("dungeon/dungeonbg.png");

  //sounds
  soundFormats('ogg');
  music1 = loadSound('mp3/music/game.ogg', loaded);
  music2 = loadSound('mp3/music/bfight1.ogg', loaded);
  sfx1 = loadSound('mp3/sfx/walk.ogg', loaded);
  sfx2 = loadSound('mp3/sfx/gunshot.ogg', loaded);
  sfx3 = loadSound('mp3/sfx/stab.ogg', loaded);
}

function loaded(){
  console.log("loaded!");
}

function setup(){
  //friendly error disabler
  p5.disableFriendlyErrors = true;

  //fixing of framerates
  frameRate(90);

  //canvas
  createCanvas(windowWidth, windowHeight);

  //player sprite
    player = createSprite(width / 2, height / 2, 50, 50);
    playeranime = player.addAnimation('idle', "player/idle(1).png", "player/idle(2).png", "player/idle(3).png", "player/idle(4).png", "player/idle(5).png", "player/idle(6).png", "player/idle(7).png", "player/idle(8).png", "player/idle(9).png", "player/idle(10).png");
    player.addAnimation('jump', "player/jump(1).png", "player/jump(2).png", "player/jump(3).png", "player/jump(4).png", "player/jump(5).png", "player/jump(6).png", "player/jump(7).png", "player/jump(8).png", "player/jump(9).png", "player/jump(10).png");
    player.addAnimation('run', "player/run(1).png", "player/run(2).png", "player/run(3).png", "player/run(4).png", "player/run(5).png", "player/run(6).png", "player/run(7).png", "player/run(8).png", "player/run(9).png", "player/run(10).png");
    player.addAnimation('hit', "player/hit(1).png", "player/hit(2).png", "player/hit(3).png", "player/hit(4).png", "player/hit(5).png", "player/hit(6).png", "player/hit(7).png", "player/hit(8).png", "player/hit(9).png", "player/hit(10).png");
    player.addAnimation('attack', "player/attack(1).png", "player/attack(2).png", "player/attack(3).png", "player/attack(4).png", "player/attack(5).png", "player/attack(6).png", "player/attack(7).png", "player/attack(8).png", "player/attack(9).png", "player/attack(10).png");

  //control sprites
    up = createSprite(width - 100, height - 125, 100, 100);
    left = createSprite(120, height - 125, 100, 100);
    right = createSprite(320, height - 125, 100, 100);
    melee = createSprite(width - 250, height - 125, 100, 100);
    range = createSprite(width - 100, height - 325, 100, 100);
  //button sprites
    button1 = createSprite(width / 2,height - 50,150,50);
    button2 = createSprite(width / 3,height - 50,150,50);
    button3 = createSprite(width / 1.5,height - 50,150,50);
    button4 = createSprite(width / 2, 150, 100, 50);
    button5 = createSprite(width / 2 + 200, 250, 100, 50);
    button04 = createSprite(width / 2 + 200, 150, 100, 50);
    button05 = createSprite(width / 2, 250, 100, 50);

  //adding images to sprites
    button1.addImage("b1image", b1img);
    button2.addImage("b2image", b2img);
    button3.addImage("b3image", b3img);
    button4.addImage("b4image", b4img);
    button5.addImage("b5image", b5img);
    button04.addImage("b04image", b5img);
    button05.addImage("b05image", b4img)

  //adding images to controls
    up.addImage("upimage", upimg);
    left.addImage("leftimage", leftimg);
    right.addImage("rightimage", rightimg);
    range.addImage("rangeimage", rangeimg);
    melee.addImage("meleeimage", meleeimg);

  //scaling images
    button1.scale = 0.5;
    button2.scale = 0.5;
    button3.scale = 0.5;
    button4.scale = 0.3;
    button5.scale = 0.3;
    button04.scale = 0.3;
    button05.scale = 0.3;
    up.scale = 0.5;
    left.scale = 0.5;
    right.scale = 0.5;
    range.scale = 0.5;
    melee.scale = 0.5;
 }


function draw(){

  //default background colour
  background(0);

  //audio stuff
  sfx1.playMode('restart');
  sfx2.playMode('restart');
  sfx3.playMode('restart');
  music1.playMode('restart');
  music2.playMode('restart');

  //basic attributes
    //d   
    if(keyIsDown(68)){
      player.position.x = player.position.x + 5;
      player.changeAnimation('run');
      player.mirrorX(1);
      }
      
      if(keyIsDown(87)){
        player.position.y = player.position.y - gravity * 2;
        player.changeAnimation('jump');
      } 
      
      if(keyIsDown(65)){
        player.position.x = player.position.x - 5;
        player.changeAnimation('run');
        player.mirrorX(-1);
      }
      else{
        player.changeAnimation('idle');
        player.mirrorX(1);
      }

  //disabling button visibility
  button1.visible = false;
  button2.visible = false;
  button3.visible = false;
  button4.visible = false;
  button5.visible = false;
  button04.visible = false;
  button05.visible = false;


  //loading screen
  if (gameState === 0.1){
  player.visible = false;
  fire();   
    button1.visible = true;
    button1.onMouseReleased = function(){
      gameState = 0.2;
      button1.visible = false;
    }
  }


  //menu screen
  if(gameState == 0.2){
    background(bgimg1);
  player.visible = false;
    button2.visible = true;
      button2.onMouseReleased = function(){
        gameState = 0.3;
        button2.visible = false
    }  
     button3.visible = true;
    button3.onMouseReleased = function(){
      gameState = 0.1;
      button3.visible = false;
    }
    
  /*
    button4 is on button for sfx
    button04 is off button for sfx
    button5 is off button for music
    button05 is on button for music
  */
    button4.visible = true;
    button4.onMouseReleased = function(){
      sfx1.setVolume(1);
      sfx2.setVolume(1);
      sfx3.setVolume(1);
      button4.visible = false;
    }
    
    button04.visible = true;
    button04.onMouseReleased = function(){
      sfx1.setVolume(0);
      sfx2.setVolume(0);
      sfx3.setVolume(0);
      button04.visible = false;
    }

    button5.visible = true;
    button5.onMouseReleased = function(){
      music1.setVolume(0);
      music2.setVolume(0);
      button5.visible = false;
    }

    button05.visible = true;
    button05.onMouseReleased = function(){
      music1.setVolume(1);
      music2.setVolume(1);
      music1.loop();
      button05.visible = false;
    }

    push();
    textSize(50);
    fill(0);
    stroke(255);
    text("SFX - ", 150, 150);
    text("Music - ", 150, 250);
    pop();
  }


  //story screen
  if(gameState == 0.3){ 
    background(0,255,0);
    talk.speak("Hey man, it's been a long time since I last saw ya. I need your help. My family was brutally slaughtered last night 'cause of Count Dracula, the ruler of all vampires. He has control of the entire vampire army. I need your help to defeat him, nah, to END him. I shall avenge my family by un-aliving the count.");
  fill(0);
  stroke(0);
  text(width / 2, height / 2, "Hey man, it's been a long time since I last saw ya. I need your help. My family was brutally slaughtered last night 'cause of Count Dracula, the ruler of all vampires. He has control of the entire vampire army. I need your help to defeat him, nah, to END him. I shall avenge my family by un-aliving the count.");
    player.visible = true;
    button2.visible = true;
    button2.onMouseReleased = function(){
      gameState = 1;
      button2.visible = false
  }  
   button3.visible = true;
  button3.onMouseReleased = function(){
    gameState = 0.2;
    button3.visible = false;
  }
  push();
  translate(width / 3, height / 2);
  player.changeAnimation('idle');
  player.scale = 0.5;
  player.position.x = 50;
  player.position.y = 250;
  noStroke();
  fill(255);
  triangle(120, -240, -120, -75, 100, -75, 90);
  rect(100, -245, 300, 400, 25);
  pop();
  }

  //to stop speech from interrupting in other gamestates
  else if(gameState != 0.3){
    talk.stop();
  }


  //victory screen (only displayed after level 10)
  if(gameState == 0.4){
    background(51);
    button2.visible = true;
      button2.onMouseReleased = function(){
        gameState = 0.5;
        button2.visible = false
    }  
     button3.visible = true;
    button3.onMouseReleased = function(){
      gameState = 0.3;
      button3.visible = false;
    }
  }

  //level 1 code
  if(gameState === 1){
    background(bgimg1);
   player.position.y = player.position.y + gravity;
    player.visible = true;
    up.visible = true;
    melee.visible = true;
    left.visible = true;
    right.visible = true;
    range.visible = false;
    button1.life = 0;
    button2.life = 0;
    button3.life = 0;
  }
  
  // this is so that i dont need to write the same thing again and again
  else if(gameState === 0.1 || gameState === 0.2|| gameState === 0.3|| gameState === 0.4){
  up.visible = false;
  melee.visible = false;
  left.visible = false;
  right.visible = false;
  range.visible = false;
  }
  
  drawSprites();
}


class Particle {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.alpha = 255;
    this.d = random(10, 30);
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 7.75;
  }
  finished() {
    return this.alpha < 0;
  }

  show() {
    noStroke();
    fill(random(180, 250), random(50, 200), 10, this.alpha);
    ellipse(this.x, this.y, this.d, this.d);
  }
}
function fire(){
  for (let i = 0; i < 5; i++) {
      let p = new Particle(width / 20, height / 2, random(5, 15), random(-5, 5));
      particles.push(p);
      let q = new Particle(width / 1.05, height / 2, random(-5, -15), random(5, -5));
      particles.push(q);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].show();
      if (particles[i].finished()) {
        particles.splice(i, 1);
      }
    }
  }