const React = require('react');
const Row = require('./row');
const TicTacToe = require('./ticTacToe');

function Board({ updateGame, board }) {
  return (
    <div className="board">
      {
        board.boardState.map((row, index) => {
          return (
            <Row
              row={row}
              updateGame={updateGame}
              key={index}
            />
          );
        })
      }
    </div>
  );
}

Board.propTypes = {
  board: React.PropTypes.instanceOf(TicTacToe.Board).isRequired,
  updateGame: React.PropTypes.func.isRequired
}


module.exports = Board;
