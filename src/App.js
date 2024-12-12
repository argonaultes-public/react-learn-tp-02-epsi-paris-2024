import { useState } from "react";
function Square({value, onSquareClick}) {

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {


  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]; // Object destructuring 
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }  


  // modifier la valeur de squares
  // en paramètre un 


  function handleClick(i) {
    console.log('click on square');
    // Boolean coercion
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean#boolean_coercion
    if (squares[i] || calculateWinner(squares)) {
        return;
    }

    const newSquare = squares.slice()
    if (xIsNext) {
      newSquare[i] = 'X'; // ou un 'O'
    } else {
      newSquare[i] = 'O';
    }
    onPlay(newSquare);
    //setSquares(newSquare);
  }

  let gameStatus;
  const winner = calculateWinner(squares);
  if (winner) {
    gameStatus = `Winner: ${winner}`;
  } else {
    gameStatus = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <>
      <div className="status">{gameStatus}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentBoard = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function onPlay(newSquares) {
    setHistory([...history.slice(0, currentMove + 1), newSquares]);
    setCurrentMove(currentMove + 1);
    console.log(`Method 1 currentMove: ${currentMove + 1}`);
    console.log(`Method 2 history.lenght: ${history.length - 1}`);
    console.log('play');
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    console.log(nextMove);
  }

  const moves = history.map( (squares, move) => {
    let description = move == 0 ? "Go to game start" : `Go to game # ${move}`;

    let descriptionBis = move > 0 ? `Go to game # ${move}` : "Go to game start";

    return (
      <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentBoard} onPlay={onPlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
