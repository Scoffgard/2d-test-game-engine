import { loadImage } from './Utils.js';

/**
 * An object of the game (to be added to render list)
 */
export default class GameObject {

  /**
   * Create the game object
   * @param {string} spriteLink link to the image of the sprite
   * @param {float} posX position on X axis
   * @param {float} posY positiob on Y axis
   * @param {float} rot rotation
   * @param {string} [id] id of the gameobject
   * @param {number} [scale] scale of the object
   * @param {boolean} [isColliding] is object is colliding with player
   */
  constructor (spriteLink, posX, posY, rot, id = null, scale = 1, isColliding = false) {
    this.image = null;
    this.spriteLink = spriteLink;
    this.posX = posX;
    this.posY = posY;
    this.rot = rot;
    this.id = id;
    this.scale = scale;
    this.isColliding = isColliding;
  }

  /**
   * Load all the loadable components of game object
   * @returns The game object
   */
  async load () {
    this.image = (await loadImage(this.spriteLink));
    return this;
  }
}