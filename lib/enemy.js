(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Enemy = SpaceInvaders.Enemy = function (options) {
    options.color = Enemy.COLOR;
    options.radius = Enemy.RADIUS;
    options.vel = [0, .05];
    this.hasCollidedWith = false;
    SpaceInvaders.MovingObject.call(this, options);
    var spriteImage = new Image();
    spriteImage.src = "img/enemy.png";
    this.sprite = spriteImage;
    this.firedRecently = true;
    this.movedDownFrames = 50;
    setTimeout(function(){
      this.firedRecently = false;
    }.bind(this), 5000);
    this.hp = options.hp;

  };

  Enemy.COLOR = "#505050";
  Enemy.RADIUS = 40;
  Enemy.SPEED = 1;

  SpaceInvaders.Util.inherits(Enemy, SpaceInvaders.MovingObject);

  Enemy.prototype.draw = function (ctx) {

    ctx.drawImage(this.sprite, this.pos[0], this.pos[1], 64, 64);
  };

  Enemy.prototype.move = function () {
    if (this.movedDownFrames >= 0){
      this.movedDownFrames -= 1;
      this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]  + 1];
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


  Enemy.prototype.fireBullet = function () {

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



  Enemy.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof SpaceInvaders.Ship) {
      otherObject.takeDamage();
    }
  };
})();
