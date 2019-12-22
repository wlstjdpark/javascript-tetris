// 디자인 참고
// https://www.reddit.com/r/Tetris/comments/6o6tvv/what_is_the_block_algorithm_for_classic_tetris/

let boardElement;

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 40;
const BLOCK_WIDTH = 20;
const BLOCK_HEIGHT = 20;

const BLOCK_I = [ [0, 0], [1, 0], [2, 0], [3, 0] ]

function createBoard() {
  console.log('createBoard');
  boardElement = document.createElement('div');
  boardElement.id = "board2";
  for (let i = 0; i < BOARD_HEIGHT; ++i) {
    let rElement = document.createElement('div');
    rElement.style.display = 'block';
    rElement.style.padding = '0';
    rElement.style.margin = '0';
    rElement.style.width = (BOARD_WIDTH * BLOCK_WIDTH)+'px';
    rElement.style.height = BLOCK_HEIGHT + 'px';
    rElement.style.verticalAlign ='top';

    for (let j = 0; j < BOARD_WIDTH; ++j) {
      let cElement = document.createElement('div');
      cElement.style.display = 'inline-block';
      cElement.style.padding = '0';
      cElement.style.margin = '0';
      cElement.style.border = '1px solid gray';
      cElement.style.width = BLOCK_WIDTH + 'px';
      cElement.style.height = BLOCK_HEIGHT + 'px';
      cElement.style.boxSizing = 'border-box';
      rElement.appendChild(cElement);
    }
    boardElement.appendChild(rElement);
  }

  let b = document.querySelector('#board');
  console.log(b)
  b.appendChild(boardElement);
}

function init() {
  createBoard();
};

init();
