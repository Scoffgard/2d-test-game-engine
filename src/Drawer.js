import GameObject from './GameObject.js';

import {
  spriteSize,
  baseCameraOffsets,
} from './Constants.js';

/**
 * Handle all the drawing operations from the game
 * @param {Context2D} context The context of the canvas
 * @param {number} width The width of the drawing zone
 * @param {number} height The height of the drawing zone
 */
const Drawer = (context, width, height) => {
  
  const renderList = [];

  const camera = {
    offset : {
      x: 0,
      y: 0,
    }
  }

  /**
   * Allow to add elements to the render list
   * @param {*} element The element to add to render list
   * @returns {number} Id of the element in the render list
   */
  const addToRenderList = (element) => {
    renderList.push(element);
    return renderList.length - 1;
  }

  /**
   * Render the canvas
   */
  const draw = () => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    for (const element of renderList) {
      context.drawImage(
        element.image,
        element.posX + camera.offset.x + baseCameraOffsets.x,
        element.posY + camera.offset.y + baseCameraOffsets.y,
        spriteSize * element.scale,
        spriteSize * element.scale,
      );
    }
  }
  
  /**
   * Add scene content to render list 
   * @param {Scene} scene A list of things convertisable to game objects
   */
  const processScene = async (scene) => {
    for (const element of scene) {
      if (element.iterate) {
        for (let x = 0; x < element.iterate.x; x++) {
          for (let y = 0; y < element.iterate.y; y++) {            
            renderList.push(await (new GameObject(
              element.link,
              element.x + (x * spriteSize * (element.scale || 1)),
              element.y + (y * spriteSize * (element.scale || 1)),
              element.rot,
              element.id,
              element.scale,
              element.isColliding,
            )).load());
          }

        }
      } else {
        renderList.push(await (new GameObject(
            element.link,
            element.x,
            element.y,
            element.rot,
            element.id,
            element.scale,
            element.isColliding,
        )).load());       
      }
    }
  }

  /**
   * Allow to modify an element of the render list based on his id
   * @param {string} id id of the element
   * @param {string} spriteLink link to the sprite image
   * @param {float} posX position on the X axis
   * @param {float} posY position on the Y axis
   * @param {float} rot rotation on the element
   */
  const updateElement = (id, spriteLink = null, posX = null, posY = null, rot = null) => {
    if (!id) throw new Error('Please provide an id to modify an element');

    const index = renderList.map((e) => e.id).indexOf(id);

    if (spriteLink != null) renderList[index].spriteLink = spriteLink;
    if (posX != null) renderList[index].posX = posX;
    if (posY != null) renderList[index].posY = posY;
    if (rot != null) renderList[index].rot = rot;
  }

  const moveCamera = (x, y) => {
    camera.offset.x = x;
    camera.offset.y = y;
  }

  const checkCollide = (x, y) => {
    const elementToCheck = renderList.filter((e, i) => e.posX == x && e.posY == y);

    if (!elementToCheck[0]) return true;
    if (!elementToCheck[0].isColliding) return true;

    return false;
  }

  return {
    addToRenderList,
    checkCollide,
    draw,
    moveCamera,
    processScene,
    updateElement,
  }
}

export default Drawer;