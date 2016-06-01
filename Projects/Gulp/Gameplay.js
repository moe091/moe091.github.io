Fishy.Gameplay = function(game, enemies) {
    this.game = game;
    this.enemies = enemies;
    this.minSpawnInterval = 8;
    this.spawnIntervalRange = 6;
    
    this.spawnTimer = this.game.time.create(false);
    this.spawnTimer.loop(Phaser.Timer.SECOND / 4, this.spawnTick, this);
    this.spawnTimer.start();
    this.tick = this.minSpawnInterval + Math.floor(Math.random() * this.spawnIntervalRange);
    
    this.points = 0;
    this.combo = 0;
};

Fishy.Gameplay.prototype = {
    
    spawnTick: function() {
        this.tick--;
        if (this.tick <= 0) {
            this.spawnTime();
        }
    },
    
    spawnTime: function() {
        this.tick = this.minSpawnInterval + Math.floor(Math.random() * this.spawnIntervalRange);
    
        if (Math.random() * 20 < 10) { //spawn clownfish
            if (this.hasRecycleable("CLOWN")) {
                this.reviveEnemy(this.getRecycleable("CLOWN"));
            } else {
                new Fishy.Fish(this.game, 'CLOWN', this.enemies);
            }
        } else { //spawn dory fish
           if (this.hasRecycleable("DORY")) {
               this.reviveEnemy(this.getRecycleable("DORY"));
           } else {
               new Fishy.Fish(this.game, 'DORY', this.enemies);
           }
        }
        this.getRecycleable("DORY");    
    },
    
    endGame: function() {
        
        this.menu = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menu');
        this.menu.anchor.setTo(0.5);
        this.menu.scale.setTo(2);
    },
    
    spawnEnemy: function() {
        
    },
    
    reviveEnemy: function(enemy) {
        enemy.reset(Math.random() * 400 + 30, Math.random() * 250 + 40, 100);  
        enemy.owner.active = false;
        enemy.owner.activationTime = this.game.time.now + 1500;
        enemy.owner.setDirection(enemy.owner.getRandDir());
        enemy.alpha = 0.5;
    },
    
    addPoints: function(amount) {
        this.points+= amount;
        Fishy_HUD.setScore(this.points);
    },
    
    addCombo: function() {
        this.combo+= 1;
        Fishy_HUD.setCombo(this.combo, this.resetCombo, this);
    },
    
    resetCombo: function() {
        this.addPoints(this.combo * this.combo * 5);
        this.combo = 0;
    },
    
    getRecycleable: function(type) {
        var recycleable = -1;
        this.enemies.forEach(function (enemy) {
            if (!enemy.alive) {
                if (enemy.owner.type == type) {
                    recycleable = enemy;
                }
            }
        });
        return recycleable;
    },
    
    hasRecycleable: function(type) {
        var has = false;
        this.enemies.forEach(function (enemy) {
            if (!enemy.alive) {
                if (enemy.owner.type == type) {
                    has = true;
                }
            }
        });
        return has;
    }
}

function checkWorldBounds(fish) {
    switch (fish.owner.direction) {
        case Direction.RIGHT:
            if (fish.x > 455) {
                fish.owner.setDirection(Direction.LEFT);
            }
            break;
        case Direction.LEFT:
            if (fish.x < 25) {
                fish.owner.setDirection(Direction.RIGHT);
            }
            break;
        case Direction.DOWN:
            if (fish.y > 295) {
                fish.owner.setDirection(Direction.UP);
            }
            break;
        case Direction.UP:
            if (fish.y < 25) {
                fish.owner.setDirection(Direction.DOWN);
            }
            break;
    }
}












