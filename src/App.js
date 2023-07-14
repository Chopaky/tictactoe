import React, {useState} from'react';
import Board from "./components/Board";
import "./App.css";

function App() {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}])
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNum, setStepNum] = useState(0);

  const calcWinner= (squares) => {
    const lines = [ // 승리하는 경우의 수
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for (let i = 0; i < lines.length; i++) { // 위 정의한 승리 조건을 모두 확인
      const [a,b,c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a];
            };
    };
    return null;
  };
  
  const current = history[stepNum]; // 최근 생성된 history의 객체 저장
  const winner = calcWinner(current.squares); //승자가 결정된 경우, winner에 저장


  let status;
  if(winner){ // 승자가 결정된 경우
    status = 'Winner: '+winner;
  } else { // 승자가 결정되지 않은 경우, 다음 차례를 표기
    status = `Next player: ${xIsNext ? 'X':'O'}`;
  };

  const handleClick = (i)=>{
    const newHistory = history.slice(0, stepNum + 1);
    const newcurrent = newHistory[newHistory.length - 1];
    const newSquares = newcurrent.squares.slice();

    if(calcWinner(newSquares) || newSquares[i]){ // 승자 결정 || 이미 채워짐
      return;
    };

    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, {squares :newSquares}]);
    setXIsNext(prev => !prev);

    setStepNum(newHistory.length);
  };

  const moves = history.map((step, move) => {
      const desc = move ? 
      'Go to move #' + move :
      'Go to game start';
      return(
        <li key={move}>
          <button className = 'move-button'onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    }
  );

  const jumpTo = (step) => {
    setStepNum(step);
    setXIsNext((step % 2) === 0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares= {current.squares} onClick= {(i) => handleClick(i)}/>
      </div>
      <div className="game-info">
      <div className="status">{status}</div>
      <ol style={ {listStyle: 'none'}}>{moves}</ol>
      </div>
    </div>
  );
};

export default App;
