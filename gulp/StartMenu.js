Fishy.StartMenu = function(game) {
    this.startButton;
    this.game = game;
}

Fishy.StartMenu.prototype = {
    
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.game.add.sprite(0, 0, 'bg');
        var starfish;
        for (var i = 0; i < 20; i++) {
            starfish = this.game.add.sprite(Math.random() * 400 + 30, Math.random() * 4000 - 4000, 'starfish');
            this.physics.enable(starfish, Phaser.Physics.ARCADE);
            starfish.body.velocity.y = 20;
        }
        this.fullButton = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, 'fullscreen');
        this.fullButton.anchor.setTo(0.5);
        this.fullButton.scale.setTo(0.4);
        this.fullButton.inputEnabled = true;
        this.fullButton.events.onInputDown.add(this.fullTouch, this);
        
        this.startButton = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 50, 'playbutton');
        this.startButton.anchor.setTo(0.5, 0.5);
        this.startButton.inputEnabled = true;
        this.startButton.events.onInputDown.add(this.startTouch, this);
    },
    
    startListener: function(but) {
        
    },
    
    startTouch: function(button) {
       // this.game.scale.startFullScreen();
        this.game.state.start('Play');  
    },
    
    fullTouch: function(button) {
       this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.scale.startFullScreen()
    }
};