let boardElement;

let currentBlock;
let fixedBlockArray;
let scoreElement;
let score;
let timer;

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_WIDTH = 30;
const BLOCK_HEIGHT = 30;
const GAME_SPEED = 1000;

const KEY_SPACE = 32;
const KEY_ARROW_LEFT = 37;
const KEY_ARROW_UP = 38;
const KEY_ARROW_RIGHT = 39;
const KEY_ARROW_DOWN = 40;
window.addEventListener('keydown', (e) => {
  keyDown(e);
}, false);

function keyDown(keyEvent) {
  switch (keyEvent.keyCode) {
    case KEY_ARROW_LEFT:
      keyEvent.preventDefault();
      currentBlock.moveLeft();
      break;
    case KEY_ARROW_RIGHT:
      keyEvent.preventDefault();
      currentBlock.moveRight();
      break;
    case KEY_ARROW_UP:
      keyEvent.preventDefault();
      currentBlock.rotate();
      break;
    case KEY_ARROW_DOWN:
      keyEvent.preventDefault();
      blockDown();
      break;
    case KEY_SPACE:
      keyEvent.preventDefault();
      while (true) {
        if (blockDown() === false) {
          break;
        }
      }
      break;
  }
  draw();
}

class Block {
  constructor() {
    this.posArray;
    this.currentPosition;
    this.posX = BOARD_WIDTH / 2 - 2;
    this.posY = 0;
    this.shapeSize = 4;
  }

  getBlockPosition() {
    if (!this.posArray) {
      return [];
    }
    let result = [];
    for (let y = 0; y < this.posArray.length; ++y) {
      for (let x = 0; x < this.posArray[y].length; ++x) {
        if (this.posArray[y][x] === 1) {
          result.push([this.posY + y, this.posX + x])
        }
      }
    }
    return result;
  }
  rotate() {
    // deepcopy
    let old = [];
    this.posArray.forEach((x, i) => {
      old.push([]);
      x.forEach(y => {
        old[i].push(y)
      })
    })

    for (let i = 0; i < this.shapeSize; ++i) {
      for (let j = 0 + i; j < this.shapeSize; ++j) {
        if (i === j)
          continue;
        let temp = this.posArray[i][j];
        this.posArray[i][j] = this.posArray[j][i];
        this.posArray[j][i] = temp;
      }
    }

    // reverse
    for (let i = 0; i < this.shapeSize / 2; ++i) {
      let temp =  this.posArray[i];
      this.posArray[i] = this.posArray[this.shapeSize - i - 1];
      this.posArray[this.shapeSize - i - 1] = temp;
    }

    // 충돌 체크
    const blockPosition = this.getBlockPosition();
    if (blockPosition.some(x => {
      // y 좌표
      if (x[0] >= BOARD_HEIGHT) {
        return true;
      }
      if (x[1] < 0 || x[1] >= BOARD_WIDTH) {
        return true;
      }

      if (fixedBlockArray[x[0]][x[1]] !== '') {
        return true;
      }
      return false;
    })) {
      this.posArray = old;
    }
  }
  moveSide(value) {
    let blockPosition = this.getBlockPosition();
    if (value === -1) {
      if (Math.min(...blockPosition.map(x => x[1])) === 0) {
        return;
      }
    } else {
      if (Math.max(...blockPosition.map(x => x[1])) === BOARD_WIDTH -1) {
        return;
      }
    }

    for (let i = 0; i < blockPosition.length; ++i) {
      if (fixedBlockArray[blockPosition[i][0]][blockPosition[i][1] + value] !== '') {
        return;
      }
    }

    this.posX += value;
  }

  moveLeft() {
    this.moveSide(-1);
  }

  moveRight() {
    this.moveSide(1);
  }
  tryBlockDown() {
    const blockPosition = this.getBlockPosition();
    for (let i = 0; i < blockPosition.length; ++i) {
      if (blockPosition[i][0] === BOARD_HEIGHT - 1) {
        return false;
      }
      if (fixedBlockArray[blockPosition[i][0] + 1][blockPosition[i][1]] !== '') {
        return false;
      }
    }
    return true;
  }
  blockDown() {
    if (this.tryBlockDown()) {
      this.posY += 1;
      return true;
    } else {
      return false;
    }
  }
  draw() {
    for (let y = 0; y < this.posArray.length; ++y) {
      for (let x = 0; x < this.posArray[y].length; ++x) {
        if (this.posArray[y][x] === 1) {
          setBlock(boardElement[this.posY + y][this.posX + x], this.color);
        }
      }
    }
  }
}

class BlockI extends Block {
  constructor(){
    super();
    this.color = '#9BACD2';
    this.shapeSize = 4;
    this.posArray = [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ];
  }
}

