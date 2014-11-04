var game = { 
  background: "#FFFFFF",
  objects: {
    ball: { 
      radius: 10,
      color: "black",
      pos: { 
        x: 500,
        y: 400
      },
      vel: {
        x: 3,
        y: 4 
      }
    },
    p1: {
      color: "black",
      width: 10,
      height: 50,
      pos: {
        x: 25,
        y: 0,
      }
    },
    p2: {
      color: "black",
      width: 10,
      height: 50,
      pos: {
        x: 0,
        y: 0
      }
    }
  }
};
var max_speed = 5;

var left = { x: max_speed, y: 0 };

var loop = game_loop;

(function main() { 
  game.canvas  = document.getElementById("canvas");
  game.context = game.canvas.getContext('2d');
  game.objects.p2.pos.x = canvas.width - 25;
  var ball = game.objects.ball;
  ball.pos.x = canvas.height / 2;
  ball.pos.y = canvas.width / 2;
  ball.vel = left;
  game.objects.p1.pos.y = canvas.height / 2 + 60;
  game.objects.p2.pos.y = canvas.height / 2 + 60;
  window.requestAnimationFrame(loop);    
})()

function game_loop(timeStamp) { 
  update(timeStamp, game);
  paint(game);
  window.requestAnimationFrame(loop);
}

function paint(game) {
  var context = game.context;
  clear(game.canvas);
  draw_rect(game.objects.p1, context);
  draw_rect(game.objects.p2, context);
  draw_circle(game.objects.ball, context);
}

function draw_rect(player, context) {
  context.fillStyle = player.color;
  context.fillRect(player.pos.x, player.pos.y, player.width, player.height);
}

function draw_circle(ball, context) {
  context.beginPath();
  context.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI, false);
  context.fillStyle = ball.color;
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = ball.color;
  context.stroke();
}

function check_y_collision(ball, player) {
    if ((ball.pos.y <= player.pos.y + player.height) && (ball.pos.y >= player.pos.y)) {
      return true;
    }
    return false;
}
function set_y_velocity(ball, player) {
      ball.vel.y = (ball.pos.y - player.pos.y + (player.height / 2)) / 10;
}

function update(timeStamp, game) { 
  var ball = game.objects.ball;
  var p1   = game.objects.p1;
  var p2   = game.objects.p2;
  var width  = game.canvas.width;
  var height = game.canvas.height;
  if (ball.pos.x <= p1.pos.x) {
    if (check_y_collision(ball, p1)) {
      set_y_velocity(ball, p1);
      ball.vel.x = -ball.vel.x;
    }
  }

  if (ball.pos.x >= p2.pos.x) {
    if (check_y_collision(ball, p2)) {
      set_y_velocity(ball, p2);
      ball.vel.x = -ball.vel.x;
    }
  }

  if (ball.pos.x < 0) ball.vel.x = -ball.vel.x;  
  if (ball.pos.y < 0) ball.vel.y = -ball.vel.y;
  if (ball.pos.x > width) ball.vel.x = -ball.vel.x;
  if (ball.pos.y > height) ball.vel.y = -ball.vel.y;
  ball.pos.x += ball.vel.x;
  ball.pos.y += ball.vel.y;
}

function clear(canvas) {
  var context = canvas.getContext('2d');
  context.fillStyle = game.background;
  context.fillRect(0, 0, canvas.width, canvas.height);
}
