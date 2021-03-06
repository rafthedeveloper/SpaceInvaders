(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Laser = SpaceInvaders.Laser = function (options) {
    options.radius = Laser.RADIUS;

    SpaceInvaders.MovingObject.call(this, options);
    var spriteImage = new Image();
    spriteImage.src = "img/red_laser.png";
    this.sprite = spriteImage;
  };

  Laser.RADIUS = 5;
  Laser.SPEED = 15;

  SpaceInvaders.Util.inherits(Laser, SpaceInvaders.MovingObject);

  Laser.prototype.draw = function (ctx) {
    ctx.drawImage(this.sprite, this.pos[0], this.pos[1], 10, 10);
  };

  Laser.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof SpaceInvaders.Ship) {
      this.remove();
      otherObject.takeDamage();
    }
  };



  Laser.prototype.isWrappable = false;
})();
