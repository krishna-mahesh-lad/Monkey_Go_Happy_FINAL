//creating the global variables
var player, playerAnimation, jungle, jungleImg, ground;
var stoneImg, bananaImg;
var gameOver, gameOverImg, restart, restartimg;
var bananaGroup, obstaclesGroup;
var score = 0;

function preload() {
  //global animation
  jungleImg = loadImage("jungle.jpg");
  playerAnimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")

  //function animation
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 300);

  //creating the background
  jungle = createSprite(300, 100, 20, 20);
  jungle.addImage(jungleImg);
  jungle.scale = 1;

  //creating the sprites
  player = createSprite(100, 240, 20, 20);
  player.addAnimation("running", playerAnimation);
  player.scale = 0.10;

  ground = createSprite(300, 270, 600, 5);
  ground.visible = false;

  //creating the groups
  foodGroup = new Group();
  obstaclesGroup = new Group();

}

function draw() {
  background(255);

  //moving background
  jungle.velocityX = -2;
  if (jungle.x < 100) {
    jungle.x = jungle.width / 2;
  }

  if (foodGroup.isTouching(player)) {
    foodGroup.destroyEach();
    score = score + 2;
  }

  switch (score) {
    case 10: player.scale = 0.12;
            break;
    case 20: player.scale = 0.14;
            break;
    case 30: player.scale = 0.16;
            break;
    case 40: player.scale = 0.18;
            break;
    default: break;
  }

  //monkey jumping
  if(keyDown("space") ) {
    player.velocityY = -12;
  }

  //adding gravity
  player.velocityY = player.velocityY + 0.8;

  //preventing the monkey from falling down
  player.collide(ground);

  //calling the functions
  spawnFood();
  spawnObstacles();

  drawSprites();

  //text style & text
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE: "+ score, 450,50);
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    //creating the bananas
    var banana = createSprite(610, 250, 40, 10);
    banana.y = random(100, 200);
    //adding image
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 300;

    //monkey over banana
    player.depth = banana.depth + 1;

    //adding each banana to the food group
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var stone = createSprite(610, 270, 10, 40);
    stone.velocityX = -5;
    stone.addImage(stoneImg);

    //scale and lifetime    
    stone.scale = 0.1;
    stone.lifetime = 150;

    //adding each stone to the obstacles group
    obstaclesGroup.add(stone);
  }
}