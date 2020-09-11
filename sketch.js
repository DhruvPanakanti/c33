const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var score=0

var gameState = "onSling";

function preload() {
    backgroundImg = loadImage("sprites/bg.png");
    DateT();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){

    background(backgroundImg);
    Engine.update(engine);
    text("score="+score,1000,60);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
     slingshot.attach(bird.body);
     bird.trajectory=[];
     Matter.Body.setPosition(bird.body, {x:200 , y:50});
    }
}
//we made an ne function called DateT in which we said that according to time the backgroungimg will change
 async   function DateT(){
     //fetching the data from the website and wait wntill the data is comletely fectched
        var response=await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
        //format of the data is in jaso -java script object notation format
        var responseJSON=await response.json();
        var dt=responseJSON.datetime;
        //breaking time in different hours, the division is between 1-12 and 13-24
        var hour=dt.slice(11,13);
        //if time is more than 5:00 am and less than 7:00 pm bg image will be shown. If time is more than 7:00pm the second img bg2 will be shown 
        if(hour>=05 && hour<=18){
            bg="sprites/bg.png"
        }
        else {
            bg="sprites/bg2.jpg";

        }
        backgroundImg=loadImage(bg);
    }
