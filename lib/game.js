(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Game = SpaceInvaders.Game = function () {
    this.enemies = [];
    this.bullets = [];
    this.ships = [];
    this.stars = [];
    this.currentLevel = 1;
    this.score = 0;
    this.lives = 3;
    this.kills = 0;
    this.addStars();
    this.addEnemies();
    this.enemiesBeingAdded = false;
  };

  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_ENEMIES = 8;
  Game.NUM_STARS = 100;

  Game.prototype.add = function (object) {
    if (object instanceof SpaceInvaders.Enemy) {
      this.enemies.push(object);
    } else if (object instanceof SpaceInvaders.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof SpaceInvaders.Ship) {
      this.ships.push(object);
    } else if (object instanceof SpaceInvaders.Star) {
      this.stars.push(object);
    } else if (object instanceof SpaceInvaders.Laser){

      this.bullets.push(object);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.addEnemies = function () {
      for (var i = 0; i < Game.NUM_ENEMIES; i++) {
        this.add(new SpaceInvaders.Enemy({
          game: this, pos: [100 * i + 100, 0], hp: this.currentLevel * 100
        }));
      }

      for (i = 0; i < Game.NUM_ENEMIES - 1; i++) {
        this.add(new SpaceInvaders.Enemy({
          game: this, pos: [100 * i + 148, 80], hp: this.currentLevel * 100
        }));
      }
  };

  Game.prototype.addStars = function(){
    for (var i = 0; i < Game.NUM_STARS; i++) {
      this.add(new SpaceInvaders.Star({ game: this, vel: [0,2.4] }));
    }

    for (var i = 0; i < Game.NUM_STARS; i++) {
      this.add(new SpaceInvaders.Star({ game: this, vel: [0,5] }));
    }

    for (var i = 0; i < Game.NUM_STARS; i++) {
      this.add(new SpaceInvaders.Star({ game: this, vel: [0,10] }));
    }

  };

  Game.prototype.addShip = function () {
    var ship = new SpaceInvaders.Ship({
      pos: [475, 500],
      game: this
    });

    this.add(ship);

    return ship;
  };

  Game.MOVES = {
    "up": [ 0, -0.5],
    "left": [-0.5,  0],
    "down": [ 0,  0.5],
    "right": [ 0.5,  0],
  };


  Game.prototype.allObjects = function () {
    return [].concat(this.stars, this.ships, this.enemies, this.bullets);
  };

  Game.prototype.handleKeyInput = function () {

    var ship = this.ships[0];

    var move;


    if(input.isDown('LEFT') || input.isDown('a')) {
      move = Game.MOVES.left;
      ship.power(move);
    }

    if(input.isDown('RIGHT') || input.isDown('d')) {
      move = Game.MOVES.right;
      ship.power(move);
    }

    if(input.isDown('SPACE')){
        if (ship.firedRecently === false){
          ship.fireBullet();
        }
    }

    if (!input.isDown('a') && !input.isDown('LEFT') &&
        !input.isDown('d') && !input.isDown('RIGHT'))
    {
      ship.decelerate();
    }

  };

  Game.prototype.enemiesFire = function(){
    for (var i = 0; i < this.enemies.length; i++){
      if (Math.random() >= .95){
        this.enemies[i].fireBullet();
      }
    }
  };


  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          // don't allow self-collision
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  Game.prototype.remove = function (object) {
    if (object instanceof SpaceInvaders.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof SpaceInvaders.Enemy) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof SpaceInvaders.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else if (object instanceof SpaceInvaders.Laser){
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else {
        throw "wtf?";
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    this.handleKeyInput();
    this.enemiesFire();
    if (this.enemies.length === 0 && this.enemiesBeingAdded === false){
        this.enemiesBeingAdded = true;
        this.currentLevel += 1;
        this.speedUpStars();
        setTimeout(function(){
          this.addEnemies();
          this.enemiesBeingAdded = false;
        }.bind(this), 3000);
    }
    $("#lives").html(this.lives);
    $("#score").html(this.score);
    $("#level").html(this.currentLevel);

  };

  Game.prototype.speedUpStars = function(){
    for (var i = 0; i < this.stars.length; i++){
      this.stars[i].vel[1] *= 5;
    }

    setTimeout(function(){
      for (var i = 0; i < this.stars.length; i++){
        this.stars[i].vel[1] /= 5;
      }
    }.bind(this), 3000)
  }

  Game.prototype.wrap = function (pos) {
    return [
      wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
    ];

    function wrap(coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }
  };

  Game.prototype.gameOver = function(){
    return this.lives <= 0;
  };
})();
