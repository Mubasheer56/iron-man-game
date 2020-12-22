var PLAY = 1;
var END = 0;
var START = 2;
var gameState = START;

var ironman, ironman_running;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup,obstacle, obstacle1, obstacle2;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var unibeam,unibeamImg;
var redSkull,redSkullImg,redSkullGroup;
var arrow,unibeamImg,unibeamGroup;



function preload(){
  ironman_running = loadAnimation("ironman.png");
  
  groundImage = loadImage("background.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("red skull.png");
  
  obstacle2 = loadImage("hydra soldier.jpg");
  

  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  unibeamImg = loadImage("unibeam.png");
}

function setup() {
  createCanvas(600, 200);

  

  
  ironman = createSprite(50,140,20,50);
  ironman.addAnimation("running", ironman_running);


  ironman.scale = 0.09  ; 
  
  ground = createSprite(200,220,400,100);
  ground.addImage(groundImage);
  ground.x = ground.width /2;
  ground.scale= 1;
  

 
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  redSkullGroup = new Group();
  unibeamGroup = new Group();

  

  
  score = 0;

}

function draw() {      
  
  background("white");

fill("red");
  text("Score: "+ score, 500,50);
  
 if(gameState === START) {
   textSize(25);
   fill("red");
   text ("IRONMAN HYDRA HUNT",200,50);
   text("INSTRUCTIONS",270,120)
   text("press s to start",100,100);
   textSize(10);
   
   text("press up arrow to kill hydra soldiers or you can jump by pressing space",260,150);
   text("for redskull use up arrow to reduse his size and jump over him",260,180);
   if (keyDown("s")){
     gameState = PLAY;
   }
 }
  
  if(gameState === PLAY){

    
    ground.velocityX = -(4 + 3* score/100)
    
    
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")&& ironman.y >= 100) {
        ironman.velocityY = -12;
        jumpSound.play();
    }
    if(keyDown("up")){
      unibeams();
    }
    
    if(redSkullGroup.isTouching( unibeamGroup) ){
     redSkull.scale = 0.1;
      unibeamGroup.destroyEach();
     
    }
    
   
    
    if(obstaclesGroup.isTouching( unibeamGroup)){
      obstaclesGroup.destroyEach();
      unibeamGroup.destroyEach();
    }
    
    ironman.velocityY = ironman.velocityY + 0.8
  
    
    spawnClouds();
    redskulls();
 
    spawnObstacles();
    
 if(obstaclesGroup.isTouching(ironman)||redSkullGroup.isTouching(ironman)){
       
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
      
    
  }
   else if (gameState === END) {
      
     
     
     
     
      ground.velocityX = 0;
      ironman.velocityY = 0
      
     
     
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    redSkullGroup.setLifetimeEach(-1);
     
     
    
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  redSkullGroup.destroyEach();
  unibeamGroup.destroyEach();
     
      textSize(20);
     fill("red")
     text("press R to replay",200,50)
     
     if(keyDown("r")){
       gameState = PLAY;
  
  
 
  
  score = 0;
     }
   }
  
 
 
  ironman.collide(invisibleGround);
  

  drawSprites();
}




function spawnObstacles(){
 if (frameCount % 60 === 0){
    obstacle = createSprite(600,120,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacle2);
   
  
          
    obstacle.scale = 0.1 ;
    obstacle.lifetime = 300;
   obstaclesGroup.add(obstacle)
   
 }
}

function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = ironman.depth;
    ironman.depth = ironman.depth + 1;
    
   
    cloudsGroup.add(cloud);
  }
}

function redskulls(){
  
  if(frameCount%100 === 0){
    redSkull = createSprite(600,165,40,10);
    redSkull.addImage(obstacle1);
    redSkull.scale = 0.3;
    redSkull.velocityX = -(6 +score/100);
    redSkull.lifetime = 300;
    redSkullGroup.add(redSkull);
  }
}

function unibeams(){
  arrow= createSprite(50, 140, 60, 10);
  arrow.addImage(unibeamImg);
  arrow.x = ironman.x;
  arrow.velocityX = 4;
  arrow.lifetime = 100;
  arrow.scale = 0.05;
  unibeamGroup.add(arrow);
   
}