class BlockT extends Block {
  constructor(){
    super();
    this.color = '#FBE6C0';
    this.shapeSize = 3;
    this.posArray = [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
  }
}

class BlockA extends Block {
  constructor(){
    super();
    this.color = '#FF3213';
    this.shapeSize = 3;
    this.posArray = [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
      ];
  }
}

class BlockB extends Block {
  constructor(){
    super();
    this.color = '#FF971C';
    this.shapeSize = 3;
    this.posArray = [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ];
  }
}

class BlockL extends Block {
  constructor(){
    super();
    this.color = '#FFD500';
    this.shapeSize = 3;
    this.posArray = [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]
      ];
  }
}

class BlockR extends Block {
  constructor(){
    super();
    this.color = '#0341AE';
    this.shapeSize = 3;
    this.posArray = [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]
      ];
  }
}

class BlockM extends Block {
  constructor(){
    super();
    this.color = '#72CB3B';
    this.shapeSize = 2;
    this.posArray = [
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
  }
}

function setCell(e) {
  e.style.backgroundColor = 'white';
}

function setBlock(e, color) {
  e.style.backgroundColor = color;
}

function setFixedBlock(e, color) {
  e.style.backgroundColor = color;
}

function initBoard() {
  boardElement = [];
  let div = document.createElement('div');
  div.classList.add('board');
  for (let i = 0; i < BOARD_HEIGHT; ++i) {
    let rElement = document.createElement('div');
    rElement.style.width = (BOARD_WIDTH * BLOCK_WIDTH)+'px';
    rElement.style.height = BLOCK_HEIGHT + 'px';
    boardElement.push([]);

    for (let j = 0; j < BOARD_WIDTH; ++j) {
      let cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.style.width = BLOCK_WIDTH + 'px';
      cellElement.style.height = BLOCK_HEIGHT + 'px';

      rElement.appendChild(cellElement);
      boardElement[i].push(cellElement);
    }
    div.appendChild(rElement);
  }
  document.querySelector('body').appendChild(div);
}

function initScore() {
  score = 0;
  scoreElement = document.createElement('div');
  scoreElement.classList.add('score');
  scoreElement.textContent = `Score: ${score}`;
  document.querySelector('.board').appendChild(scoreElement);
}

function initFixedBoard() {
  fixedBlockArray = [];
  for (let i = 0; i < BOARD_HEIGHT; ++i) {
    fixedBlockArray.push([]);
    for (let j = 0; j < BOARD_WIDTH; ++j) {
      fixedBlockArray[i].push('');
    }
  }
}

function draw() {
  drawBoard();
  currentBlock.draw();
}

function drawScore() {
  scoreElement.textContent = `Score: ${score}`;
}

function drawBoard() {
  for (let i = 0; i < boardElement.length; ++i) {
    for (let j = 0; j < boardElement[i].length; ++j) {
      if (fixedBlockArray[i][j] !== '') {
        setFixedBlock(boardElement[i][j], fixedBlockArray[i][j]);
      } else {
        setCell(boardElement[i][j]);
      }
    }
  }
}

function blockDown() {
  if (currentBlock.blockDown() === false) {
    addFixedBlock(currentBlock);
    tryClearBlockLine(currentBlock.getBlockPosition().map(x => x[0]));
    makeBlock();
    return false;
  };
  return true;
}

const blockList = [BlockI, BlockT, BlockA, BlockB, BlockL, BlockR, BlockM];
function makeBlock() {
  const blockType = Math.floor(Math.random() * 7);
  let block = new blockList[blockType];
  currentBlock = block;
  checkGameOver();
}

function checkGameOver() {
  const blockPosition = currentBlock.getBlockPosition();
  for (let i = 0; i < blockPosition.length; ++i) {
    if (fixedBlockArray[blockPosition[i][0]][blockPosition[i][1]] !== '') {
      alert('game Over');
      restartGame();
      return;
    }
  }
}

function restartGame() {
  clearInterval(timer);
  document.querySelector('.board').remove();
  init();
}

function addFixedBlock(block) {
  const blockPosition = block.getBlockPosition();
  if (blockPosition) {
    for (let i = 0; i < blockPosition.length; ++i) {
      fixedBlockArray[blockPosition[i][0]][blockPosition[i][1]] = block.color;
    }
  }
}

function tryClearBlockLine(yArray) {
  yArray = [...new Set(yArray)]
  const result = yArray.filter(x => fixedBlockArray[x].every(e => e !== ''));

  result.forEach(y => {
    for (let i = 0; i < fixedBlockArray[y].length; ++i) {
      fixedBlockArray[y][i] = 0;
    }
    // i-1부터 0까지 반복하면서 아래로 넣는다.
    for (let i = y; i > 0; --i) {
      for (let j = 0; j < fixedBlockArray[i].length; ++j) {
        fixedBlockArray[i][j] = fixedBlockArray[i - 1][j]
      }
    }
  });

  if (result.length > 0) {
    score += result.length;
    drawScore();
  }
}

function run() {
  timer = setInterval(() => {
    blockDown();
    draw();
  }, GAME_SPEED);
}

function init() {
  initBoard();
  initScore();
  initFixedBoard();
  makeBlock();
  draw();
  run();
};

init();
