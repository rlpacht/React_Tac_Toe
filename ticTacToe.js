const { times } = require('lodash');

class Game {
  constructor(boardSize) {
    this.playerX = new Player("X");
    this.playerO = new Player("O");
    this.currentPlayer = this.playerX;
    this.board = new Board(boardSize);
  }

  switchPlayer() {
    this.currentPlayer = this.nonCurrentPlayer();
  }

  nonCurrentPlayer() {
    if (this.currentPlayer === this.playerX) {
      return this.playerO;
    } else {
      return this.playerX;
    }
  }

  updateTile(tile) {
    if (tile.tileIsEmpty()) {
      tile.updateTile(this.currentPlayer);
      this.switchPlayer();
    }
    this.lastTileChanged = tile
  }

  undo() {
    if (this.lastTileChanged.tileIsEmpty() === false) {
      this.lastTileChanged.tileState = null;
      this.switchPlayer();  
      this.lastTileChanged = null;
    } 
    
  }

  won() {
    // Pass in nonCurrentPlayer because player already switched in updateTile
    return this.board.winCondition(this.nonCurrentPlayer());
  }
}

class Player {
  constructor(team) {
    this.team = team; 
  }
}

class Board {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.boardState = this.buildBoard();
  }

  buildBoard() {
    const grid = times(this.boardSize, () => {
      return times(this.boardSize, () => {
        return new Tile();
      });
    });
    return grid;
  }

  winCondition(player) {
    const isRowsWin = this.checkRows(player.team);
    const isColumnWin = this.checkColumns(player.team);
    const isTopLeftDiagWin = this.diagTopLeftToBottomRight(player.team);
    const isBottomLeftDiagWin = this.diagBottomLeftToTopRight(player.team);

    return isRowsWin || isColumnWin || isTopLeftDiagWin || isBottomLeftDiagWin;
  }

  checkRows(player) {
    var stateOfBoard = this.boardState;
    for (var i = 0; i < stateOfBoard.length; i++) {
      var numMarksInRow = 0;
      for (var k = 0; k < stateOfBoard[i].length; k++) {
        if (stateOfBoard[i][k].tileState === player) {
          numMarksInRow++;
        }
      }
      if (numMarksInRow === stateOfBoard.length) {
        return true;
      }
    }
    return false;
  }


  // Check if the player has won with a vertical columns
  checkColumns(whoPlayed) {
    var stateOfBoard = this.boardState;
    for (var i = 0; i < stateOfBoard.length; i++) {
      var numMarksInColumn = 0;
      for (var k = 0; k < stateOfBoard[i].length; k++) {
        if (stateOfBoard[k][i].tileState === whoPlayed) {
          numMarksInColumn++;
        }
      }
      if (numMarksInColumn === stateOfBoard.length) {
        return true;
      }
    }
    return false;
  }

  // Check if the player has won with the diagonal from top left
  // to bottom right
  diagTopLeftToBottomRight(whoPlayed) {
    var stateOfBoard = this.boardState;
    var marksInDiag = 0;
    for(var i = 0; i < stateOfBoard.length; i++) {
      if (stateOfBoard[i][i].tileState === whoPlayed) {
        marksInDiag++;
      }
    }
    return marksInDiag === stateOfBoard.length;
  }

  // Check if the player has won with the diagonal from bottom left
  // to top right
  diagBottomLeftToTopRight(whoPlayed) {
    var stateOfBoard = this.boardState;
    var countInDiag = 0;
    var i = 2;
    var k = 0;
    while (i >= 0 && k <= stateOfBoard.length) {
      if (stateOfBoard[i][k].tileState === whoPlayed){
        countInDiag++;
      }
      i--;
      k++;
    }
    return countInDiag === stateOfBoard.length;
  }
}

class Tile {
  constructor() {
    this.tileState = null;
  }

  tileIsEmpty() {
    return !this.tileState
  }

  updateTile(player) {
    this.tileState = player.team;  
  }
}

module.exports = {
  Game: Game,
  Board: Board,
  Tile: Tile,
  Player: Player
};