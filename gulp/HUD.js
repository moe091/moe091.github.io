Fishy.HUD = function(game) {
    this.game = game;
    this.scoreText;
    this.comboText
    this.comboing = false;
    this.comboTimer = this.game.time.events.loop(100, this.fadeCombo, this);
    this.comboCallback;
    this.comboCallbackContext;
    this.scaleTime = 0;
    this.frame = 0;
    this.frameTime = this.game.time.now + 1000;
    this.score = 0;
};

Fishy.HUD.prototype = {
    
    createHud: function() {
        this.scoreText = this.game.add.text(10, 10, "SCORE: 0");
        
        var scoreFill = this.scoreText.context.createLinearGradient(0, 0, 0, this.scoreText.canvas.height);
        scoreFill.addColorStop(0, '#8ED6FF');   
        scoreFill.addColorStop(1, '#BFCCFF');
        this.scoreText.strokeThickness = 4;
        this.scoreText.fill = '#CCDDEE';
        
        this.scoreText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 8);
        
        this.comboText = this.game.add.text(this.game.world.centerX, 30, "");
        
        var comboFill = this.comboText.context.createLinearGradient(0, 0, 0, this.scoreText.canvas.height);
        comboFill.addColorStop(0, '#AAFFCA');
        comboFill.addColorStop(1, '#559977');
        
        this.comboText.strokeThickness = 3;
        this.comboText.fill = '#CCDDEE';
        this.comboText.anchor.x = 0.5;
        this.comboText.fontSize = 72;
    },
    
    fadeCombo: function() {           
        
        if (this.comboText.alpha <= 0) {
            this.endCombo();
        } else {
            this.comboText.alpha = this.comboText.alpha - ((1.5 - this.comboText.alpha) / 25);
        }
    },
    
    update: function() {
        this.frame++;
        if (this.game.time.now > this.frameTime) {
            this.scoreText.text = 'score = ' + this.score;
            this.frame = 0;
            this.frameTime = this.game.time.now + 1000;
        }
        if (this.comboText.scale.x > 1 && this.game.time.now > this.scaleTime) {
            this.comboText.scale.set(this.comboText.scale.x - (this.comboText.scale.x * this.comboText.scale.x) / 20);   
            this.scaleTime = this.game.time.now + 25;
        } 
    }, 
    
    endCombo: function() {
        this.comboing = false;
        if (this.comboCallback != null) {
            this.comboCallback.call(this.comboCallbackContext, null);
        } else {
            
        }
    },
    
    clearCombo: function() {
        this.comboText.alpha = 0;
    },
    
    setCombo: function(combo, callback, callbackContext) {
        this.comboText.scale.set(1.75);
        this.comboCallback = callback;
        this.comboCallbackContext = callbackContext;
        this.comboText.text = 'x' + combo; 
        this.comboText.alpha = 1;
        if (!this.comboing) {
            this.comboing = true;
            this.comboTimer.timer.resume();
        }
    },
    
    setScore: function(score) {
        this.score = score;
       // this.scoreText.text = this.game.time.fps +  " - SCORE: " + score;
    },
    
    getScore: function() {
        return this.score;
    }
}

