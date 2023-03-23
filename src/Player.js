import GameObject from './GameObject.js';

import {
  spriteFolderLink,
  moveRatio,
  upKeys,
  downKeys,
  leftKeys,
  rightKeys,
} from './Constants.js';

const Player = async (updateElement, moveCamera, draw, addToRenderList, checkCollide) => {

  let cameraPos = {
    x: 0,
    y: 0,
  }

  const playerSpriteData = {
    link: spriteFolderLink + 'face.png',
    x: 0, 
    y: 0,
    r: 0,
    id: 'player'
  };
  const playerGO = await (new GameObject(playerSpriteData.link, playerSpriteData.x, playerSpriteData.y, undefined, 'player')).load();
  addToRenderList(playerGO);
  
  window.addEventListener('keydown', (e) => {
    const estimatedPosition = {...cameraPos};

    if (upKeys.includes(e.key)) estimatedPosition.y+=moveRatio;
    if (downKeys.includes(e.key)) estimatedPosition.y-=moveRatio;
    if (leftKeys.includes(e.key)) estimatedPosition.x+=moveRatio;
    if (rightKeys.includes(e.key)) estimatedPosition.x-=moveRatio;

    const isMoveAllowed = checkCollide(-estimatedPosition.x, -estimatedPosition.y);
    
    if (isMoveAllowed) {
      updateElement('player', undefined, -estimatedPosition.x, -estimatedPosition.y)
      moveCamera(estimatedPosition.x, estimatedPosition.y);
      draw();
      cameraPos = {...estimatedPosition}
    }
  });
};

export default Player;