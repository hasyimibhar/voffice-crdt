import { Application } from '@pixi/app';
import { Sprite } from '@pixi/sprite';
import { SpritesheetLoader } from '@pixi/spritesheet';
import { Container } from '@pixi/display';
import { Loader } from '@pixi/loaders';

import { Renderer } from '@pixi/core';
import { BatchRenderer } from '@pixi/core';
Renderer.registerPlugin('batch', BatchRenderer);

import { TickerPlugin } from '@pixi/ticker';
Application.registerPlugin(TickerPlugin)

// Create the application helper and add its render target to the page
let app = new Application({ width: 640, height: 640 });
document.body.appendChild(app.view);

const loader = new Loader();
loader.use(SpritesheetLoader.use);

import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

function ymapKey(x, y) {
  const idx = y*20 + x;
  return idx.toString();
}

function persistLayer(ydoc, layer, ymap) {
  ydoc.transact(() => {
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        const value = layer[y][x];
        ymap.set(ymapKey(x, y), value);
      }
    }
  });
}

const ydoc = new Y.Doc();
const provider = new WebrtcProvider('voffice-crdt', ydoc);

provider.on('synced', synced => {
  console.log('synced!', synced);
});

let layers = [];

// Background layer
layers.push([
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]);

// Foreground
layers.push([
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]);

// Players
layers.push([
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]);

const bgTextures = {
  0: 'ground.png',
  1: 'grass.png',
};

const fgTextures = {
  1: 'block.png',
  2: 'cactus.png',
};

loader
  .add('background', 'background.json')
  .load(setupBg);

let player = null;
let others = [];

const bgLayer = layers[0];
const fgLayer = layers[1];
const playersLayer = layers[2];

const bgContainer = new Container();
const fgContainer = new Container();

let playerTexture = null;

const playersYmap = ydoc.get('players', Y.Map);
if (playersYmap.size == 0) {
  persistLayer(ydoc, playersLayer, playersYmap);
}

playersYmap.observe(() => {
  const otherTiles = [];

  for (const o of others) {
    fgContainer.removeChild(o);
  }

  const tileX = player.position.x;
  const tileY = player.position.y;
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
      playersLayer[y][x] = playersYmap.get(ymapKey(x, y));
      if (playersLayer[y][x] > 0 && x != tileX && y != tileY) {
        otherTiles.push([x, y]);
      }
    }
  }

  if (otherTiles.length > others.length) {
    for (let i = 0; i < otherTiles.length - others.length; i++) {
      others.push(new Sprite(playerTexture));
    }
  }

  let oi = 0;
  for (const o of otherTiles) {
    const otherPlayer = others[oi];
    oi++;

    otherPlayer.position.set(o[0] * 32, o[1] * 32);
    fgContainer.addChild(otherPlayer);
  }

  fgContainer.children.sort(function(a, b) {
    if (a.position.y > b.position.y) return 1;
    if (a.position.y < b.position.y) return -1;
    if (a.position.x > b.position.x) return 1;
    if (a.position.x < b.position.x) return -1;
    return 0;
  });
});

function setupBg(ld, resources) {
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
      const id = bgLayer[y][x];
      const tile = new Sprite(resources['background'].textures[bgTextures[id]]);
      tile.position.set(x * 32, y * 32);
      app.stage.addChild(tile);
    }
  }

  app.stage.addChild(bgContainer);

  loader
    .add('foreground', 'foreground.json')
    .load(setupFg);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function spawnPlayer(resources) {
  playerTexture = resources['foreground'].textures['player.png'];
  player = new Sprite(playerTexture);
  fgContainer.addChild(player);

  let x = getRandomInt(0, 20);
  let y = getRandomInt(0, 20);
  while (playersYmap.get(ymapKey(x, y)) > 0 || fgLayer[y][x] > 0) {
    x = getRandomInt(0, 20);
    y = getRandomInt(0, 20);
  }

  player.position.set(x * 32, y * 32);

  const playerX = player.position.x;
  const playerY = player.position.y;
  const tileX = playerX / 32;
  const tileY = playerY / 32;
  playersLayer[tileY][tileX] = 1;
}

function setupFg(ld, resources) {
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
      const id = fgLayer[y][x];
      if (id > 0) {
        const texture = resources['foreground'].textures[fgTextures[id]];
        const tile = new Sprite(texture);

        if (texture.height > 32) {
          tile.anchor.set(0, (texture.height-32)/texture.height);
        }

        tile.position.set(x * 32, y * 32);
        fgContainer.addChild(tile);
      }
    }
  }

  spawnPlayer(resources);

  app.stage.addChild(fgContainer);
}

document.addEventListener('keydown', (event) => {
  let playerX = player.position.x;
  let playerY = player.position.y;

  const oldTileX = playerX / 32;
  const oldTileY = playerY / 32;

  switch (event.key) {
    case "Down":
    case "ArrowDown":
      playerY += 32;
      break;

    case "Up":
    case "ArrowUp":
      playerY -= 32;
      break;

    case "Left":
    case "ArrowLeft":
      playerX -= 32;
      break;

    case "Right":
    case "ArrowRight":
      playerX += 32;
      break;
  }

  const tileX = playerX / 32;
  const tileY = playerY / 32;

  if (fgLayer[tileY][tileX] == 0 && playersLayer[tileY][tileX] == 0) {
    player.position.set(playerX, playerY);
    playersLayer[oldTileY][oldTileX] = 0;
    playersLayer[tileY][tileX] = 1;

    ydoc.transact(() => {
      playersYmap.set(ymapKey(oldTileX, oldTileY), 0);
      playersYmap.set(ymapKey(tileX, tileY), 1);
    });
  
    fgContainer.children.sort(function(a, b) {
      if (a.position.y > b.position.y) return 1;
      if (a.position.y < b.position.y) return -1;
      if (a.position.x > b.position.x) return 1;
      if (a.position.x < b.position.x) return -1;
      return 0;
    });
  }
});
