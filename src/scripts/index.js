(function main() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  canvas.width = 256;
  canvas.height = 256;

  const sizeItems = document.querySelectorAll('.size-item');

  sizeItems.forEach(elem => {
    elem.addEventListener('click', (event) => setSize(elem, sizeItems, canvas, event));
  })

  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, 50, 50);
})();

function setSize(elem, sizeItems, canvas, event) {
  const newSize = parseInt(event.target.id);
  console.log(elem, sizeItems);
  if (elem.classList.contains('active')) return;
  else {
    sizeItems.forEach(element => {
      if (element.classList.contains('active')) element.classList.remove('active');
    })
    elem.classList.add('active');
  }
  
  canvas.width = newSize;
  canvas.height = newSize;
}