var textMap = {};

function createTextMap(game, lang) {
    var lines = game.cache.getText(lang).split('\n');
    for (var i = 0; i < lines.length; i++) {
        textMap[lines[i].split('+')[0]] = lines[i].split('+')[1];  
    }
}

function createText(game) {
    scoreText = game.add.text(86, 915, textMap['score'] + ' 0    ');
    scoreText.anchor.setTo(0.5);

    scoreText.font = 'Revalia';
    scoreText.fontSize = 40;

    //  x0, y0 - x1, y1
    grd = scoreText.context.createLinearGradient(0, 0, 0, scoreText.canvas.height);
    grd.addColorStop(0, '#8ED6FF');   
    grd.addColorStop(1, '#004CB3');
    scoreText.fill = grd;

    scoreText.align = 'center';
    scoreText.stroke = '#000000';
    scoreText.strokeThickness = 2;
    scoreText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    scoreText.inputEnabled = true;
    scoreText.input.enableDrag();

    scoreText.events.onInputOver.add(over, this);
    scoreText.events.onInputOut.add(out, this);

}

function out() {
    scoreText.fill = grd;
}

function over() {
    scoreText.fill = '#ff00ff';
}