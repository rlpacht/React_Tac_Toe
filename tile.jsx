const React = require('react');
const TicTacToe = require('./ticTacToe');

function Tile({ tile, updateGame }) {
  return (
    <div className="box" onClick={(event) => updateGame(tile)}>
      &nbsp;
      {tile.tileState}
    </div>
  );
}

Tile.propTypes = {
  updateGame: React.PropTypes.func.isRequired,
  tile: React.PropTypes.instanceOf(TicTacToe.Tile).isRequired
};

module.exports = Tile;