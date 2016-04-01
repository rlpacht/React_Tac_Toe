const React  = require('react');
const ReactDOM = require('react-dom');
const Board = require('./board');
const TicTacToe = require('./ticTacToe');

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

const Game = React.createClass({

  getInitialState() {
    // initialize board
    const boardSize = 3;
    return {
      game: new TicTacToe.Game(boardSize),
      boardSize: boardSize,
      gameWonModalOpen: false, 
      gameTiedModalOpen: false,
    };
  },

  updateGame(clickedTile) {
    const { game } = this.state;
    game.updateTile(clickedTile);
    this.setState({ game });
  },

  componentDidUpdate() {
    const { boardSize, game } = this.state;

    if (game.won()) {
      let newGame = new TicTacToe.Game(boardSize);
      this.setState({ game: newGame, gameWonModalOpen: true }); 
    }
    if (game.tie()) {
      let newGame = new TicTacToe.Game(boardSize);
      this.setState({ game: newGame, gameTiedModalOpen: true }); 
    }
  },

  updateBoardSize(event) {
    const newBoardSize = Number(event.target.value) || 3;
    this.setState({
      boardSize: newBoardSize,
      game: new TicTacToe.Game(newBoardSize)
    });
  },

  controlBoardSizeInput(event) {
    this.setState({
      boardSize: Number(event.target.value)
    });
  },

  undo() {
    const { game } = this.state;
    game.undo();
    this.setState({ game });
  },

  undoButtonClasses() {
    const { game } = this.state;
    if (game.canUndo()) {
      return "btn undo";
    } else {
      return "btn disabled undo";
    }
  },

  handleModalClose() {
    this.setState({ gameWonModalOpen: false, gameTiedModalOpen: false });
  },

  render() {
    const { 
      boardSize, 
      game, 
      gameWonModalOpen, 
      gameTiedModalOpen 
    } = this.state;

    const modalCloseButton = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleModalClose}
      />]
    return (
      <div>
        <Dialog
          title="Congrats!"
          actions={modalCloseButton}
          open={gameWonModalOpen}
          onRequestClose={this.handleModalClose}
        >
          You Won!
        </Dialog>
        <Dialog
          title="It's a Tie!"
          actions={modalCloseButton}
          open={gameTiedModalOpen}
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
        <span>
          <button 
            className={this.undoButtonClasses()} 
            onClick={this.undo}
          >
            Undo
          </button>
          <div className="current-player">
            Current Player is: {game.currentTeam()}
          </div>
        </span>
        
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
