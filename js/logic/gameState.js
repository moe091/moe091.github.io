//RANDO: PM 'netsrak' on reddit a demo of game https://www.reddit.com/r/IndieGaming/comments/6pfwlf/does_anyone_have_any_insight_or_ideas_on_why_the/
BALL.gameState = {
    touchDown: false,
    jumpTime: 0,
    downX: 0,
    
    objects: [],
    updateObjs: [],
    deadObjs: [],
    
    movePaths: [],
    events: [],
    pointSprites: null,
    
    curID: 0,
    
    selected: null,
    
    ballSpeed: 1,
    boopSpeed: 15,
    ballJump: 450,
    jumpInterval: 900,
    sideJumpInterval: 500,
    sideJumpTime: 0,
    
    bounceMaterial: null,
    platMaterial: null,
    ballMaterial: null,
    wallrideMaterial: null,
    boulderMaterial: null,
    
    wallrideGroup: null,
    ballGroup: null,
    killGroup: null,
    platGroup: null,
    dynamicGroup: null,
    staticGroup: null,
    
    special: null,
    

    
    initGame: function() {
        
        this.special = game.add.group();
        
        this.sprites = game.add.group();
        this.sprites.inputEnableChildren = true;
        
        
        
        
        
        this.bounceMaterial = game.physics.p2.createMaterial();
        this.platMaterial = game.physics.p2.createMaterial();
        this.wallrideMaterial = game.physics.p2.createMaterial();
        this.boulderMaterial = game.physics.p2.createMaterial();
        
        this.wallrideGroup = game.physics.p2.createCollisionGroup();
        this.ballGroup = game.physics.p2.createCollisionGroup();
        this.killGroup = game.physics.p2.createCollisionGroup();
        this.dynamicGroup = game.physics.p2.createCollisionGroup();
        this.staticGroup = game.physics.p2.createCollisionGroup();
        
        BALL.play.ball.body.setCollisionGroup(this.ballGroup);
        
        game.physics.p2.createContactMaterial(this.ballMaterial, this.bounceMaterial, { friction: 3 , restitution: 0.6 }); 
        game.physics.p2.createContactMaterial(this.ballMaterial, this.wallrideMaterial, { friction: 999 , restitution: 0 }); 
        game.physics.p2.createContactMaterial(this.ballMaterial, this.boulderMaterial, { friction: 999 , restitution: 0 }); 
        game.physics.p2.createContactMaterial(this.wallrideMaterial, this.boulderMaterial, { friction: 999 , restitution: 0 }); 
        game.physics.p2.createContactMaterial(this.wallrideMaterial, this.wallrideMaterial, { friction: 1 , restitution: 0.5 }); 
        
        
        BALL.play.ball.body.collides(BALL.gameState.wallrideGroup, BALL.gameState.wallrideCallback, this);
        BALL.play.ball.body.collides(BALL.gameState.killGroup, BALL.gameState.killCallback, this);
        BALL.play.ball.body.collides(BALL.gameState.dynamicGroup);
                    //BALL.play.ball.body.createGroupCallback(BALL.gameState.wallrideGroup, BALL.gameState.wallrideCallback, this);
        
        BALL.objDefs.init();
        
        console.log("LOAD LEVEL");
        BALL.manager.loadLevel(game.cache.getJSON('level'));
        
        //this.boulder = game.add.sprite(3000, 1660, "");
        //game.physics.p2.enable(this.boulder, true);
        //this.boulder.body.setCircle(120);
       
        BALL.editor.createEditor();
    },
    
    update: function() {
        for (var i in this.updateObjs) {
            for (var j in this.updateObjs[i].updateFuncs) {
                //this.updateObjs[i].updateFuncs[j]();
            }
        }  
    },
    
    nextID: function() {
        while (this.getSpriteById(this.curID) != null) {
            this.curID++;
        }
        return this.curID;
    },
    
    
    createObj: function(x, y, key, id) {
        if (key == "double-laser") {
            key = "k01-dublaser";
        }
        if (key.substr(0, 5) == "flip-") {
            BALL.gameState.selected = BALL.gameState.sprites.create(x, y, key.substring(5));
        } else {
            BALL.gameState.selected = BALL.gameState.sprites.create(x, y, key);
        }
        
        BALL.gameState.selected.anchor.setTo(0.5, 0.5);
        if (id == undefined) {
            BALL.gameState.selected.ID = this.nextID();
        } else {
            BALL.gameState.selected.ID = id;
        }
        
        
        
        
        game.physics.p2.enable(BALL.gameState.selected, false);
        BALL.gameState.selected.body.clearShapes();
        
        if (BALL.objDefs[key] != null) {
            BALL.objDefs[key].init(BALL.gameState.selected);
        } else {
            BALL.objDefs.default.init(BALL.gameState.selected);
        }
        BALL.gameState.selected.startAngle = BALL.gameState.selected.angle;
        if (key == "chalkbig" || key == "chalksmall") {
            //BALL.gameState.selected.visible = false;
        }
        
        if (BALL.manager.editMode) {
            console.log("EDITMODE!");
            console.log("EDITMODE!");
            console.log("EDITMODE!");
            console.log("EDITMODE!");
            console.log("EDITMODE!");
            if (BALL.gameState.selected.body.static) {
                BALL.gameState.selected.isStatic = true;
                console.log("already static");
            } else {
                console.log("making static!");
                BALL.gameState.selected.isStatic = false;
                BALL.gameState.selected.body.static = true;
                BALL.gameState.selected.startX = BALL.gameState.selected.x;
                BALL.gameState.selected.startY = BALL.gameState.selected.y;
                BALL.manager.nonstaticObjs.push(BALL.gameState.selected);
            }
        }
        
        BALL.gameState.selected.inputEnabled = true;
        BALL.gameState.selected.input.useHandCursor = true;
        BALL.gameState.selected.input.enableDrag(true);
        BALL.gameState.selected.input.pixelPerfectOver = true;

        if (key == "k01-electricity") {
            BALL.gameState.selected.animations.add("play");
            BALL.gameState.selected.animations.play("play", 20, true);
        } else if (key == "s01-launcher" || key == "flip-s01-launcher") {
            BALL.gameState.selected.tEvent = BALL.timer.pushEvent(BALL.effects.launcherShot(BALL.gameState.selected), BALL.gameState.selected, 3000, true, null);
        }
        
        BALL.gameState.selected.events.onInputDown.add(BALL.editor.clickObj, this);
        BALL.gameState.selected.events.onInputOver.add(BALL.editor.spriteHover, this);
        BALL.gameState.selected.events.onInputOut.add(BALL.editor.spriteUnhover, this);
        
        BALL.gameState.selected.updateFuncs = [];
        this.updateObjs.push(BALL.gameState.selected);
        
        BALL.editor.select(BALL.gameState.selected);
        
        BALL.gameState.objects.push(BALL.gameState.selected);
        BALL.gameState.initObject(BALL.gameState.selected);
        return BALL.gameState.selected;
    },
    
    initObject: function(sprite) {
        sprite.startX = sprite.x;
        sprite.startY = sprite.y;
        if (sprite.createTrigger != null) {
            for (var i in sprite.createTrigger.events) {
                sprite.createTrigger.events[i].execute();
                
            }
        }  
        if (sprite.movePaths != null && sprite.movePaths[0] != null) {
            console.log("Starting movepath ", sprite + ", path: ", sprite.movePaths[0]);
            sprite.movePaths[0].start();
        }
    },
    
    resetLevel: function() {
        BALL.timer.reset();
        this.resurrectObjs();
    },
    
    destroyObject: function(sprite) {
        for (var i in this.objects) {
            if (this.objects[i].ID == sprite.ID) {
                this.objects.splice(i, 1);
            }
        }
        sprite.destroy();
    },
    
    killCallback: function(obj, ball) {
        if (obj != null)
            console.log(obj.sprite.key);
        BALL.play.ball.kill();
        
        BALL.manager.resetLevel();
    },
    
    wallrideCallback: function(wall, ball) {
        console.log("WALLRIDE CALLBACK - " + wall.sprite.key + ", angle:" + Math.abs(Math.abs(wall.angle) - 90));
        if (ball.wallride == null && game.time.now > ball.wallrideTime);
            if ( (Math.abs(Math.abs(wall.angle) - 90) < 8 || Math.abs(Math.abs(wall.angle) - 270) < 8)  &&  (wall.rideTime == null || wall.rideTime < game.time.now - 2000) ) {
                console.log("WALLRIDE ANGLE");
                console.log("WALLRIDE ANGLE");
                console.log("WALLRIDE ANGLE");
                if (ball.velocity.y < -100) {
                    console.log("RIDING THE WALL");
                    BALL.bController.ball.body.curWall = wall;
                    if (wall.x < ball.x) {
                        BALL.bController.addUpdateFunc("wallride", BALL.ballFuncs.wallride, 800, -1, BALL.ballFuncs.wallrideFinish);
                    } else if (wall.x > ball.x) {
                        BALL.bController.addUpdateFunc("wallride", BALL.ballFuncs.wallride, 800, 1, BALL.ballFuncs.wallrideFinish);
                    }
                    console.log(wall);
                } else {
                    console.log("LOW VEL");
                }
            }
    },
    
    moveObject: function(sprite, x, y) {
        if (sprite.body != null) {
            //sprite.body.static = false;
            sprite.body.x = Math.round(game.input.worldX * (1 / game.camera.scale.x));
            sprite.body.y = Math.round(game.input.worldY * (1 / game.camera.scale.y));
            sprite.startX = sprite.body.x;
            sprite.startY = sprite.body.y;
            //sprite.body.static = true;
        } else {
            if (BALL.editor.pathSpriteSelected) {
                var pos = sprite.game.input.getLocalPosition(sprite.parent, game.input.activePointer);
                
                sprite.x = Math.round(pos.x);
                sprite.y = Math.round(pos.y);
            } else {
                sprite.x = Math.round(game.input.worldX * (1 / game.camera.scale.x));
                sprite.y = Math.round(game.input.worldY * (1 / game.camera.scale.y));
            }
        }
    },
    

    
    
    hidePathSprites: function() {
        
        console.warn("hidePathSprites - DEPCREATED");
    },
    
    getSpriteById: function(id) {
        console.log("getSpriteByID() context: ", this);
        for (var i in this.objects) {
            if (this.objects[i].ID == id) {
                return this.objects[i];
            }
        }
        console.warn("NO OBJECT FOUND WITH ID " + id + ", RETURNING NULL!");
        return null;
    },
    
    restoreObject: function(sprite) {
        if (sprite.mass != null) {
            sprite.body.mass = sprite.mass;
        }
        if (sprite.startX != null)
            sprite.reset(sprite.startX, sprite.startY);
        if (sprite.body != null && sprite.startAngle != null) {
            sprite.body.angle = sprite.startAngle;
        }
        if (sprite.key == "chalkbig" || sprite.key == "chalksmall" || sprite.key == "chalkbreak") {
            if (sprite.angle == 90) {
                console.log(sprite.body._bodyCallbacks);
                console.log(sprite);
                //sprite.body.createBodyCallback(BALL.play.ball, this.wallrideCallback, this);
                console.log("made callback");
                console.log(sprite.body._bodyCallbacks);
                console.log(sprite);
            }
        }
    },
    
    buryObject: function(sprite) {
        sprite.startAngle = sprite.angle;
        this.deadObjs.push(sprite);
    },
    
    resurrectObjs: function() {
        for (var i in this.objects) {
            this.restoreObject(this.objects[i]);
        }
        for (var i in this.objects) {
            for (var j in this.objects[i].triggers) {
                this.objects[i].triggers[j].done = false;
            }
            if (this.objects[i].alive == false & this.objects[i].startsDead != true) {
                //this.restoreObject(this.objects[i]);
            }
        }
    }
    
    
}
