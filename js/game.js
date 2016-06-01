
var containerWidth = document.getElementById('game').offsetWidth;
var containerHeight = document.getElementById('game').offsetHeight;
var game = new Phaser.Game(document.getElementById('game').offsetWidth -4, document.getElementById('game').offsetHeight -4, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });


var mouseSpring;
var line;
var drawLine = false;
var balls = [];
var yellowGroup;

var yellowColGroup;
var playerColGroup;

var timer;
var interval;
var speed = 1600;

function preload() {
    game.load.image('block', 'assets/block.png');
    game.load.image('circle', 'assets/circle.png');
    game.load.image('bg', 'assets/bg.png');
    game.load.spritesheet('yellow', 'assets/yellow-ball.png', 32, 31, 8);
}

function create() {
    game.input.addMoveCallback(move, this);
    
    timer = game.time.create();
    timer.loop(Math.random() * speed, launchTime, this);
    timer.start();
    var bg = game.add.sprite(0, 0, 'bg');
    bg.width = game.width;
    bg.height = game.height;
    
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 10;
    
    yellowColGroup = game.physics.p2.createCollisionGroup();
    playerColGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    
    
    
    b = game.add.sprite(400, 700, 'block');
    b.width = 25;
    b.height = 25;
    
    handle = game.add.sprite(400, 700, 'circle');
    handle.width = 8;
    handle.height = 8;
    game.physics.p2.enable(handle, true);
    handle.body.static=true;
    handle.body.setCircle(10);
    handle.body.data.shapes[0].sensor = true;
    
    
    
    yellowGroup = game.add.group();
    yellowGroup.enableBody = true;
    yellowGroup.physicsBodyType = Phaser.Physics.P2JS
    
    createYellowBall(balls);
    createYellowBall(balls);
    
    game.physics.p2.enable(b, false);
    b.body.damping = 0.95;
    
    mouseSpring = game.physics.p2.createSpring(handle.body, b.body, 50, 250, 10);
    mouseSpring.restLength = 250;
    
    b.body.setCollisionGroup(playerColGroup);
    b.body.collides(yellowColGroup, hitYellow, this);
    
    b.body.onBeginContact.add(hitYellow, this);
    
}

function hitYellow(body1, body2) {
    if (body1 && body1.sprite.key == "yellow") {
        body1.sprite.play('explode', 15, false);
        body1.sprite.animations.currentAnim.onComplete.add(function () {	body1.sprite.kill(); }, this);
        body1.velocity.x = 0;
        body1.velocity.y = 0;
        body1.static = true;
    }
}

function move(pointer, x, y, isDown) {

    handle.body.x = x;
    handle.body.y = y;

}

function preRender() {
        line.setTo(b.x, b.y, handle.x, handle.y);
}
function update() { 
    
}

var resizeGame = function() {
    console.log("RESIZE");   
    game.width = document.getElementById('game-container').offsetWidth - 4;
    game.height = document.getElementById('game-container').offsetHeight - 4;
}

function createYellowBall(balls) {
    var ball = yellowGroup.create(2, Math.random() * 250, 'yellow');
    ball.animations.add('explode');
    ball.body.setCircle(12);
    ball.body.velocity.x = Math.random() * 180 + 220;
    ball.body.velocity.y = Math.random() * -40 - 10;
    ball.body.gravity = 1 + Math.random() * 6;
    
    ball.body.setCollisionGroup(yellowColGroup);
    ball.body.collides([yellowColGroup, playerColGroup], hitYellow, this);
}

function launchTime() {
    createYellowBall(balls); 
}

/**
var Portfolio = function() {
    this.author = "Maurice Nowicki"
    this.type = Type.WEBSITE;
    this.projects = [];
    
    for (var i = 0; i < source.size(); i++) {
        var project = new Project();
        project.name = source.data[i].name;
        project.platform = source.data[i].platform;
        project.date = source.data[i].date;
        project.description = source.data[i].description;
        project.tags = source.data[i].tags;
        for (var j = 0; j < project.tags.size(); j++) {
            if (project.tags[j] == "old") 
                project = null;
            
        }
        if (project)
            projects.push(project);
    }
    
    createPortfolio(projects);
}
**/



















