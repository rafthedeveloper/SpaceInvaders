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
  Star.RADIUS = 0.25;
  Star.SPEED = 4;
  Star.vel = [10,10];

  SpaceInvaders.Util.inherits(Star, SpaceInvaders.MovingObject);



  Star.prototype.collideWith = function (otherObject) {

  };
})();
