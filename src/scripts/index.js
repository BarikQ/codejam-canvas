const SMALL_URL = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json';
const MEDIUM_URL = `https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json`;
const BIG_URL = `https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/image.png`;

(function main() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');


  ctx.imageSmoothingEnabled = false;
  canvas.width = 256;
  canvas.height = 256;

  const sizeItems = document.querySelectorAll('.size-item');

  sizeItems.forEach(elem => {
    elem.addEventListener('click', (event) => changeSize(elem, sizeItems, canvas, event));
  })

  reDraw(canvas, BIG_URL);
})();

function changeSize(elem, sizeItems, canvas, event) {
  const newSize = parseInt(event.target.id);

  if (elem.classList.contains('active')) return;
  else {
    sizeItems.forEach(element => {
      if (element.classList.contains('active')) element.classList.remove('active');
    })
    elem.classList.add('active');
  }

  switch (newSize) {
    case 4:
      reDraw(canvas, SMALL_URL);
      break;
    case 32:
      reDraw(canvas, MEDIUM_URL);
      break;
    case 256:
      reDraw(canvas, BIG_URL);
      break;
    default:
      console.log('gg');
  }

  // canvas.width = newSize;
  // canvas.height = newSize;
}

function reDraw(canvas, url) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 50, 50);
  if (url === BIG_URL) {
    fetch(url)
    .then(response => response.blob())
    .then(image => {
      const SRC = URL.createObjectURL(image);
      document.querySelector('#test').src = SRC;
  });
  } else {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
  });
  }
  // console.log(data);
}