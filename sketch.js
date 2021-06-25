var ball;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();

    database.ref('ball/position').on("value",readStock,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;

    database.ref('ball/position').set({
        x: ball.x,
        y: ball.y
    })
}

function readStock(data){
    var position = data.val();
    ball.x = position.x;
    ball.y = position.y;   
}

function showError(){
    console.log("There is an error from reading the values from database");
}