var Fishy_input;
var Fishy_gameplay;
var Fishy_HUD;
Fishy.Play = function(game) {
    this.game = game;
    this.enemies = null; //group for all enemy fish, will add functionality to this group
    this.myFish;
    
    this.starFish;
    this.topleft;
    this.topright;
    this.bottomleft;
    this.bottomright;
    
    this.reef1;
    this.curStage = 0;
    this.stageTime = [];
    this.stageTime.push(7000);
    this.stageTime.push(10000);
    this.nextStageTime;
    
    this.starFishTime = 0;
    this.starFishInterval = 8000;
    
};

Fishy.Play.prototype = {
    
    preload: function() {
        
    },
    
    createStar: function() {
        this.starFish = this.game.add.sprite(20 + Math.random() * 460, - 20, 'starfish');
        this.game.physics.enable(this.starFish, Phaser.Physics.ARCADE);
        this.starFish.body.velocity.y = 40;
    },
    
    spawnStar: function() {
        this.starFishTime = this.game.time.now + this.starFishInterval + Math.random() * this.starFishInterval;
        if (this.starFish != null) {
            if (!this.starFish.alive) {
                this.starFish.reset(20 + Math.random() * 460, -20, 25);
                this.starFish.body.velocity.y = fishSpeed - 50 + Math.random() * 70;
            } else {
                if (this.starFish.y > 400) {
                    this.starFish.kill();
                    this.spawnStar();
                }
            }
        } else {
            this.createStar();
        }
        
    },
    
    create: function() {
        
        this.nextStageTime = this.game.time.now + this.stageTime[this.curStage];
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
        }
        
        Fishy_HUD.setScore(0);
        
        
        
        
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
        
        if (this.starFish != null && this.starFish.alive) {
            if (Phaser.Rectangle.intersects(this.myFish.sprite.getBounds(), this.starFish.getBounds())) {
                this.starFish.kill();
                Fishy_gameplay.addPoints(25);
                Fishy_gameplay.addCombo();
            }
        }
        checkWorldBounds(this.myFish.sprite);
        this.updateReef();
        
        if (this.game.time.now > this.starFishTime) {
            this.spawnStar();
        } 
    },
    
    nextStage: function() {
        this.curStage++;
        fishSped = Math.floor(fishSpeed * 1.2); 
        this.nextStageTime = 0;
    },
    
    updateReef: function() {
        this.reef1.x = this.game.world.centerX - Math.floor((this.myFish.sprite.x - this.game.world.centerX) / 2) + 120;
        this.reef2.x = this.game.world.centerX - ((this.myFish.sprite.x - this.game.world.centerX) / 4);
        this.reef3.x = this.game.world.centerX - ((this.myFish.sprite.x - this.game.world.centerX) / 7) - 75;
    },
    
    render: function() {
        
    },
    
    getEnemies: function() {
        return this.enemies;
    },
     
    
}

function fishCollision(fish, enemy) {
}