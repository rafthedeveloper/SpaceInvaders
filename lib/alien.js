(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Alien = SpaceInvaders.Alien = function (options) {
    options.radius = Alien.RADIUS;
    options.vel = [0,0]
    this.hasCollidedWith = false;
    SpaceInvaders.MovingObject.call(this, options);
    var spriteImage = new Image();
    spriteImage.src = "img/alien.png";
    this.sprite = spriteImage;
    this.firedRecently = true;
    this.movedDownFrames = 50;
    setTimeout(function(){
      this.firedRecently = false;
    }.bind(this), 5000);
    this.hp = options.hp;
    this.alreadyMoving = false;
    this.speedBoost = 1;
  };


  Alien.RADIUS = 16;

  SpaceInvaders.Util.inherits(Alien, SpaceInvaders.MovingObject);


  Alien.prototype.draw = function (ctx) {
    ctx.fillText(this.hp, this.pos[0], this.pos[1]);
    ctx.drawImage(this.sprite, this.pos[0], this.pos[1], 32, 32);
  };

  Alien.prototype.moveRight = function(){
    if (this.game.gameOver()) { return ;}
    console.log('moving right')
    this.vel = [.5 * this.speedBoost, 0];
    setTimeout(function(){
      this.moveLeft();
    }.bind(this), 32000 / this.speedBoost);
  }

  Alien.prototype.moveLeft = function(){
    if (this.game.gameOver()) { return ;}
    console.log('moving left')
    this.vel = [-.5 * this.speedBoost, 0];
    setTimeout(function(){
      this.moveDown();
    }.bind(this), 32000 / this.speedBoost);
  }

  Alien.prototype.moveDown = function(){
    if (this.game.gameOver()) { return ;}
    console.log('moving down')
    this.vel = [0, .1];
    setTimeout(function(){
      this.speedBoost += 1;
      this.moveRight();
    }.bind(this), 2000)
  }

  Alien.prototype.move = function () {
    if (this.movedDownFrames >= 0){
      this.movedDownFrames -= 1;
      this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]  + 1];
    }else if (this.alreadyMoving === false){
      this.alreadyMoving = true;
      this.moveRight();
    }
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  };


  Alien.prototype.fireBullet = function () {

    if (this.firedRecently){
      return ;
    }
    this.firedRecently = true;
    setTimeout(function(){
      this.firedRecently = false;
    }.bind(this), 5000);


    var relVel = SpaceInvaders.Util.scale(
      SpaceInvaders.Util.dir([0, 1]),
      SpaceInvaders.Bullet.SPEED
    );

    var laserVel = [
      relVel[0] + 0 , relVel[1]
    ];

    var laser = new SpaceInvaders.Laser({
      pos: [this.pos[0] + 24, this.pos[1] + 24],
      vel: laserVel,
      color: this.color,
      game: this.game
    });


    this.game.add(laser);


  };



  Alien.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof SpaceInvaders.Ship) {
      otherObject.takeDamage();
    }
  };
})();
