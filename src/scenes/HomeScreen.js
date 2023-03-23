import { groundFolderLink, spriteFolderLink } from '../Constants.js';

const HomeScreen = [
  {
    link: groundFolderLink + 'grass.png',
    x: 0,
    y: 0,
    r: 0,
    iterate: {
      x: 5,
      y: 2,
    },
  },
  {
    link: groundFolderLink + 'grass.png',
    x: 64*7,
    y: 5*64,
    r: 0,
    iterate: {
      x: 5,
      y: 2,
    },
    isColliding: true,
  },
];

export default HomeScreen;