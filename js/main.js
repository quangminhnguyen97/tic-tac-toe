/**
 * Global variables
 */
import { TURN, GAME_STATUS, CELL_VALUE } from "./constants.js";
import {
  getCellElementList, getCurrentTurnElement,
  getCellElementAtIdx, getGameStatusElement, getReplayButtonElement
} from "./selectors.js";

import { checkGameStatus } from "./utils.js";

let currentTurn = TURN.CROSS
let cellValues = new Array(9).fill("");
let gameStatus = GAME_STATUS.PLAYING

/**
 * TODOs
 *
 * 1. Bind click event for all cells
 * 2. On cell click, do the following:
 *    - Toggle current turn
 *    - Mark current turn to the selected cell
 *    - Check game state: win, ended or playing
 *    - If game is win, highlight win cells
 *    - Not allow to re-click the cell having value.
 *
 * 3. If game is win or ended --> show replay button.
 * 4. On replay button click --> reset game to play again.
 *
*/

function toggleTurn() {
  currentTurn = currentTurn === TURN.CIRCLE ? TURN.CROSS : TURN.CIRCLE
  const currentTurnElement = getCurrentTurnElement()
  if (currentTurnElement) {
    currentTurnElement.classList.remove(TURN.CIRCLE, TURN.CROSS)
    currentTurnElement.classList.add(currentTurn)
  }
}

function updateGameStatus(status) {
  gameStatus = status
  const gameStatusElement = getGameStatusElement()
  if (gameStatusElement) gameStatusElement.textContent = status
}

function showReplayButton() {
  const replayButton = getReplayButtonElement()
  if (replayButton) replayButton.classList.add('show')
}

function hideReplayButton() {
  const replayButton = getReplayButtonElement()
  if (replayButton) replayButton.classList.add('hide')
}

function highlightWinCells(winCells) {
  for (let cell of winCells) {
    const cellElement = getCellElementAtIdx(cell)
    cellElement.classList.add('win')
  }
}

function handleCellClick(cell, index) {
  const isClicked = cell.classList.contains(TURN.CIRCLE) || cell.classList.contains(TURN.CROSS)

  const isEnded = gameStatus !== GAME_STATUS.PLAYING
  if (isClicked || isEnded) return;
  cell.classList.add(currentTurn)

  cellValues[index] = currentTurn === TURN.CIRCLE ? CELL_VALUE.CIRCLE : CELL_VALUE.CROSS

  toggleTurn()

  const game = checkGameStatus(cellValues)

  switch (game.status) {
    case GAME_STATUS.ENDED:
      updateGameStatus(game.status)
      showReplayButton()
      break;

    case GAME_STATUS.X_WIN:
    case GAME_STATUS.O_WIN:
      updateGameStatus(game.status)
      showReplayButton()
      highlightWinCells(game.winPositions)
      break;

    default:
      break;
  }

}

function replayGame() {
  currentTurn = TURN.CROSS
  cellValues = cellValues.map(() => '')
  updateGameStatus(GAME_STATUS.PLAYING)
  const currentTurnElement = getCurrentTurnElement()
  if (currentTurnElement) {
    currentTurnElement.classList.remove(TURN.CIRCLE, TURN.CROSS)
    currentTurnElement.classList.add(currentTurn)
  }
  const cellElementList = getCellElementList();
  for (const cell of cellElementList) {
    cell.className = ''
  }
  hideReplayButton()
}

function initReplayButtonElement() {
  const btnElement = getReplayButtonElement()
  if (btnElement) {
    btnElement.addEventListener('click', replayGame)
  }

}

function initCellElementList() {
  const cellElementList = getCellElementList();
  cellElementList.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index))
  })
}

(() => {
  // bind click event for all li element.
  initCellElementList()
  // bind click event for replay button.
  initReplayButtonElement()
})()
