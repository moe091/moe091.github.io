BALL.bController = {
    NO_REPEAT: 0,
    REPEAT: -1,
    ball: null,
    funcs: [],
    
    addUpdateFunc: function(name, func, duration, args, finish) {
        console.log("ADD\nADD\nADD\nADD\nADD\nADD");
        if (this.ball.updateFuncs == null) {
            this.ball.updateFuncs = [];
        }
        var f = {};
        f.func = func;
        if (duration == null) {
            f.end = null;
        } else {
            f.end = game.time.now + duration;
        }
        f.args = args;
        f.finish = finish;
        f.name = name;
        
        this.funcs.push(f);
    },
    
    removeFunc: function(name) {
        for (var i in this.funcs) {
            if (this.funcs[i].name == name) {
                this.funcs[i].finish(this.ball, game.time.elapsed, this.funcs[i].args);
                this.funcs.splice(i, 1);
            } else {
            }
        }
    },
    
    update: function(elapsed) {
        for (var i in this.funcs) {
            if (this.funcs[i].end < game.time.now) {
                this.funcs[i].remove = true;
            } else {
                this.funcs[i].func(this.ball, elapsed, this.funcs[i].args);
            }
        }
        
        for (var i in this.funcs) {
            if (this.funcs[i].remove) {
                if (this.funcs[i].finish != null) {
                    this.funcs[i].finish(this.ball, elapsed, this.funcs[i].args);
                }
                this.funcs.splice(i, 1);
            }
        }
        
    },
    
    
    
    
    jump: function() {
        console.log(BALL.bController.ball.body.wallride);
        if (BALL.gameState.jumpTime < game.time.now - BALL.gameState.jumpInterval && BALL.bController.ball.body.wallride == null) {
            console.log("\nnormal jump\n");
            BALL.bController.ball.body.velocity.y-= BALL.gameState.ballJump;
            BALL.gameState.jumpTime = game.time.now;
        }
        if (BALL.bController.ball.body.wallride < 0 || BALL.bController.ball.body.wallride > 0) { //WALLJUMP
            console.log("\nwalljump\n");
            BALL.bController.ball.body.velocity.y-= BALL.gameState.ballJump;
            console.log(BALL.bController.ball.body.wallride);
            if (BALL.bController.ball.body.wallride < 0) { //left wall, jump right
                if (BALL.input.RIGHT.isDown) {
                    console.log("D");
                    BALL.bController.ball.body.velocity.x-= BALL.gameState.ballJump * BALL.bController.ball.body.wallride * 0.7;
                } else {
                    console.log("No D");
                    BALL.bController.ball.body.velocity.x-= BALL.gameState.ballJump * BALL.bController.ball.body.wallride * 0.2;
                }
            } else {
                if (BALL.input.LEFT.isDown) {
                    console.log("a");
                    BALL.bController.ball.body.velocity.x-= BALL.gameState.ballJump * BALL.bController.ball.body.wallride * 0.7;
                } else {
                    console.log("No a");
                    BALL.bController.ball.body.velocity.x-= BALL.gameState.ballJump * BALL.bController.ball.body.wallride * 0.2;
                }
            }
            
            BALL.bController.ball.body.wallride = null;
            BALL.gameState.jumpTime = game.time.now;
            
            BALL.bController.removeFunc("wallride");
            BALL.bController.addUpdateFunc("wallJump", BALL.ballFuncs.wallJump, 200, BALL.bController.ball.body.angularVelocity * -0.75, null);
        }
    },
    
    moveLeft: function() {
        BALL.bController.ball.body.angularVelocity-= BALL.gameState.ballSpeed;
    },
    
    moveRight: function() {
        BALL.bController.ball.body.angularVelocity+= BALL.gameState.ballSpeed;
    },
    
    boopLeft: function() {
        console.log('boopleft');
        if (BALL.bController.ball.body.wallride > 0) { //left wall, jump right
            BALL.bController.ball.body.velocity.x-= BALL.gameState.ballJump * BALL.bController.ball.body.wallride * 0.7;
            
            BALL.bController.ball.body.velocity.y-= BALL.gameState.ballJump * 0.5;
            BALL.bController.ball.body.wallride = null;
            
            BALL.bController.removeFunc("wallride");
            BALL.bController.addUpdateFunc("wallJump", BALL.ballFuncs.wallJump, 200, BALL.bController.ball.body.angularVelocity * -1, null);
        } else if (BALL.bController.ball.body.wallride < 0) {
            BALL.bController.ball.body.angularVelocity-= BALL.gameState.boopSpeed * 1.5;
        } else {
            BALL.bController.ball.body.angularVelocity-= BALL.gameState.boopSpeed;
        }
    },
    
    boopRight: function() {
        console.log('boopright');
        if (BALL.bController.ball.body.wallride < 0) { //left wall, jump right
            BALL.bController.ball.body.velocity.x-= BALL.gameState.ballJump * BALL.bController.ball.body.wallride * 0.7;
            
            BALL.bController.ball.body.velocity.y-= BALL.gameState.ballJump * 0.5;
            BALL.bController.ball.body.wallride = null;
            
            BALL.bController.removeFunc("wallride");
            BALL.bController.addUpdateFunc("wallJump", BALL.ballFuncs.wallJump, 200, BALL.bController.ball.body.angularVelocity * -1, null);
            console.log('boopright------------');
        } else if (BALL.bController.ball.body.wallride > 0) {
            BALL.bController.ball.body.angularVelocity+= BALL.gameState.boopSpeed * 1.5;
        } else {
            BALL.bController.ball.body.angularVelocity+= BALL.gameState.boopSpeed;
        }
    },
    
    jumpLeft: function() {
        if (game.time.now < BALL.gameState.jumpTime + BALL.gameState.sideJumpInterval && game.time.now > BALL.gameState.sideJumpTime + BALL.gameState.sideJumpInterval) {
            BALL.bController.ball.body.velocity.x-= BALL.gameState.ballJump;
            BALL.bController.ball.body.velocity.y-= BALL.gameState.ballJump * 0.2;
            BALL.gameState.sideJumpTime = game.time.now;
        }
    },
    
    jumpRight: function() {
        if (game.time.now < BALL.gameState.jumpTime + BALL.gameState.sideJumpInterval && game.time.now > BALL.gameState.sideJumpTime + BALL.gameState.sideJumpInterval) {
            BALL.bController.ball.body.velocity.x+= BALL.gameState.ballJump;
            BALL.bController.ball.body.velocity.y-= BALL.gameState.ballJump * 0.2;
            BALL.gameState.sideJumpTime = game.time.now;
        }
    },
    
    endContact: function(b1, b2) {
        console.log("END CONTACT");
        if (BALL.play.ball.body.curWall != null) {
            console.log("ball y: " + BALL.play.ball.y);
            console.log("wall top: " + (BALL.play.ball.body.curWall.sprite.y + BALL.play.ball.body.curWall.sprite.width / 2));
            console.log("wall bottom: " + (BALL.play.ball.body.curWall.sprite.y - BALL.play.ball.body.curWall.sprite.width / 2));
        }
        if (b1 == BALL.play.ball.body.curWall || b2 == BALL.play.ball.body.curWall) {
            if (BALL.play.ball.y < BALL.play.ball.body.curWall.sprite.y - BALL.play.ball.body.curWall.sprite.width / 2 || BALL.play.ball.y > BALL.play.ball.body.curWall.sprite.y + BALL.play.ball.body.curWall.sprite.width / 2) {
                BALL.play.ball.body.curWall = null;
                BALL.play.ball.body.wallride = null;
                BALL.play.ball.body.wallrideTime = game.time.now + 150;
                BALL.bController.removeFunc("wallride");
                console.log("END WALLRIDE NOW");   
                console.log("END WALLRIDE NOW");   
                console.log("END WALLRIDE NOW");   
            }
        }
    }
    
    
}

  //sadfwadfawd
