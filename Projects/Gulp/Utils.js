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

function Fishy_textOver() {
    text.fill = '#ff00ff';
}

function Fishy_textOut() {
    text.fill = grd;
}