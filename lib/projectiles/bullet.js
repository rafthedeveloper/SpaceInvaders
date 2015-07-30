(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Bullet = SpaceInvaders.Bullet = function (options) {
    options.radius = Bullet.RADIUS;

    SpaceInvaders.MovingObject.call(this, options);
    var spriteImage = new Image();
    spriteImage.src = "img/energy_ball.png";
    this.sprite = spriteImage;
  };

  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  SpaceInvaders.Util.inherits(Bullet, SpaceInvaders.MovingObject);

  Bullet.prototype.draw = function (ctx) {
    ctx.drawImage(this.sprite, this.pos[0], this.pos[1], 16, 16);
  };

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof SpaceInvaders.Asteroid) {
      this.remove();

      otherObject.hp -= 50;

      if (otherObject.hp === 0){
        otherObject.remove();
        this.game.score += 100;
        this.game.kills += 1;
      }


    }
  };



  Bullet.prototype.isWrappable = false;
})();
