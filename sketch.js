var child, child_running;

var drown, drownImage;

var land, land1, landImage,lord;

var water, waterImage;

var reset, resetImage;

var gameover, gameoverImage;

var target, targetImage;

var PLAY=1;

var END=0;

var gameState=PLAY;

var score;


function preload(){
  
  child_running = loadAnimation("child1.png", "child2.png", "child3.png", "child4.png", "child5.png", "child6.png", "child7.png", "child8.png");
  
  landImage = loadImage("land.png");
  
  waterImage = loadImage("water.png");
  
  resetImage = loadImage("reset.png");
    
  gameoverImage = loadImage("gameover.png");
  
  drownImage = loadImage("drown.png");
  
  targetImage  = loadImage("target.png");
  
}

function setup(){
  
  createCanvas(600,400);
  
  water = createSprite(300,535,3500,800);
  water.addImage(waterImage);
  water.scale = 0.2;
  
  land = createSprite(150,310,250,30);
  land.addImage(landImage);
  land.scale = 0.5;
  
  child = createSprite(50,260,30,70);
  child.addAnimation("running", child_running);
  child.scale = 0.13;
  
  gameover = createSprite(300,180);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.5;
  
  reset = createSprite(380,270);
  reset.addImage(resetImage);
  reset.scale = 0.4;
  
  drown = createSprite(50,350);
  drown.addImage(drownImage);
  drown.scale = 0.03;
  
  score = 0;
  
  landGroup = new Group();
  
  lordGroup = new Group();
  
  targetGroup = new Group();
}

function draw(){
  
  
  background("skyblue");

 if(gameState === PLAY){
   
   land.velocityX  = -2;
  
  water.velocityX = -2;
  
  if(keyDown("space") && child.y >= 160) {
      child.velocityY = -12;
    }
   
  child.velocityY = child.velocityY + 0.5;
  
   if(child.x <15){
    child.x= child.y;
    child.x= child.x+child.width/2;
  }
   
  
  if(water.x <300){
    water.x = water.y;
  }
   
   if(targetGroup.isTouching(child)){
      targetGroup.destroyEach();
      score = score + 1;
    } 
   
   gameover.visible = false;
   
   reset.visible = false;
   
   child.visible = true;
   
   drown.visible = false;
   
    spawnland();
    spawntarget();
   
   if(child.isTouching(water)) {
        gameState = END;
   }
 }
  
  if(gameState === END){
    
    land.velocityX  = 0;
  
    water.velocityX = 0;
    
    landGroup.setVelocityXEach(0);

    landGroup.destroyEach();
    
    lordGroup.setVelocityXEach(0);

    lordGroup.setLifetimeEach(-1);
    
    
    targetGroup.setVelocityXEach(0);

    targetGroup.destroyEach();

    child.destroy();

    drown.visible = true;
    
    gameover.visible = true;
    
    reset.visible = true;
    
    
    
    if(mousePressedOver(reset)) {
      restart();
    }
  }
  child.collide(land);
  child.collide(lordGroup);

  if( child.y-lordGroup.y < child.height/2 + lordGroup.height/2 ){
    child.bounceOff(lordGroup);
}
  
  //child.debug = true;
  //land.debug = true;
  
  land.setCollider("rectangle",0,45,650,70)

  
  drawSprites();
  
  fill("black");
  textSize(25);
  textFont("Stencil")
  text("SCORE : "+ score,240,40);

}


function spawnland() {
  if (frameCount % 170 === 0) {
    land1 = createSprite(580,120,40,10);
    lord= createSprite(580,120,190,10);
    land1.y = Math.round(random(100,300));
    lord.y= land1.y;
    land1.addImage(landImage);
    land1.scale = 0.3;
    land1.velocityX = -2;
    lord.velocityX = -2;
    land1.lifetime = 500;
    landGroup.add(land1);
    lordGroup.add(lord);
    lord.visible = false;
    //land1.debug = true;
    land1.setCollider("rectangle",0,50,650,80)
  }
  
}

function spawntarget() {
  if (frameCount % 100 === 0) {
    target = createSprite(600,120,25,25);
    target.y = Math.round(random(100,300));
    target.addImage(targetImage);
    target.scale = 0.07 ;
    target.velocityX = -2;
    target.lifetime = 500;
    targetGroup.add(target);
    //target.debug = true;
    //target.setCollider("rectangle",0,0,0,0)
  }
  
}

function restart(){
  
  score = 0;
  gameover.visible = false;
  reset.visible = false;
 
  
  land = createSprite(150,310,250,30);
  land.addImage(landImage);
  land.scale = 0.5  ;
  child = createSprite(50,260,30,70);
  child.addAnimation("running", child_running);
  child.scale = 0.13;
  gameState = PLAY;
  console.log(land.x)
}