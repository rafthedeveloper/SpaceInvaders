(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var GameView = SpaceInvaders.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
  };




  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        if (gameView.game.gameOver()){ gameView.stop(); }
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 1000 / SpaceInvaders.Game.FPS
    );


  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
