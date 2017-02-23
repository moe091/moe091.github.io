var Fishy_input;
var Fishy_gameplay;
var Fishy_HUD;
Fishy.Play = function(game) {
    this.game = game;
    this.enemies = null; //group for all enemy fish, will add functionality to this group
    this.myFish;
    
    this.topleft;
    this.topright;
    this.bottomleft;
    this.bottomright;
    
    this.reef1;
    this.curStage = 0;
    this.stageTime = [];
    this.stageTime.push(7000);
    this.stageTime.push(10000);
    this.nextStageTime = this.game.time.now + this.stagetime[this.curStage];
    
};

Fishy.Play.prototype = {
    
    preload: function() {
        
    },
    
    create: function() {
        this.game.add.sprite(0, 0, 'bg');
        
        this.reef3 = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 30, 'reef3');
        this.reef3.anchor.setTo(0.5, 1);
        
        this.reef2 = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'reef2');
        this.reef2.anchor.setTo(0.5, 1);
        
        this.reef1 = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'reef1');
        this.reef1.anchor.setTo(0.5, 1);
        
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        
        Fishy_input = new Fishy.Input(this.game);
        Fishy_gameplay = new Fishy.Gameplay(this.game, this.enemies);
        Fishy_HUD = new Fishy.HUD(this.game);
        
        Fishy_HUD.createHud();
        
        this.myFish = new Fishy.Fish(this.game, 'PIRANHA');
        new Fishy.Fish(this.game, 'DORY', this.enemies);
        new Fishy.Fish(this.game, 'CLOWN', this.enemies);
        this.myFish.update = function() {  
            while (this.processDragEvent(Fishy_input.getDragEvent()));
            /*  
            var dirString;
            switch (this.direction) {
                    case Direction.UP: dirString = 'up - '; break;
                    case Direction.RIGHT: dirString = 'right - '; break;
                    case Direction.DOWN: dirString = 'down - '; break;
                    case Direction.LEFT: dirString = 'left - '; break;
            }
            console.log(dirString + "x1: " + this.getx() +  "   -   x2: " + this.getx2());
            console.log(dirString + "y1: " + this.gety() + "   -   y2: " + this.gety2());
            */
        }
        
        Fishy_HUD.setScore(285);
        
        this.topright = this.game.add.sprite(this.myFish.getx2(), this.myFish.gety(), 'topright');
        this.topleft = this.game.add.sprite(this.myFish.getx(), this.myFish.gety(), 'topleft');
        this.bottomright = this.game.add.sprite(this.myFish.getx2(), this.myFish.gety2(), 'botright');
        this.bottomleft = this.game.add.sprite(this.myFish.getx(), this.myFish.gety2(), 'botleft');
        
        this.topright.anchor.setTo(0.5);
        this.topleft.anchor.setTo(0.5);
        this.bottomright.anchor.setTo(0.5);
        this.bottomleft.anchor.setTo(0.5);
        
    },
    
    update: function() {
        if (this.game.time.now > this.nextStageTime) {
            this.nextStage();
        }
        Fishy_input.update();
        Fishy_HUD.update();
        this.myFish.update();
        this.enemies.callAll('updateEnemy');
        this.myFish.sprite.getBounds();
        this.enemies.forEachAlive(function (enemy) {
            if (Phaser.Rectangle.intersects(this.myFish.sprite.getBounds(), enemy.getBounds())) {
                enemy.owner.getHit(this.myFish);
            }
            enemy.owner.update();
            checkWorldBounds(enemy);
        }, this);
        checkWorldBounds(this.myFish.sprite);
        this.topright.x = this.myFish.getx2();
        this.topright.y = this.myFish.gety();
        this.topleft.x = this.myFish.getx();
        this.topleft.y = this.myFish.gety();
        
        this.bottomright.x = this.myFish.getx2();
        this.bottomright.y = this.myFish.gety2();
        this.bottomleft.x = this.myFish.getx();
        this.bottomleft.y = this.myFish.gety2();
        this.updateReef();
    },
    
    nextStage: function() {
        this.curStage++;
        fishSped = Math.floor(fishSpeed * 1.2); 
        this.nextStageTime = this.game.time.now + this.stageTime[this.curStage];
    },
    
    updateReef: function() {
        this.reef1.x = this.game.world.centerX - ((this.myFish.sprite.x - this.game.world.centerX) / 3) + 120;
        this.reef2.x = this.game.world.centerX - ((this.myFish.sprite.x - this.game.world.centerX) / 5);
        this.reef3.x = this.game.world.centerX - ((this.myFish.sprite.x - this.game.world.centerX) / 8) - 75;
    },
    
    render: function() {
        
    },
    
    getEnemies: function() {
        return this.enemies;
    },
     
    createText: function(textString, x, y, size) {
        text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, textString);
        text.anchor.setTo(0.5);


        //  x0, y0 - x1, y1
        grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        text.fill = grd;

        text.align = 'center';
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

       // text.inputEnabled = true;
        //text.input.enableDrag();

       // text.events.onInputOver.add(Fishy_textOver(), this);
        //text.events.onInputOut.add(Fishy_textOut(), this);
   
    }
}

function fishCollision(fish, enemy) {
}