(function() {
  'use strict';

  var WIDTH = 480;
  var HEIGHT = 260;

  var App;
  var app;

  var Car;
  var Ground;
  var Mountain;
  var Sun;
  var Label;

  Ground = function() {
    this.draw = function(ctx) {
      ctx.fillStyle = '#dedede';
      ctx.fillRect(0, 150, WIDTH, HEIGHT - 150);
    };
  };

  Label = function() {
    this.draw = function(ctx) {

      ctx.font = '14px Arial';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillText('Copyright dotinstall.com', 325, 250);
    };
  };

  Sun = function() {
    this.draw = function(ctx) {
      var g = ctx.createLinearGradient(420, 20, 420, 60);
      g.addColorStop(0.0, 'orange');
      g.addColorStop(1.0, 'yellow');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(420, 40, 20, 0, 2 * Math.PI);
      ctx.fill();
    };
  };

  Car = function(x, y) {
    this.x = x;
    this.y = y;
    var angle = 0;
    this.drawBody = function(ctx) {
      ctx.fillStyle = 'hsl(180, 55%, 30%)';
      ctx.fillRect(this.x, this.y, 100, 35);
      ctx.fillRect(this.x, this.y + 35, 130, 35);
    }
    this.drawWindows = function(ctx) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fillRect(this.x + 65, this.y + 10, 35, 25);
      ctx.fillRect(this.x + 30, this.y + 10, 25, 25);
    }
    this.drawTires = function(ctx) {
      //tires
      ctx.beginPath();
      ctx.arc(this.x + 25, this.y + 70, 15, 0, 2 * Math.PI);
      ctx.arc(this.x + 105, this.y + 70, 15, 0, 2 * Math.PI);

      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.shadowBlur = 5;
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.restore();
    }
    this.drawTireArc = function(ctx, offset) {
      // tire arc
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.save();
      ctx.translate(this.x + offset, this.y + 70);
      ctx.rotate(Math.PI / 180 * angle);
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0,Math.PI / 180 * 75);
      ctx.stroke();
      ctx.restore();
    }
    this.draw = function(ctx, isMoving) {
      this.drawBody(ctx);
      this.drawWindows(ctx);
      this.drawTires(ctx);
      this.drawTireArc(ctx, 25);
      this.drawTireArc(ctx, 105);
      if (isMoving) {
        this.x += 2;
        angle += 8;
      }
      if (this.x > WIDTH) {
        this.x = -100;
      }
    };
  };

  Mountain = function(x, y) {
    this.x = x;
    this.y = y;
    this.draw = function(ctx) {
      var g = ctx.createLinearGradient(this.x, this.y - 50, this.x, this.y + 30);
      g.addColorStop(0.0, 'green');
      g.addColorStop(1.0, 'lightgreen');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + 80, this.y - 50);
      ctx.lineTo(this.x + 200, this.y);
      ctx.fill();
      this.x -= 0.2;
      if (this.x + 200 < 0) {
        this.x = WIDTH;
      }
    };
  };
  App = function() {
    var ctx;
    var isMoving = false;
    this.car = new Car(100, 100);
    this.label = new Label();
    this.ground = new Ground();
    this.mountain = new Mountain(400, 150);
    this.sun = new Sun();
    this.img = new Image();
    this.img.src = 'img/sky.png';
    this.setup = function() {
      var stage = document.getElementById('stage');
      var dpr;
      if (typeof stage.getContext === 'undefined') {
        return;
      }
      ctx = stage.getContext('2d');
      dpr = window.devicePixelRatio || 1;
      stage.width = WIDTH * dpr;
      stage.height = HEIGHT * dpr;
      ctx.scale(dpr, dpr);
      stage.style.width = WIDTH + 'px';
      stage.style.height = HEIGHT + 'px';
      stage.addEventListener('click', function() {
        isMoving = !isMoving;
      });
    };
    this.draw = function() {
      ctx.fillStyle = ctx.createPattern(this.img, 'repeat');
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      this.sun.draw(ctx);
      this.mountain.draw(ctx);
      this.ground.draw(ctx);
      this.car.draw(ctx, isMoving);
      this.label.draw(ctx);
      setTimeout(function() {
        this.draw();
      }.bind(this), 10);
    }
  };

  app = new App();
  app.setup();


  app.img.addEventListener('load', function() {
    app.draw();
  });

})();
