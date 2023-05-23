/**
 * Global variables
 */
import { TURN } from "./constants.js";
import {
  getCellElementList, getCurrentTurnElement,
  getCellElementAtIdx, getGameStatusElement
} from "./selectors.js";

// console.log(getCellElementAtIdx(4));
// console.log(getCellElementList());
// console.log(getCurrentTurnElement());
// console.log(getGameStatusElement());

let currentTurn = TURN.CROSS
let isGameEnded = false;
let cellValues = new Array(9).fill("");

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

function handleCellClick(cell, index) {
  const isClicked = cell.classList.contains(TURN.CIRCLE) || cell.classList.contains(TURN.CROSS)
  if (isClicked) return;
  cell.classList.add(currentTurn)
  toggleTurn()
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
})()
