const React = require('react');
const Tile = require('./tile');

function Row({ updateGame, row }) {
  return (
    <div className="row">
      {
        row.map((tile, index) => {
          return (
            <Tile
              tile={tile}
              updateGame={updateGame}
              key={index}
            />
          ); 
        })
      }
    </div>
  );
}

Row.propTypes = {
  updateGame: React.PropTypes.func.isRequired,
  row: React.PropTypes.array.isRequired
};

module.exports = Row;