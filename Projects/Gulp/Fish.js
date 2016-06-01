Direction = { //enum to represent directions fish may swim in
    UP : 1,
    DOWN : 2,
    LEFT: 3,
    RIGHT: 4
}

//RINGER APP. DOWNLOAD ON PHONE, CREATE USERNAME AND PASSWORD, WHEN PHONE IS LOST LOG ONTO APP WEBSITE WITH YOUR REGULAR COMPUTER, CLICK 'CALL PHONE,' PHONE WILL RING SO U CAN FIND IT.
//INCLUDE GPS TRACKING! WEBSITE ASKS PHONE APP WHERE IT IS, APP USES GPS TO GET LOCATION, SENDS LOCATION TO WEBSITE, WEBSITE SHOWS LOCATION TO USER.

var FishTypes = { //associate a name with each different FishType, FishType stores unique variables for each fish type
    CLOWN: new FishType("fishani", [0, 1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13, 14, 15]),
    DORY: new FishType("fish2ani", [0, 1, 2, 3], [4, 5, 6, 7]),
    PIRANHA: new FishType("piranhaani", [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 3, 4, 5, 6, 7])
}
function FishType(name, swimFrames, glowFrames) { //defines a type of fish and stores all relevent and unique data
    this.name = name;
    this.swimFrames = swimFrames;
    this.glowFrames = glowFrames;
}

var fishSpeed = 100; //speed that all newly spawned fish will swim at



var Fishy_turnRange = 5000;
var Fishy_glowDuration = 1000;

Fishy.Fish = function(game, fish, group) { //defines a fish, friendly or unfriendly
//Fish = function(game, fish, group) { //defines a fish, friendly or unfriendly
    this.game = game;
    this.speed = fishSpeed;
    this.direction;
    this.type = fish;
    this.points = 5;
    //fish has a nextTurnTime, represents the time he will start to glow.
    //turnAt = nextTurnTime + glowDuration. if now > nextTurnTime then glow(); turnAt = now+glowDuration;
    //if now > turnAt then turn()>>nextTurnTime = now + turnInterval - 2000 + rand * 4000;
    this.turnInterval = 10000; //+ or - 2500
    this.turnAt;
    this.glowing = false;
    this.isPlayer = false;
    
    this.nextTurnTime = this.game.time.now + this.turnInterval - (2 * Fishy_turnRange) + Math.random() * Fishy_turnRange;
    
    
    if (group != null) { // if a group is specified then the fish is an enemy
        this.sprite = group.create(Math.random() * 400 + 30, Math.random() * 250 + 40, FishTypes[fish].name);
        this.sprite.alpha = 0.5;
        this.active = false;
        this.activationTime = this.game.time.now + 1500;
    } else {
        this.sprite = this.game.add.sprite(Math.random() * 400 + 30, Math.random() * 250 + 40, FishTypes[fish].name);
        this.isPlayer = true;
        this.speed = Math.floor(this.speed * 1.2);
    }
    
    this.sprite.owner = this;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    
    //use the FishType object to create appropriate animation for this type of fish
    this.sprite.animations.add('swim', FishTypes[fish].swimFrames);
    this.sprite.animations.add('glow', FishTypes[fish].glowFrames);
    this.sprite.play('swim', 15, true);
    
    this.sprite.body.velocity.x = this.speed;
    this.setDirection(Direction.RIGHT);
}

