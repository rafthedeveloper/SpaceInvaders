(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var GameView = SpaceInvaders.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;

    this.timerId = null;
  };




  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        if (gameView.game.gameOver()){
          $(".game-over").css("display", "block");

          $("#restart-game").on("click", function(){
            $(".game-over").css("display", "none");
            gameView.game.restart();
          });
        }
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 1000 / SpaceInvaders.Game.FPS
    );


  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
