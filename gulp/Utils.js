Fishy.Utils = function(game) {
    this.game = game;  
};

Fishy.Utils.prototype = {
    
    createText: function(textString) {
        text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "- phaser -\nrocking with\ngoogle web fonts");
        text.anchor.setTo(0.5);

        text.font = 'Revalia';
        text.fontSize = 60;

        //  x0, y0 - x1, y1
        grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        text.fill = grd;

        text.align = 'center';
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

        text.inputEnabled = true;
        text.input.enableDrag();

        text.events.onInputOver.add(over, this);
        text.events.onInputOut.add(out, this);
    }
}

function restart() {
    console.log("WORKED");
    Fishy.Gameplay.enemies = null; //group for all enemy fish, will add functionality to this group
    Fishy.Gameplay.myFish = null;
    
    Fishy.Gameplay.starFish = null;
    Fishy.Gameplay.topleft = null;
    Fishy.Gameplay.topright = null;
    Fishy.Gameplay.bottomleft = null;
    Fishy.Gameplay.bottomright = null;
    
    Fishy.Gameplay.reef1 = null;
    Fishy.Gameplay.curStage = 0;
    Fishy.Gameplay.stageTime = [];
    Fishy.Gameplay.stageTime.push(7000);
    Fishy.Gameplay.stageTime.push(10000);
    Fishy.Gameplay.nextStageTime = null;
    
    Fishy.Gameplay.starFishTime = 0;
    Fishy.Gameplay.starFishInterval = 8000;
    
     this.menu = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menu');
        this.menu.anchor.setTo(0.5);
        this.menu.scale.setTo(1.5);
            
        this.game.add.text(this.game.world.centerX, this.game.world.centerY - 60, "You've Been Eaten!").anchor.setTo(0.5);
        this.game.add.text(this.game.world.centerX - 75, this.game.world.centerY, "Score:     " + Fishy_HUD.getScore()).fill = '#ffffff';

        
        this.restartButton = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, 'restart');
        this.restartButton.anchor.setTo(0.5);
        this.restartButton.inputEnabled = true;
        this.restartButton.events.onInputDown.add(restart, Fishy.Utils);
            
        this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function() { this.game.paused = true; }, this);
    
    Fishy.Fish.menu.destroy();
    Fishy.Fish.eatenText.destroy();
    Fishy.Fish.endScoreText.destroy();
    Fishy.Fish.restartButton.destroy();
    
    
    
}
function Fishy_textOver() {
    text.fill = '#ff00ff';
}

function Fishy_textOut() {
    text.fill = grd;
}