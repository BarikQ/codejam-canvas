const SMALL_URL = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json';
const MEDIUM_URL = `https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json`;
const BIG_URL = `https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/image.png`;

(function main() {
  let canvas = document.querySelector('#canvas');
  let ctx = canvas.getContext('2d');

  ctx.imageSmoothingEnabled = false;
  canvas.width = parseInt(document.querySelector('.active').id);
  canvas.height = parseInt(document.querySelector('.active').id);

  const sizeItems = document.querySelectorAll('.size-item');

  sizeItems.forEach(elem => {
    elem.addEventListener('click', (event) => changeSize(elem, sizeItems, canvas, event));
  })

  reDraw(canvas, MEDIUM_URL);
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
  canvas.width = newSize;
  canvas.height = newSize;

  switch (newSize) {
    case 4:
      reDraw(canvas, SMALL_URL);
      break;
    case 32:
      reDraw(canvas, MEDIUM_URL);
      break;
    case 512:
      reDraw(canvas, BIG_URL);
      break;
    default:
      console.log('error');
  }
}

function reDraw(canvas, url) {
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (url === BIG_URL) {
    const IMAGE = new Image();
    fetch(url)
      .then(response => response.blob())
      .then(data => URL.createObjectURL(data))
      .then(imageSrc => {
        IMAGE.src = imageSrc
        return IMAGE;
      })
      .then(image => {
        image.onload = () => {
          ctx.drawImage(image, 128, 128);
        }
      });
  } else {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.forEach((elem, i) => {
          elem.forEach((color, j) => {
            if (url === SMALL_URL) {
              ctx.fillStyle = `#${color}`;
            } else {
              let rgbColor = `rgba(`;
              color.forEach((rgb, index) => {
                if (index !== 3) rgbColor += `${rgb},`;
                else {
                  rgbColor += `${rgb})`;
                }
              });
              ctx.fillStyle = rgbColor;
            }
            ctx.fillRect(i, j, 1, 1);
          });
        });
      });
  }
}