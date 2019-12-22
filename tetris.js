// 디자인 참고
// https://www.reddit.com/r/Tetris/comments/6o6tvv/what_is_the_block_algorithm_for_classic_tetris/

let boardArray;
let boardElement;

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 40;
const BLOCK_WIDTH = 20;
const BLOCK_HEIGHT = 20;

const BLOCK_I = [ [0, 0], [1, 0], [2, 0], [3, 0] ]

function createBoard() {
  console.log('createBoard');
  boardArray = [];
  boardElement = document.createElement('div');
  for (let i = 0; i < BOARD_HEIGHT; ++i) {
    let rElement = document.createElement('div');
    rElement.style.display = 'block';
    rElement.style.padding = '0';
    rElement.style.margin = '0';
    rElement.style.width = (BOARD_WIDTH * BLOCK_WIDTH)+'px';
    rElement.style.height = BLOCK_HEIGHT + 'px';
    rElement.style.verticalAlign ='top';
    boardArray.push([]);

    for (let j = 0; j < BOARD_WIDTH; ++j) {
      let cElement = document.createElement('div');
      cElement.style.display = 'inline-block';
      cElement.style.padding = '0';
      cElement.style.margin = '0';
      cElement.style.border = '1px solid gray';
      cElement.style.width = BLOCK_WIDTH + 'px';
      cElement.style.height = BLOCK_HEIGHT + 'px';
      cElement.style.boxSizing = 'border-box';
      cElement.style.backgroundColor = 'white';
      rElement.appendChild(cElement);
      boardArray[i].push(cElement);
    }
    boardElement.appendChild(rElement);
  }
  document.querySelector('body').appendChild(boardElement);
}

function getBlockWidth(block) {
  let maxX = 0;
  block.forEach(x => maxX = (maxX < x[0] ? x[0] : maxX) + 1);
  return maxX;
}

function makeBlock(block) {
  // 시작 x 위치
  // 시작 y 위치
  const blockWidth = getBlockWidth(block);
  console.log(blockWidth)
  const startX = Math.floor(Math.random() * ((BOARD_WIDTH - blockWidth) + 1));
  const startY = 0;

  console.log(startX, startY);

  for (let i = 0; i < block.length; ++i) {
    try {
      boardArray[startY + block[i][1]][startX + block[i][0]].classList.add('block-i');
    }
    catch {
      console.error('element is not exist', i, j);
    }
  }

  // Y 좌표 시작 예외 잡기
  // 모든 스타일은 class로 관리 (css로 넘기기)
  // 타이머로 블록 내리기 (내리기 전 class 삭제)
}

let timer;
function run() {
  setInterval(() => {
    console.log('down');

  }, 1000)
}

function init() {
  createBoard();
  makeBlock(BLOCK_I);
};

init();
