var PLAY= 1
var END = 0
var gameState = PLAY
 
var rocket
var mars
var star
var meteor
var rocketImg
var marsImg
var starImg
var meteorImg
var bgspace
var bgspaceImg
var starGrp
var meteorGrp

var score
var restart 
var restartImg

var showtext = true;


function preload(){
rocketImg = loadImage('rocket.png')
marsImg = loadImage('mars.png')
starImg = loadImage('star.png')
meteorImg = loadImage('meteor.png')
bgspaceImg = loadImage('bgspace.jpg')
restartImg = loadImage("restart.png")
jumpSound = loadSound("RocketWoosh.wav")
dieSound = loadSound("GameOver.wav")
checkPointSound = loadSound("checkpoint.mp3")

}

function setup() {
  createCanvas (windowWidth , windowHeight);

  bgspace = createSprite (width/2, height/2) ;
  bgspace.addImage("space", bgspaceImg);
  bgspace.scale = width/500;

  rocket = createSprite(width/2 , 300 , 40 , 20)
  rocket.scale = 0.2;
  rocket.addImage("rocket", rocketImg);
  //rocket.setcollider("circle",0,0,90);

  mars = createSprite (width/2 , height+600 ,40 , 20)
  mars.addImage('mars', marsImg);
  mars.scale = 2;

  meteorGrp = createGroup();

  restart = createSprite (width/2,height/2) ;
  restart.addImage (restartImg);
  restart.visible = false;

  score = 0;
}


function draw() {
background(0)
drawSprites();
if(showtext){
fill("Yellow")
textSize(25);
text ("Distance Covered: "+score, 10 , 50)
}

if (gameState === 1){
   rocket.visible = true;
    restart.visible = false;
    //scoring
    score = score + Math.round(getFrameRate()/60);
   if (score > 0 && score % 1000 == 0){
   checkPointSound.play()
   }

   //moving bgimg
    bgspace.velocityY=2
   if (bgspace.y > 600){
    bgspace.y = height/2
    }

   if(keyDown('space')){
     rocket.velocityY = -7
       jumpSound.play()
      }
   if(keyDown('right_arrow')){
     rocket.x += 2
     jumpSound.play()
     }
   if(keyDown('left_arrow')){
          rocket.x -= 2
          jumpSound.play()
     }   
  
 
  if(rocket.isTouching(meteorGrp)||rocket.isTouching(mars)){
         gameState = 0
         dieSound.play()

   }

    rocket.velocityY = rocket.velocityY+0.5

  }
  else if(gameState === 0){
    showtext = false;
    meteorGrp.setVelocityYEach(0);
    meteorGrp.destroyEach()
    restart.visible = true;
    bgspace.velocityY= 0;
    rocket.velocityY= 0;
    rocket.visible = false;
    textSize(60);
    fill('white')
    text("M I S S I O N  F A I L E D" , width/4,100);
    textSize(50);
    var Km = 162440000 - score;
    fill('yellow')
    text ("You are "+Km+" KM to reach Earth.", width/5,200);

    //text(" To play again click on 'RESET' button.",width/4,270)
  }

  if(mousePressedOver(restart)){
    reset()
  }

    spawnObjects();
  }
  function reset(){
  gameState = 1;
  rocket.visible = true;
  rocket.x = width/2;
  rocket.y = height/2
  rocket.depth = bgspace.depth
  rocket.depth +=1;
  meteorGrp.destroyEach();
  score = 0;
  showtext = true;
  }

function spawnObjects(){
    if(frameCount % 120 === 0){
        meteor = createSprite( Math.round(random(200 , 600)), -1 , 10 , 20)
        meteor.velocityY = 2
        meteor.scale = 0.2
        meteor.addImage('meteor' , meteorImg)
        meteorGrp.add(meteor)
        meteorGrp.Lifetime = Math.round(random(180 , 250))
        meteor.depth = mars.depth
        mars.depth = mars.depth+1
        
    }
  }

