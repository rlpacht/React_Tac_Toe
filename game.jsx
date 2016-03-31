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
    const { game, boardSize } = this.state;
    if (game.won() && this.state.modalShouldClose) {
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
    this.setState({modalShouldClose: true});
    return false;
    this.setState({ game: this.state.game });
  },
  shouldModalOpen() {
    // if (this.state.game.won()) {
    //   this.setState({modalShouldOpen: true})
    // }
    return this.state.game.won();
  },

  render() {
    const { boardSize, game } = this.state;
    const lastPlayer = game.nonCurrentPlayer();
    const action = [
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleModalClose}
      />]
    return (
      <div>
        <Dialog
          title="Congrats!"
          actions={action}
          modal={false}
          open={this.shouldModalOpen()}
          onRequestClose={this.handleModalClose}
        >
          You Won!
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
        <button className={this.undoButtonClasses()} onClick={this.undo}>Undo</button>
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
