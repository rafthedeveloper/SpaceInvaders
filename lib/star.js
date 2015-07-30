(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Star = SpaceInvaders.Star = function (options) {
    options.color = Star.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = Star.RADIUS;
    options.vel = options.vel || Star.vel;


    SpaceInvaders.MovingObject.call(this, options);
  };

  Star.COLOR = "#fff";
  Star.RADIUS = .25;
  Star.SPEED = 4;
  Star.vel = [10,10];

  SpaceInvaders.Util.inherits(Star, SpaceInvaders.MovingObject);

  // Star.prototype.change_dir = function (impulse) {
  //     this.vel[0] += impulse[0]/4;
  //     this.vel[1] += impulse[1]/4;
  // };

  Star.prototype.collideWith = function (otherObject) {

  };
})();
