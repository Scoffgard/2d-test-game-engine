import Drawer from './src/Drawer.js';

import Player from './src/Player.js';

import HomeScreen from './src/scenes/HomeScreen.js';

import { drawLoadingScreen } from './src/Utils.js';

console.log('Hello world !');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const {
  addToRenderList,
  checkCollide,
  draw,
  moveCamera,
  processScene,
  updateElement,
} = Drawer(context, 1600, 900);

(async () => {
  drawLoadingScreen(context);

  await processScene(HomeScreen);
  
  await Player(updateElement, moveCamera, draw, addToRenderList, checkCollide);
  
  draw();
})();