let cv;
let ctx;

let lamps = [];
const r = 25;

class Bit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.state = 1;
  }

  show() {
    ctx.fillStyle = this.state ? 'black' : 'white';
    ctx.ellipse(this.x, this.y, this.r * 2);
  }

  update(x, y) {
    if (Math.dist(x, y, this.x, this.y) < this.r) {
      this.state = 1 - this.state;
      draw();
      updateNumber();
    }
  }
}

const setup = function() {
  cv = document.querySelector('canvas');
  ctx = cv.getContext('2d');
  for (let x = 50; x < cv.width - r; x += 2 * r + 10) {
    lamps.push(new Bit(x, 100));
  };

  updateNumber();

  cv.addEventListener('click', event => lamps.forEach(lamp => lamp.update(event.clientX - cv.offsetLeft, event.clientY - cv.offsetTop)));

  ctx.lineWidth = 10;
  ctx.strokeStyle = 'black';

  setInterval(draw, 100);
}

window.onload = setup;

const draw = function() {
  for (let lamp of lamps) lamp.show();
}

const updateNumber = () => document.getElementById('number').innerHTML = lamps.reduce((total, e, i) => total + Math.pow(2, lamps.length - 1 - i) * e.state, 0);