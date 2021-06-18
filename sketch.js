//variables
var bg,bgImg;
var player,playerImg;
var ground;
var healthy,healthyImg;
var junk,junkImg;
var gameState="start";
var score=0;
var life=3;
var target=500;
var healthyGroup;
var junkGroup;
var healthyArray=[]
var start,startImg;
var playButton,playButtonImg;

function preload(){
    bgImg=loadImage("bg.png");
    startImg=loadImage("startbg.png");
    playButtonImg=loadImage("play.png");
}

function setup() {
  createCanvas(1000,600);

  bg=createSprite(500,150,1000,600);
  bg.velocityX=-7;
  bg.addImage(bgImg);
  bg.scale=0.29;

  start=createSprite(500,300,1000,600);
  start.addImage(startImg);
  start.scale=1.2;

  playButton=createSprite(540,470,1000,600);
  playButton.addImage(playButtonImg);
  playButton.scale=0.3;

  ground=createSprite(500,550,1000,10);
  ground.shapeColor="green";

  player=createSprite(100,500,10,40);
  player.shapeColor="blue";

  healthyGroup=new Group();
  junkGroup=new Group();
}

function draw() {
  background(0);
  drawSprites();


   if(gameState==="start"){
      bg.visible=false;
      ground.visible=false;
      player.visible=false;
      start.visible=true;
      playButton.visible=true;

      if(mousePressedOver(playButton)){
         gameState="play";
      }
   }

  if(gameState==="play"){

   bg.visible=true;
   ground.visible=true;
   player.visible=true;
   start.visible=false;
   playButton.visible=false;

   
  textSize(30);
  fill("black");
  text("SCORE "+score,800,50);

  if(bg.x<0){
      bg.x=500;
  }

  if(keyDown(UP_ARROW)){
     player.velocityY=-10;
  }
     player.velocityY=player.velocityY+0.5;
     player.collide(ground);

     var num=Math.round(random(1,2));
     if(num===1){
        spawnHealthyFood();
     }

     if(num===2){
        spawnJunkFood();
     }

     if(player.isTouching(junkGroup)){
        gameState="end";
     }

     for(var i=0; i<healthyArray.length; i=i+1){
        
     if(player.isTouching(healthyGroup)){
      healthyArray[i].destroy();
      score=score+10;
   }
     }
    }

    else if(gameState==="end"){

      bg.velocityX=0;
      player.velocityY=0;
      healthyGroup.setVelocityXEach(0);
      junkGroup.setVelocityXEach(0);
      
       textSize(100);
       fill("red");
       text("GAME OVER",250,250);
    }
}

function spawnHealthyFood(){
  if(frameCount%150===0){
     healthy=createSprite(1000,520,20,50);
     healthy.shapeColor="green";
     healthy.velocityX=-5;
     healthy.lifeTime=250;
     healthyGroup.add(healthy);
     healthyArray.push(healthy);
  }
}

function spawnJunkFood(){
  if(frameCount%150===0){
     junk=createSprite(1000,520,20,50);
     junk.shapeColor="red";
     junk.velocityX=-5;
     junk.lifeTime=250;
     junkGroup.add(junk);
  }
}