(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  function randomColor() {
    var hexDigits = "0123456789ABCDEF";

    var color = "#";
    for (var i = 0; i < 3; i ++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
  }

  var Ship = SpaceInvaders.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    SpaceInvaders.MovingObject.call(this, options)
    this.lives = 3;
    this.firedRecently = false;
    var spriteImage = new Image();
    spriteImage.src = "img/ship.png";
    this.sprite = spriteImage;

  };


  Ship.RADIUS = 25;

  SpaceInvaders.Util.inherits(Ship, SpaceInvaders.MovingObject);

  Ship.prototype.draw = function (ctx) {

ctx.drawImage(this.sprite, this.pos[0], this.pos[1], 50, 50);

  };

  Ship.prototype.fireBullet = function () {

    this.firedRecently = true;
    setTimeout(function(){
      this.firedRecently = false;
    }.bind(this), 150);


    var relVel = SpaceInvaders.Util.scale(
      SpaceInvaders.Util.dir([0, -1]),
      SpaceInvaders.Bullet.SPEED
    );

    var bulletVel = [
      relVel[0] + 0 , relVel[1] + 1
    ];

    var bullet = new SpaceInvaders.Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    var secondBullet = new SpaceInvaders.Bullet({
      pos: [this.pos[0] + 30, this.pos[1]],
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);
    this.game.add(secondBullet);

  };

  Ship.prototype.power = function (impulse) {

      this.vel[0] += impulse[0];
      this.vel[1] += impulse[1];

      if (this.vel[0] < -20 ){
        this.vel[0] = -20;
      }else if (this.vel[0] > 20 ){
        this.vel[0] = 20;
      }
  };

  Ship.prototype.decelerate = function(){
    if (this.vel[0] > 0){
      this.vel[0] -= .25;
    }

    if (this.vel[0] < 0){
      this.vel[0] += .25;
    }


  };


  Ship.prototype.takeDamage = function () {
    this.game.lives -= 1;
    this.pos = [475, 500];
  };


})();
