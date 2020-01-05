// 디자인 참고
// https://www.reddit.com/r/Tetris/comments/6o6tvv/what_is_the_block_algorithm_for_classic_tetris/

let cellArray;
let boardElement;

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 40;
const BLOCK_WIDTH = 20;
const BLOCK_HEIGHT = 20;

class Block {
  constructor(blockType) {
    this.blockType = blockType;
    this.currentRoateIndex = 0;
    this.posArray;
    this.currentPosition;
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
}

let blockArray = [];
let fixedBlockArray = [];

class BlockI extends Block {
  constructor(blockType){
    super(blockType);
    this.posX = BOARD_WIDTH / 2;
    this.posY = 0;
    this.posArray = [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
      ];
  }
  tryRotate() {
    return true;
  }
  rotate() {
    if (true) {
      let tempArray = []
      for (let i = 0; i < this.posArray.length; ++i) {
        tempArray.push([])
        for (let j = 0; j < this.posArray[i].length / 2; ++j) {
          tempArray[i].push()
          let temp = this.posArray[i][j];
          this.posArray[i][j] = this.posArray[j][i];
          this.posArray[j][i] = temp;
        }
      }
      this.posArray.reverse();
    }
    console.log(this.posArray);
  }
  draw() {
    for (let y = 0; y < this.posArray.length; ++y) {
      for (let x = 0; x < this.posArray[y].length; ++x) {
        if (this.posArray[y][x] === 1) {
          setBlock(boardElement[this.posY + y][this.posX + x]);
        }
      }
    }
  }
}

function setCell(e) {
  e.classList.remove('block-i');
  e.classList.add('cell');
}

function setBlock(e) {
  e.classList.remove('fixed-block');
  e.classList.add('block-i');
}

function setFixedBlock(e) {
  e.classList.remove('block-i');
  e.classList.add('fixed-block');
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
        setFixedBlock(boardElement[i][j])
      } else {
        setCell(boardElement[i][j]);
      }
    }
  }

  // currentBlock
  currentBlock.draw();
}

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
window.addEventListener('keydown', (e) => {
  keyDown(e.keyCode);
}, false);


function keyDown(keyCode) {
  // 원하는 방향으로 갈 수 있는가?

  // 간다.
  switch (keyCode) {
    case ARROW_LEFT:
      if (Math.min(...currentBlock.getBlockPosition().map(x => x[1])) === 0) {
        return;
      }
      currentBlock.posX -= 1;
      break;
    case ARROW_UP:
      currentBlock.rotate();
      break;
    case ARROW_RIGHT:
      if (Math.max(...currentBlock.getBlockPosition().map(x => x[1])) === BOARD_WIDTH - 1) {
        return;
      }
      currentBlock.posX += 1;
      break;
    case ARROW_DOWN:
      if (blockDown() === false) {
        makeBlock();
      };
      break;
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

function moveLeft() {
  let blockPosition = currentBlock.getBlockPosition();
  /// 작업중

  if (Math.min(...blockPosition.map(x => x[1])) === 0) {
    return;
  }
  currentBlock.posX -= 1;
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
    console.log(blockPosition[i][0])
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

let currentBlock;
function makeBlock() {
  let block = new BlockI();
  blockArray.push(block);
  currentBlock = block;
}

function addFixedBlock(block) {
  // block 의 좌표들을 가져온다.
  // 가져온 좌표들을 셋팅한다.

  const blockPosition = block.getBlockPosition();
  if (blockPosition) {
    console.log(blockPosition)
    for (let i = 0; i < blockPosition.length; ++i) {
      console.log(blockPosition[i][0], blockPosition[i][1]);
      fixedBlockArray[blockPosition[i][0]][blockPosition[i][1]] = 1;
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


function init() {
  initBoard();
  initFixedBoard();
  makeBlock();
  // addFixedBlock(new BlockI());
  drawBoard();
  run();
};

init();
