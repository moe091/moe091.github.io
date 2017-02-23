var Fishy = {};

Fishy.Boot = function(game) {
    this.game = game;
};

Fishy.Boot.prototype = {
    preload: function() {
        this.load.image('bg', 'gfx/bg3.png');
        
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },
    
    create: function() {
        this.game.scale.fullScreenScaleMode = 3;
        this.stage.backgroundColor = '#A0EFFF';
        this.game.state.start('Preloader');
    }
}