Fishy.Fish.prototype = {
    update: function() {
        if (!this.active && this.game.time.now > this.activationTime) {
            this.active = true;
            this.sprite.alpha = 1;
        }
            
        if (this.glowing) {
            if (this.game.time.now > this.turnAt) {
                this.turn();   
            }
        } else if (this.game.time.now > this.nextTurnTime) {
            this.glowing = true;
            this.sprite.play('glow', 15, true);
            this.turnAt = this.game.time.now + Fishy_glowDuration;
        }
    },
    
    turn: function() {
        this.setDirection(this.getRandDir());
        this.nextTurnTime = this.game.time.now + this.turnInterval - (2 * Fishy_turnRange) + Math.random() * Fishy_turnRange;
        this.glowing = false;
        this.sprite.play('swim', 15, true);
    },
    
    processDragEvent: function(dir) {
        if (dir == -1) {
            return false;
        } else {
            this.setDirection(dir);
            return true;
        }
    },
    
    revive: function(x, y) {
        
    },
    
    setDirection: function(dir) {
        if (this.direction != dir) {
            
            if (this.isPlayer) {
                var dirString;
               
            }
            if (dir != -1) {
            switch (dir) {
                case Direction.UP:
                    this.sprite.scale.x = 1;
                    this.sprite.body.velocity.y = -this.speed;
                    this.sprite.body.velocity.x = 0;
                    this.sprite.angle = 270;
                    this.direction = dir;
                    break;
                case Direction.RIGHT:
                    this.sprite.body.velocity.y = 0;
                    this.sprite.body.velocity.x = this.speed;
                    this.sprite.angle = 0;
                    this.sprite.scale.x = 1;
                    this.direction = dir;
                    break;
                case Direction.DOWN:
                    this.sprite.body.velocity.y = this.speed;
                    this.sprite.body.velocity.x = 0;
                    this.sprite.angle = 90;
                    this.sprite.scale.x = 1;
                    this.direction = dir;
                    break;
                case Direction.LEFT:
                    this.sprite.body.velocity.y = 0;
                    this.sprite.body.velocity.x = -this.speed;
                    this.sprite.angle = 0;
                    this.sprite.scale.x = -1;
                    this.direction = dir;
                    break;
            }
            this.direction = dir;
            this.syncBody();
            }
            if (this.isPlayer) {
                var dirString;
            }
            
        }
    },
    
    getRandDir: function() {
        switch (this.direction) {
            case Direction.UP:
                if (Math.random() * 20 < 10) 
                    return Direction.LEFT;
                else
                    return Direction.RIGHT;
                break;
            case Direction.RIGHT:
                if (Math.random() * 20 < 10) 
                    return Direction.UP;
                else
                    return Direction.DOWN;
                break;
            case Direction.DOWN:
                if (Math.random() * 20 < 10)
                    return Direction.LEFT;
                else
                    return Direction.RIGHT;
                break;
            case Direction.LEFT:
                if (Math.random() * 20 < 10)
                    return Direction.UP;
                else
                    return Direction.DOWN;
                break;
        }
        return -1;
    },
    
    syncBody: function() {
        switch (this.direction) {
            case Direction.DOWN:
                this.sprite.body.setSize(this.sprite.height, this.sprite.width, 0, 0);
                break;
            case Direction.UP:
                this.sprite.body.setSize(this.sprite.height, this.sprite.width, 0, 0);
                break;
            case Direction.LEFT:
                this.sprite.body.setSize(this.sprite.width, this.sprite.height, 0 , 0);
                break;
            case Direction.RIGHT:
                this.sprite.body.setSize(this.sprite.width, this.sprite.height, 0, 0);
                break;
        }
    },
    
    die: function(combo) {
        combo = true; //all kills give combo now. cheap fix
        if (!this.isPlayer) {
            this.sprite.kill();  
            Fishy_gameplay.addPoints(this.points);
            if (combo) {
                Fishy_gameplay.addCombo();
            } else {
                Fishy_gameplay.resetCombo();
                Fishy_HUD.clearCombo();
            }
        } else {
            this.playerDie();
        }
    },
    
    playerDie: function() {
        this.menu = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menu');
            this.menu.anchor.setTo(0.5);
            this.menu.scale.setTo(1.5);
            
            this.game.add.text(this.game.world.centerX, this.game.world.centerY - 60, "You've Been Eaten!").anchor.setTo(0.5);
            this.game.add.text(this.game.world.centerX - 75, this.game.world.centerY - 15, "Score:     " + Fishy_HUD.getScore()).fill = '#ffffff';
            
            //this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function() { this.game.paused = true; }, this);
            
        this.restartButton = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 50, 'playbutton');
        this.restartButton.anchor.setTo(0.5, 0.5);
        this.restartButton.inputEnabled = true;
        this.restartButton.events.onInputDown.add(this.restartTouch, this);
        this.sprite.y = -1000; //hack
        this.sprite.x = -60; //hackhackhack
    },
    
    restartTouch: function(button) {
        parent.document.getElementById(window.name).src += '';
    },
    
    getHit: function(otherFish) {
        if (false) {
            if (this.getOverlapX(otherFish) > 15 || this.getOverlapY(otherFish) > 15) {
                this.game.paused = true;
            }
        } else {
        switch (this.direction) {
                case Direction.UP:
                    if (otherFish.direction == Direction.UP) {
                        //same dir hit  fish with lower y value gets eaten
                        if (this.gety() < otherFish.gety()) {
                            this.die(true);
                        } else if (this.active) {
                            otherFish.die(true);
                        }
                    } else if (otherFish.direction == Direction.DOWN) {
                        if (this.active)
                            otherFish.die(true);
                        else
                            this.die(true);
                        
                    } else {
                        if (this.getOverlapY(otherFish) + 4 > this.getOverlapX(otherFish)) {
                            this.die(true);          
                        } else if (this.active) {
                            otherFish.die(true);
                        }
                    }
                    break;
                case Direction.RIGHT:
                    if (otherFish.direction == Direction.RIGHT) {
                        if (this.getx() > otherFish.getx()) {
                            this.die(true);
                        } else if (this.active) {
                            otherFish.die(true);
                        }
                    } else if (otherFish.direction == Direction.LEFT) {
                        if (this.active)
                            otherFish.die(true);
                        else
                            this.die(true);
                    } else {
                        if (this.getOverlapX(otherFish) + 4 > this.getOverlapY(otherFish)) {
                            this.die(true);
                        } else if (this.active) {
                            this.playerDie();
                            otherFish.sprite.x = 9000;
                        }
                    }
                    break;
                case Direction.DOWN:
                    if (otherFish.direction == Direction.DOWN) {
                        if (this.gety() > otherFish.gety()) {
                            this.die(true); 
                        } else if (this.active) {
                            otherFish.die(true);
                        }
                    } else if (otherFish.direction == Direction.UP) {
                        if (this.active)
                            otherFish.die(true);
                        else
                            this.die(true);
                    } else {
                        if (this.getOverlapY(otherFish) + 4 > this.getOverlapX(otherFish)) {
                            this.die(true);          
                        } else if (this.active) {
                            otherFish.die(true);
                        }
                    }
                    break;
                case Direction.LEFT:
                    if (otherFish.direction == Direction.LEFT) {
                        if (this.getx() < otherFish.getx()) {
                            this.die(true);
                        } else if (this.active) {
                            otherFish.die(true);
                        }
                    } else if (otherFish.direction == Direction.RIGHT) {
                        if (this.active)
                            otherFish.die(true);
                        else
                            this.die(true);
                    } else {
                        
                        
                        if (this.getOverlapX(otherFish) + 4 > this.getOverlapY(otherFish)) {
                            this.die(true);
                        } else if (this.active) {
                            
                            otherFish.sprite.x = 9000;
                            this.playerDie();
                        }
                    }
                    break;
        }
            
        }
    },
    
    getx2: function() {
       // return this.sprite.x + Math.abs(Math.floor(this.sprite.width / 2));
        if (this.direction == Direction.LEFT)
            return this.sprite.x - this.sprite.width / 2;
        else if (this.direction == Direction.RIGHT) {
            return this.sprite.x + this.sprite.width / 2;
        } else { //vertical, up or down
            return this.getx() + this.sprite.height;   
        }
    },
    
    gety2: function() {
        if (this.direction == Direction.UP || this.direction == Direction.DOWN) {
            return this.sprite.y + this.sprite.width / 2;
        } else {
            return this.sprite.y + this.sprite.height / 2;
        }
    },
    
    getx: function() {
       // return this.sprite.x - Math.abs(Math.floor(this.sprite.width / 2));
        if (this.direction == Direction.LEFT) 
            return this.sprite.x + this.sprite.width / 2;
        else if (this.direction == Direction.RIGHT) 
            return this.sprite.x - this.sprite.width / 2;
        else
            return this.sprite.x - this.sprite.height / 2;
    },
    
    gety: function() {
        if (this.direction == Direction.UP || this.direction == Direction.DOWN) 
            return this.sprite.y - this.sprite.width / 2;
        else
            return this.sprite.y - this.sprite.height / 2;
    },
    
    getOverlapX: function(other) {
        if (other.getx() > this.getx()) {
            return this.getx2() - other.getx();
        } else {
            return other.getx2() - this.getx();
        }
    },
    
    getOverlapY: function(other) {
        if (other.gety() > this.gety()) {
            return this.gety2() - other.gety();
        } else {
            return other.gety2() - this.gety();
        }
    },
    
    headOnCollision: function(otherFish) {
        
    },
    
    fromBehindCollision: function(otherFish) {
        
    },
    
    normalCollision: function(otherFish) {
        
    }
}


function showCorners(fish) {
    this.game = fish.game;
    this.game.add.sprite(fish.getx(), fish.gety(), 'topleft');
    this.game.add.sprite(fish.getx(), fish.gety2(), 'botleft');
    this.game.add.sprite(fish.getx2(), fish.gety(), 'topright');
    this.game.add.sprite(fish.getx2(), fish.gety2(), 'botright');
}













