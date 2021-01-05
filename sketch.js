var runner,runnerImage;
var bg,bgImage;
var ground;
var missile,missileImage,missileGroup;
var drum,drumImage,drumGroup;
var score=0;
var gameState="play";
var restart,restartImage;
var coin,coinImage,coinGroup;
var coins=0;

function preload(){
  runnerImage=loadAnimation("pl1.png","pl2.png","pl3.png","pl4.png","pl5.png","pl6.png");
  
  bgImage=loadImage("background.PNG");
  
  missileImage=loadImage("ob1.png");
  drumImage=loadImage("ob2.png");
  restartImage=loadImage("rs.png");
  coinImage=loadImage("coin.png");
  
}

function setup() {
 createCanvas(550,400);
  
  bg=createSprite(280,230);
  bg.addImage(bgImage);
  bg.scale=2.5;
  bg.velocityX=-18;
  
  
  runner=createSprite(50,340);
  runner.addAnimation("player",runnerImage);
  runner.scale=1.5;
  
  
  ground=createSprite(250,380,500,5);
  ground.visible=false;
  
  missileGroup=new Group();
  drumGroup=new Group();
  coinGroup=new Group();
  
  restart=createSprite(225,200);
  restart.addImage(restartImage);
  restart.visible=false;
  
}

function draw() {
 background("purple");
  
  runner.collide(ground);
 if (gameState==="play"){ 
    coinGroup.visible=true;
   restart.visible=false;
  stroke("yellow");
  fill("yellow");
  textSize(20);
  text("Score: "+score,400,25);
  
   stroke("yellow");
  fill("yellow");
  textSize(20);
  text("Coins: "+coins,200,25);
  
   
  score=score+Math.round(frameCount/100);
   
   if(runner.isTouching(coinGroup)){
     coins=coins+1;
      coinGroup.destroyEach();
   }
  
  if(bg.x<-100){
    bg.x=280;
  }
  
  if(keyDown("space")&&runner.y>290){
    runner.velocityY=-18;
  }
   runner.velocityY=runner.velocityY+0.6;  
   if (drumGroup.isTouching(runner)||missileGroup.isTouching(runner)){
     gameState="end";
     drumGroup.destroyEach();
     missileGroup.destroyEach();
   }
   runner.visible=true;
   bg.visible=true;
   
  
  
  
  
  createMissile();
  createDrum();
  createCoin(); 
 }
 
  if (gameState==="end"){
    restart.visible=true;
     stroke("yellow");
  fill("yellow");
  textSize(20);
  text("Score: "+score,225,100);
    
    stroke("yellow");
  fill("yellow");
  textSize(20);
  text("Coins: "+coins,225,140); 
  
   stroke("red");
  fill("red");
  textSize(20);
  text("You are out ",225,20);  
  bg.visible=false; 
  runner.visible=false;
   
    
  
  if(mousePressedOver(restart)){
    restartAgain();
  }  
  }
  
 drawSprites(); 
}

function createMissile(){
  if(frameCount%380===0){
    missile=createSprite(610,330);
    missile.addImage(missileImage);
    missile.scale=1.5;
    missile.lifetime=65;
    missile.velocityX=-25;
    missileGroup.add(missile);
    if(missileGroup.x<0){
      missileGroup.destroyEach();
    }
  }
}

function createDrum(){
if(frameCount%Math.round(random(80,120))===0){
   drum=createSprite(610,330);
    drum.addImage(drumImage);
    drum.scale=1.5;
    drum.lifetime=70;
    drum.velocityX=-18;
    drumGroup.add(drum);
    if(drumGroup.x<0){
      drumGroup.destroyEach();
    }
  }
}

function  restartAgain(){
  score=0;
  coins=0;
  gameState="play";
  frameCount=0;
  coinGroup.visible=false;
  runner.y=340;
}

function createCoin(){
  if(frameCount%50===0){
    coin=createSprite(610,330);
    coin.addImage(coinImage);
    coin.scale=0.5;
    coin.lifetime=70;
    coin.velocityX=-18;
    if (gameState==="end"){
       coin.visible=false;
    }
    coinGroup.add(coin);
  }
}