BALL.ballFuncs = {
    wallride: function(ball, elapsed, args) {
        
        if (BALL.bController.ball.body.curWall != null && BALL.bController.ball.body.curWall.sprite.alive) {
            console.log("curWall angle: " + (Math.abs(BALL.play.ball.body.curWall.angle - 90) % 90));
            if (!(Math.abs(Math.abs(BALL.bController.ball.body.curWall.angle) - 90) < 8 || Math.abs(Math.abs(BALL.bController.ball.body.curWall.angle) - 270) < 8)) {
                BALL.play.ball.body.curWall = null;
                BALL.play.ball.body.wallride = null;
                BALL.play.ball.body.wallrideTime = game.time.now + 150;
                BALL.bController.removeFunc("wallride");
            } else {
                ball.body.velocity.x+= (elapsed * 1.5) * args;
                ball.body.wallride = args;
            }
        }
    },
    
    wallrideFinish: function(ball, elapsed, args) {
        if (BALL.bController.ball.body.curWall != null && BALL.bController.ball.body.curWall.sprite.alive) {
            ball.body.velocity.x-= 150 * args;
            ball.body.wallride = null;
            ball.body.wallrideTime = game.time.now + 150;
            ball.body.curWall = null;
        }
    },
    
    wallJump: function(ball, elapsed, args) {
        ball.body.angularVelocity = args;
    }
}