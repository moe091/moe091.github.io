
var text = null;
var grd;
var mainText;
var text = [];
var images = [];
var curImage;
Fishy.Preloader = function(game) {
    this.game = game;
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
    this.bg;
};

Fishy.Preloader.prototype = {
    
    preload: function() {
        this.game.load.image('starfish', 'gfx/starfish.png');
        
        this.game.load.image('menu', 'gfx/menu.png');
        
        this.game.load.spritesheet('fishani', 'gfx/fishani.png', 60, 36);
        this.game.load.spritesheet('fish2ani', 'gfx/fish2ani.png', 49, 40);
        this.game.load.spritesheet('piranhaani', 'gfx/piranhaani.png', 64, 39);
        this.game.load.spritesheet('bubbles', 'gfx/bubbles.png', 96, 91);
        
        this.game.load.image('starfish', 'gfx/starfish.png');
        this.game.load.image('reef1', 'gfx/bg_reef1.png');
        this.game.load.image('reef2', 'gfx/bg_reef2_.png');
        this.game.load.image('reef3', 'gfx/bg_reef3_.png');
        this.game.load.image('playbutton', 'gfx/playbutton.png');
        
        this.game.load.image('intro-swipe', 'gfx/intro-swipe.png');
        this.game.load.image('intro-eatfish', 'gfx/intro-eatfish.png');
        this.game.load.image('intro-geteaten', 'gfx/intro-geteaten.png');
        this.game.load.image('intro-combo', 'gfx/intro-combo.png');
        
        this.game.load.image('fullscreen', 'gfx/fullscreen.png');
        
        
        this.loadWebFont();
        
        text.push("Welcome to Gulp!");
        text.push("Drag/Swipe the screen in the \n   direction you want to swim");
        text.push("Swim into a fish from the side \n   or from behind to eat it");
        text.push("If a fish swims head-first into \n   you, you'll be eaten");
        text.push("Starfish can't hurt you, but \n   eating them awards extra points");
        text.push("Eat multiple fish in a row \n   to multiply your score");
        text.push("Try to beat your high score!");
        
        images.push(null);
        images.push("intro-swipe");
        images.push("intro-eatfish");
        images.push("intro-geteaten");
        images.push("starfish");
        images.push("intro-combo");
        images.push(null);
        
    },
    
    create: function() {
        this.bg = this.game.add.sprite(0, 0, 'bg');
        this.game.input.onDown.add(this.screenTouch, this);
        
        mainText = this.game.add.text(this.game.world.centerX, this.game.world.centerY / 4, text[0]);
        mainText.anchor.setTo(0.5);
        var startFill = mainText.context.createLinearGradient(0, 0, 0, mainText.canvas.height * 4);
      //  startFill.addColorStop(1, '#6585BB');
        startFill.addColorStop(0, '#DDFFE9');
        mainText.strokeThickness = 4;
        mainText.stroke = '#000000';
        mainText.fill = startFill;
        
        var nextText = this.game.add.text(this.game.world.centerX, this.game.world.centerY * 1.75, "tap/click screen to continue");
        nextText.anchor.setTo(0.5);
        nextText.fill = '#ffffff';
    },
    
    
    update: function() {
        
    },
    
    loadWebFont: function() {
        //  The Google WebFont Loader will look for this object, so create it before loading the script.
        WebFontConfig = {

            //  'active' means all requested fonts have finished loading
            //  We set a 1 second delay before calling 'createText'.
            //  For some reason if we don't the browser cannot render the text the first time it's created.
            active: function() { this.game.time.events.add(Phaser.Timer.SECOND, createText, this); },

            //  The Google Fonts we want to load (specify as many as you like in the array)
            google: {
              families: ['Revalia', 'Passion One']
            }

        };   
    
            
    },
    
    screenTouch: function() {
        if (!this.num)
            this.num = 1;
        else
            this.num++;
        
        if (curImage)
                    curImage.kill();
        
        if (text[this.num]) {
            mainText.text = text[this.num];
            if (images[this.num]) {
                curImage = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, images[this.num]);
                curImage.anchor.setTo(0.5);
                curImage.scale.setTo(0.75);
            }
        } else {
            
            this.state.start('StartMenu'); 
        }
    }
};