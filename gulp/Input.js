Fishy.Input = function(game) {
    this.game = game;  
    this.isDown = false;
    this.startX;
    this.startY;
    this.dx;
    this.dy;
    this.threshold = 20;
    
    this.dragEvents = [];
   
};

Fishy.Input.prototype = {
    
    update: function() {
        if (this.isDown)
            this.updateTouching();
        else
            this.updateNoTouch();
    },
    
    updateTouching: function() {
        if (this.game.input.activePointer.isDown) {
           // this.checkDrag();   
        } else {
            this.checkUp(this.game.input.activePointer.x - this.startX, this.game.input.activePointer.y - this.startY);
            this.isDown = false;
        }
    },
    
    checkUp: function(dx, dy) {
        if (Math.abs(dx) > Math.abs(dy)) {
            if (Math.abs(dx) > this.threshold) {
                if (dx > 0) {
                    this.dragEvents.push(Direction.RIGHT);
                } else {
                    this.dragEvents.push(Direction.LEFT);         
                }
            }
        } else {
            if (Math.abs(dy) > this.threshold) {
                if (dy > 0) {
                    this.dragEvents.push(Direction.DOWN);
                } else {
                    this.dragEvents.push(Direction.UP);
                }
            }
        }
    },
    
    updateNoTouch: function() {
        if (this.game.input.activePointer.isDown) {
            this.isDown = true;
            this.startX = this.game.input.activePointer.x;
            this.startY = this.game.input.activePointer.y;
        }
    },
    
    checkDrag: function() {
        if (this.game.input.activePointer.x - this.startX > this.threshold) {
            this.dragEvents.push(Direction.RIGHT);
        } else if (this.game.input.activePointer.x - this.startX < -this.threshold) {
            this.dragEvents.push(Direction.LEFT);
        }
        
        if (this.game.input.activePointer.y - this.startY > this.threshold) {
            this.dragEvents.push(Direction.DOWN);
        } else if (this.game.input.activePointer.y - this.startY < -this.threshold) {
            this.dragEvents.push(Direction.UP);
        }
    },
    
    getDragEvent: function() {
        if (this.dragEvents.length < 1) {
            return -1;
        } else {
            return this.dragEvents.shift();
        }
    }
}

function dragEvent(dir) {
    this.direction = dir;   
}

