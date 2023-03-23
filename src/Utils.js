/**
 * Allow to load an image asynchronously
 * @param {string} src Image source link
 * @returns A promise of the image loading
 */
export function loadImage (src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Draw a simple loading screen to the canvas
 * @param {CanvasRenderingContext2D} context The rendering context of canvas to draw
 */
export function drawLoadingScreen (context) {
  context.fillStyle = '#000';
  context.fillRect(0, 0, 1600, 900);
  context.fillStyle = '#fff';
  context.font = '120px sans-serif';
  context.fillText('LOADING', 537, 450);
}