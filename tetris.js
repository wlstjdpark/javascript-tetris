// 디자인 참고
// https://www.freetetris.org/game.php

let cellArray;
let boardElement;

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_WIDTH = 20;
const BLOCK_HEIGHT = 20;

class Block {
  constructor() {
    this.blockClass = '';
    this.colorType = -1;
    this.currentRoateIndex = 0;
    this.posArray;
    this.currentPosition;
    this.posX = BOARD_WIDTH / 2 - 2;
    this.posY = 0;
  }

  getBlockPosition() {
    if (!this.posArray) {
      return;
    }
    let result = []
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
    if (true) {
      for (let i = 0; i < this.posArray.length; ++i) {
        for (let j = 0 + i; j < this.posArray.length; ++j) {
          if (i === j)
            continue;
          let temp = this.posArray[i][j];
          this.posArray[i][j] = this.posArray[j][i];
          this.posArray[j][i] = temp;
        }
      }
      this.posArray.reverse();
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

let blockArray = [];
let fixedBlockArray = [];

class BlockI extends Block {
  constructor(){
    super();
    this.color = 'orangered';
    this.posArray = [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
      ];
  }
}

class BlockT extends Block {
  constructor(){
    super();
    this.color = 'lightgray';
    this.posArray = [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
      ];
  }
}

class BlockA extends Block {
  constructor(){
    super();
    this.color = 'skyblue';
    this.posArray = [
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ];
  }
}

class BlockB extends Block {
  constructor(){
    super();
    this.color = 'green';
    this.posArray = [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
      ];
  }
}

class BlockL extends Block {
  constructor(){
    super();
    this.color = 'violet';
    this.posArray = [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ];
  }
}

class BlockR extends Block {
  constructor(){
    super();
    this.color = 'blue';
    this.posArray = [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ];
  }
}

class BlockM extends Block {
  constructor(){
    super();
    this.color = 'darkolivegreen';
    this.posArray = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
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
  console.log('initBoard');
  boardElement = [];
  cellArray = [];
  const div = document.createElement('div');
  for (let i = 0; i < BOARD_HEIGHT; ++i) {
    let rElement = document.createElement('div');
    rElement.style.width = (BOARD_WIDTH * BLOCK_WIDTH)+'px';
    rElement.style.height = BLOCK_HEIGHT + 'px';
    boardElement.push([]);
    cellArray.push([]);

    for (let j = 0; j < BOARD_WIDTH; ++j) {
      let cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.style.width = BLOCK_WIDTH + 'px';
      cellElement.style.height = BLOCK_HEIGHT + 'px';

      rElement.appendChild(cellElement);
      boardElement[i].push(cellElement);
      cellArray[i].push(0);
    }
    div.appendChild(rElement);
  }
  document.querySelector('body').appendChild(div);
}

function getBlockWidth(block) {
  let maxX = 0;
  block.forEach(x => maxX = (maxX < x[0] ? x[0] : maxX) + 1);
  return maxX;
}

function drawBoard() {
  // board
  // 다시 그리지 말자 (성능 최악)
  for (let i = 0; i < boardElement.length; ++i) {
    for (let j = 0; j < boardElement[i].length; ++j) {
      if (fixedBlockArray[i][j] !== 0) {
        setFixedBlock(boardElement[i][j], currentBlock.color);
      } else {
        setCell(boardElement[i][j]);
      }
    }
  }

  // currentBlock
  currentBlock.draw();
}

const KEY_SPACE = 32;
const KEY_ARROW_LEFT = 37;
const KEY_ARROW_UP = 38;
const KEY_ARROW_RIGHT = 39;
const KEY_ARROW_DOWN = 40;
window.addEventListener('keydown', (e) => {
  keyDown(e.keyCode);
}, false);


function keyDown(keyCode) {
  // 원하는 방향으로 갈 수 있는가?

  // 간다.
  switch (keyCode) {
    case KEY_ARROW_LEFT:
      moveLeft();
      break;
    case KEY_ARROW_UP:
      currentBlock.rotate();
      break;
    case KEY_ARROW_RIGHT:
      moveRight();
      break;
    case KEY_ARROW_DOWN:
      if (blockDown() === false) {
        tryClearBlockLine(currentBlock.getBlockPosition().map(x => x[0]));
        makeBlock();
      };
      break;
    case KEY_SPACE:
      while (true) {
        if (blockDown() === false) {
          tryClearBlockLine(currentBlock.getBlockPosition().map(x => x[0]));
          makeBlock();
          break;
        };
      }
  }
  drawBoard();
}

function rotateBlock() {
  // 일자 블럭인 경우

}


let timer;
function run() {
  timer = setInterval(() => {
    if (blockDown() === false) {
      makeBlock();
    };
    drawBoard();

  }, 1000)
}

function moveSide(value) {
  let blockPosition = currentBlock.getBlockPosition();
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
    if (fixedBlockArray[blockPosition[i][0]][blockPosition[i][1] + value] !== 0) {
      return;
    }
  }

  currentBlock.posX += value;
}

function moveLeft() {
  moveSide(-1);
}

function moveRight() {
  moveSide(1);
}



function tryBlockDown() {
  const blockPosition = currentBlock.getBlockPosition();
  for (let i = 0; i < blockPosition.length; ++i) {
    if (blockPosition[i][0] === BOARD_HEIGHT - 1) {
      return false;
    }
    if (fixedBlockArray[blockPosition[i][0] + 1][blockPosition[i][1]] !== 0) {
      return false;
    }
  }
  return true;
}

function blockDown() {
  if (tryBlockDown()) {
    // 내린다.
    currentBlock.posY += 1;
    return true;
  } else {
    addFixedBlock(currentBlock);
    return false;
  }
}

// 회전 코드 수정 (좌우 막힌거, 블록막힌거)
// 스코어 추가
// 게임 종료
// 블럭 색상 수정


let currentBlock;
function makeBlock() {
  const blockType = Math.floor(Math.random() * 7);
  let block;
  switch (blockType){
    case 0:
      block = new BlockI();
      break;
    case 1:
      block = new BlockT();
      break;
    case 2:
      block = new BlockA();
      break;
    case 3:
      block = new BlockB();
      break;
    case 4:
      block = new BlockL();
      break;
    case 5:
      block = new BlockR();
      break;
    case 6:
      block = new BlockM();
      break;
  }
  currentBlock = block;
}

function addFixedBlock(block) {
  // block 의 좌표들을 가져온다.
  // 가져온 좌표들을 셋팅한다.

  const blockPosition = block.getBlockPosition();
  if (blockPosition) {
    for (let i = 0; i < blockPosition.length; ++i) {
      fixedBlockArray[blockPosition[i][0]][blockPosition[i][1]] = block.colorType;
    }
  }
}

function initFixedBoard() {
  for (let i = 0; i < BOARD_HEIGHT; ++i) {
    fixedBlockArray.push([]);
    for (let j = 0; j < BOARD_WIDTH; ++j) {
      fixedBlockArray[i].push(0);
    }
  }

  fixedBlockArray[10][10] = 1;
}

function tryClearBlockLine(yArray) {
  yArray = [...new Set(yArray)]
  const result = yArray.filter(x => fixedBlockArray[x].every(e => e !== 0));

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
}

function init() {
  initBoard();
  initFixedBoard();
  makeBlock();
  // addFixedBlock(new BlockI());
  drawBoard();
  run();
};

init();
