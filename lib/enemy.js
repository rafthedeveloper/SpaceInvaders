(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Asteroid = SpaceInvaders.Asteroid = function (options) {
    options.color = Asteroid.COLOR;
    options.radius = Asteroid.RADIUS;
    options.vel = [0, .05];
    this.hasCollidedWith = false;
    SpaceInvaders.MovingObject.call(this, options);
    var spriteImage = new Image();
    spriteImage.src = "img/enemy.png";
    this.sprite = spriteImage;
    this.firedRecently = false;
    this.hp = options.hp;

  };

  Asteroid.COLOR = "#505050";
  Asteroid.RADIUS = 40;
  Asteroid.SPEED = 1;

  SpaceInvaders.Util.inherits(Asteroid, SpaceInvaders.MovingObject);

  Asteroid.prototype.draw = function (ctx) {

    ctx.drawImage(this.sprite, this.pos[0], this.pos[1], 64, 64);
  };

  Asteroid.prototype.fireBullet = function () {

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
      relVel[0] + 0 , relVel[1] + 3
    ];

    var laser = new SpaceInvaders.Laser({
      pos: [this.pos[0] + 24, this.pos[1] + 24],
      vel: laserVel,
      color: this.color,
      game: this.game
    });


    this.game.add(laser);


  };

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof SpaceInvaders.Ship) {
      otherObject.takeDamage();
    } else if (otherObject instanceof SpaceInvaders.Asteroid){
      if (!this.hasCollidedWith){
        // this.vel = SpaceInvaders.Util.randomVec(Asteroid.SPEED);
        // otherObject.vel = [this.vel[1], this.vel[0]];
        // this.hasCollidedWith = true;
        // otherObject.hasCollidedWith = true;
        // setTimeout(function(){
        //   this.hasCollidedWith = false;
        //   otherObject.hasCollidedWith = false;
        // }.bind(this), 500);
      }
    }
  };
})();
