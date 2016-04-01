var React  = require('react');
var ReactDOM = require('react-dom');
var Board = require('./board');
var TicTacToe = require('./ticTacToe')
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

var Game = React.createClass({

  getInitialState() {
    // initialize board here
    const boardSize = 3;
    return {
      game: new TicTacToe.Game(boardSize),
      boardSize: boardSize,
      modalShouldClose: false
    };
  },

  updateGame(clickedTile) {
    const { game } = this.state;
    game.updateTile(clickedTile);
    this.setState({ game });
  },

  componentDidUpdate() {
    const { game, boardSize, modalShouldClose } = this.state;
    if ((game.won() && modalShouldClose) || (game.tie() && modalShouldClose)) {
      const newGame = new TicTacToe.Game(boardSize);
      this.setState({ game: newGame, modalShouldClose: false });  
    }
  },

  updateBoardSize(event) {
    const newBoardSize = parseInt(event.target.value) || 3;
    this.setState({
      boardSize: newBoardSize,
      game: new TicTacToe.Game(newBoardSize)
    });
  },

  controlBoardSizeInput(event) {
    this.setState({
      boardSize: parseInt(event.target.value)
    });
  },

  undo() {
    this.state.game.undo();
    this.setState({ game:  this.state.game});
  },

  undoButtonClasses() {
    var game = this.state.game;
    if (game.lastTileChanged) {
      return "btn undo"
    } else {
      return "btn disabled undo"
    }
  },

  handleModalClose() {
    this.setState({ modalShouldClose: true });
  },

  isGameWon() {
    return this.state.game.won();
  },

  isGameTie() {
    return this.state.game.tie();
  },

  render() {
    const { boardSize, game } = this.state;
    const action = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleModalClose}
      />]
    return (
      <div>
        <Dialog
          title="Congrats!"
          actions={action}
          modal={false}
          open={this.isGameWon()}
          onRequestClose={this.handleModalClose}
        >
          You Won!
        </Dialog>
        <Dialog
          title="It's a Tie!"
          actions={action}
          modal={false}
          open={this.isGameTie()}
          onRequestClose={this.handleModalClose}
        >
          Play Again!
        </Dialog>

        <div className="board-size">
          <h4> Choose Board Size </h4>
          <input 
            type="number" 
            className="board-size-input"
            value={boardSize} 
            onBlur={this.updateBoardSize} 
            onChange={this.controlBoardSizeInput} 
          />
        </div>
        <div>
          <button className={this.undoButtonClasses()} onClick={this.undo}>Undo</button>
          <div className="current-player"> Current Player is</div>
        </div>
        
        <Board
          board={game.board}
          updateGame={this.updateGame}
        />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Game />, document.getElementById('game'));
});
